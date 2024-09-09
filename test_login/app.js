const express = require('express');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(helmet());  // 보안 설정

// 세션 설정 (OAuth용)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);

// HTTPS 설정
https.createServer({
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem'),
}, app).listen(3000, () => {
  console.log('Server is running on port 3000');
});
