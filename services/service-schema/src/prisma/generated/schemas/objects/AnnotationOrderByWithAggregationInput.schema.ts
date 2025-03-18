import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AnnotationCountOrderByAggregateInputObjectSchema } from './AnnotationCountOrderByAggregateInput.schema';
import { AnnotationMaxOrderByAggregateInputObjectSchema } from './AnnotationMaxOrderByAggregateInput.schema';
import { AnnotationMinOrderByAggregateInputObjectSchema } from './AnnotationMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AnnotationOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    elementSelector: z.lazy(() => SortOrderSchema).optional(),
    text: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => AnnotationCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => AnnotationMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => AnnotationMinOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const AnnotationOrderByWithAggregationInputObjectSchema = Schema;
