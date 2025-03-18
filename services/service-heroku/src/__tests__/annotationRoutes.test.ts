import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import annotationRoutes from '../routes/annotationRoutes';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.use('/api', annotationRoutes);

describe('Annotation Routes', () => {
  beforeEach(() => {
    // Mock the controller methods
    vi.resetModules();
    interface AnnotationController {
      createAnnotation: (req: Request, res: Response) => void;
      getAnnotations: (req: Request, res: Response) => void;
      deleteAnnotation: (req: Request, res: Response) => void;
    }

    vi.mock(
      '../controllers/annotationController',
      (): AnnotationController => ({
        createAnnotation: (req: Request, res: Response) =>
          res.status(201).send({ message: 'Annotation created' }),
        getAnnotations: (req: Request, res: Response) =>
          res.status(200).send([{ id: 1, text: 'Test annotation' }]),
        deleteAnnotation: (req: Request, res: Response) =>
          res.status(204).send(),
      })
    );
  });

  it('should create an annotation', async () => {
    const response = await request(app)
      .post('/api/annotations')
      .send({ text: 'New annotation' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Annotation created');
  });

  it('should get annotations', async () => {
    const response = await request(app).get('/api/annotations');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, text: 'Test annotation' }]);
  });

  it('should delete an annotation', async () => {
    const response = await request(app).delete('/api/annotations/1');

    expect(response.status).toBe(204);
  });
});
