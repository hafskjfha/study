import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// HTTPS Server
const privateKey = fs.readFileSync('path/to/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
