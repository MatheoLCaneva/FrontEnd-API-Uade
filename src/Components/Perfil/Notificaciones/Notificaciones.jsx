// import ApiService from "../../service/ApiService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import './Notificaciones.css'

const Notificaciones = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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


    function componentDidMount() {
        this.reloadUserList();
    }

    function reloadUserList() {
        // ApiService.fetchUsers()
        //     .then((res) => {
        //         this.setState({users: res.data.result})
        //     });
    }

    function deleteUser(userId) {
        // ApiService.deleteUser(userId)
        //    .then(res => {
        //        this.setState({message : 'User deleted successfully.'});
        //        this.setState({users: this.state.users.filter(user => user.id !== userId)});
        //    })
    }

    function editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    function addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

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



const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default Notificaciones;