import { Stack, Box, Paper } from "@mui/material"
import { styled } from '@mui/material/styles';


const Comentario = ({ comentario, usuario }) => {

    const Items = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="container">
            <div className="usuario-info">
                <p>{usuario}</p>
            </div>

            <p>{comentario}</p>
        </div>

    )
}

export default Comentario