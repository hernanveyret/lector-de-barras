import { useState,  useEffect } from 'react'
import { useZxing } from 'react-zxing';
import { useForm } from "react-hook-form";

import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
   } = useForm();

  const [result, setResult] = useState(null);
  const [ productos, setProductos ] = useState([]);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  const cargarProducto = (data) => {
    setProductos([...productos, data]);
    reset()
  };

  useEffect(() => {
    console.log(productos)
  },[productos])

  return (
    <div>
      <h1>Escáner de Códigos</h1>
      <video ref={ref} width="50%" />
      {result && <p>Resultado: {result}</p>}
      <form
        onSubmit={handleSubmit(cargarProducto)}
      >
        <input type="text" name="numerobarra" defaultValue={result && result}
        {...register('idNumero', {
          required: {
            value: true,
            message:'Debe ingresar un codigo valido'
          }
        })}
        />
        { errors.idNumero?.message && <p style={{color:'red', fontSize:'14px'}}>{errors.idNumero.message}</p>}

        <input type="text" name="nombreProducto" placeholder='Nombre' 
        {...register('producto', {
          required: {
            value: true,
            message:'Campo obligatorio'
          }
        })}
        />
        { errors.producto?.message && <p style={{color:'red', fontSize:'14px'}}>{errors.producto.message}</p>}

        <input type="text" name="descripcion" placeholder='Descripcion' 
        {...register('descripcion', {
          required: {
            value: true,
            message:'Campo obligatorio'
          }
        })}
        />
        { errors.descripcion?.message && <p style={{color:'red', fontSize:'14px'}}>{errors.descripcion.message}</p>}

        <input type='text' name="precioUnit" placeholder='Precio Unit.' 
        {...register('precioUnit', {
          required: {
            value: true,
            message:'Campo obligatorio'
          }
        })}
        />
        { errors.precioUnit?.message && <p style={{color:'red', fontSize:'14px'}}>{errors.precioUnit.message}</p>}

        <input type='text' name="precioXdos" placeholder='Precio X 2.' 
        {...register('precioxDos', {
          required: {
            value: true,
            message:'Campo obligatorio'
          }
        })}
        />
        { errors.precioxDos?.message && <p style={{color:'red', fontSize:'14px'}}>{errors.precioxDos.message}</p>}
        <button type='submit'>CARGAR</button>
      </form>
      <section>
        {
          productos && 
            productos.map((pro, indice) => (
              <div key={indice} className="card-productos">
                <p>Codigo Número: {pro.idNumero}</p>
                <p>Nombre: {pro.producto}</p>
                <p>Descripcion: {pro.descripcion}</p>
                <p>Precio Unit: {pro.precioUnit}</p>
              </div>
            ))
        }
      </section>
    </div>
  );
}

export default App
