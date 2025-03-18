import { z } from 'zod';
import { AnnotationOrderByWithRelationInputObjectSchema } from './objects/AnnotationOrderByWithRelationInput.schema';
import { AnnotationWhereInputObjectSchema } from './objects/AnnotationWhereInput.schema';
import { AnnotationWhereUniqueInputObjectSchema } from './objects/AnnotationWhereUniqueInput.schema';
import { AnnotationCountAggregateInputObjectSchema } from './objects/AnnotationCountAggregateInput.schema';
import { AnnotationMinAggregateInputObjectSchema } from './objects/AnnotationMinAggregateInput.schema';
import { AnnotationMaxAggregateInputObjectSchema } from './objects/AnnotationMaxAggregateInput.schema';

export const AnnotationAggregateSchema = z.object({
  orderBy: z
    .union([
      AnnotationOrderByWithRelationInputObjectSchema,
      AnnotationOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: AnnotationWhereInputObjectSchema.optional(),
  cursor: AnnotationWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), AnnotationCountAggregateInputObjectSchema])
    .optional(),
  _min: AnnotationMinAggregateInputObjectSchema.optional(),
  _max: AnnotationMaxAggregateInputObjectSchema.optional(),
});
