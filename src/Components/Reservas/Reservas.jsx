import { useState, useEffect, useContext } from "react";
import { TableCell, TableRow, Button, Table, TableHead, TextField, TableBody, Modal, Box, Typography, IconButton, Stack, Paper, TableContainer, Rating } from "@mui/material";
import ContextoAuth from "../../Context/AuthContext";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { calculateNewValue } from "@testing-library/user-event/dist/utils";


const Reservas = () => {
    const [contactos, setContactos] = useState([])
    const { user } = useContext(ContextoAuth)
    const [comentario, setComentario] = useState('')
    const [claseAcomentar, setClaseComentar] = useState({})
    const [ClaseEstado, setEstadoClase] = useState
    ({
        _id:'',
        alumno:'',
        estado:'',
        horario:'',
        telefonoContacto:'',
        mailContacto:'',
        valoracion:'',

    })
    const [claseValoracion, setValoracion] = useState
        (
            {}
        )
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [openFinalizar, setOpenFinalizar] = useState(false);
    const handleCloseFinalizar = () => setOpenFinalizar(false);

    const [openCancelar, setOpenCancelar] = useState(false);
    const handleCloseCancelar = () => setOpenCancelar(false);

    function handleOpen(row) {
        setClaseComentar(row)
        setOpen(true)
    }

    function handleOpenFinalizarClase(row) {
        setEstadoClase(row)
        setOpenFinalizar(true)
    }

    function handleOpenCancelarClase(row) {
        setEstadoClase(row);
        setOpenCancelar(true);
    }

    useEffect(() => {
        const obj = {
            mailContacto: user.email
        }
        try {
            fetch('http://localhost:4000/contacts/contactsByMail', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(
                response => response.json().then(response => setContactos(response.data.docs))
            )
        }
        catch (err) {
            alert(err)
        }
    }, [user.email])



    const styles = {
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


    const handleSendComment = (e) => {
        e.preventDefault(e)
        console.log(claseAcomentar)
        const nuevoComentario = {
            comentario: comentario,
            clase: claseAcomentar.claseId,
            usuario: claseAcomentar.mailContacto,
            profesor: claseAcomentar.profesormail,
            materia: claseAcomentar.materia,
            estado: false
        }

        try {
            fetch('http://localhost:4000/comments/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoComentario)
            }).then(
                response => response.json())
            handleClose()

        } catch (err) {
            console.log('Error', err)
        }

        finally {
            const obj = {
                tipo: 0,
                email: user.email,
                asunto: 'Comentario Enviado',
                name: user.name,
                apellido: user.apellido,
                mensaje: 'Gracias por su comentario, el mismo quedar?? registrado a espera de que el profesor asignado lo apruebe.'
            }
            fetch('http://localhost:4000/comments/sendMail/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ obj })
                }).then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        Swal.fire({
                            title: 'Clase Comentada,',
                            text: 'El comentario pas?? a revisi??n',
                            icon: 'success',
                        })
                            .then(res => {
                                if (res.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                    }
                })
        }

    }

    const handleupdatevaloracion = (newValue, row) => {
        claseValoracion._id = row.claseId
        claseValoracion.valoracion = newValue
        claseValoracion.email = row.mailContacto
        try {
            fetch('http://localhost:4000/classes/rating', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(claseValoracion)
            }).then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        Swal.fire({
                            title: 'Clase Valorada,',
                            text: 'Gracias por su valoraci??n',
                            icon: 'success',
                        })
                            .then(res => {
                                if (res.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                    }
                })
        } catch (err) {
            alert(err)
        }
    }

    const handleUpdateEstadoCancelado = (e) =>
    {
        e.preventDefault()
        ClaseEstado.estado = "Cancelada"
        try {
            fetch('http://localhost:4000/contacts/update', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ClaseEstado)
            }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Estado Actualizado,',
                        text: 'Gracias por actualizar',
                        icon: 'success',
                    })
                        .then(res => {
                            if (res.isConfirmed) {
                                window.location.reload()
                            }
                        })
                }
            })
            handleCloseCancelar();
        } catch (error) {
            alert(error)
        }
    }

    const handleUpdateEstadoFinalizado = (e) =>
    {
        e.preventDefault()
        ClaseEstado.estado = "Finalizada"
        try {
            fetch('http://localhost:4000/contacts/update', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ClaseEstado)
            }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Estado Actualizado,',
                        text: 'Gracias por actualizar',
                        icon: 'success',
                    })
                        .then(res => {
                            if (res.isConfirmed) {
                                window.location.reload()
                            }
                        })
                }
            })
            handleCloseFinalizar();
        } catch (error) {
            alert(error)
        }
    }




    return (

        <><Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={styles}>
                <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
                    Comentar Clase
                </Typography>
                <h4>Escriba debajo su comentario: </h4>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    style={{ marginBottom: '10px' }}
                    label="Descripcion"
                    multiline
                    rows={4}
                    onChange={(e) => setComentario(e.target.value)} />
                <form onSubmit={handleSendComment}>
                    <Stack spacing={2} direction="row">
                        <Button style={{ display: "block" }} type='submit' variant="contained">Aceptar</Button>
                        <Button style={{ display: "block" }} variant="contained" onClick={handleClose}>Cancelar</Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
        
        <Modal
            open={openFinalizar}
            onClose={handleCloseFinalizar}
            aria-labelledby="modal-modal-title1"
            aria-describedby="modal-modal-description1">
            <Box sx={styles}>
                <Typography style={{ marginBottom: '10px' }} id="modal-modal-title1" variant="h5" component="h2">
                   ??Desea Finalizar las clases particulares? </Typography>
                <form onSubmit={handleUpdateEstadoFinalizado}>
                    <Stack spacing={2} direction="row">
                        <Button style={{ display: "block" }} type='submit' variant="contained">Aceptar</Button>
                        <Button style={{ display: "block" }} variant="contained" onClick={handleCloseFinalizar}>Cancelar</Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
        
        <Modal
            open={openCancelar}
            onClose={handleCloseCancelar}
            aria-labelledby="modal-modal-title2"
            aria-describedby="modal-modal-description2">
            <Box sx={styles}>
                <Typography style={{ marginBottom: '10px' }} id="modal-modal-title2" variant="h5" component="h2">
                   ??Desea cancelar su solicitud a esta clase particular? </Typography>
                <form onSubmit={handleUpdateEstadoCancelado}>
                    <Stack spacing={2} direction="row">
                        <Button style={{ display: "block" }} type='submit' variant="contained">Aceptar</Button>
                        <Button style={{ display: "block" }} variant="contained" onClick={handleCloseCancelar}>Cancelar</Button>
                    </Stack>
                </form>
            </Box>
        </Modal>

        <div style={{ width: '80%', margin: 'auto' }}>
                <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de reservas</Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Clase</TableCell>
                                <TableCell align="center">Horario</TableCell>
                                <TableCell align="center">Mail Profesor</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Calificacion</TableCell>
                                <TableCell align="center">Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contactos.map(row => (

                                <TableRow key={row.claseId}>

                                    <TableCell component="th" scope="row">
                                        <Link to={`/clase/${row.claseId}`} className='link' style={{ cursor: "pointer" }}>
                                            {row.materia}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="center">{row.horario}</TableCell>
                                    <TableCell align="center">{row.profesormail}</TableCell>
                                    <TableCell align="center">{row.estado}</TableCell>

                                    {
                                        row.estado === "Aceptada" || row.estado === "Finalizada"
                                            ?
                                            <TableCell align="center">
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Rating name="rating" value={row.valoracion === undefined ? 0 : row.valoracion}
                                                        onChange={(e, newValue) => handleupdatevaloracion(newValue, row)}

                                                    />
                                                </Box>
                                            </TableCell>
                                            : <TableCell align="center">
                                            </TableCell>
                                    }
                                    <TableCell align="center">
                                    {
                                        row.estado === "Aceptada" || row.estado === "Finalizada"
                                            ?
                                            
                                                <IconButton onClick={(e) => handleOpen(row)} id={row.claseId}>
                                                    <CommentIcon />
                                                </IconButton>
                                            :<></>
                                    }
                                    {
                                        row.estado === "Aceptada"
                                        ?
                                            <IconButton onClick={(e,) => handleOpenFinalizarClase(row)}> <DoneAllIcon>

                                            </DoneAllIcon></IconButton>
                                        :<></>
                                    }
                                    {
                                        row.estado === "Solicitada"
                                        ?
                                        <IconButton
                                        onClick={(e) => handleOpenCancelarClase(row)}> 
                                        <ClearIcon></ClearIcon></IconButton>
                                        :<></>
                                    } 
                                     
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div></>
    )
}


export default Reservas