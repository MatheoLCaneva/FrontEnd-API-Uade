// import ApiService from "../../service/ApiService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Modal, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AutocompletarMaterias from '../../Container/AutocompletarMaterias';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ContextoAuth from '../../Context/AuthContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './Clases.css'
import Paper from "@mui/material/Paper";
import TableContainer from '@mui/material/TableContainer';


const ClasesProfesor = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [idUpdate, setidUpdate] = useState('')

    const [openUpdate, setOpenUpdate] = useState(false);
    

    const handleOpenUpdate = (e) => {
        let id = e.target.parentElement.id
        setidUpdate(id)
        setOpenUpdate(true)
    };
    const handleCloseUpdate = () => setOpenUpdate(false);

    const [ClasesProfesor, setClasesProfesor] = useState([])
    const { user } = useContext(ContextoAuth)

    // console.log(user)

    useEffect(() => {
        const obj = {
            profesormail: user.email
        }
        console.log(obj)
        try {
            fetch('http://localhost:4000/classes/classById', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(
                response => response.json().then(response => setClasesProfesor(response.data.docs))
            )
        }
        catch (err) {
            alert(err)
        }
    }, [user.email])


    const handleCrearClase = (e) => {
        e.preventDefault()
        let autoCompletar = document.querySelector('#autoCompletar').value
        const clase = {
            materia: autoCompletar,
            tipo: e.target.nombre.value,
            frecuencia: e.target.frecuencia.value,
            duracion: e.target.duracion.value + 'hs',
            precio: e.target.precio.value,
            descripcion: e.target.descripcion.value,
            profesor: user,
            profesormail: user.email
        }

        try {
            fetch('http://localhost:4000/classes/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clase)
            }).then(
                response => response.json().then(response => {
                    if (response.message === "Succesfully Created Class") {
                        Swal.fire({
                            title: 'Clase Creada',
                            text: 'Su clase se creo con éxito',
                            icon: 'success',
                            timer: 3000,
                            timerProgressBar: true,

                        })
                    }
                    handleClose()
                })
            )

        } catch (err) {
            console.log('Error', err)
        }
    }
    const handleUpdateClass = (e) => {
        e.preventDefault(e)
        console.log(e.target.length)
        console.log(e)
        let nuevaClase;

        if (e.target.length === 16) {
            nuevaClase = {
                _id: idUpdate,
                tipo: e.target[0].value,
                materia: e.target[2].value,
                duracion: e.target[6].value,
                frecuencia: e.target[8].value,
                precio: e.target[10].value,
                descripcion: e.target[12].value
            }
        } else {
            nuevaClase = {
                _id: idUpdate,
                tipo: e.target[0].value,
                materia: e.target[2].value,
                duracion: e.target[5].value,
                frecuencia: e.target[7].value,
                precio: e.target[9].value,
                descripcion: e.target[11].value
            }
        }

        Object.keys(nuevaClase).forEach(key => {
            if (nuevaClase[key] === '') {
                delete nuevaClase[key];
            }
        });

        console.log(nuevaClase)

        fetch('http://localhost:4000/classes/', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaClase)
        })
            .then(response => response.json())
            .then(data => console.log(data))


    }

    const deleteClass = (e) => {
        const obj = {
            _id: e.target.parentElement.id
        }

        try {
            fetch('http://localhost:4000/classes/', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(
                response => response.json().then(data => console.log(data))
            )
        }
        catch (err) {
            alert(err)
        }
    }

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

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styles}>
                    <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
                        Crear Clase
                    </Typography>
                    <form onSubmit={handleCrearClase} >
                        <TextField sx={inputs} id="outlined-basic" name='nombre' label="Tipo" variant="outlined" />
                        <AutocompletarMaterias sx={inputs} />
                        <TextField sx={inputs} id="outlined-basic" name='duracion' label="Duracion" variant="outlined" />
                        <TextField sx={inputs} id="outlined-basic" name='frecuencia' label="Frecuencia" variant="outlined" />
                        <InputLabel htmlFor="outlined-adornment-amount">Precio por hora</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Precio"
                            name='precio'
                            sx={inputs}
                        />
                        <TextField sx={inputs} id="outlined-basic" name='descripcion' label="Descripcion" variant="outlined" multiline={true} fullWidth />
                        <Button style={{ display: "block" }} type='submit' variant="contained">Contratar</Button>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styles}>
                    <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
                        Actualizar Clase
                    </Typography>
                    <form onSubmit={handleUpdateClass} >
                        <TextField sx={inputs} id="outlined-basic" name='nombre' label='Tipo' variant="outlined" />
                        <AutocompletarMaterias sx={inputs} />
                        <TextField sx={inputs} id="outlined-basic" name='duracion' label="Duracion" variant="outlined" />
                        <TextField sx={inputs} id="outlined-basic" name='frecuencia' label="Frecuencia" variant="outlined" />
                        <InputLabel htmlFor="outlined-adornment-amount">Precio por hora</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Precio"
                            name='precio'
                            sx={inputs}
                        />
                        <TextField sx={inputs} id="outlined-basic" name='descripcion' label="Descripcion" variant="outlined" multiline={true} fullWidth />
                        <Button style={{ display: "block" }} type='submit' variant="contained">Actualizar</Button>
                    </form>
                </Box>
            </Modal>
            <Typography variant={{ xs: 'h3', sm: 'h2' }} style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de clases</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Nueva Clase
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Materia</TableCell>
                            <TableCell align="right">Duracion</TableCell>
                            <TableCell align="right">Frecuencia</TableCell>
                            <TableCell align="right">Costo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ClasesProfesor.map(row => (
                            <TableRow key={row._id}>
                                <Link to={`/clase/${row._id}`} className='link' style={{ cursor: "pointer" }}>
                                    <TableCell component="th" scope="row">
                                        {row._id}
                                    </TableCell>
                                </Link>
                                <TableCell align="right">{row.tipo}</TableCell>
                                <TableCell align="right">{row.materia}</TableCell>
                                <TableCell align="right">{row.duracion}</TableCell>
                                <TableCell align="right">{row.frecuencia}</TableCell>
                                <TableCell align="right">${row.precio}</TableCell>

                                <TableCell align="right" className={row.tipo} id={row._id}><CreateIcon id={row._id} className={row.tipo} onClick={handleOpenUpdate} /></TableCell>
                                <TableCell id='eliminar' align="right" ><DeleteIcon id={row._id} onClick={deleteClass} /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div >
    );
}


export default ClasesProfesor;