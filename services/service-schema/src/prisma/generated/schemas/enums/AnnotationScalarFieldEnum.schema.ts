import { z } from 'zod';

export const AnnotationScalarFieldEnumSchema = z.enum([
  'id',
  'url',
  'elementSelector',
  'text',
  'createdAt',
  'updatedAt',
]);
