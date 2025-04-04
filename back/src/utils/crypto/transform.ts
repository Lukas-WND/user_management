import { hashSync } from 'bcrypt';
import { ValueTransformer } from 'typeorm';

export const passwordToHash: ValueTransformer = {
  to: (password: string): string => {
    return hashSync(password, 10);
  },
  from: (hash: string): string => {
    return hash;
  },
};
