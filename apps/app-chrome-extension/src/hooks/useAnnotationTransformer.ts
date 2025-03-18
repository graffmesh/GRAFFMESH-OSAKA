import { useMemo } from 'react';
import { Annotation } from '../types';

const useAnnotationTransformer = (annotations: Annotation[]) => {
  return useMemo(
    () =>
      annotations.map((annotation) => ({
        ...annotation,
        position: { x: 0, y: 0 },
        timestamp: Date.now(),
      })),
    [annotations]
  );
};

export default useAnnotationTransformer;
