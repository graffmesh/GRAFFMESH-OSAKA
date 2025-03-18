import { type Request, type Response } from 'express';
import { z } from 'zod';
import { type AnnotationType } from '../models/Annotation';
import AnnotationService from '../services/annotationService';

// Validation schemas
const annotationSchema = z.object({
  elementSelector: z.string().min(1, 'Element selector is required'),
  text: z.string().min(1, 'Text is required'),
});

const urlSchema = z.string().url('Invalid URL format');

// Types
interface ApiResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}

// Error handler
const handleError = (res: Response, error: unknown): void => {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred';
  res.status(400).json({ success: false, message });
};

// Controllers
export async function createAnnotation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { url, annotation } = req.body;

    // Validate inputs
    const validUrl = urlSchema.parse(url);
    const validAnnotation = annotationSchema.parse(annotation);

    const result = await AnnotationService.addAnnotation(
      validUrl,
      validAnnotation
    );

    res.status(201).json({
      success: true,
      message: 'Annotation created successfully',
      data: result.data,
    });
  } catch (error) {
    handleError(res, error);
  }
}

export async function getAnnotations(
  req: Request,
  res: Response<ApiResponse<AnnotationType[]>>
): Promise<void> {
  try {
    const { url } = req.query;

    // Validate URL
    const validUrl = urlSchema.parse(url);

    const result = await AnnotationService.getAnnotations(validUrl);

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    handleError(res, error);
  }
}

export async function deleteAnnotation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { url, elementSelector } = req.query;

    // Validate inputs
    const validUrl = urlSchema.parse(url);
    const validSelector = z.string().min(1).parse(elementSelector);

    const result = await AnnotationService.deleteAnnotation(
      validUrl,
      validSelector
    );

    if (!result.success) {
      res.status(404).json({
        success: false,
        message: result.message || 'Annotation not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Annotation deleted successfully',
    });
  } catch (error) {
    handleError(res, error);
  }
}

const AnnotationController = {
  createAnnotation,
  getAnnotations,
  deleteAnnotation,
};

export default AnnotationController;

// Export types
export type { ApiResponse };
