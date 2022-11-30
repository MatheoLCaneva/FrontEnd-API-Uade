import './ItemDetail.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getComentarios } from '../../DB/db';
import Comentario from '../Comentario/Comentario';
import ContextoAuth from '../../Context/AuthContext';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ComentarioItem from '../ComentarioItem/ComentarioItem';

const ItemDetail = ({ id, profesor, precio, tipo, frecuencia, duracion, img, descripcion }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(dayjs('2022-08-18T00:00:00'));
    const [comentarios, setComentarios] = useState([])
    const [valuecomentario, setvalue] = useState([])
    const nav = useNavigate()
    const { _id } = useParams()

    const { user, isLogged } = useContext(ContextoAuth)

    const handleChange = (newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        try {
            fetch('http://localhost:4000/comments/', {
                method: 'get'
            })
                .then(
                    response => response.json()
                )
                .then(
                    data => {
                        setComentarios(data.data.docs.filter(clase => clase.clase === _id && clase.estado))
                        // console.log(comentarios)
                    }
                )
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    console.log(comentarios)

    const handleCrearComentario = (e) => {
        e.preventDefault()
        console.log(e)
        const comentario = {
            clase: _id,
            usuario: user.email,
            comentario: e.target[0].value,
            estado: false,
            profesor: profesor.email
        }
        console.log("claseee", comentario)
        try {
            fetch('http://localhost:4000/comments/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comentario)
            }).then(
                response => response.json())
                .then(response => {
                    if (response.status === 201) {
                        Swal.fire({
                            title: 'Comentario enviado,',
                            text: 'Su comentario queda pendiente de revision',
                            icon: 'success',
                        })
                            .then(
                                response => {
                                    if (response.isConfirmed) {
                                        window.location.reload()
                                    }
                                }
                            )
                    }
                    handleClose()
                })


        } catch (err) {
            console.log('Error', err)
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const inputs = {
        marginBottom: '20px'
    }

    const handleContact = async (event) => {
        event.preventDefault()
        const contacto = {
            profesormail: profesor.email,
            alumno: user.name + ' ' + user.apellido,
            telefonoContacto: user.tel,
            mailContacto: user.email,
            horario: `${value.$H}:${value.$m}`,
            claseId: _id
        }

        try {
            await fetch('http://localhost:4000/contacts/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contacto)
            })
                .then(
                    response => response.json()
                )
                .then(
                    data => {
                        if (data.status === 201) {
                            Swal.fire({
                                title: 'Comentario Enviado',
                                text: 'Su solicitud fue enviada con éxito',
                                icon: 'success',
                                timer: 3000,
                                timerProgressBar: true,

                            })
                        }
                    }
                )
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }

    if (isLogged) {
        return (
            <div className='descripcionClase' style={{ display: "flex" }}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
                            Contactar Profesor
                        </Typography>
                        <form onSubmit={handleContact}>
                            <TextField required disabled sx={inputs} value={user.name} name='nombre' id="outlined-basic" label="Nombre" variant="outlined" />
                            <TextField required disabled sx={inputs} value='Caneva' id="outlined-basic" name='apellido' label="Apellido" variant="outlined" />
                            <TextField required disabled sx={inputs} value={user.email} id="outlined-basic" nombre='email' label="Mail" variant="outlined" />
                            <TextField required disabled sx={inputs} value={user.tel} id="outlined-basic" name='tel' label="Teléfono" variant="outlined" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Horario"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <Button type='submit' style={{ display: "block" }} variant="contained">Contratar</Button>
                        </form>
                    </Box>
                </Modal>
                <div>
                    <div className="producto">
                        <div className="producto-info">
                            <h2>{descripcion}</h2>
                        </div>
                    </div>
                    <div className="acerca-profesor producto">
                        <h2>Acerca de {profesor.name}</h2>
                        <p>{profesor.descripcionProfesor}</p>
                    </div>
                    <div className="producto comentarios">
                        <h2>Comentarios</h2>
                        <form onSubmit={handleCrearComentario} >
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                style={{ marginBottom: '10px' }}
                                label="Comentario"
                                multiline
                                rows={4}
                            />
                            {
                                isLogged
                                    ? <Button size='medium' className='btnContacto' type='submit' variant="contained">Comentar</Button> : <></>
                            }
                        </form>
                        <ul className="listado">
                            {comentarios.map(comentario => <ComentarioItem key={comentario._id} {...comentario} />)}
                        </ul>
                    </div>
                </div>

                <div className='profesor'>
                    <div className='card-profesor'>
                        <div className="datos-profesor">
                            <div className="imagen imagenProfesor">
                                <img className='imgProfe' style={{ maxWidth: "60%" }} src={profesor.imgUser} alt="imagen profesor" />
                            </div>
                            <div className="nombre">
                                <p>{profesor.nombre}</p>
                            </div>
                            <div className="info">
                                <ul className='info-lista'>
                                    <li>Precio por hora:  ${precio}</li>
                                    <li>Tipo de clase: {tipo}</li>
                                    <li>Frecuencia: {frecuencia}</li>
                                </ul>
                                <div className="contacto">
                                    {
                                        isLogged
                                            ? <Button size='medium' className='btnContacto' variant="contained" onClick={handleOpen}>Contactar Profe</Button>
                                            : <Link style={{ textDecoration: 'none' }} to={'/login'}> <Button size='medium' className='btnContacto' variant="contained">Iniciar Sesion</Button></Link>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    else {

    }

    return (
        <div className='descripcionClase' style={{ display: "flex" }}>
            <div>
                <div className="producto">
                    <div className="producto-info">
                        <h2>{descripcion}</h2>
                    </div>
                </div>
                <div className="acerca-profesor producto">
                    <h2>Acerca de {profesor.name}</h2>
                    <p>{profesor.descripcionProfesor}</p>
                </div>
                <div className="producto comentarios">
                    <h2>Comentarios</h2>
                    <ul className="listado">
                        {comentarios.map(comentario => <ComentarioItem key={comentario._id} {...comentario} />)}
                    </ul>
                </div>
            </div>

            <div className='profesor'>
                <div className='card-profesor'>
                    <div className="datos-profesor">
                        <div className="imagen imagenProfesor">
                            <img className='imgProfe' style={{ maxWidth: "60%" }} src={profesor.imgUser} alt="" />
                        </div>
                        <div className="nombre">
                            <p>{profesor.nombre}</p>
                        </div>
                        <div className="info">
                            <ul className='info-lista'>
                                <li>Precio por hora:  ${precio}</li>
                                <li>Tipo de clase: {tipo}</li>
                                <li>Frecuencia: {frecuencia}</li>
                            </ul>
                            <div className="contacto">
                                {
                                    isLogged
                                        ? <Button size='medium' className='btnContacto' variant="contained" onClick={handleOpen}>Contactar Profe</Button>
                                        : <Link style={{ textDecoration: 'none' }} to={'/login'}> <Button size='medium' className='btnContacto' variant="contained">Iniciar Sesion</Button></Link>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default ItemDetail
