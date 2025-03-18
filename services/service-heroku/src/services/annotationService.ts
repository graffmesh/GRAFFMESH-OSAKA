import Annotation from '../models/Annotation';
import type { Document } from 'mongoose';

// Types
interface AnnotationType {
  elementSelector: string;
  text: string;
  timestamp?: Date;
}

interface AnnotationRecord extends Document {
  url: string;
  annotations: (AnnotationType & { _id: unknown })[];
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

interface ServiceResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T | null | unknown;
}

// Error handling
class AnnotationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnnotationError';
  }
}

// Service class
class AnnotationService {
  private static instance: AnnotationService | null = null;

  private constructor() {}

  static getInstance(): AnnotationService {
    if (!this.instance) {
      this.instance = new AnnotationService();
    }
    return this.instance;
  }

  private static validateInput(params: {
    url: string;
    annotation?: AnnotationType;
    elementSelector?: string;
  }): void {
    const { url, annotation, elementSelector } = params;

    if (!url) {
      throw new AnnotationError('URL is required');
    }

    if (annotation && (!annotation.elementSelector || !annotation.text)) {
      throw new AnnotationError('Element selector and text are required');
    }

    if (elementSelector === '') {
      throw new AnnotationError('Element selector is required');
    }
  }

  async addAnnotation(
    url: string,
    annotation: AnnotationType
  ): Promise<ServiceResponse<AnnotationRecord>> {
    try {
      AnnotationService.validateInput({ url, annotation });

      const annotationWithTimestamp: AnnotationType = {
        ...annotation,
        timestamp: new Date(),
      };

      const result = await Annotation.findOneAndUpdate(
        { url },
        {
          $push: { annotations: annotationWithTimestamp },
          $setOnInsert: { url },
        },
        { upsert: true, new: true }
      );

      return {
        success: true,
        message: 'Annotation added successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Failed to add annotation',
      };
    }
  }

  async getAnnotations(
    url: string
  ): Promise<ServiceResponse<AnnotationType[]>> {
    try {
      AnnotationService.validateInput({ url });

      const record = await Annotation.findOne({ url }).select(
        'annotations -_id'
      );

      const annotations =
        record?.annotations.map((annotation) => ({
          elementSelector: annotation.elementSelector,
          text: annotation.text,
          timestamp: annotation.timestamp,
        })) ?? [];

      return {
        success: true,
        data: annotations,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to fetch annotations',
        data: [],
      };
    }
  }

  async deleteAnnotation(
    url: string,
    elementSelector: string
  ): Promise<ServiceResponse<AnnotationRecord>> {
    try {
      AnnotationService.validateInput({ url, elementSelector });

      const result = await Annotation.findOneAndUpdate(
        { url },
        { $pull: { annotations: { elementSelector } } },
        { new: true }
      );

      if (!result) {
        return {
          success: false,
          message: 'No annotations found for the provided URL',
        };
      }

      return {
        success: true,
        message: 'Annotation deleted successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to delete annotation',
      };
    }
  }
}

export default AnnotationService;
export type { AnnotationType, ServiceResponse };
