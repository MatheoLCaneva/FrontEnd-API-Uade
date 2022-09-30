import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress style={{ marginLeft: "50%", marginTop: "3%", width: "51px", height: "51px" }} />
        </Box>
    );
}
