import { getUniqueSelector } from './utils/domUtils';
import { Annotation, MessageResponse, MessageType } from './types';
type ElementWithParent = Element & { parentElement: Element };
class AnnotationManager {
  private static instance: AnnotationManager;
  private observer: MutationObserver | null = null;
  private initialized = false;

  private constructor() {
    // Defer initialization until DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  static getInstance(): AnnotationManager {
    if (!AnnotationManager.instance) {
      AnnotationManager.instance = new AnnotationManager();
    }
    return AnnotationManager.instance;
  }

  private init(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.initializeStyles();
    this.setupEventListeners();
    this.loadAnnotations();
  }

  private initializeStyles(): void {
    // Check if styles are already added
    if (document.querySelector('link[data-graffmesh-styles]')) return;

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('styles/contentStyle.css');
    style.setAttribute('data-graffmesh-styles', 'true');
    document.head.appendChild(style);
  }

  private async createAnnotation(
    element: Element,
    text: string
  ): Promise<void> {
    if (!element || !text.trim()) return;

    const annotation: Annotation = {
      elementSelector: getUniqueSelector(element as ElementWithParent),
      text: text.trim(),
      timestamp: Date.now(),
      id: undefined,
      position: { x: 0, y: 0 },
      content: '',
    };

    try {
      const response = await this.sendMessage<MessageResponse>(
        MessageType.CREATE_ANNOTATION,
        { annotation }
      );

      if (response?.success) {
        element.setAttribute('data-graffmesh', 'true');
        this.renderAnnotation(element, text);
      } else {
        console.error('Failed to create annotation:', response?.error);
      }
    } catch (error) {
      console.error('Error creating annotation:', error);
    }
  }

  private removeExistingAnnotation(element: Element): void {
    const existingAnnotation = element.querySelector('.graffmesh');
    if (existingAnnotation?.parentElement === element) {
      existingAnnotation.remove();
    }
  }

  private async deleteAnnotation(element: Element): Promise<void> {
    if (!element) return;

    const selector = getUniqueSelector(element);

    try {
      const response = await this.sendMessage<MessageResponse>(
        MessageType.DELETE_ANNOTATION,
        { elementSelector: selector }
      );

      if (response?.success) {
        element.removeAttribute('data-graffmesh');
        this.removeExistingAnnotation(element);
      } else {
        console.error('Failed to delete annotation:', response?.error);
      }
    } catch (error) {
      console.error('Error deleting annotation:', error);
    }
  }

  private renderAnnotation(element: Element, text: string): void {
    if (!element || !text) return;

    this.removeExistingAnnotation(element);

    const annotationDiv = document.createElement('div');
    annotationDiv.className = 'graffmesh';
    annotationDiv.textContent = text;
    annotationDiv.contentEditable = 'false';
    annotationDiv.draggable = true;

    // Ensure element can handle relative positioning
    const elementStyle = window.getComputedStyle(element);
    if (elementStyle.position === 'static') {
      (element as HTMLElement).style.position = 'relative';
    }

    this.setupAnnotationEventListeners(annotationDiv, element);
    element.appendChild(annotationDiv);
  }

  private setupAnnotationEventListeners(
    annotationDiv: HTMLDivElement,
    element: Element
  ): void {
    // Use event delegation for better performance
    const handleClick = (e: Event) => {
      e.stopPropagation();
      this.deleteAnnotation(element);
    };

    const handleDragStart = (e: DragEvent) => {
      e.stopPropagation();
      e.dataTransfer?.setData('text/plain', 'annotation');
    };

    annotationDiv.addEventListener('click', handleClick);
    annotationDiv.addEventListener('dragstart', handleDragStart);
  }

  private async loadAnnotations(): Promise<void> {
    try {
      const response = await this.sendMessage<GetAnnotationsResponse>(
        MessageType.GET_ANNOTATIONS
      );

      if (response?.success && Array.isArray(response.annotations)) {
        response.annotations.forEach((annotation) => {
          if (annotation?.elementSelector && annotation?.text) {
            const targetElement = document.querySelector(
              annotation.elementSelector
            );
            if (targetElement) {
              this.renderAnnotation(targetElement, annotation.text);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading annotations:', error);
    }
  }

  private sendMessage<T>(type: MessageType, data: object = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage({ type, ...data }, (response: T) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
            return;
          }
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleDoubleClick = (event: MouseEvent): void => {
    if (!event.target || !(event.target instanceof Element)) return;

    const target = event.target;
    // Ignore if clicking on existing annotation
    if (target.closest('.graffmesh')) return;

    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() || '';

    if (selectedText) {
      const userText = prompt('Enter annotation text:', selectedText);
      if (userText?.trim()) {
        this.createAnnotation(target, userText);
      }
    }
  };

  private setupEventListeners(): void {
    // Clean up existing observer if any
    if (this.observer) {
      this.observer.disconnect();
    }

    // Setup new observer
    this.observer = new MutationObserver(() => this.loadAnnotations());
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Remove existing listener if any
    document.removeEventListener('dblclick', this.handleDoubleClick);
    document.addEventListener('dblclick', this.handleDoubleClick);
  }

  // Cleanup method for testing and hot reloading
  public destroy(): void {
    this.observer?.disconnect();
    document.removeEventListener('dblclick', this.handleDoubleClick);
    this.initialized = false;
  }
}

// Initialize the annotation manager
AnnotationManager.getInstance();

// Export for testing
export { AnnotationManager };
