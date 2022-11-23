import * as React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Input } from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const RegistroProfesores = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const TextfieldStyle = { margin: '3px 0' }

    const { register, handleSubmit } = useForm()


    const handleRegisterProfesor = (event, e) => {
        var contraseña = document.querySelector('#password').value
        var repContraseña = document.querySelector('#confirmPassword').value
        if (contraseña === repContraseña) {
            event.rol = 'Profesor'

            try {
                fetch('http://localhost:4000/users/registration', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                    body: JSON.stringify(event)
                }).then(
                    (response) => response.json()
                ).then(data => {
                    sessionStorage.setItem('token', data.createdUser)
                })

                e.target.reset()
            } catch (err) {
                console.log(err)
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,

            })
        }



    }
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
                <form onSubmit={handleSubmit(handleRegisterProfesor)}>
                    <TextField required fullWidth label='Nombre' placeholder="Nombre" style={TextfieldStyle} {...register('name')} />
                    <TextField required fullWidth label='Apellido' placeholder="Apellido" style={TextfieldStyle} {...register('apellido')} />
                    <TextField required fullWidth label='Email' placeholder="Email" style={TextfieldStyle} {...register('email')} />
                    <TextField required fullWidth label='Telefono' placeholder="Telefono" style={TextfieldStyle} {...register('tel')} />
                    <TextField required fullWidth label='Password' placeholder="Contraseña" type='password' style={TextfieldStyle} id='password' {...register('password')} />
                    <TextField required fullWidth label='Confirm Password' placeholder="Repetir Contraseña" type='password' style={TextfieldStyle} id='confirmPassword' />
                    <TextField required fullWidth label='Titulo' placeholder="Titulo" style={TextfieldStyle} {...register('titulo')} />
                    <TextField required fullWidth label='Experiencia' placeholder="Experiencia" style={TextfieldStyle} {...register('experiencia')} />
                    <p>Foto de Perfil</p>
                    
                    <Input required accept='image/*' id='imagen' type='file' label='Foto de Perfil' style={TextfieldStyle} />
                    <Button type='submit' variant='contained' style={marginTop} color='primary'>Registrarse</Button>
                </form>
            </Paper>
        </Grid>
    )
}
export default RegistroProfesores;


