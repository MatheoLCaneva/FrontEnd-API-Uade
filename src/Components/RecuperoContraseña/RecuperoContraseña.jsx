
import React  from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link  } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const RecuperoContraseña= ()=> {
    const paperStyle={padding :20,height:'30vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const TextfieldStyle= {margin:'3px 0'}
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Recuperar Contraseña</h2>
                </Grid>
                <TextField label='Email' placeholder='email' style={TextfieldStyle} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Enviar</Button>
            </Paper>
        </Grid>
    )
}

export default RecuperoContraseña;