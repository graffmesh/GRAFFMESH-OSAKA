import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/annotationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Database Connection
import { ConnectOptions } from 'mongoose';

mongoose
  .connect(
    process.env.MONGODB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then((): void => {
    console.log('Connected to MongoDB');
    // Start the server only after DB connection
    app.listen(PORT, (): void => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error): void => {
    console.error('Error connecting to MongoDB:', error.message);
  });
