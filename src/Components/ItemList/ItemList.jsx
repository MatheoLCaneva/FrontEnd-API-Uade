import React from "react"
import Item from "../Item/Item"


const ItemList = ({clases}) => {
    console.log(clases, 'clases')
    return (
        <ul style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }} className="listado">
            {clases.map(clase => <Item key={clase._id} {...clase}/>)}
        </ul>
    )
}

export default ItemList