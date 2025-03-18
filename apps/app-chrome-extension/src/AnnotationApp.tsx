import React from 'react';
import styled from 'styled-components';
import AnnotationList from './components/AnnotationList';
import useAnnotation from './hooks/useAnnotation';
import MetaKeySelector from './components/MetaKeySelector'; // Ensure this path is correct
import Header from './components/Header';
import useAnnotationTransformer from './hooks/useAnnotationTransformer';
import { Annotation } from './types';

interface AnnotationAppProps {
  existingAnnotations?: Annotation[] | null | undefined | never[] | never;
  onMetaKeyChange?: (key: string) => void;
}

const AnnotationApp: React.FC<AnnotationAppProps> = ({
  existingAnnotations = [],
  onMetaKeyChange,
}) => {
  const { annotations, metaKey, setMetaKey, handleMetaDoubleClick } =
    useAnnotation();
  const transformedAnnotations = useAnnotationTransformer(
    existingAnnotations || []
  );

  return (
    <Container onDoubleClick={handleMetaDoubleClick}>
      <Header />
      <InstructionText>
        Double-click with <MetaKeyHighlight>{metaKey}</MetaKeyHighlight>
        key to add an annotation.
      </InstructionText>

      <MetaKeySelector
        selectedKey={metaKey}
        onKeyChange={(newKey) => {
          setMetaKey(newKey);
          onMetaKeyChange?.(newKey);
        }}
      />

      <AnnotationList
        annotations={[...transformedAnnotations, ...annotations]}
      />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding: 20px;
`;

const InstructionText = styled.p`
  margin: 16px 0;
  font-size: 1rem;
  color: #333;
`;

const MetaKeyHighlight = styled.b`
  color: #0066cc;
`;

export default React.memo(AnnotationApp);
