import { Request, Response } from 'express';
import { registerUser } from '../services/authService';

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