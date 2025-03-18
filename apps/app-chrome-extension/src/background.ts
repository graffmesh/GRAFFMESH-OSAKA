import { Annotation } from './types/Annotation';
import { ApiResponse } from './types/Api';
import { Message, MessageType } from './types/Message';
import apiService from './services/apiService';
class BackgroundMessageHandler {
  private static instance: BackgroundMessageHandler;
  private isInitialized = false;

  private constructor() {
    if (BackgroundMessageHandler.instance) {
      throw new Error('Use BackgroundMessageHandler.getInstance()');
    }
  }

  public static getInstance(): BackgroundMessageHandler {
    if (!BackgroundMessageHandler.instance) {
      BackgroundMessageHandler.instance = new BackgroundMessageHandler();
    }
    return BackgroundMessageHandler.instance;
  }

  private async getActiveTabUrl(): Promise<string> {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
        currentWindow: true,
      });

      if (!tab?.url) {
        throw new Error('No active tab URL found');
      }

      return tab.url;
    } catch (error) {
      console.error('Error getting active tab URL:', error);
      throw new Error('Failed to get active tab URL');
    }
  }

  private async handleCreateAnnotation(
    url: string,
    annotation?: { [key: string]: unknown }
  ): Promise<ApiResponse> {
    if (!url) {
      throw new Error('URL is required for creating annotation');
    }

    if (!annotation || Object.keys(annotation).length === 0) {
      throw new Error('Valid annotation data is required');
    }

    try {
      const result = await apiService.addAnnotation(
        url,
        annotation as unknown as Annotation
      );
      return { success: true, data: result };
    } catch (error) {
      console.error('Error creating annotation:', error);
      throw new Error('Failed to create annotation');
    }
  }

  private async handleGetAnnotations(url: string): Promise<ApiResponse> {
    if (!url) {
      throw new Error('URL is required for fetching annotations');
    }

    try {
      const annotations = await apiService.getAnnotations(url);
      return { success: true, data: annotations };
    } catch (error) {
      console.error('Error fetching annotations:', error);
      throw new Error('Failed to fetch annotations');
    }
  }

  private async handleDeleteAnnotation(
    url: string,
    elementSelector: string
  ): Promise<ApiResponse> {
    if (!url || !elementSelector) {
      throw new Error('URL and element selector are required for deletion');
    }

    try {
      const result = await apiService.deleteAnnotation(url, elementSelector);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error deleting annotation:', error);
      throw new Error('Failed to delete annotation');
    }
  }

  private async processMessage(message: Message): Promise<ApiResponse> {
    const url = await this.getActiveTabUrl();

    try {
      switch (message.type) {
        case MessageType.CREATE_ANNOTATION:
          return await this.handleCreateAnnotation(url, message.annotation);

        case MessageType.GET_ANNOTATIONS:
          return await this.handleGetAnnotations(url);

        case MessageType.DELETE_ANNOTATION:
          if (!message.elementSelector) {
            throw new Error('Element selector is required for deletion');
          }
          return await this.handleDeleteAnnotation(
            url,
            message.elementSelector
          );

        default:
          throw new Error(`Unsupported message type: ${message.type}`);
      }
    } catch (error) {
      throw this.normalizeError(error);
    }
  }

  public initialize(): void {
    if (this.isInitialized) {
      console.warn('BackgroundMessageHandler is already initialized');
      return;
    }

    chrome.runtime.onMessage.addListener(
      (
        message: Message,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response: ApiResponse) => void
      ) => {
        this.handleMessage(message, sender, sendResponse);
        return true; // Keep the message channel open for async response
      }
    );

    this.isInitialized = true;
  }

  private async handleMessage(
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: ApiResponse) => void
  ): Promise<void> {
    try {
      this.validateMessage(message);
      this.validateSender(sender);

      const response = await this.processMessage(message);
      sendResponse(response);
    } catch (error) {
      console.error('Error processing message:', error);
      sendResponse(this.createErrorResponse(error));
    }
  }

  private validateMessage(message: Message): void {
    if (!message) {
      throw new Error('Message is required');
    }

    if (!Object.values(MessageType).includes(message.type)) {
      throw new Error(`Invalid message type: ${message.type}`);
    }
  }

  private validateSender(sender: chrome.runtime.MessageSender): void {
    if (!sender.id || sender.id !== chrome.runtime.id) {
      throw new Error('Invalid message sender');
    }
  }

  private normalizeError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(
      typeof error === 'string' ? error : 'Unknown error occurred'
    );
  }

  private createErrorResponse(error: unknown): ApiResponse {
    return {
      success: false,
      error: this.normalizeError(error).message,
    };
  }
}

// Initialize the background handler using singleton pattern
const backgroundHandler = BackgroundMessageHandler.getInstance();
backgroundHandler.initialize();

export default backgroundHandler;
