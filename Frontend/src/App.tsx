import { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'


function App() {
  const [test, setTest] = useState('');

  useEffect(() => {
    axios
    .get('http://localhost:8000')
    .then((response) => setTest(response.data.message))
    .catch((error) => setTest("Error"))
  }, []);

  return (
    <div className="App">
      <h1>{test}</h1>
    </div>
  );
}


export default App
