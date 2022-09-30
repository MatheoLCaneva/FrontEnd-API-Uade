import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AutocompletarMaterias = ({}) => {
    
    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const materias = [
        {label: "Matematica"},
        {label: "Geografía"},
        {label: "Biología"},
        {label: "Física"},
        {label: "Álgebra"}
    ]

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={materias}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Materia" />}
        />
    );
}



export default AutocompletarMaterias