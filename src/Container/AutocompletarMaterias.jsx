import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AutocompletarMaterias = ({idComponente}) => {

    var materias = ['Geografia', 'Matematica', 'Biologia', 'Fisica', 'Algebra', 'Plastica']
    

    return (
        <Autocomplete
            disablePortal
            id={idComponente}
            options={materias}
            sx={{marginBottom: '20px' }}
            renderInput={(params) => <TextField {...params} label="Materia" />}
        />
    );
}



export default AutocompletarMaterias