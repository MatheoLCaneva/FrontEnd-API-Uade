import { Container, Stack, Typography, TextField, Divider, InputAdornment, Button } from "@mui/material"
import "./Perfil.css"
import foto from "../../assets/logo192.png"
import alumno from "../../DB/db"
import ContextoAuth from "../../Context/AuthContext"
import { useContext } from "react"

const Perfil = () => {

    const { user } = useContext(ContextoAuth)

    if (user.user.rol === "Profesor") {
        return (
            <Container maxWidth="md">
                <Stack sx={{ mt: 3 }} divider={<Divider orientation="vertical" flexItem />} direction='row' justifyContent='space-around' className="usuarioContainer">
                    <Stack direction='column' alignItems='center' className="usuarioFoto">
                        <img src={user.user.imgUser} alt="imgUsuario" width="60%" />
                        <Typography variant="button">
                            {user.user.name} 
                        </Typography>
                        <Typography variant="caption">
                            {user.user.email}
                        </Typography>
                    </Stack>
                    <Stack direction='column' className="usuarioInfo">
                        <Typography variant='h4'>
                            Datos Personales
                        </Typography>
                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField required label='Nombre' defaultValue={user.user.name} />
                            </div>
                            <div className="labelApellido">
                                <TextField required label='Apellido' defaultValue={user.user.apellido} />
                            </div>
                        </Stack>

                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField required label='Mail' defaultValue={user.user.email} />
                            </div>
                            <div className="labelApellido">
                                <TextField required label='Teléfono' defaultValue={user.user.tel} InputProps={{
                                    startAdornment: <InputAdornment position="start">+54</InputAdornment>,
                                }} />
                            </div>
                        </Stack>

                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField disabled label='Titulo' defaultValue={user.user.title} />
                            </div>
                            <div className="labelApellido">
                                <TextField disabled label='Experiencia' defaultValue={user.user.experience} InputProps={{
                                    endAdornment: <InputAdornment position="start">Años</InputAdornment>,
                                }} />
                            </div>
                        </Stack>
                        <Button variant="contained" size="medium" sx={{ width: '30%', margin: 'auto', mt: 3 }}>
                            Actualizar
                        </Button>
                    </Stack >
                </Stack>
            </Container>
        )
    }


    if (user.user.rol === "Estudiante") {
        return (
            <Container maxWidth="md">
                <Stack sx={{ mt: 3 }} divider={<Divider orientation="vertical" flexItem />} direction='row' justifyContent='space-around' className="usuarioContainer">
                    <Stack direction='column' alignItems='center' className="usuarioFoto">
                        <img src={foto} alt="imgUsuario" width="60%" />
                        <Typography variant="button">
                            {alumno.nombre} {alumno.apellido}
                        </Typography>
                        <Typography variant="caption">
                            {alumno.mail}
                        </Typography>
                    </Stack>
                    <Stack direction='column' className="usuarioInfo">
                        <Typography variant='h4'>
                            Datos Personales
                        </Typography>
                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField required label='Nombre' defaultValue={alumno.nombre} />
                            </div>
                            <div className="labelApellido">
                                <TextField required label='Apellido' defaultValue={alumno.apellido} />
                            </div>
                        </Stack>

                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField required label='Mail' defaultValue={alumno.mail} />
                            </div>
                            <div className="labelApellido">
                                <TextField required label='Teléfono' defaultValue={alumno.telefono} InputProps={{
                                    startAdornment: <InputAdornment position="start">+54</InputAdornment>,
                                }} />
                            </div>
                        </Stack>
                        <Button variant="contained" size="medium" sx={{ width: '30%', margin: 'auto', mt: 3 }}>
                            Actualizar
                        </Button>
                    </Stack >
                </Stack>
            </Container>
        )
    }


}

export default Perfil