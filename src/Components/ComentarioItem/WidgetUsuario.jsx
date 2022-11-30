import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";


const WidgetUsuario = () => {

    return (
        <div style={{ display: "inline-block", marginRight: ".5rem" }}>
            <Icon style={{ cursor: "pointer" }} icon={faCircleUser} />
        </div>
    )
}

export default WidgetUsuario