import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ContextoAuth from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import './Login.css'
// import * as Yup from 'yup';


const Login = () => {
    const paperStyle = { padding: 20, width: 300, margin: "50px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const TextfieldStyle = { margin: '3px 0' }
    const nav = useNavigate();
    const { loginUser, user } = useContext(ContextoAuth)
    const [checked, setChecked] = useState(true)

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    const handleLogin = async (event) => {



        event.preventDefault()
        let bodyUser = {
            email: event.target.email.value,
            password: event.target.password.value
        }


        try {
            await fetch('http://localhost:4000/users/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(bodyUser)
            }).then(
                response => response.json()
            ).then(
                data => {
                    if (data.status === 400) { alert('Usuario o contraseña incorrectos') }
                    else {
                        loginUser(data.loginUser.user)
                        if (checked) {
                            delete data.loginUser.user["password"]
                            localStorage.setItem('user', JSON.stringify(data.loginUser.user))
                            localStorage.setItem('token', JSON.stringify(data.loginUser.token))
                        }
                        nav('/')
                    }
                }
            )
        }
        catch (err) {
            console.log('Error', err)
        }
    }

    return (
        <Grid>
            <Paper style={paperStyle} className='login'>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Iniciar Sesion</h2>
                </Grid>
                <form onSubmit={handleLogin}>
                    <TextField label='Email' placeholder='Email' name="email" style={TextfieldStyle} fullWidth required />
                    <TextField label='Contraseña' placeholder='Contraseña' name="password" type='password' style={TextfieldStyle} fullWidth required />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleChange}
                                checked={checked}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Recordame"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Iniciar sesion</Button></form>

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