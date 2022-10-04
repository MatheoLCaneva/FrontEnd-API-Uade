import { useState, useEffect } from "react";
import { getProfesores, getClases } from "../DB/db";
import ItemList from "../Components/ItemList/ItemList";
import './ItemListContainer.css'
import Selector from "../Components/Selector/Selector";
import AutocompletarMaterias from "./AutocompletarMaterias";
import { Button } from "@mui/material";
const ItemListContainer = ({ mensaje }) => {
    const [clases, setClases] = useState([])

    useEffect(() => {
        getClases().then(response => {
            setClases(response)
        })
    }, [])



    return (
        <section>
            <h1 className="titulo" style={{ textAlign: "center", fontSize: "40px" }}>{mensaje}</h1>
            <div className="filtros">
                <div className="filtro-contenedor">
                    <div className="filtroMateria filtro">
                        <AutocompletarMaterias />
                    </div>
                    <div className="filtroTipo filtro">
                        <Selector variable={"Tipo"} variable1={"Individual"} variable2={"Grupal"} />
                    </div>
                    <div className="filtroFrecuencia filtro">
                        <Selector variable={"Frecuencia"} variable1={"Única"} variable2={"Semanal"} variable3={"Mensual"} />
                    </div>
                    <div className="filtroCalificacion filtro">
                    </div>
                    <Button style={{ marginLeft: "5px" }} variant="contained">Buscar</Button>

                </div>
            </div>

            <ItemList clases={clases} />
        </section>
    )

}

export default ItemListContainer