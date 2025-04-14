import { hash, compare } from 'bcrypt';

export const passwordToHash = async (password: string): Promise<string> => {
  const salt_rounds: number = 10;
  return await hash(password, salt_rounds);
};

export const comparePasswordWithHash = (password: string, hash: string) => {
  return compare(password, hash);
}