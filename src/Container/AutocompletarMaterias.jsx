import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AutocompletarMaterias = () => {

    var materias = ['Geografia', 'Matematica', 'Biologia', 'Fisica', 'Algebra', 'Plastica']
    

    return (
        <Autocomplete
            disablePortal
            id="autoCompletar"
            options={materias}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Materia" />}
        />
    );
}



export default AutocompletarMaterias