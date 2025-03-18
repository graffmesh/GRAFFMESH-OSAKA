import { describe, test, expect, vi } from 'vitest';
import {
  createAnnotation,
  getAnnotations,
} from '../controllers/annotationController';
import type { Request, Response } from 'express';

describe('Annotation Controller', () => {
  // Mock setup
  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    return res;
  };

  // Test data
  const testUrl = 'http://example.com';
  const testAnnotation = { text: 'Test Annotation' };

  describe('createAnnotation', () => {
    test('should create annotation successfully', async () => {
      // Arrange
      const req = {
        body: {
          url: testUrl,
          annotation: testAnnotation,
        },
      } as Request;
      const res = mockResponse();

      // Act
      await createAnnotation(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
        })
      );
    });

    test('should handle missing required fields', async () => {
      // Arrange
      const req = {
        body: {},
      } as Request;
      const res = mockResponse();

      // Act
      await createAnnotation(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.any(String),
        })
      );
    });
  });

  describe('getAnnotations', () => {
    test('should retrieve annotations successfully', async () => {
      // Arrange
      const req = {
        query: { url: testUrl },
      } as unknown as Request;
      const res = mockResponse();

      // Act
      await getAnnotations(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.any(Array),
        })
      );
    });

    test('should handle missing URL parameter', async () => {
      // Arrange
      const req = {
        query: {},
      } as unknown as Request;
      const res = mockResponse();

      // Act
      await getAnnotations(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.any(String),
        })
      );
    });
  });
});
