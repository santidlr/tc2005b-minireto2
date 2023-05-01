import { useEffect, useState } from "react";
import axios from "axios";

export function Comment(){


    const [data, setData] = useState({});

   function handleClick(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
   }
/*
   function handleSubmit(e){
    e.preventDefault();
    axios.post(`/api/comentarios`, data)
    fetch(`/api/comentarios`, {method:"POST",   body:data})
    .then(console.log("DONE"));
   }
*/
   function handleSubmit(e){
    e.preventDefault();
    axios.post(`/api/comentarios`, data).then((response) => {
        console.log(response.status, response.data.token);
      });
   }



    return(
        <> 
        <div className="box">
            <form onSubmit={(e)=> handleSubmit(e)}>

                                    <div>Comentarios</div>
                                    <div>
                                            <input type="text"
                                            id="comentario"
                                            value={data.comentario}
                                            placeholder="Añade un comentario"
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                <div className="botones">
                <button type="submit">
                    Publicar comentario
                </button>
                </div>
              </form>
            </div>
            </>
    )

}


export default Comment;