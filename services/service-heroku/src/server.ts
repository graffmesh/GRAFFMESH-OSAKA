import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import annotationRoutes from './routes/annotationRoutes';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// MongoDB接続
dotenv.config();

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const mongooseOptions: MongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB接続
mongoose
  .connect(process.env.MONGODB_URI as string, mongooseOptions)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
  });

// CORS設定
app.use(
  cors({
    origin: '*', // 必要に応じて制限
    methods: ['GET', 'POST', 'DELETE'],
  })
);

app.use(express.json());

// ルーティングの使用
app.use('/', annotationRoutes);

// サーバーの起動
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

// CORS設定
app.use(
  cors({
    origin: '*', // 必要に応じて制限
    methods: ['GET', 'POST', 'DELETE'],
  })
);

app.use(express.json());

// ルーティングの使用
app.use('/', annotationRoutes);

// サーバーの起動
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
