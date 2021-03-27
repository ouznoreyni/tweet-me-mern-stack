import Login from './screens/Login';
import { Router } from '@reach/router';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <Login path='/login' />
      <Register path='/register' />
      <Login path='/' />
    </Router>
  );
}

export default App;
