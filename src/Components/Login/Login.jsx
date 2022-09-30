import React  from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link  } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import * as Yup from 'yup';


const Login= ()=> {
    const paperStyle={padding :20,height:'60vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const TextfieldStyle= {margin:'3px 0'}
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Iniciar Sesion</h2>
                </Grid>
                <TextField label='Usuario' placeholder='Usuario' style={TextfieldStyle} fullWidth required/>
                <TextField label='Contraseña' placeholder='Contraseña' type='password' style={TextfieldStyle} fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Recordame"
                 />
                <Button type='submit' color='primary' variant="contained"style={btnstyle} fullWidth>Iniciar sesion</Button>
                <Typography >
                     <Link href="./RecuperarContrasena" >
                        Olvidaste tu constraseña?
                </Link>
                </Typography>
                <Typography > Tenes una cuenta?
                     <Link href="./RegistroAlumno">
                     <Button size="small" color="primary">
                     Registrarse como Alumno 
                </Button>
                </Link>
                <Link href="./RegistroProfesor">
                <Button size="small" color="primary">
                     Registrarse como Profesor 
                </Button>
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;