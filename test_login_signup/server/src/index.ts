// server/src/index.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { auth } from "./authMiddleware";
import jwt from "jsonwebtoken";
import { insertuser, finduser } from "./db";
import cors from 'cors';

// SSL 인증서 파일 경로 설정
const privateKey = fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8');

// Load RSA keys for RS512
const privateRSAKey = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');
const publicRSAKey = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

dotenv.config();
const corsOptions = {
  origin: ['https://localhost:3000'], // 허용할 도메인
  methods: ['GET', 'POST'], // 허용할 HTTP 메서드
  credentials: true, // 쿠키 등 credentials 사용 허용
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const GOOGLE_CLIENT_ID =  process.env.ClientID||'';
const GOOGLE_CLIENT_SECRET = process.env.Clientsecret || '';
const GOOGLE_LOGIN_REDIRECT_URI = 'https://localhost:3000/auth/google/login/redirect';
const GOOGLE_SIGNUP_REDIRECT_URI = 'https://localhost:3000/auth/google/signup/redirect';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
  id_token?: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <h1>OAuth</h1>
    <a href="/login">Log in</a>
    <a href="/signup">Sign up</a>
  `);
});

app.get('/login', (req: Request, res: Response) => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`;
  url += '&response_type=code';
  url += '&scope=email profile';
  res.redirect(url);
});

app.get('/signup', (req: Request, res: Response) => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`;
  url += '&response_type=code';
  url += '&scope=email profile';
  res.redirect(url);
});

app.get('/auth/google/login/redirect', async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code || typeof code !== 'string') {
    res.status(404).json({ error: 'Authorization code is missing' });
  }

  try {
    const tokenResponse = await axios.post<GoogleTokenResponse>(GOOGLE_TOKEN_URL, {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_LOGIN_REDIRECT_URI,
      grant_type: 'authorization_code',
    });
    const tokenData = tokenResponse.data;
    const userResponse = await axios.get(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const userInfo = userResponse.data as GoogleUserInfo;
    const { id, email } = userInfo;
    if (!await finduser(id, email)) {
      res.status(404).json({ code: 404, message: "User not found" });
      return;
    }

    const token = jwt.sign(
      { id, email },
      privateRSAKey,
      { algorithm: 'RS512', expiresIn: "15m", issuer: "your_issuer" }
    );
    console.log('su');
    res.status(200).json({ code: 200, message: "Token created", token });
  } catch (err:any) {
    console.error(err.name);
    res.status(500).json({ code: 'server error' });
  }
});

app.get('/auth/google/signup/redirect', async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code || typeof code !== 'string') {
    res.status(404).json({ error: 'Authorization code is missing' });
  }

  try {
    const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
      grant_type: 'authorization_code',
    });
    const tokenData = tokenResponse.data as GoogleTokenResponse;
    const userResponse = await axios.get(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userInfo = userResponse.data as GoogleUserInfo;
    const { id, email } = userInfo;

    if (await finduser(id, email)) {
      res.status(409).json({ code: 409, message: "User already exists" });
    } else {
      await insertuser(id, email);
      res.status(200).json({ code: 200, message: "Signup successful!" });
    }
  } catch (err:any) {
    console.error(err.name);
    res.status(500).json({ code: 'server error' });
  }
});

app.get('/profile', auth, (req: Request, res: Response) => {
  const id:string|undefined = req.decoded?.id;
  const email:string|undefined = req.decoded?.email;

  if (!id || !email) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  res.status(200).json({ code: 200, data: { id, email } });
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
  console.log(`HTTPS Server running on port 443`);
});
