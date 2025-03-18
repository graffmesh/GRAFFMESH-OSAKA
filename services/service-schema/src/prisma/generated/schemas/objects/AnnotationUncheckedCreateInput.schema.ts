import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AnnotationUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    url: z.string(),
    elementSelector: z.string(),
    text: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const AnnotationUncheckedCreateInputObjectSchema = Schema;
