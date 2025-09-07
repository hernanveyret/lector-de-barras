import { useState } from 'react'
import { useZxing } from 'react-zxing';
import { useForm } from "react-hook-form";

import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
   } = useForm();

  const [result, setResult] = useState(null);
  const [ productos, setProductos ] = useState([]);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div>
      <h1>Escáner de Códigos</h1>
      <video ref={ref} width="50%" />
      {result && <p>Resultado: {result}</p>}
      <form>
        <input type="text" name="numerobarra" defaultValue={result && result}/>
        <input type="text" name="nombreProducto" placeholder='Nombre' />
        <input type="text" name="descripcion" placeholder='Descripcion' />
        <input type='text' name="precioUnit" placeholder='Precio Unit.' />
        <input type='text' name="precioXdos" placeholder='Precio X 2.' />
        <button type='submit'>CARGAR</button>
      </form>
    </div>
  );
}

export default App
