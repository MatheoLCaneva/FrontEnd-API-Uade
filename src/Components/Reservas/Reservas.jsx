import { useState, useEffect, useContext } from "react";
import { TableCell, TableRow, Button, Table, TableHead, TextField, TableBody, InputAdornment, InputLabel, Modal, Box, OutlinedInput, Typography, IconButton, Stack } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ContextoAuth from "../../Context/AuthContext";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";


const Reservas = () => {
    const [contactos, setContactos] = useState([])
    const { user } = useContext(ContextoAuth)
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // console.log(user)

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

    console.log(contactos)

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

    const inputs = {
        marginBottom: '20px'
    }

    const handleSendComment = (e) => {
        e.preventDefault(e)
        console.log("pasoo",e.target[0].value)
        console.log(e)
        let newcomment;
    
        if (e.target.length === 16) {
            newcomment = {
                comentario: e.target.comentario,
                alumno: user.name + ' ' + user.apellido

                // _id: idUpdate,
                // tipo: e.target[0].value,
                // materia: e.target[2].value,
                // duracion: e.target[6].value,
                // frecuencia: e.target[8].value,
                // precio: e.target[10].value,
                // descripcion: e.target[12].value
            }
        } else {
            newcomment = {
                // _id: idUpdate,
                // tipo: e.target[0].value,
                // materia: e.target[2].value,
                // duracion: e.target[5].value,
                // frecuencia: e.target[7].value,
                // precio: e.target[9].value,
                // descripcion: e.target[11].value
            }
        }
    
        Object.keys(newcomment).forEach(key => {
            if (newcomment[key] === '') {
                delete newcomment[key];
            }
        });
    
        console.log(newcomment)
    
        // fetch('http://localhost:4000/classes/', {
        //     method: 'put',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(commentToUpdate)
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .then(
        //   response => response.json().then(response => {
        //     if (response.message === "Succesfully Created Class") {
        //       Swal.fire({
        //         title: 'Comentario aceptado',
        //         text: 'Ahora se visualiza el comentario en el foro',
        //         icon: 'success',
        //         timer: 3000,
        //         timerProgressBar: true,
    
        //       })
        //     }
        //     handleClose()
        //   })
        // )
    }

    return (

        <><Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={styles}>
                <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
                    Rechazar Comentario
                </Typography>
                <h4>Por favor describa el motivo de rechazo del comentario</h4>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    style={{ marginBottom: '10px' }}
                    label="Descripcion Rechazo"
                    multiline
                    rows={4} />
                <form onSubmit={handleSendComment}>
                    <Stack spacing={2} direction="row">
                        <Button style={{ display: "block" }} type='submit' variant="contained">Aceptar</Button>
                        <Button style={{ display: "block" }} variant="contained" onClick={handleClose}>Cancelar</Button>
                    </Stack>
                </form>
            </Box>
        </Modal><div style={{ width: '80%', margin: 'auto' }}>
                <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de reservas</Typography>


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
                            
                            <TableRow key={row._id}>
                                <Link to={`/clase/${row._id}`} className='link' style={{ cursor: "pointer" }}>
                                    <TableCell component="th" scope="row">
                                        {row._id}
                                    </TableCell>
                                </Link>
                                <TableCell align="center">{row.horario}</TableCell>
                                <TableCell align="center">{row.profesormail}</TableCell>
                                <TableCell align="center">{row.estado}</TableCell>

                                <TableCell align="center">
                                    <IconButton onClick={handleOpen} id={row._id}><CommentIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div></>
    )
}


export default Reservas