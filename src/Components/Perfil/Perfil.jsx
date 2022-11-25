import { Container, Stack, Typography, TextField, Divider, InputAdornment, Button } from "@mui/material"
import "./Perfil.css"
import ContextoAuth from "../../Context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const Perfil = () => {

    const { user, logOffUser, loginUser } = useContext(ContextoAuth)
    console.log(user)
    const nav = useNavigate()
    const handleLogOff = () => {
        logOffUser()
        nav("/")
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (user.rol === 'Estudiante') {
            const nuevosDatos = {
                _id: user._id,
                email: e.target[4].value,
                tel: e.target[6].value
            }

            try {
                await fetch('http://localhost:4000/users/', {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json', "x-access-token":`${localStorage.getItem('token')}` },
                    body: JSON.stringify(nuevosDatos)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 200) {
                            Swal.fire({
                                title: 'Datos Actualizados',
                                text: 'Sus datos fueron actualizados con exito',
                                icon: 'success',
                                timer: 3000,
                                timerProgressBar: true,
                            })
                            loginUser(data.data)
                            localStorage.setItem('user', JSON.stringify(data.data))
                        }
                    })
            }
            catch (err) {
                console.log(err)
            }
        }


    }

    if (user.rol === "Profesor") {
        return (
            <Container maxWidth="xl">
                <Stack sx={{ mt: 3 }} divider={<Divider orientation="vertical" flexItem />} direction='row' justifyContent='space-around' className="usuarioContainer">
                    <Stack direction='column' alignItems='center' className="usuarioFoto">
                        <img src={user.imgUser} alt="imgUsuario" className="imgUsuarioPerfil" width="60%" />
                        <Typography variant="button">
                            {user.name} {user.apellido}
                        </Typography>
                        <Typography variant="caption">
                            {user.email}
                        </Typography>
                    </Stack>
                    <Stack direction='column' className="usuarioInfo">
                        <Typography variant='h4'>
                            Datos Personales
                        </Typography>
                        <form onSubmit={handleUpdate}>
                            <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                                <div className="labelNombre">
                                    <TextField disabled label='Nombre' defaultValue={user.name} />
                                </div>
                                <div className="labelApellido">
                                    <TextField disabled label='Apellido' defaultValue={user.apellido} />
                                </div>
                            </Stack>

                            <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                                <div className="labelNombre">
                                    <TextField required label='Mail' defaultValue={user.email} />
                                </div>
                                <div className="labelApellido">
                                    <TextField required label='Teléfono' defaultValue={user.tel} InputProps={{
                                        startAdornment: <InputAdornment position="start">+54</InputAdornment>,
                                    }} />
                                </div>
                            </Stack>

                            <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                                <div className="labelNombre">
                                    <TextField disabled label='Titulo' defaultValue={user.title} />
                                </div>
                                <div className="labelApellido">
                                    <TextField disabled label='Experiencia' defaultValue={user.experience} InputProps={{
                                        endAdornment: <InputAdornment position="start">Años</InputAdornment>,
                                    }} />
                                </div>
                            </Stack>
                            <Button variant="contained" size="medium" sx={{ width: '31%', margin: 'auto', mt: 3 }}>
                                Actualizar
                            </Button>
                        </form>
                        <Button variant="contained" size="medium" sx={{ width: '31%', margin: 'auto', mt: 3 }} onClick={handleLogOff}>
                            Cerrar Sesion
                        </Button>
                    </Stack >
                </Stack>
            </Container>
        )
    }


    if (user.rol === "Estudiante") {
        return (
            <Container maxWidth="xl">
                <Stack sx={{ mt: 3 }} divider={<Divider orientation="vertical" flexItem />} direction='row' justifyContent='space-around' className="usuarioContainer">
                    <Stack direction='column' alignItems='center' className="usuarioFoto">
                        <img src={user.imgUser} alt="imgUsuarioPerfil" width="60%" />
                        <Typography variant="button">
                            {user.name} {user.apellido}
                        </Typography>
                        <Typography variant="caption">
                            {user.email}
                        </Typography>
                    </Stack>
                    <Stack direction='column' className="usuarioInfo">
                        <Typography variant='h4'>
                            Datos Personales
                        </Typography>
                        <form onSubmit={handleUpdate}>
                            <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                                <div className="labelNombre">
                                    <TextField disabled label='Nombre' defaultValue={user.name} />
                                </div>
                                <div className="labelApellido">
                                    <TextField disabled label='Apellido' defaultValue={user.apellido} />
                                </div>
                            </Stack>

                            <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                                <div className="labelNombre">
                                    <TextField required label='Mail' defaultValue={user.email} />
                                </div>
                                <div className="labelApellido">
                                    <TextField required label='Teléfono' defaultValue={user.tel} InputProps={{
                                        startAdornment: <InputAdornment position="start">+54</InputAdornment>,
                                    }} />
                                </div>
                            </Stack>
                            <Button variant="contained" type="submit" size="medium" sx={{ width: '31%', margin: 'auto', mt: 3 }}>
                                Actualizar
                            </Button>
                        </form>
                        <Button variant="contained" size="medium" sx={{ width: '31%', margin: 'auto', mt: 3 }} onClick={handleLogOff}>
                            Cerrar Sesion
                        </Button>
                    </Stack >
                </Stack>
            </Container>
        )
    }


}

export default Perfil