import React, {useEffect,  useState} from 'react';
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

const ProjectListItem = ({navigateToProject, task }) => {
    return (
        <ListItem disablePadding  >
            <ListItemButton >
                <div className='content' onClick={() => {navigateToProject() }}>
                        <ListItemText primary={task.name}   primaryTypographyProps={{
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

const PrinterPage = () => {
    const location = useLocation();
    const { pathname } = location;
    const uid = pathname.split('/').pop();

    const {printers} = usePrinters();
    const parsePrinter =(printers) =>{
        for (let i = 0;i<printers.length;i++){
            if (printers[i].uid === uid){
                return printers[i]
            }
        }        
    }
    const printer = parsePrinter(printers)
    const status = printer.status
    const name = printer.name 

    const navigateToProject =() =>{
        navigate(`/printer/${uid}/layers`,)
    }

    const [projects, setProjects] = useState([]);
    const parseProjects = () => {
        const localProjects = localStorage.getItem(uid)
        
        if (localProjects) { // Проверяем, есть ли данные
            const projects = JSON.parse(localProjects)
            setProjects(projects); // Обновляем состояние
        }else {
            // Если localTasks пустой, устанавливаем тестовый таск
            const initialProjects = [{"name":"testProject", "status":"50%", "id":"0", "layers_len":"5"}];// task = {name:string, status:string, id:num, layers_len:num}
            setProjects(initialProjects);
            localStorage.setItem(uid, JSON.stringify(initialProjects));
        }
    }
    useEffect(() => {
         parseProjects()
    },[])
    
    


    const matches = useMediaQuery('(max-width:768px)'); // MUI хук медиа запрос 

    let navigate = useNavigate();
    const navigateBack = () => {
        navigate(`/`,)
    }
    return (
        <div className='printer_page'>
            <div className="printer_top">
                <Fab onClick={() => { navigateBack() }} size={matches ? 'small' : 'large'}
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
                    {projects.map((project) => (
                        <ProjectListItem navigateToProject={navigateToProject} task={project} key={project.id} />
                    ))}
                </List>
            </div>

        </div>
    )
}
export default PrinterPage