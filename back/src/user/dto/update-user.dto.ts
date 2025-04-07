import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const UpdateUserSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Informe um e-mail válido' }).optional(),
    employee_id: z
      .string()
      .regex(/^\d+$/, { message: 'A matrícula deve conter apenas números' })
      .optional(),
    password: z.string().optional(), // senha atual
    newPassword: z.string().optional(), // nova senha
  })
  .refine(
    (data) => {
      // Se for atualizar a senha, a senha atual deve estar presente
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: 'A senha atual é obrigatória para definir uma nova senha.',
      path: ['password'],
    },
  );

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export class UpdateUserSwaggerDto extends createZodDto(UpdateUserSchema) {}
