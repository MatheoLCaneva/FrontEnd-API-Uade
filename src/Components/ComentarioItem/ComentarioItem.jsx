import './ComentarioItem.css'
import WidgetUsuario from './WidgetUsuario';


const ComentarioItem = ({ comentario, usuario }) => {

    return (
        <div className="container">
            <div className="usuario-info">
                <WidgetUsuario/>
                <p>{usuario}</p>
            </div>

            <p>{comentario}</p>
        </div>

    )
}

export default ComentarioItem