import express from 'express';
const router = express.Router();
import AnnotationController from '../controllers/annotationController';

router.post('/annotations', AnnotationController.createAnnotation);
router.get('/annotations', AnnotationController.getAnnotations);
router.delete('/annotations', AnnotationController.deleteAnnotation);

export default router;
