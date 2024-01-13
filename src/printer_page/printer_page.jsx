import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePrinters } from '../printer_context';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './printer_page.css';

const TaskListItem = ({ task }) => {
    return (
        <ListItem disablePadding >
            <ListItemButton>

                <ListItemText onClick={() => { }} primaryTypographyProps={{
                    sx: {
                        color: 'var(--text-color)',
                        fontWeight: 'bold',
                        paddingBottom: '10px',
                        fontSize: '20px',
                        '@media screen and (max-width: 768px)': {
                            fontSize: '16px',
                        }
                    }
                }}  >
                    {task.name}, {task.status}
                </ListItemText>

            </ListItemButton>
        </ListItem>
    )
}
// task = {name:string, status:string, idx:num, layers:object}
// в localStorage {uid:[task 1, task 2 ... task n]}
//const testObj = {name:'testTask', status:'ready', idx:0, layers_len:5}
const PrinterPage = () => {
    const location = useLocation();
    const { pathname } = location;
    const uid = pathname.replace(/\D/g, '');
    const { printers, setPrinters } = usePrinters();
    const status = 'Active'
    const name = 'Test Printer'

    
    
    
    let tasks = localStorage.getItem(uid)
    tasks = JSON.parse(tasks)


    const matches = useMediaQuery('(max-width:768px)'); // MUI хук медиа запрос 

    let navigate = useNavigate();
    const changeRoute = () => {
        navigate(`/`,)
    }
    return (
        <div className='printer_page'>
            <div className="printer_top">
                <Fab onClick={() => { changeRoute() }} size={matches ? 'small' : 'large'}
                    sx={{ bgcolor: 'var(--text-color)' }}>
                    <ArrowBackIcon sx={{ color: 'var(--bg-color)', }} />
                </Fab>
                <div className="printer_about">
                    <Typography variant="h6" className='printer_about_text' gutterBottom>
                        {status}
                    </Typography>
                    <Typography variant="h6" className='printer_about_text' gutterBottom>
                        {name}
                    </Typography>

                </div>
            </div>

            <div className="task_list">
                <List>
                    {tasks.map((task) => (
                        <TaskListItem task={task} key={task.idx} />
                    ))}
                </List>
            </div>

        </div>
    )
}
export default PrinterPage