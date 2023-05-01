import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Comment from './Comment';
import Delete from './Delete';
import Quote from './Quote';


function App() {

  const [data, setData] = useState([]);



  useEffect(()=>{
  async function dataFetch(){
    const data = await(await fetch(`/api/personajes`)).json();
      setData(data);
  }
    dataFetch();
  }, [])

  function Title(){
    return(
      <div>Harry Potter Fanboys</div>
    )
  }
 
  return (
    <>
    <div className='title'>
      <Title/>
    </div>
    <div className='box'>
      {data.map(data=>{
        return(
          <>

          <div className='personaje'>
            <div className='nombre'>Nombre: {data.nombre}</div>

            <div className='nombre'>Casa: {data.casa}</div>


            <div className='nombre'>Patronus: {data.patronus}</div>

            <div className='nombre'>Padre: {data.padre}</div>

            <div className='nombre'>Madre: {data.madre}</div>

            <div className='nombre'>Varita: {data.varita}</div>

            <div className='nombre'>Pareja: {data.pareja}</div>

          </div>

          </>
        )
      
      })}
    </div>
    <div className='commentSec'>
      <Comment/>
    </div>

    <div className='deleteSec'>
      <Delete/>
    </div>

    <div className='deleteSec'>
      <Quote/>
    </div>


    </>
  );
}

export default App;
