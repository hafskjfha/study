const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const passport = require('passport');

const router = express.Router();

// 회원가입 라우터
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
    );

    res.status(201).send({ userId: result.rows[0].id });
});

// 로그인 라우터
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return res.status(400).send('Invalid credentials');
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, 'your-jwt-secret', { expiresIn: '1h' });
    res.send({ token });
});

// Google OAuth 라우터
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // 인증 성공 후 리다이렉트
    res.redirect('/');
  }
);

module.exports = router;
