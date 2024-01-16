import React, {useEffect, useId, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
        <ListItem disablePadding  >
            <ListItemButton>
                <div className='content' >
                        <ListItemText primary={task.name}  onClick={() => { }} primaryTypographyProps={{
                            sx: {
                                color: 'var(--text-color)',
                                fontWeight: 'bold',
                                paddingBottom: '10px',
                                fontSize: '20px',
                                
                            }
                        }}   >
                        </ListItemText>
                        
                        <ListItemText primaryTypographyProps={{sx: {
                                color: 'var(--text-color)',
                                fontWeight: 'bold',
                                paddingBottom: '10px',
                                fontSize: '20px',
                                display: 'flex',
                                justifyContent:'flex-end',                        
                            }}}  primary={task.status}></ListItemText>
                            </div>
                    </ListItemButton>
                
        </ListItem>
    )
}
// task = {name:string, status:string, id:num, layers_len:num}
// в localStorage {uid:[task 1, task 2 ... task n]}
//const testObj = [{"name":"testTask", "status":"50%", "id":"0", "layers_len":"5"}]
const PrinterPage = () => {
    const location = useLocation();
    const { pathname } = location;
    const uid = pathname.split('/').pop();

    const status = 'Active'
    const name = 'Test Printer'

    const parsePrinterData = () => {
        
    }

    const [tasks, setTasks] = useState([]);
    const parseTasks = () => {
        const localTasks = localStorage.getItem(uid)
        
        if (localTasks) { // Проверяем, есть ли данные
            const tasks = JSON.parse(localTasks)
            setTasks(tasks); // Обновляем состояние
        }else {
            // Если localTasks пустой, устанавливаем тестовый таск
            const initialTasks = [{"name":"testTask", "status":"50%", "id":"0", "layers_len":"5"}];
            setTasks(initialTasks);
            localStorage.setItem(uid, JSON.stringify(initialTasks));
        }
    }
    useEffect(() => {
         parseTasks()
         console.log(tasks)
    },[uid])
    
    


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
                        <TaskListItem task={task} key={task.id} />
                    ))}
                </List>
            </div>

        </div>
    )
}
export default PrinterPage