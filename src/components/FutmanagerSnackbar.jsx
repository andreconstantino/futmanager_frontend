import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function FutmanagerSnackbar({mensage, type, open, handleClose}) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {mensage}
            </Alert>
        </Snackbar>
    )
}

export default FutmanagerSnackbar;