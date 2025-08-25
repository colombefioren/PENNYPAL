import { Router } from 'express';
import { signup, login, logout, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateSignup, validateLogin } from '../middleware/validate.js';

const router = Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

export default router;
