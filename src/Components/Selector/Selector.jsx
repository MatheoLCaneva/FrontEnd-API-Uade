import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Selector = ({ variable, variable1, variable2, variable3 }) => {
    const [tipo, setTipo] = React.useState('');


    const handleChange = (event) => {
        setTipo(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{variable}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tipo}
                    label={variable}
                    onChange={handleChange}
                >
                    <MenuItem value={`${variable1}`}>{variable1}</MenuItem>
                    <MenuItem value={`${variable2}`}>{variable2}</MenuItem>
                    {variable3 !== undefined &&
                        <MenuItem value={`${variable3}`}>{variable3}</MenuItem>

                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default Selector
