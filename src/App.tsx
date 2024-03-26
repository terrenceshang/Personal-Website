import content from './content/content';
import './index.css';

function App() {
  window.addEventListener('scroll', () => {
    console.log('Scrolling...');
  });
  return <div>{content()}</div>;
}

export default App;
