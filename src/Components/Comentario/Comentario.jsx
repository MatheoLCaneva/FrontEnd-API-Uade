import './Comentario.css'
import WidgetUsuario from './WidgetUsuario';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { getComentarios } from '../../DB/db';
import { Button, Card, CardContent, InputLabel, Modal, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Stack } from '@mui/system';

const Comentario = () => {
  const [tableData, setTableData] = useState([])

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [idUpdate, setidUpdate] = useState('')
  const [emailUsuario, setEmailUsuario] = useState('')
  const [openRechazar, setOpenRechazar] = useState(false);
  const handleOpenRechazar = () => setOpenRechazar(true);
  const handleCloseRechazar = () => setOpenRechazar(false);


  function accept(mail, clase) {
    setEmailUsuario(mail)
    setidUpdate(clase)
    console.log("funcion accept", idUpdate, emailUsuario)
    setOpen(true)
  }


  const handleUpdateComment = (e) => {
    e.preventDefault(e)
    let commentToUpdate;
    const obj = 
    {
      usuario: emailUsuario,
      clase: idUpdate,
      estado: true

    }

    console.log(obj)

    fetch('http://localhost:4000/comments/', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(data =>{
      console.log("data",data)
      if (data.status === 200) {
      Swal.fire({
        title: 'Comentario aceptado',
        text: 'Ahora se visualiza el comentario en el foro',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,

      })
    }}  )
    handleClose()
  }

  const styles = {
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


  useEffect(() => {
    fetch('http://localhost:4000/comments')
      .then(response => response.json())
      .then(json => setTableData(json.data.docs))

  }, []);

  return (
    <><div style={{ width: '80%', margin: 'auto' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styles}>
          <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
            Validar Comentario
          </Typography>
          <h4>¿Desea aceptar el comentario?</h4>
          <form onSubmit={handleUpdateComment}>
            <Stack spacing={2} direction="row">
              <Button style={{ display: "block" }} type='submit' variant="contained">Aceptar</Button>
              <Button style={{ display: "block" }} variant="contained" onClick={handleClose}>Cancelar</Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>

      <Modal
        open={openRechazar}
        onClose={handleCloseRechazar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styles}>
          <Typography style={{ marginBottom: '10px' }} id="modal-modal-title" variant="h5" component="h2">
            Rechazar Comentario
          </Typography>
          <h4>Por favor describa el motivo de rechazo del comentario</h4>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            style={{ marginBottom: '10px' }}
            label="Descripcion Rechazo"
            multiline
            rows={4}
          />
          <form onSubmit={handleUpdateComment}>
            <Stack spacing={2} direction="row">
              <Button style={{ display: "block" }} type='submit' variant="contained">Enviar</Button>
              <Button style={{ display: "block" }} variant="contained" onClick={handleCloseRechazar}>Cancelar</Button>
            </Stack>
          </form>
        </Box>
      </Modal>


      <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Comentarios a Revisar</Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: "30px 0" }} >
        <Card >
          <CardContent  >
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Id</TableCell> */}
                  <TableCell align="center">Comentario</TableCell>
                  <TableCell align="center">Alumno</TableCell>
                  <TableCell align="center">Clase</TableCell>
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(row => (
                  <TableRow key={row._id}>

                    <TableCell align="center">{row.comentario}</TableCell>
                    <TableCell align="center">{row.usuario}</TableCell>
                    <TableCell align="center">{row.clase}</TableCell>

                    <TableCell align="center" id={row._id}>
                      <IconButton className={row.usuario} id={row._id} onClick={(e) => {
                        accept(row.usuario, row._id)

                      }}><DoneIcon className={row.usuario} id={row._id} /></IconButton>
                      <IconButton className={row.usuario} id={row._id} onClick={(e) => {
                        accept(row.usuario, row._id)
                      }} ><ClearIcon className={row.usuario} id={row._id} onClick={handleOpenRechazar} /></IconButton>
                    </TableCell>
                    {/* <TableCell id='eliminar' align="right" ><DeleteIcon id={row._id} onClick={deleteClass} /></TableCell> */}

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Comentario;