import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Item = ({ nombre, apellido, precio, materia, tipo, frecuencia, duracion, calificacion, img, id }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: "20px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombre} {apellido}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Precio: {precio}/h <br />
                        Calificacion: {calificacion}/10
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link style={{textDecoration: "none"}} to={`/clase/${id}`}><Button size="small" color="primary">
                    Ver mas de esta clase
                </Button></Link>
            </CardActions>
        </Card>
    );
}



export default Item