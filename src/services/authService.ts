import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}
interface LoginUserInput {
  email: string;
  password: string;
}

export const registerUser = async (
  userData: RegisterUserInput
): Promise<IUser> => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (
  userData: LoginUserInput
) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
  {
    expiresIn: '7d',
  }
    // process.env.JWT_SECRET as string,
    // {
    //   expiresIn: process.env.JWT_EXPIRES_IN || '7000',
    // }
  );

  return {
    token,
    user,
  };
};