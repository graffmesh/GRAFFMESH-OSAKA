import { createRoot } from 'react-dom/client';
import AnnotationEditor from './components/AnnotationEditor';

const App = () => {
  return (
    <AnnotationEditor style={{}} onStyleChange={() => {}} onClose={() => {}} />
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
