import { useState, useEffect, useContext } from "react";
import { TableCell, TableRow, Table, TableHead, TableBody, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done'
import ContextoAuth from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const ReservasProfesor = () => {
    const [contactos, setContactos] = useState([])
    const { user } = useContext(ContextoAuth)

    useEffect(() => {
        const obj = {
            profesormail: user.email
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

    const acceptSchedule = (e) => {
        e.preventDefault()
        const obj = {
            _id: e.target.parentElement.id,
            estado: 'Aceptada'
        }
        
        try {
            fetch('http://localhost:4000/contacts/', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(
                response => response.json().then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Reserva Aceptada',
                            text: 'La reserva fue aceptada, ya puede contactarse con su alumno!',
                            icon: 'success',
                            timer: 4000,
                            timerProgressBar: true,

                        })
                    }
                })
            )
        }
        catch (err) {
            alert(err)
        }
    }

    const deniedSchedule = () => {

    }


    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de Reservas</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Alumno</TableCell>
                            <TableCell align="center">Mail Contacto</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Estado</TableCell>
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
                                <TableCell align="center">{row.mailContacto}</TableCell>
                                <TableCell align="center">{row.telefonoContacto}</TableCell>
                                <TableCell align="center">{row.estado}</TableCell>
                                <TableCell align="center" id={row._id}><DoneIcon id={row._id} onClick={acceptSchedule} /></TableCell>
                                <TableCell id='eliminar' align="right" ><DeleteIcon id={row._id} onClick={deniedSchedule} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default ReservasProfesor