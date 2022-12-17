import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const IngresoContrasena = () => {
    const paperStyle = { padding: 20, width: 300, margin: "50px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const TextfieldStyle = { margin: '3px 0' }
    const [contrasena, setContrasena] = useState("")
    const [repContrasena, setRepContrasena] = useState("")
    const { email } = useParams()
    const nav = useNavigate()


    const handleCambioContrasena = async (e) => {
        e.preventDefault(e)
        if (contrasena === repContrasena) {

            const obj = {
                password: contrasena,
                email: email
            }

            await fetch('http://localhost:4000/users/password', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        Swal.fire({
                            title: 'Contraseña Cambiada',
                            text: 'Ya puede iniciar sesión',
                            icon: 'success',
                        })
                            .then(
                                response => {
                                    if (response.isConfirmed) {
                                        nav('/Login')
                                    }
                                }
                            )
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
            })
        }


    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Recuperar Contraseña</h2>
                </Grid>
                <form onSubmit={handleCambioContrasena}>
                    <TextField label='Nueva Contraseña' placeholder='contraseña' name="password" type='password' style={TextfieldStyle} fullWidth required onChange={(e) => setContrasena(e.target.value)} />
                    <TextField label='Repetir Contraseña' placeholder='contraseña' name="password" type='password' style={TextfieldStyle} fullWidth required onChange={(e) => setRepContrasena(e.target.value)} />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Enviar</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default IngresoContrasena