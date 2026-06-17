import { Request, Response } from 'express';
import { registerUser } from '../services/authService';
import { loginUser } from '../services/authService';

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';

    res.status(400).json({
      success: false,
      message,
    });
  }
};
export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: result.token,
      data: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Internal Server Error';

    res.status(401).json({
      success: false,
      message,
    });
  }
};