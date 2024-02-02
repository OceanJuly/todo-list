import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom'
import './App.css';
import routes from "./router";

function App() {
  return (
    <div className="App">
      <Suspense fallback="loading">
        <div className="main">
          {useRoutes(routes)}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
