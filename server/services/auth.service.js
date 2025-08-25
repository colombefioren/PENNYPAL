import bcrypt from 'bcrypt';
import { prisma } from '../db/prisma.js';

class HttpError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class AuthError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

const publicUserSelect = {
  user_id: true,
  email: true,
  username: true,
  firstname: true,
  lastname: true,
  created_at: true,
};

export const signupUser = async ({ email, password, username, firstname, lastname }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ConflictError('Email already in use');

  const hashed_password = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      hashed_password,
      username: username || email.split('@')[0],
      firstname: firstname || '',
      lastname: lastname || '',
    },
    select: publicUserSelect,
  });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AuthError('Invalid credentials');

  const ok = await bcrypt.compare(password, user.hashed_password);
  if (!ok) throw new AuthError('Invalid credentials');

  const publicUser = {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    created_at: user.created_at,
  };
  return publicUser;
};

export const getPublicUser = async (userId) => {
  const user = await prisma.user.findUnique({ where: { user_id: userId }, select: publicUserSelect });
  if (!user) throw new NotFoundError('User not found');
  return user;
};
