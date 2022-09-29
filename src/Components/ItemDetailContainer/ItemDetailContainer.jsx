import ItemDetail from "../ItemDetail/ItemDetail";
import { getClases } from "../../DB/db";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from '@mui/lab';

import "./ItemDetailContainer.css"

const ItemDetailContainer = () => {

    const [clases, setClases] = useState()
    const { id } = useParams()
    const { cargando, setCargando } = useState(true)

    useEffect(() => {
        getClases(1000).then(response => {
            setClases(response.find(res => res.id == id))
        }).finally(
            setCargando(false)
        )
    }, [])

    if (cargando) {
        return (
            <div>
                <LoadingButton />
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