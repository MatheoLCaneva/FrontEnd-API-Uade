import ItemDetail from "../ItemDetail/ItemDetail";
import { getClases } from "../../DB/db";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../Loader/Loader";

import "./ItemDetailContainer.css"

const ItemDetailContainer = () => {

    const [clases, setClases] = useState()
    const { _id } = useParams()
    const [cargando, setCargando] = useState(true)

    console.log(_id)

    useEffect(() => {
        setCargando(true)
        fetch('http://localhost:4000/classes/classById', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: _id })
        }).then(
            response => response.json()
        ).then(
            function (data) {
                setClases(data.data.docs[0])
                console.log(clases)
                setCargando(false)
            }
        )
    }, [])

    if (cargando) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        )
    }

    return (
        <section className='container'>
            <ItemDetail {...clases} />
        </section>
    )

}

export default ItemDetailContainer