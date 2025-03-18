import mongoose from 'mongoose';

const annotationSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, index: true },
    annotations: [
      {
        elementSelector: String,
        text: String,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

// Convert from CommonJS module.exports to ESM export
const Annotation = mongoose.model('Annotation', annotationSchema);
export default Annotation;

// If you need named exports, you can also do:
export const AnnotationModel = Annotation;
export type AnnotationType = mongoose.InferSchemaType<typeof annotationSchema>;
