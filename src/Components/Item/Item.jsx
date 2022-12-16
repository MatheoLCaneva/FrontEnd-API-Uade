import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './Item.css'

const Item = ({ nombre, apellido, precio, materia, tipo, frecuencia, duracion, valoracion, profesor, id, _id }) => {
    

    return (
        <Card className='cardClase' sx={{ mt: 3, borderRadius: "20px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={profesor.imgUser}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombre} {apellido}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Precio: {precio}/h <br />
                        Calificacion: {Math.round(valoracion)}/5
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link style={{ fontSize: "20px", color: "black", textDecoration: "none" }} to={`/clase/${_id}`}><Button size="small" color="primary" variant='text'>
                    Ver mas de esta clase
                </Button></Link>
            </CardActions>
        </Card>
    );
}



export default Item