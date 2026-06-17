import mongoose from 'mongoose';

const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(mongoUri);

    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed');

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

export default connectDatabase;