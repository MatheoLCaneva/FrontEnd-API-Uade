import { Container, Stack, Typography, TextField, Divider, InputAdornment, Button } from "@mui/material"
import "./Perfil.css"
import foto from "../../assets/logo192.png"
import alumno from "../../DB/db"
import { profesor } from "../../DB/db"
import { useState } from "react"

const Perfil = () => {

    const [rol, setRol] = useState("profesor")

    if (rol === "profesor") {
        return (
            <Container maxWidth="md">
                <Stack sx={{ mt: 3 }} divider={<Divider orientation="vertical" flexItem />} direction='row' justifyContent='space-around' className="usuarioContainer">
                    <Stack direction='column' alignItems='center' className="usuarioFoto">
                        <img src={foto} alt="imgUsuario" width="60%" />
                        <Typography variant="button">
                            {profesor.nombre} {profesor.apellido}
                        </Typography>
                        <Typography variant="caption">
                            {profesor.mail}
                        </Typography>
                    </Stack>
                    <Stack direction='column' className="usuarioInfo">
                        <Typography variant='h4'>
                            Datos Personales
                        </Typography>
                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField required label='Nombre' defaultValue={profesor.nombre} />
                            </div>
                            <div className="labelApellido">
                                <TextField required label='Apellido' defaultValue={profesor.apellido} />
                            </div>
                        </Stack>

                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField required label='Mail' defaultValue={profesor.mail} />
                            </div>
                            <div className="labelApellido">
                                <TextField required label='Teléfono' defaultValue={profesor.telefono} InputProps={{
                                    startAdornment: <InputAdornment position="start">+54</InputAdornment>,
                                }} />
                            </div>
                        </Stack>

                        <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                            <div className="labelNombre">
                                <TextField disabled label='Titulo' defaultValue={profesor.titulo} />
                            </div>
                            <div className="labelApellido">
                                <TextField disabled label='Experiencia' defaultValue={profesor.experiencia} InputProps={{
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


    if (rol === "alumno") {
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