import { useState } from 'react';
import { Annotation } from '../types';

const useAnnotation = (initialMetaKey = 'Shift') => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [metaKey, setMetaKey] = useState(initialMetaKey);

  const handleMetaDoubleClick = (event: React.MouseEvent) => {
    if (
      (metaKey === 'Shift' && event.shiftKey) ||
      (metaKey === 'Ctrl' && event.ctrlKey) ||
      (metaKey === 'Alt' && event.altKey)
    ) {
      const newAnnotation = {
        id: annotations.length + 1,
        text: 'New Annotation',
        position: { x: event.clientX, y: event.clientY },
      };
      setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    }
  };

  return { annotations, metaKey, setMetaKey, handleMetaDoubleClick };
};

export default useAnnotation;
