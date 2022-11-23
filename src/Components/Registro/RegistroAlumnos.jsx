import * as React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Box } from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const RegistroAlumnos = () => {
    const paperStyle = { padding: 20, width: 500, margin: "0 auto" }
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

    const estudios = ['Primario', 'Secundario', 'Terciario', 'Universitario']

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setEstudioName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleRegisterUser = (event) => {
        // event.preventDefault()
        var contraseña = document.querySelector('#password').value
        var repContraseña = document.querySelector('#confirmPassword').value
        if (contraseña === repContraseña) {
            event.rol = 'Estudiante'

            try {
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
            <Paper style={paperStyle}>
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

                    <Button type='submit' variant='contained' color='primary'>Registrarse</Button>
                </form>
            </Paper>
        </Grid>
    )
}
export default RegistroAlumnos;


