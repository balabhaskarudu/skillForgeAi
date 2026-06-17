import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDatabase from './config/database';





const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server Startup Failed');

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

startServer();