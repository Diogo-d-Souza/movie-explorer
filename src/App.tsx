import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Router from './router';

export default function App() {
  return (
    <main
      className='flex min-h-screen'
      style={{ backgroundColor: 'rgba(110, 112, 117, 0.8)' }}
    >
      <Router />
    </main>
  );
}
