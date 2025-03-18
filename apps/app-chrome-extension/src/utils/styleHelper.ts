export const updateAnnotationStyle = (
  annotationId: string,
  style: Record<string, any>
) => {
  const annotation = document.getElementById(annotationId);
  if (!annotation) return;

  Object.entries(style).forEach(([key, value]) => {
    if (key === 'rotation') {
      annotation.style.transform = `rotate(${value}deg)`;
    } else if (key === 'backgroundOpacity') {
      annotation.style.backgroundColor = `${annotation.style.backgroundColor}${Math.round(value * 255).toString(16)}`;
    } else if (key.startsWith('border')) {
      if (style.border) {
        annotation.style.border = `${style.borderWidth} solid ${style.borderColor}`;
        annotation.style.borderRadius = style.borderRadius;
        annotation.style.borderColor = `${annotation.style.borderColor}${Math.round(style.borderOpacity * 255).toString(16)}`;
      } else {
        annotation.style.border = 'none';
      }
    } else {
      (annotation.style as any)[key] = value;
    }
  });
};
