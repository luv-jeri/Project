import React, { useEffect } from 'react';
import './App.css';
import IndexNavigator from './navigators';

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='App'>
      <IndexNavigator />
    </div>
  );
}

export default App;
