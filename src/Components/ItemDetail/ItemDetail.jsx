import './ItemDetail.css'


const ItemDetail = ({ id, nombre, apellido, precio, materia, tipo, frecuencia, duracion, img, descripcionClase, descripcionProfesor }) => {
    return (
        <div style={{ display: "flex" }}>
            <div>
                <div className="producto">
                    <div className="producto-info">
                        <h2>{descripcionClase}</h2>
                    </div>
                </div>
                <div className="acerca-profesor producto">
                    <h2>Acerca de {nombre} {apellido}</h2>
                    <p>{descripcionProfesor}</p>
                </div></div>

            <div className='profesor'>
                <div className='card-profesor'>
                    <div className="datos-profesor">
                        <div className="imagen">
                            <img style={{ maxWidth: "100%" }} src={img} alt="" />
                        </div>
                        <div className="nombre">
                            <p>{nombre} {apellido}</p>
                        </div>
                        <div className="info">
                            <ul className='info-lista'>
                                <li>Precio por hora:  ${precio}</li>
                                <li>Tipo de clase: {tipo}</li>
                                <li>Frecuencia: {frecuencia}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ItemDetail
