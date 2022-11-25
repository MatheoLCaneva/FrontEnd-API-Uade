import * as React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Box } from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './Registro.css'
import { useState } from 'react';

const RegistroAlumnos = () => {
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const TextfieldStyle = { margin: '3px 0' }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const { register, handleSubmit } = useForm()
    const [estudioName, setEstudioName] = React.useState([]);
    const [imagenes, setImagenes] = useState('')
    const [fotoId, setFotoId] = useState(0)

    const estudios = ['Primario', 'Secundario', 'Terciario', 'Universitario']

    const hanndleInput = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = r => {
            // console.log(r)
            let newImagen = {
                id: fotoId,
                url: r.target.result
            }

            console.log(newImagen)

            setImagenes(newImagen);
        };
        reader.readAsDataURL(files[0]);

        setFotoId(fotoId + 1);

    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setEstudioName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleRegisterUser = async (event) => {
        // event.preventDefault()
        var contraseña = document.querySelector('#password').value
        var repContraseña = document.querySelector('#confirmPassword').value
        if (contraseña === repContraseña) {
            event.rol = 'Estudiante'

            try {
                if (imagenes) {
                    console.log(imagenes)
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
                    console.log(file)
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
                    localStorage.setItem('token', data.createdUser)
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

    return (
        <Grid>
            <Paper className='registro'>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Registro Alumnos</h2>
                    <Typography variant='caption' gutterBottom>Ingrese sus datos para crear una cuenta</Typography>
                </Grid>
                <form onSubmit={handleSubmit(handleRegisterUser)}>
                    <TextField required fullWidth label='Nombre' placeholder="Nombre" id='nombre' {...register('name')} />
                    <TextField required fullWidth label='Apellido' placeholder="Apellido" style={TextfieldStyle} id='apellido' {...register('apellido')} />
                    <TextField required fullWidth label='Email' placeholder="Email" style={TextfieldStyle} id='email' {...register('email')} />
                    <TextField required fullWidth label='Telefono' placeholder="Telefono" style={TextfieldStyle} id='telefono' {...register('tel')} />
                    <TextField required fullWidth label='Password' placeholder="Enter your password" type="password" style={TextfieldStyle} id='password' {...register('password')} />
                    <TextField required fullWidth label='Confirm Password' placeholder="Confirm your password" type="password" style={TextfieldStyle} id='confirmPassword' />
                    <TextField required fullWidth label='Fecha Nacimiento' placeholder="Fecha Nacimiento" style={TextfieldStyle} id='nacimiento' {...register('birth')} />

                    <p>Estudios</p>

                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Estudios</InputLabel>
                        <Select
                            {...register('estudios')}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={estudioName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >

                            {estudios.map((estudio) => (
                                <MenuItem
                                    key={estudio}
                                    value={estudio}
                                >
                                    {estudio}
                                </MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                    <p>Foto de Perfil</p>

                    {/* <input accept='image/*' onChange={handleInput} id='imagen' type='file' label='Foto de Perfil' style={TextfieldStyle} /> */}
                    <input accept="image/*" type="file" onChange={hanndleInput} />

                    <Button sx={{ mt: 3 }} type='submit' variant='contained' color='primary'>Registrarse</Button>
                </form>
            </Paper>
        </Grid>
    )
}
export default RegistroAlumnos;


