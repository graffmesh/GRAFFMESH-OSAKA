import React from 'react';
import styled from 'styled-components';
import { Annotation } from '../types';

interface AnnotationListProps {
  annotations: Annotation[];
}

const AnnotationList: React.FC<AnnotationListProps> = ({ annotations }) => (
  <>
    {annotations.map((annotation) => (
      <Container
        key={annotation.id}
        style={{
          top: annotation.position.y,
          left: annotation.position.x,
        }}
      >
        {annotation.text}
      </Container>
    ))}
  </>
);

export default AnnotationList;

// Styled Components
const Container = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
`;
