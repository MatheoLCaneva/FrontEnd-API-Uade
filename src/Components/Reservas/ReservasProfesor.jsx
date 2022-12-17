import { useState, useEffect, useContext } from "react";
import { TableCell, TableRow, Table, TableHead, TableBody, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'
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
        console.log("CONTACTOSS", contactos)
        try {
            fetch('http://localhost:4000/contacts/update', {
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
                            .then(res => {
                                if (res.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                    }
                })
            )
        }
        catch (err) {
            alert(err)
        }
    }

    const endSchedule = (e) => {
        e.preventDefault()
        const obj = {
            _id: e.target.parentElement.id,
            estado: 'Finalizada'
        }

        try {
            fetch('http://localhost:4000/contacts/end', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(
                response => response.json().then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Clase Finalizada',
                            text: 'La Clase fue Finalizada!',
                            icon: 'success',
                            timer: 4000,
                            timerProgressBar: true,

                        })
                            .then(res => {
                                if (res.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                    }
                })
            )
        }
        catch (err) {
            alert(err)
        }
    }

    const deniedSchedule = async (e) => {
        const obj = {
            _id: e.target.parentElement.id,
            estado: 'Cancelada'
        }
        try {
           await fetch('http://localhost:4000/contacts/update', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(
                response => response.json().then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Reserva Denegada',
                            text: 'La reserva fue denegada con éxito',
                            icon: 'success',
                            timer: 4000,
                            timerProgressBar: true,

                        })
                            .then(res => {
                                if (res.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                    }
                })
            )
        }
        catch (err) {
            alert(err)
        }
    }


    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de Reservas</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Materia</TableCell>
                            <TableCell align="center">Horario</TableCell>
                            <TableCell align="center">Mail Contacto</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contactos.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    <Link to={`/clase/${row.claseId}`} className='link' style={{ cursor: "pointer" }}>
                                        {row.alumno}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{row.horario}</TableCell>
                                <TableCell align="center">{row.mailContacto}</TableCell>
                                <TableCell align="center">{row.telefonoContacto}</TableCell>
                                <TableCell align="center">{row.estado}</TableCell>

                                {
                                    row.estado === "Aceptada" || row.estado === "Cancelada" || row.estado === "Finalizada"
                                        ? null
                                        :
                                        <TableCell align="center" id={row._id}><DoneIcon style={{ cursor: "pointer" }} id={row._id} onClick={acceptSchedule} /></TableCell>

                                }
                                {
                                    row.estado === "Aceptada" || row.estado === "Cancelada" || row.estado === "Finalizada"
                                        ? null
                                        :
                                        <TableCell id='eliminar' align="right" ><DeleteIcon style={{ cursor: "pointer" }} id={row._id} onClick={deniedSchedule} /></TableCell>
                                }

                                {
                                    row.estado === "Aceptada"
                                        ?
                                        <TableCell align="center" id={row._id}><DoneAllIcon style={{ cursor: "pointer" }} id={row._id} onClick={endSchedule} /></TableCell>
                                        :
                                        null

                                }



                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default ReservasProfesor