import axios from "axios";
import { useEffect, useState } from "react";



export function Delete(){

    const [data, setData] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);

    const [comment, setComment] = useState({});





    function handleClick(e, id){
        axios.delete(`/api/deleteComentario/${id}`)
        .then(() => this.setState({ status: 'Delete successful' }));
    }


    



    

    useEffect(()=>{
        async function dataFetch(){
          const data = await(await fetch(`/api/comentarios/`)).json();
            setDataTemp(data);
        }
          dataFetch();
        }, [])
        
    return(
        <div>
            {dataTemp.map((dataTemp, index)=>{
                return(
                    <>
                        <div>{dataTemp.comentario}</div>
                        
                        <button onClick={e=>handleClick(e, dataTemp.id)}>Delete</button>
                    </>
                )
            })}
        </div>

    )


}


export default Delete;