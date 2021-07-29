import './App.css';
import Router from './Router';

function App() {
  const isAuth = !!document.cookie;
  console.log(isAuth)
  return (
    <div className="App">
      <Router isAuth={isAuth} />
    </div>
  );
}

export default App;
