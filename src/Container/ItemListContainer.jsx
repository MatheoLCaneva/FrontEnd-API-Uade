import { useState, useEffect } from "react";
import ItemList from "../Components/ItemList/ItemList";
import './ItemListContainer.css'
import Selector from "../Components/Selector/Selector";
import AutocompletarMaterias from "./AutocompletarMaterias";
import { Button } from "@mui/material";
const ItemListContainer = ({ mensaje }) => {
    const [clases, setClases] = useState([])
    const [filtros, setFiltros] = useState({})

    useEffect(() => {

        try {
            fetch('http://localhost:4000/classes/classById', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filtros)
            }).then(
                response => response.json()
            ).then(data => setClases(data.data.docs))
        }
        catch (err) {
            console.log('Error', err)
        }
    }, [filtros])

    const nombresMateria = clases.map(clase => clase.materia)

    const handleFiltro = (event) => {
        event.preventDefault()
        let autoCompletar = document.querySelector('#autoCompletar').value
        if (autoCompletar === ''){autoCompletar = undefined}
        let filtroTipo = document.querySelector('#filtroTipo').firstChild.data
        let filtroFrecuencia = document.querySelector('#filtroFrecuencia').firstChild.data
        const obj = {
            materia: autoCompletar,
            tipo: filtroTipo,
            frecuencia: filtroFrecuencia
        }
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
        console.log(obj)
        setFiltros(obj)
    }


    return (
        <section className="sectionClasses">
            <h1 className="titulo" style={{ textAlign: "center", fontSize: "40px" }}>{mensaje}</h1>
            <div className="filtros">
                <form onSubmit={handleFiltro}>
                    <div className="filtro-contenedor">
                        <div className="filtroMateria filtro">
                            <AutocompletarMaterias nombresMaterias={nombresMateria} />
                        </div>
                        <div className="filtroTipo filtro">
                            <Selector variable={"Tipo"} variable1={"Individual"} variable2={"Grupal"} ID={'filtroTipo'} />
                        </div>
                        <div className="filtroFrecuencia filtro">
                            <Selector variable={"Frecuencia"} variable1={"Única"} variable2={"Semanal"} variable3={"Mensual"} ID={'filtroFrecuencia'} />
                        </div>
                        <div className="filtroCalificacion filtro">
                        </div>
                        <Button type="submit" style={{ marginLeft: "5px" }} variant="contained">Buscar</Button>
                    </div>
                </form>
            </div>

            <ItemList clases={clases} />
        </section>
    )

}

export default ItemListContainer