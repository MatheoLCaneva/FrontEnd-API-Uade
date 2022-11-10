// import ApiService from "../../service/ApiService";
import './Notificaciones.css'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const Notificaciones = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'usuario', headerName: 'Usuario', width: 130 },
        { field: 'clase', headerName: 'Clase', width: 130 },
        { field: 'comentario', headerName: 'Comentario', width: 350 },
    ];

    const rows = [
        { id: 1, usuario: 'Snow', clase: 'Jon', comentario: 35 },
        { id: 2, usuario: 'Lannister', clase: 'Cersei', comentario: 42 },
        { id: 3, usuario: 'Lannister', clase: 'Jaime', comentario: 45 },
        { id: 4, usuario: 'Stark', clase: 'Arya', comentario: 16 },
        { id: 5, usuario: 'Targaryen', clase: 'Daenerys', comentario: 1 },
        { id: 6, usuario: 'Melisandre', clase: "null", comentario: 150 },
        { id: 7, usuario: 'Clifford', clase: 'Ferrara', comentario: 44 },
        { id: 8, usuario: 'Frances', clase: 'Rossini', comentario: 36 },
        { id: 9, usuario: 'Roxie', clase: 'Harvey', comentario: 65 },
    ];

    return (
        <div style={{ height: 400, width: '80%', margin: "auto" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            // checkboxSelection
            />
        </div>
    );


}

export default Notificaciones;