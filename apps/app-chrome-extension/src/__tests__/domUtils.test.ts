import { describe, it, expect } from 'vitest';
import { getUniqueSelector, sanitizeAnchor } from '../utils/domUtils';

describe('domUtils', () => {
  describe('getUniqueSelector', () => {
    it('should return the id selector if the element has an id', () => {
      const element = document.createElement('div');
      element.id = 'test-id';
      document.body.appendChild(element);

      const selector = getUniqueSelector(element as any);

      expect(selector).toBe('#test-id');
      document.body.removeChild(element);
    });

    it('should return a unique selector for an element without an id', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.appendChild(child);
      document.body.appendChild(parent);

      const selector = getUniqueSelector(child as any);

      expect(selector).toBe('div > span:nth-child(1)');
      document.body.removeChild(parent);
    });

    it('should include class names in the selector', () => {
      const element = document.createElement('div');
      element.className = 'test-class';
      document.body.appendChild(element);

      const selector = getUniqueSelector(element as any);

      expect(selector).toBe('div.test-class:nth-child(1)');
      document.body.removeChild(element);
    });
  });

  describe('sanitizeAnchor', () => {
    it('should replace non-alphanumeric characters with hyphens and convert to lowercase', () => {
      const text = 'Hello World!';
      const sanitized = sanitizeAnchor(text);

      expect(sanitized).toBe('hello-world-');
    });

    it('should handle empty strings', () => {
      const text = '';
      const sanitized = sanitizeAnchor(text);

      expect(sanitized).toBe('');
    });
  });
});
