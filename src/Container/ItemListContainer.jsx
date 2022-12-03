import { useState, useEffect } from "react";
import ItemList from "../Components/ItemList/ItemList";
import { styled, alpha } from '@mui/material/styles';
import './ItemListContainer.css'
import Selector from "../Components/Selector/Selector";
import AutocompletarMaterias from "./AutocompletarMaterias";
import { Button, Divider, Menu } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));



const ItemListContainer = ({ mensaje }) => {
    const [clases, setClases] = useState([])
    const [filtros, setFiltros] = useState({})
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
        let autoCompletar = document.querySelector('#autoCompletarFiltro').value
        if (autoCompletar === '') { autoCompletar = undefined }
        let filtroTipo = document.querySelector('#selectorTipo').firstChild.data
        let filtroFrecuencia = document.querySelector('#selectorFrecuencia').firstChild.data
        const obj = {
            materia: autoCompletar,
            tipo: filtroTipo,
            frecuencia: filtroFrecuencia
        }
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});

        setFiltros(obj)
    }

    const handleFiltroResponsive = (event) => {
        event.preventDefault()
        let autoCompletar = document.querySelector('#autoCompletarFiltroResponsive').value
        if (autoCompletar === '') { autoCompletar = undefined }
        let filtroTipo = document.querySelector('#selectorTipoResponsive').firstChild.data
        let filtroFrecuencia = document.querySelector('#selectorFrecuenciaResponsive').firstChild.data
        console.log(filtroTipo)
        console.log(filtroFrecuencia)
        const obj = {
            materia: autoCompletar,
            tipo: filtroTipo,
            frecuencia: filtroFrecuencia
        }
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});

        setFiltros(obj)
    }


    return (

        <section className="sectionClasses">
            <h1 className="titulo" style={{ textAlign: "center", fontSize: "40px" }}>{mensaje}</h1>
            <div className="listadoFiltro">
                <div className="filtros">

                    <div className="filtroResponsive">
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Filtros
                        </Button>

                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <form className="filtros-form" onSubmit={handleFiltroResponsive}>
                                <div className="filtroMateria filtro">
                                    <AutocompletarMaterias idComponente={'autoCompletarFiltroResponsive'} nombresMaterias={nombresMateria} />
                                </div>
                                <div className="filtroTipo filtro">
                                    <Selector idSelector={'selectorTipoResponsive'} variable={"Tipo"} variable1={"Individual"} variable2={"Grupal"}/>
                                </div>
                                <div className="filtroFrecuencia filtro">
                                    <Selector idSelector={'selectorFrecuenciaResponsive'} variable={"Frecuencia"} variable1={"Unica"} variable2={"Semanal"} variable3={"Mensual"} />
                                </div>
                                <div className="filtroCalificacion filtro">
                                </div>
                                <Button className="btnBuscar btnBuscarResponsive" type="submit" variant="contained">Buscar</Button>
                            </form>
                        </StyledMenu>

                    </div>

                    <form className="filtros-form" onSubmit={handleFiltro}>
                        <div className="filtro-contenedor">
                            <h3 className="filtro">Filtros</h3>
                            <div className="filtroMateria filtro">
                                <AutocompletarMaterias idComponente={'autoCompletarFiltro'} nombresMaterias={nombresMateria} />
                            </div>
                            <div className="filtroTipo filtro">
                                <Selector idSelector={'selectorTipo'} variable={"Tipo"} variable1={"Individual"} variable2={"Grupal"} ID={'filtroTipo'} />
                            </div>
                            <div className="filtroFrecuencia filtro">
                                <Selector idSelector={'selectorFrecuencia'} variable={"Frecuencia"} variable1={"Unica"} variable2={"Semanal"} variable3={"Mensual"} ID={'filtroFrecuencia'} />
                            </div>
                            <div className="filtroCalificacion filtro">
                            </div>
                            <Button className="btnBuscar" type="submit" variant="contained">Buscar</Button>
                        </div>
                    </form>
                </div>
                <ItemList clases={clases} />
            </div>


        </section >
    )

}

export default ItemListContainer