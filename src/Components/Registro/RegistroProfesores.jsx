import * as React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import './Registro.css'
import CircularIndeterminate from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const RegistroProfesores = () => {
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const TextfieldStyle = { margin: '3px 0' }
    const [imgUser, setImgUser] = useState('')
    const { register, handleSubmit } = useForm()
    const [imagenes, setImagenes] = useState('')
    const [cargando, setCargando] = useState(false)
    const [fotoId, setFotoId] = useState(0)
    const [status, setStatus] = useState(0)
    const nav = useNavigate()


    const hanndleInput = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = r => {
            // 
            let newImagen = {
                id: fotoId,
                url: r.target.result
            }



            setImagenes(newImagen);
        };
        reader.readAsDataURL(files[0]);

        setFotoId(fotoId + 1);

    }

    const handleRegisterProfesor = async (event, e) => {
        setCargando(true)
        var contraseña = document.querySelector('#password').value
        var repContraseña = document.querySelector('#confirmPassword').value
        if (contraseña === repContraseña) {
            event.rol = 'Profesor'

            try {
                if (imagenes) {

                    const data = new FormData();
                    data.append('file', imagenes.url);
                    data.append('upload_preset', 'utvjoiww');
                    data.append('cloud_name', 'matheocaneva')
                    const res = await fetch(
                        'https://api.cloudinary.com/v1_1/matheocaneva/image/upload',
                        {
                            method: 'POST',
                            body: data
                        }
                    );
                    const file = await res.json();

                    event.imgUser = file.secure_url
                }

                fetch('http://localhost:4000/users/registration', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                    body: JSON.stringify(event)
                }).then(
                    (response) => response.json()
                ).then(data => {
                    if (data.status === 200) {
                        Swal.fire({
                            title: 'Error',
                            text: 'Ya existe usuario con el mail indicado',
                            icon: 'error',
                            timer: 3000,
                            timerProgressBar: true,
                        })
                        setCargando(false)

                    }
                    else if (data.status === 201) {
                        const obj = {
                            tipo: 1,
                            email: event.email,
                            asunto: 'Bienvenido/a',
                            name: event.name,
                            apellido: event.apellido,
                            mensaje: `Usted se ha registrado con éxito en nuestra plataforma, esperamos que encuentre próximamente su profesor ideal.`,
                            tel: event.tel

                        }
                        console.log(obj)
                        fetch('http://localhost:4000/comments/sendMail/',
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ obj })
                            }).then(response => response.json())
                            .then(data => {
                                if (data.status === 200) {
                                    Swal.fire({
                                        title: 'Registro Exitoso',
                                        text: 'Su usuario se registro con exito. !Bienvenido!',
                                        icon: 'success',
                                    })
                                        .then(res => {
                                            setCargando(false)
                                            if (res.isConfirmed) {
                                                nav('/')
                                            }
                                        })
                                }
                            })
                    }

                })

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

    if (cargando) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        )
    }
    else {
        return (
            <Grid>
                <Paper className='registro'>
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
                        <TextField required fullWidth label='Titulo' placeholder="Titulo" style={TextfieldStyle} {...register('title')} />
                        <TextField required fullWidth label='Experiencia' placeholder="Experiencia" style={TextfieldStyle} {...register('experience')} />
                        <TextField required fullWidth multiline={true} label='Biografia' placeholder="Fecha Nacimiento" style={TextfieldStyle} id='descripcionPorfesor' {...register('descripcionProfesor')} />

                        <p>Foto de Perfil</p>

                        {/* <input accept='image/*' onChange={handleInput} id='imagen' type='file' label='Foto de Perfil' style={TextfieldStyle} /> */}
                        <input accept="image/*" type="file" onChange={hanndleInput} />
                        <Button sx={{ mt: 3 }} type='submit' variant='contained' style={marginTop} color='primary'>Registrarse</Button>
                    </form>
                </Paper>
            </Grid>
        )
    }

}
export default RegistroProfesores;


