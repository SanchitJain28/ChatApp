import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Fade, Grow, Slide } from '@mui/material';
import { chatAPI } from '../contexts/ChatContext';

export default function SimpleAlert(props) {
    const { alert, setAlert } = React.useContext(chatAPI)
    const toggleAlert = () => {
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }
    React.useEffect(() => {
        toggleAlert()
    }, [])

    return (
        <>
            <div className="fixed inset-0" >
                <Slide in={true} direction='right'>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity={alert.status} variant="filled" >
                        {alert.msg}
                    </Alert>
                </Slide>
            </div>

        </>

    );
}
