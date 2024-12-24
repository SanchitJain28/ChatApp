import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Fade, Grow, Slide } from '@mui/material';
import { chatAPI } from '../contexts/ChatContext';
import { AnimatePresence, motion } from 'motion/react';

export default function SimpleAlert(props) {
    const { alert, setAlert } = React.useContext(chatAPI)
    const toggleAlert = () => {
            setAlert(false)
    }
    React.useEffect(() => {
        setTimeout(() => {
            toggleAlert()
        }, 2000)
    }, [])
    React.useEffect(() => {
        setTimeout(() => {
            toggleAlert()
        }, 2000)
    }, [alert])

    return (
        <>
            <AnimatePresence>
                {alert && <motion.div className="fixed inset-0" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }}>
                    <Slide in={true} direction='right'>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity={alert.status} variant="filled" >
                            {alert.msg}
                        </Alert>
                    </Slide>
                </motion.div>}
            </AnimatePresence>


        </>

    );
}
