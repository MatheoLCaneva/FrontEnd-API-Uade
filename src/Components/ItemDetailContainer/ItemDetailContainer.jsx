import ItemDetail from "../ItemDetail/ItemDetail";
import { getClases } from "../../DB/db";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
import CircularIndeterminate from "../Loader/Loader";

import "./ItemDetailContainer.css"

const ItemDetailContainer = () => {

    const [clases, setClases] = useState()
    const { id } = useParams()
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        setCargando(true)
        getClases(2000).then(response => {
            setClases(response.find(res => res.id == id))
        }).catch(error => {
            console.log(error)
        }).finally(
            setTimeout(() => {
                setCargando(false)
            }, 2000)
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