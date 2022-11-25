import { useState, useEffect, useContext } from "react";
import { TableCell, TableRow, Button, Table, TableHead, TextField, TableBody, InputAdornment, InputLabel, Modal, Box, OutlinedInput, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ContextoAuth from "../../Context/AuthContext";
import { Link } from "react-router-dom";
const Reservas = () => {
    const [contactos, setContactos] = useState([])
    const { user } = useContext(ContextoAuth)

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
    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de reservas</Typography>


            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id de Clase</TableCell>
                        <TableCell align="center">Horario</TableCell>
                        <TableCell align="center">Mail Profesor</TableCell>
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
                            <TableCell align="center">{row.profesormail}</TableCell>
                            <TableCell align="center">{row.estado}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div >
    )
}

export default Reservas