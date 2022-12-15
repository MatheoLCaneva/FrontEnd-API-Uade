import { useState, useEffect, useContext } from "react";
import { TableCell, TableRow, Button, Table, TableHead, TextField, TableBody, Modal, Box, Typography, IconButton, Stack, Paper, TableContainer } from "@mui/material";
import ContextoAuth from "../../Context/AuthContext";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Reservas = () => {
    const [contactos, setContactos] = useState([])
    const { user } = useContext(ContextoAuth)
    const [comentario, setComentario] = useState('')
    const [claseAcomentar, setClaseComentar] = useState({})
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    function handleOpen(row) {
        setClaseComentar(row)
        setOpen(true)
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
            estado: false
        }

        try {
            fetch('http://localhost:4000/comments/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoComentario)
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
        </Modal><div style={{ width: '80%', margin: 'auto' }}>
                <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de reservas</Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id de Clase</TableCell>
                                <TableCell align="center">Horario</TableCell>
                                <TableCell align="center">Mail Profesor</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contactos.map(row => (

                                <TableRow key={row.claseId}>

                                    <TableCell component="th" scope="row">
                                        <Link to={`/clase/${row.claseId}`} className='link' style={{ cursor: "pointer" }}>
                                            {row.claseId}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="center">{row.horario}</TableCell>
                                    <TableCell align="center">{row.profesormail}</TableCell>
                                    <TableCell align="center">{row.estado}</TableCell>

                                    {
                                        row.estado === "Aceptada"
                                            ?
                                            <TableCell align="center">
                                                <IconButton onClick={(e) => handleOpen(row)} id={row.claseId}><CommentIcon /></IconButton>
                                            </TableCell>
                                            : <TableCell align="center">
                                                <h5>Podrá comentar una vez aceptada la clase</h5>
                                            </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div></>
    )
}


export default Reservas