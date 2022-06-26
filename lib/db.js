import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://semih:sRPr8b7ZG4oWTWAJ@cluster0.k7prg.mongodb.net/auth-test?retryWrites=true&w=majority'
  );

  return client;
};
