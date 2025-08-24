import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';

const TOKEN_COOKIE_NAME = 'token';

const setAuthCookie = (res, payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET');
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export const signup = async (req, res) => {
  try {
    const { email, password, username, firstname, lastname } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        hashed_password,
        username: username || email.split('@')[0],
        firstname: firstname || '',
        lastname: lastname || '',
      },
      select: { user_id: true, email: true, username: true, firstname: true, lastname: true, created_at: true },
    });

    setAuthCookie(res, { user_id: user.user_id, email: user.email });
    return res.status(201).json(user);
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Failed to sign up' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.hashed_password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const publicUser = {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      created_at: user.created_at,
    };

    setAuthCookie(res, { user_id: user.user_id, email: user.email });
    return res.json(publicUser);
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Failed to log in' });
  }
};

export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: req.user.user_id },
      select: { user_id: true, email: true, username: true, firstname: true, lastname: true, created_at: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('Me error:', err);
    return res.status(500).json({ error: 'Failed to load profile' });
  }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie(TOKEN_COOKIE_NAME, { path: '/', sameSite: 'lax' });
    return res.status(204).send();
  } catch {
    return res.status(204).send();
  }
};
