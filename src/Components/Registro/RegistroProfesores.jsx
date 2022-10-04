import * as React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const RegistroProfesores = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const TextfieldStyle = { margin: '3px 0' }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Registro Profesores</h2>
                    <Typography variant='caption' gutterBottom>Ingrese sus datos para crear una cuenta</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Nombre' placeholder="Nombre" style={TextfieldStyle} />
                    <TextField fullWidth label='Apellido' placeholder="Apellido" style={TextfieldStyle} />
                    <TextField fullWidth label='Email' placeholder="Email" style={TextfieldStyle} />
                    <TextField fullWidth label='Telefono' placeholder="Telefono" style={TextfieldStyle} />
                    <TextField fullWidth label='Password' placeholder="Enter your password" style={TextfieldStyle} />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" style={TextfieldStyle} />
                    <TextField fullWidth label='Titulo' placeholder="Titulo" style={TextfieldStyle} />
                    <TextField fullWidth label='Experiencia' placeholder="Experiencia" style={TextfieldStyle} />


                    <Button type='submit' variant='contained' style={marginTop} color='primary'>Registrarse</Button>
                </form>
            </Paper>
        </Grid>
    )
}
export default RegistroProfesores;


