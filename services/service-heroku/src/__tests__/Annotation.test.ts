import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Annotation from '../models/Annotation';

describe('Annotation Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {});
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  });

  it('should create and save an annotation successfully', async () => {
    const validAnnotation = new Annotation({
      url: 'http://example.com',
      annotations: [
        {
          elementSelector: '.example',
          text: 'Example text',
          timestamp: new Date(),
        },
      ],
    });
    const savedAnnotation = await validAnnotation.save();

    expect(savedAnnotation._id).toBeDefined();
    expect(savedAnnotation.url).toBe(validAnnotation.url);
    expect(savedAnnotation.annotations.length).toBe(1);
    expect(savedAnnotation.annotations[0].elementSelector).toBe('example');
    expect(savedAnnotation.annotations[0].text).toBe('Example text');
    expect(savedAnnotation.annotations[0].timestamp).toBeInstanceOf(Date);
  });

  it('should fail to create an annotation without required fields', async () => {
    const invalidAnnotation = new Annotation({
      annotations: [
        {
          elementSelector: '.example',
          text: 'Example text',
          timestamp: new Date(),
        },
      ],
    });

    let err;
    try {
      await invalidAnnotation.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.url).toBeDefined();
    }
  });

  it('should add timestamps on creation', async () => {
    const annotationWithTimestamps = new Annotation({
      url: 'http://example.com',
      annotations: [
        {
          elementSelector: '.example',
          text: 'Example text',
          timestamp: new Date(),
        },
      ],
    });
    const savedAnnotation = await annotationWithTimestamps.save();

    expect(savedAnnotation.createdAt).toBeInstanceOf(Date);
    expect(savedAnnotation.updatedAt).toBeInstanceOf(Date);
  });
});
