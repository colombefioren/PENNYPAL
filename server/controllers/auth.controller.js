import jwt from 'jsonwebtoken';
import { signupUser, loginUser, getPublicUser } from '../services/auth.service.js';

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

    const user = await signupUser({ email, password, username, firstname, lastname });

    setAuthCookie(res, { user_id: user.user_id, email: user.email });
    return res.status(201).json(user);
  } catch (err) {
    const status = err.status || 500;
    if (status !== 500) return res.status(status).json({ error: err.message });
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

    const publicUser = await loginUser({ email, password });

    setAuthCookie(res, { user_id: publicUser.user_id, email: publicUser.email });
    return res.json(publicUser);
  } catch (err) {
    const status = err.status || 500;
    if (status !== 500) return res.status(status).json({ error: err.message });
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Failed to log in' });
  }
};

export const me = async (req, res) => {
  try {
    const user = await getPublicUser(req.user.user_id);
    return res.json(user);
  } catch (err) {
    const status = err.status || 500;
    if (status !== 500) return res.status(status).json({ error: err.message });
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
