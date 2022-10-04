import './ItemDetail.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getComentarios } from '../../DB/db';
import Comentario from '../Comentario/Comentario';

const ItemDetail = ({ id, nombre, apellido, precio, materia, tipo, frecuencia, duracion, img, descripcionClase, descripcionProfesor }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(dayjs('2014-08-18T00:00:00'));
    const [comentarios, setComentarios] = useState([])
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const inputs = {
        marginBottom: '20px'
    }

    useEffect(() => {
        getComentarios().then(response => {
            setComentarios(response.find(res => res.idMateria == id).comentarios)
        })
    }, [])

    console.log(comentarios.map(comentario => console.log(comentario.id)))

    return (
        <div style={{ display: "flex" }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
                        Contactar Profesor
                    </Typography>
                    <TextField sx={inputs} id="outlined-basic" label="Nombre" variant="outlined" />
                    <TextField sx={inputs} id="outlined-basic" label="Apellido" variant="outlined" />
                    <TextField sx={inputs} id="outlined-basic" label="Mail" variant="outlined" />
                    <TextField sx={inputs} id="outlined-basic" label="Teléfono" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Horario"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />

                    </LocalizationProvider>
                    <Button style={{ display: "block" }} variant="contained">Contratar</Button>

                </Box>
            </Modal>
            <div>
                <div className="producto">
                    <div className="producto-info">
                        <h2>{descripcionClase}</h2>
                    </div>
                </div>
                <div className="acerca-profesor producto">
                    <h2>Acerca de {nombre} {apellido}</h2>
                    <p>{descripcionProfesor}</p>
                </div>
                <div className="producto comentarios">
                    <h2>Comentarios</h2>
                    <ul className="listado">
                        {comentarios.map(comentario => <Comentario key={comentario.id} {...comentario} />)}
                    </ul>
                </div>
            </div>

            <div className='profesor'>
                <div className='card-profesor'>
                    <div className="datos-profesor">
                        <div className="imagen">
                            <img style={{ maxWidth: "100%" }} src={img} alt="" />
                        </div>
                        <div className="nombre">
                            <p>{nombre} {apellido}</p>
                        </div>
                        <div className="info">
                            <ul className='info-lista'>
                                <li>Precio por hora:  ${precio}</li>
                                <li>Tipo de clase: {tipo}</li>
                                <li>Frecuencia: {frecuencia}</li>
                            </ul>
                            <div className="contacto">
                                <Button size='medium' className='btnContacto' variant="contained" onClick={handleOpen}>Contactar Profe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default ItemDetail
