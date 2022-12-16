import './Comentario.css'
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, TableContainer, Paper } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Stack } from '@mui/system';
import ContextoAuth from '../../Context/AuthContext';
import { useContext } from 'react';

const Comentario = () => {
  const [tableData, setTableData] = useState([])

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [idUpdate, setidUpdate] = useState('')
  const [emailUsuario, setEmailUsuario] = useState('')
  const [openRechazar, setOpenRechazar] = useState(false);
  const handleOpenRechazar = () => setOpenRechazar(true);
  const handleCloseRechazar = () => setOpenRechazar(false);
  const { user } = useContext(ContextoAuth)
  const [textoRechazo, setTextoRechazo] = useState
    ({
      name: "",
      email: "",
      mensaje: "",
    })

  useEffect(() => {
    const obj = {
      profesor: user.email
    }

    try {
      fetch('http://localhost:4000/comments/commentsByMail/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
        .then(response => response.json())
        .then(data => {

          setTableData(data.data.docs)
        })
    }
    catch (err) {
      console.log(err)
    }
  }, [user.email])

  function accept(mail, clase) {
    setEmailUsuario(mail)
    setidUpdate(clase)

    setOpen(true)
  }
  function denied(mail, comentario) {
    setEmailUsuario(mail)
    setidUpdate(comentario)

    handleOpenRechazar()
  }

  function handleStateChange(e) {
    setTextoRechazo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleDeleteComment = (e) => {
    e.preventDefault()
    const obj = {
      comentarioId: idUpdate,
      usuario: emailUsuario
    }
    console.log(e)

    try {
      textoRechazo.email = emailUsuario
      console.log(textoRechazo)
      fetch('http://localhost:4000/comments/sendMail/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({textoRechazo})
        }).then(res => res.json())
        .then(() => {
          setTextoRechazo({
            email: "",
            name: "",
            mensaje: "",
          });
        })

    }
    catch (e) {
      console.log(e)
    }


    try {
      fetch('http://localhost:4000/comments/', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            handleCloseRechazar()
            Swal.fire({
              title: 'Comentario Eliminado',
              text: 'Esto no se visualizara en el foro',
              icon: 'success',
            })
              .then(
                response => {
                  if (response.isConfirmed) {
                    window.location.reload()
                  }
                }
              )
          }
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUpdateComment = (e) => {
    e.preventDefault(e)
    const obj =
    {
      usuario: emailUsuario,
      clase: idUpdate,
      estado: true

    }


    fetch('http://localhost:4000/comments/', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(data => {

        if (data.status === 200) {
          Swal.fire({
            title: 'Comentario aceptado',
            text: 'Ahora se visualiza el comentario en el foro',
            icon: 'success',
          })
            .then(
              response => {
                if (response.isConfirmed) {
                  window.location.reload()
                }
              }
            )
        }
      })
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
            id="mensaje"
            name="mensaje"
            style={{ marginBottom: '10px' }}
            label="Descripcion Rechazo"
            multiline
            rows={4}
            onChange={handleStateChange}
            value={textoRechazo.mensaje}
          />
          <form onSubmit={handleDeleteComment}>
            <Stack spacing={2} direction="row">
              <Button style={{ display: "block" }} type='submit' variant="contained">Enviar</Button>
              <Button style={{ display: "block" }} variant="contained" onClick={handleCloseRechazar}>Cancelar</Button>
            </Stack>
          </form>
        </Box>
      </Modal>


      <Typography variant="h3" style={{ fontFamily: "'Montserrat', sans-serif", display: 'flex', justifyContent: 'center', margin: "30px 0" }}>Comentarios a Revisar</Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: "30px 0" }} >
        <Card sx={{ width: { md: '60%' } }}>
          <CardContent  >
            <TableContainer component={Paper}>
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
                          denied(row.usuario, row._id)

                        }} ><ClearIcon className={row.usuario} id={row._id} /></IconButton>
                      </TableCell>
                      {/* <TableCell id='eliminar' align="right" ><DeleteIcon id={row._id} onClick={deleteClass} /></TableCell> */}

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Comentario;