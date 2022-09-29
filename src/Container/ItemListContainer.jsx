import { useState, useEffect } from "react";
import { getProfesores, getClases } from "../DB/db";
import ItemList from "../Components/ItemList/ItemList";

const ItemListContainer = ({mensaje}) => {
    const [clases, setClases] = useState([])
    const [profesores, setProfesores] = useState([])



    useEffect(() => {
        getClases().then(response => {
            setClases(response)
        })
    },[])

    return (
        <section>
            <h1 className="titulo" style={{textAlign: "center", fontSize: "40px"}}>{mensaje}</h1>
            <ItemList clases={clases} profesores={profesores}/>
        </section>
    )

}

export default ItemListContainer