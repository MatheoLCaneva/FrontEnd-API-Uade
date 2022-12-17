import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, Button, Grid, Typography } from "@mui/material";
import myteam from "../../assets/myteam.jpeg"
import { Link } from 'react-router-dom';
import './Bienvenida.css'

const Bienvenida = () => {



  return (
    <div>
      <Box className='boxBienvenida'>
        <Grid  >
          <Grid className='gridBienvenida' sx={{flexDirection: 'column'}}>
            <Typography className='bienvenida-texto' variant="h3" fontWeight={700} sx={{margin: '15px 0'}} >
              Bienvenido al Market de Profesores Particulares
            </Typography>
            <Typography className='bienvenida-texto' variant="h6" sx={{margin: '15px 0'}}>
              En esta aplicacion como profesor tendra la posibilidad de ofrecer clases a alumnos que las necesiten y
              como tambien tendra la posibilidad de contratar clases y coordinarlas para aprender sobre la materia elegida.
            </Typography>
            <Typography className='bienvenida-texto' variant="h6" sx={{margin: '15px 0'}}>
              Te invitamos a formar parte del más grande Market del mercado donde podrás potenciar tus fortalezas.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', fontSize: '16px' }}
              component={Link} to="/ListadoProfesores">
              Ver clases
            </Button>
          </Grid>

        </Grid>
      </Box>
    </div>

  );
};
export default Bienvenida;