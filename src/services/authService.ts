import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

interface RegisterUserInput {
  name: string;
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