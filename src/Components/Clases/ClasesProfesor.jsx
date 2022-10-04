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
import { useState } from 'react';
import AutocompletarMaterias from '../../Container/AutocompletarMaterias';

const ClasesProfesor = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ClasesCreadas = [
        {
            id: "1", materia: "Matematica", frecuencia: "Semanal", duracion: "1h", costo: "800", nombre: "Enrique"
        },
        {
            id: "2", materia: "Geografía", frecuencia: "Unica", duracion: "1.30hs", costo: "600", nombre: "Martin"
        },
        {
            id: "3", materia: "Física", frecuencia: "Mensual", duracion: "1h", costo: "800", nombre: "Enrique"
        },
        {
            id: "4", materia: "Biología", frecuencia: "Semanal", duracion: "2hs", costo: "900", nombre: "Fernando"
        },
        {
            id: "5", materia: "Algebra", frecuencia: "Unica", duracion: "1h", costo: "1000", nombre: "Luis"
        }
    ]

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
                    <TextField sx={inputs} id="outlined-basic" label="Nombre" variant="outlined" />
                    <AutocompletarMaterias sx={inputs} />
                    <TextField sx={inputs} id="outlined-basic" label="Duracion" variant="outlined" />
                    <TextField sx={inputs} id="outlined-basic" label="Frecuencia" variant="outlined" />
                    <TextField sx={inputs} id="outlined-basic" label="Costo" variant="outlined" />
                    <Button style={{ display: "block" }} variant="contained">Contratar</Button>

                </Box>
            </Modal>
            <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Detalle de clases</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Nueva Clase
            </Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Materia</TableCell>
                        <TableCell align="right">Duracion</TableCell>
                        <TableCell align="right">Frecuencia</TableCell>
                        <TableCell align="right">Costo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ClasesCreadas.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.nombre}</TableCell>
                            <TableCell align="right">{row.materia}</TableCell>
                            <TableCell align="right">{row.duracion}</TableCell>
                            <TableCell align="right">{row.frecuencia}</TableCell>
                            <TableCell align="right">{row.costo}</TableCell>

                            <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                            <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}


export default ClasesProfesor;