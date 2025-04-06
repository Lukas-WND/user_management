import { hash } from 'bcrypt';

export const passwordToHash = async (password: string): Promise<string> => {
  const salt_rounds: number = 10;
  return await hash(password, salt_rounds);
};
