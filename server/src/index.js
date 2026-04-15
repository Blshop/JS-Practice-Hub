import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { PORT, CLIENT_URL } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import { languageMiddleware } from './middleware/languageMiddleware.js';

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(languageMiddleware);
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })();
}
