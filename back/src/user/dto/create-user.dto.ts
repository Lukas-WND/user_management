import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email().min(1, { message: 'O e-mail é obrigatório.' }),
  employee_id: z
    .string()
    .regex(/^\d+$/, { message: 'A matrícula deve conter apenas números' })
    .min(1, { message: 'A matrícula é obrigatória' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
