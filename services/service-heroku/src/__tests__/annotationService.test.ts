import { describe, it, expect, beforeEach, vi } from 'vitest';
import AnnotationService from '../services/annotationService';
// import { AnnotationServiceType } from '../services/annotationService';
import Annotation from '../models/Annotation';

vi.mock('../models/annotation');

describe('AnnotationService', () => {
  let annotationService: AnnotationService;

  beforeEach(() => {
    annotationService = AnnotationService.getInstance();
    vi.resetAllMocks();
  });

  describe('getAnnotations', () => {
    it('should return annotations for a given URL', async () => {
      const mockAnnotations = [
        { elementSelector: 'selector1', text: 'text1', timestamp: new Date() },
        { elementSelector: 'selector2', text: 'text2', timestamp: new Date() },
      ];

      (
        Annotation.findOne as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue({ annotations: mockAnnotations });

      const response =
        await annotationService.getAnnotations('http://example.com');

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockAnnotations);
    });

    it('should handle errors when fetching annotations', async () => {
      (
        Annotation.findOne as unknown as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new Error('Failed to fetch annotations'));

      const response =
        await annotationService.getAnnotations('http://example.com');

      expect(response.success).toBe(false);
      expect(response.message).toBe('Failed to fetch annotations');
      expect(response.data).toEqual([]);
    });
  });

  describe('deleteAnnotation', () => {
    it('should delete an annotation for a given URL and element selector', async () => {
      const mockAnnotation = {
        elementSelector: 'selector1',
        text: 'text1',
        timestamp: new Date(),
      };

      (
        Annotation.findOneAndUpdate as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue(mockAnnotation);

      const response = await annotationService.deleteAnnotation(
        'http://example.com',
        'selector1'
      );

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockAnnotation);
    });

    it('should handle errors when deleting annotation', async () => {
      (
        Annotation.findOneAndUpdate as unknown as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new Error('Failed to delete annotation'));

      const response = await annotationService.deleteAnnotation(
        'http://example.com',
        'selector1'
      );

      expect(response.success).toBe(false);
      expect(response.message).toBe('Failed to delete annotation');
    });
  });
});
