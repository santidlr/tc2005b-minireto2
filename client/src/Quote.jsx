import axios from "axios";
import { useEffect, useState } from "react";



export function Quote(){

    const [data, setData] = useState({});
    const [dataTemp, setDataTemp] = useState({});



    function handleButton(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value;
        setData(newdata)
        console.log(newdata)
       }



    function handleSubmit(e){
        e.preventDefault();
        axios.put(`/api/Quote/${dataTemp.id}` , data)
       }
    




    useEffect(()=>{
        async function dataFetch(){
          const data = await(await fetch(`/api/Quote/`)).json();
            setDataTemp(data);
        }
          dataFetch();
        }, [])
        
    return(
        <div>

                        <div>{dataTemp.quote}</div>
                        <form onSubmit={(e)=> handleSubmit(e)}>
                                    <div>
                                            <input type="text"
                                            id="quote"
                                            value={data.quote}
                                            placeholder="Edita Quote"
                                            onChange={e => handleButton(e)}
                                            />
                                    </div>
                            <button type="submit">Edit</button>
                        </form>
                        
        </div>

    )

}


export default Quote;