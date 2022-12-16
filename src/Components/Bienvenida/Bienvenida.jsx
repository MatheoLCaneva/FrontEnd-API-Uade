
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, Button, Grid, Typography } from "@mui/material";
import  myteam   from "../../assets/myteam.jpeg"
import { Link } from 'react-router-dom';

const Bienvenida = () => 
{
    const heroBox = {
        width: "100%",
        display: "flex",
        minHeight: "600px",
        aligniItems: "center",
        justifyContent: "center"
      };

      const gridContainer = {
        display: "flex",
        alignitems: "center",
        maxwidth: "1300px",
        padding: "50px",
      }
    
      const title ={
        paddingBottom: "15px",
      }
      const subtitle ={
        opacity: "0.4",
        paddingBottom: "30px",
      }
    
      const largeImage = {
        width: "100%"
      }

    return(
        <div>
            <Box sx={heroBox}>
        <Grid container spacing={6} sx={gridContainer}>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" fontWeight={700} sx={title}>
              Bienvenido al Market de Profesores Particulares
            </Typography>
            <Typography variant="h6" sx={subtitle}>
              En esta aplicacion como profesor tendra la posibilidad de ofrecer clases a alumnos que las necesiten y
              como tambien tendra la posibilidad de contratar clases y coordinarlas para aprender sobre la materia elegida.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '200px', fontSize: '16px' }}
              component={Link} to="/ListadoProfesores">
              Ver clases
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <img src={myteam} alt="My Team" sx={largeImage} />
          </Grid>
        </Grid>
      </Box>
        </div>
        
    );
};
export default Bienvenida;