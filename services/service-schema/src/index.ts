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

export default mongoose.model('Annotation', annotationSchema);
