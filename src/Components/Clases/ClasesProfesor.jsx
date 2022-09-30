import React, { Component } from 'react'
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

class ClasesProfesor extends Component {

    ClasesCreadas = [
        {
            id: "1", materia: "Matematica", frecuencia: "Semanal", duracion: "1h", costo: "800",nombre: "Enrique"
        },
        {
            id: "2", materia: "Geografía", frecuencia: "Unica",  duracion: "1.30hs", costo: "600",  nombre: "Martin"
        },
        {
            id: "3", materia: "Física", frecuencia: "Mensual",  duracion: "1h", costo: "800", nombre: "Enrique"
        },
        {
            id: "4", materia: "Biología", frecuencia: "Semanal",  duracion: "2hs", costo: "900", nombre: "Fernando"
        },
        {
            id: "5", materia: "Algebra", frecuencia: "Unica",  duracion: "1h", costo: "1000",  nombre: "Luis"
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        // ApiService.fetchUsers()
        //     .then((res) => {
        //         this.setState({users: res.data.result})
        //     });
    }

    deleteUser(userId) {
        // ApiService.deleteUser(userId)
        //    .then(res => {
        //        this.setState({message : 'User deleted successfully.'});
        //        this.setState({users: this.state.users.filter(user => user.id !== userId)});
        //    })
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Detalle de clases</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addUser()}>
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
                        {this.ClasesCreadas.map(row => (
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

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ClasesProfesor;