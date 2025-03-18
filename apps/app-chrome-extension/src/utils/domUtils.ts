interface ElementWithParent extends Element {
  parentNode: ElementWithParent;
  children: HTMLCollection;
}

function getUniqueSelector(element: ElementWithParent): string {
  if (element.id) return `#${element.id}`;
  let path = '';
  while (element && element.nodeType === Node.ELEMENT_NODE) {
    let selector = element.nodeName.toLowerCase();
    if (element.className) {
      selector += '.' + element.className.trim().replace(/\s+/g, '.');
    }
    const siblings = Array.from(element.parentNode.children);
    if (siblings.length > 1) {
      const index = siblings.indexOf(element) + 1;
      selector += `:nth-child(${index})`;
    }
    path = selector + (path ? ' > ' + path : '');
    element = element.parentNode;
  }
  return path;
}

interface SanitizeAnchor {
  (text: string): string;
}

const sanitizeAnchor: SanitizeAnchor = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

export { getUniqueSelector, sanitizeAnchor };
