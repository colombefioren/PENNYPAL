import { BadRequestError } from '../utils/errors.js';
import isEmail from 'validator/lib/isEmail.js';
import normalizeEmail from 'validator/lib/normalizeEmail.js';

export const requireFields = (...fields) => (req, _res, next) => {
  for (const f of fields) {
    const v = req.body?.[f];
    if (v == null || v === '') {
      return next(new BadRequestError(`Missing field: ${f}`));
    }
  }
  next();
};

// Normalize and validate email. Sets req.body.email to the normalized lowercase value.
export const validateEmail = () => (req, _res, next) => {
  const raw = String(req.body.email || '').trim();
  if (!isEmail(raw)) return next(new BadRequestError('Invalid email format'));
  const normalized = normalizeEmail(raw, {
    all_lowercase: true,
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
    outlookdotcom_remove_subaddress: false,
    yahoo_remove_subaddress: false,
    icloud_remove_subaddress: false,
  });
  req.body.email = normalized;
  next();
};

export const sanitizeBody = (...fields) => (req, _res, next) => {
  for (const f of fields) {
    if (typeof req.body?.[f] === 'string') {
      req.body[f] = req.body[f].trim();
    }
  }
  next();
};

export const validateTextMaxLengths = (limits) => (req, _res, next) => {
  for (const [field, max] of Object.entries(limits || {})) {
    const v = req.body?.[field];
    if (typeof v === 'string' && v.length > max) {
      return next(new BadRequestError(`${field} is too long (max ${max} characters)`));
    }
  }
  next();
};

// Combined middlewares for cleaner routes
export const validateSignup = [
  requireFields('email', 'password'),
  validateEmail(),
  sanitizeBody('username', 'firstname', 'lastname'),
  validateTextMaxLengths({ username: 50, firstname: 50}),
];

export const validateLogin = [
  requireFields('email', 'password'),
  validateEmail(),
];
