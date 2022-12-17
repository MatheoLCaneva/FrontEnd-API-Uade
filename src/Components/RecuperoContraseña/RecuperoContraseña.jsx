import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const RecuperoContraseña = () => {
    const paperStyle = { padding: 20, width: 300, margin: "50px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const TextfieldStyle = { margin: '3px 0' }
    const nav = useNavigate()

    const handleRecovery = (e) => {
        e.preventDefault(e)
        const obj = {
            tipo: 4,
            asunto: "Recupero de Contraseña",
            email: e.target[0].value,
            mensaje: `Estimado/a, para recuperar su contraseña por favor ingrese al siguiente link: `
        }

        fetch('http://localhost:4000/users/sendMail/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ obj })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Correo enviado',
                        text: 'Revise su bandeja para reestablecer su contraseña',
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

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Recuperar Contraseña</h2>
                </Grid>
                <form onSubmit={handleRecovery}>
                    <TextField label='Email' placeholder='email' style={TextfieldStyle} fullWidth required />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Enviar</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default RecuperoContraseña;