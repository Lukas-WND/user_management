import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

/**
 * @description Translates technical field names to user-friendly labels.
 *
 * @param field - The technical field name from the schema.
 * @returns A translated, user-facing label for the field.
 */
function translateFieldName(field: string): string {
  switch (field) {
    case 'email':
      return 'E-mail';
    case 'password':
      return 'Senha';
    case 'employee_id':
      return 'Matrícula';
    case 'name':
      return 'Nome';
    default:
      return 'Indefinido';
  }
}

/**
 * @description Pipe used for validating incoming data using a Zod schema.
 * Provides customized error messages with translated field names for better user experience.
 */
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      const zodError = error as ZodError;

      // Checks if got an error in more than one field
      if (zodError.errors.length > 1) {
        const fields = zodError.errors.map((err) =>
          translateFieldName(String(err.path[0])),
        );

        const translatedFields = fields.join(', ');
        throw new BadRequestException(
          `Dados no formato incorreto: ${translatedFields}`,
        );
      }

      throw new BadRequestException(zodError.errors[0].message);
    }
  }
}
