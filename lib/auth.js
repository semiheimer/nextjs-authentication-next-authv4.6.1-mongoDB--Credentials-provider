import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
export const verifyPassword = async (password, hashedPassword) => {
  const isEqual = await compare(password, hashedPassword);
  return isEqual;
};
