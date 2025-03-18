import { describe, it, expect } from 'vitest';
import { updateAnnotationStyle } from '../utils/styleHelper';

describe('updateAnnotationStyle', () => {
  it('should update the style of the annotation element', () => {
    const annotationId = 'test-annotation';
    const annotation = document.createElement('div');
    annotation.id = annotationId;
    document.body.appendChild(annotation);

    const style = {
      color: 'red',
      rotation: 45,
      backgroundOpacity: 0.5,
      border: true,
      borderWidth: '2px',
      borderColor: 'blue',
      borderRadius: '5px',
      borderOpacity: 0.8,
    };

    updateAnnotationStyle(annotationId, style);

    expect(annotation.style.color).toBe('red');
    expect(annotation.style.transform).toBe('rotate(45deg)');
    expect(annotation.style.backgroundColor).toContain('80'); // 0.5 * 255 = 127.5 -> 80 in hex
    expect(annotation.style.border).toBe('2px solid blue');
    expect(annotation.style.borderRadius).toBe('5px');
    expect(annotation.style.borderColor).toContain('cc'); // 0.8 * 255 = 204 -> cc in hex

    document.body.removeChild(annotation);
  });

  it('should not update the style if the annotation element is not found', () => {
    const annotationId = 'non-existent-annotation';
    const style = { color: 'red' };

    updateAnnotationStyle(annotationId, style);

    // No assertion needed as the function should simply return without error
  });

  it('should handle styles without border properties', () => {
    const annotationId = 'test-annotation';
    const annotation = document.createElement('div');
    annotation.id = annotationId;
    document.body.appendChild(annotation);

    const style = {
      color: 'green',
      rotation: 90,
    };

    updateAnnotationStyle(annotationId, style);

    expect(annotation.style.color).toBe('green');
    expect(annotation.style.transform).toBe('rotate(90deg)');
    expect(annotation.style.border).toBe('');

    document.body.removeChild(annotation);
  });
});
