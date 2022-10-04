import * as React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, FormLabel, MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const RegistroAlumnos = () => {
    const paperStyle = { padding: 20, width: 500, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const TextfieldStyle = { margin: '3px 0' }
    const [Estudios, SetEstudios] = React.useState('');

    const handleChange = (event) => {
        SetEstudios(event.target.value);
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Registro Alumnos</h2>
                    <Typography variant='caption' gutterBottom>Ingrese sus datos para crear una cuenta</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Nombre' placeholder="Nombre" style={TextfieldStyle} />
                    <TextField fullWidth label='Apellido' placeholder="Apellido" style={TextfieldStyle} />
                    <TextField fullWidth label='Nombre' placeholder="Nombre" style={TextfieldStyle} />
                    <TextField fullWidth label='Apellido' placeholder="Apellido" style={TextfieldStyle} />
                    <TextField fullWidth label='Email' placeholder="Email" style={TextfieldStyle} />
                    <TextField fullWidth label='Telefono' placeholder="Telefono" style={TextfieldStyle} />
                    <TextField fullWidth label='Password' placeholder="Enter your password" style={TextfieldStyle} />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" style={TextfieldStyle} />
                    <TextField fullWidth label='Fecha Nacimiento' placeholder="Fecha Nacimiento" style={TextfieldStyle} />

                    <p>Estudios</p>

                    <FormControl fullWidth>
                       <InputLabel align="left" id="demo-simple-select-helper-label">Primarios</InputLabel>
                        <Select fullWidth
                            labelId="demo-simple-select-helper-label1"
                            id="demo-simple-select-helper1"
                            value={Estudios}
                            label="Primario"
                            onChange={handleChange}
                        >
                            <MenuItem value="Primarios">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value={1}>En Curso</MenuItem>
                            <MenuItem value={2}>Finalizados</MenuItem>
                        </Select>

                    </FormControl>
                


                    <FormControl fullWidth>
                        <InputLabel align="left" id="demo-simple-select-helper-label">Secundarios</InputLabel>
                        <Select fullWidth
                            labelId="demo-simple-select-helper-label2"
                            id="demo-simple-select-helper2"
                            value={Estudios}
                            label="Secundarios"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value={1}>En Curso</MenuItem>
                            <MenuItem value={2}>Finalizados</MenuItem>
                        </Select>

                    </FormControl>



                    <FormControl fullWidth>
                        <InputLabel align="left" id="demo-simple-select-helper-label">Terciarios</InputLabel>
                        <Select fullWidth
                            labelId="demo-simple-select-helper-label3"
                            id="demo-simple-select-helper3"
                            value={Estudios}
                            label="Terciarios"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value={1}>En Curso</MenuItem>
                            <MenuItem value={2}>Finalizados</MenuItem>
                        </Select>


                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel align="left" id="demo-simple-select-helper-label">Universitarios</InputLabel>
                        <Select fullWidth
                            labelId="demo-simple-select-helper-label4"
                            id="demo-simple-select-helper4"
                            value={Estudios}
                            label="Universitarios"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value={1}>En Curso</MenuItem>
                            <MenuItem value={2}>Finalizados</MenuItem>
                        </Select>

                    </FormControl>



                    <Button href='/' type='submit' variant='contained' color='primary'>Registrarse</Button>
                </form>
            </Paper>
        </Grid>
    )
}
export default RegistroAlumnos;


