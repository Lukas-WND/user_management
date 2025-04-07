import { z } from 'zod';
import { CreateUserSchema } from './create-user.dto';

const baseUpdateSchema = CreateUserSchema.partial().extend({
  newPassword: z.string().optional(),
});

export const UpdateUserSchema = baseUpdateSchema.refine(
  (data) => {
    if (data.newPassword && !data.password) {
      return false;
    }
    return true;
  },
  {
    message: 'A senha atual é obrigatória para definir uma nova senha.',
    path: ['password'], // adiciona o erro ao campo `password`
  },
);

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
