// import ApiService from "../../service/ApiService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import './Notificaciones.css'

const Notificaciones = () => {

    const notificaciones = [
        {
            id: 1, materia: "Matematica", nombre: "Agustin Pizza", comentario: "Gracias por tanto y perdón por el 1 que me saque"
        },
        {
            id: 2, materia: "Física", nombre: "Martin Burga", comentario: "Super recomendado! Aprobé con 10!"
        },
        {
            id: 3, materia: "Matematica", nombre: "Sergio Sergin", comentario: "Recomiendo!"
        }
    ]


    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Typography variant="h3" className='titulo' style={{fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0"}}>Notificaciones</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Materia</TableCell>
                        <TableCell align="right">Comentario</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notificaciones.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.nombre}</TableCell>
                            <TableCell align="right">{row.materia}</TableCell>
                            <TableCell align="right">{row.comentario}</TableCell>
                            <TableCell align="right" onClick={() => this.editUser(row.id)}><CheckIcon /></TableCell>
                            <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}

export default Notificaciones;