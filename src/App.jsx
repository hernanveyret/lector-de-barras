import { useState } from 'react'
import { useZxing } from 'react-zxing';

import './App.css'

function App() {
const [result, setResult] = useState(null);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div>
      <h1>Escáner de Códigos</h1>
      <video ref={ref} width="100%" />
      {result && <p>Resultado: {result}</p>}
    </div>
  );
}

export default App
