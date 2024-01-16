import './layers_page.css';
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LayerInfoDrawerComponent from '../components/layer_info_drawer_component';
 

import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const LayerListItem = ({layer }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    }

    return (
        <>
        <ListItem disablePadding  onClick={toggleDrawer(true)}>
            <ListItemButton >
                        <ListItemText primary={`Слой ${layer.order}`} secondary={layer.timestamp}   primaryTypographyProps={{
                            sx: {
                                color: 'var(--text-color)',
                                fontWeight: 'bold',
                                paddingBottom: '10px',
                                fontSize: '20px',
                                
                            }
                        }} secondaryTypographyProps={{
                            sx: {
                                color: 'var(--text-color)',
                                '@media screen and (max-width: 768px)': {
                                    fontSize: '12px',
                                }
                            } 
                          }}  >
                        </ListItemText>
                        
                       
                    </ListItemButton>
                
        </ListItem>
        
        <LayerInfoDrawerComponent layer={layer} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </>
    )
}


//мне надо: layers_len: из uid, completed_layers_len: хз ,name: из uid,layers: как-то потом через axios

const LayersPage =() =>{ 
    
    const [project, setProject] = useState({})
    const [layers,setLayers] = useState([])
    const location = useLocation();
    const { pathname } = location;
    const parseUid =() =>{
       
        let matches = pathname.match(/\d+/); // \d+ соответствует одной или нескольким цифрам подряд
        let number = parseInt(matches[0], 10);
        return number
    }
    const uid = parseUid()

    const parseProjectId =() =>{
        const regex = /\/(\d+)\/?$/
        const matches = pathname.match(regex);
        
        const lastNumber = parseInt(matches[1], 10);
        return lastNumber
    }

    const parseProjectData =() =>{
        const localProjectsData = localStorage.getItem(uid)
        const projects = JSON.parse(localProjectsData)
        const projectId = parseProjectId()
        for (let project of projects){
           if (project.id == projectId){
                setProject(project)
                
           }
        }
    }
    const parseLayers = (project) => {
        if (!project || !project.name || !project.id) return;
        const localLayers = localStorage.getItem(`${project.name}${project.id}`)
        if (localLayers){
            const layers = JSON.parse(localLayers)
            setLayers(layers);
        }else{
            
            const request = undefined//тут будет логика запроса через axios
            if (!request){
                const initialLayers = [{"id":"0","project_id":"0","order":"1","svg_image":"https://freesvg.org/img/code-break.png","before_melting_image":"https://freesvg.org/img/code-break.png","after_melting_image":"https://freesvg.org/img/code-break.png","warns":[{"rate":"0","reason":[{"wipeError":"0","metalDivisionError":"1"}]}],"timestamp":"13:00,16.01.2024"}] //interface ILayer {id: number,project_id: number,svg_image: string,  //линк в s3, before_melting_image: string, // линк в s3, after_melting_image: string, // линк в s3, warns?: Array<IWarn>, timestamp: number}
                setLayers(initialLayers)
                localStorage.setItem(`${project.name}${project.id}`,JSON.stringify(initialLayers))    
            }
        }
    }

    useEffect(() =>{
        parseProjectData()
        

       
    },[])
    useEffect(() =>{ 
        if (Object.keys(project).length !== 0) {
            parseLayers(project);
        }
    },[project])
    

    let navigate = useNavigate();

    const navigateBack = () => {
        navigate(`/printer/${uid}`,)
    }
    const matches = useMediaQuery('(max-width:768px)');
    return(
        <div className="layers_page">
            <div className="layer_top">
                <Fab onClick={() => { navigateBack() }} size={matches ? 'small' : 'large'}
                    sx={{ bgcolor: 'var(--text-color)' }}>
                    <ArrowBackIcon sx={{ color: 'var(--bg-color)', }} />
                </Fab>
                <div className="layer_about">
                <Typography variant="h6" className='printer_about_text' gutterBottom>
                        <p className="about_text"> 0 слоев из {project.layers_len}</p>   
                    </Typography>
                    <Typography variant="h6" className='printer_about_text' gutterBottom>
                        <p className="about_text">{project.name}</p>    
                    </Typography>
                </div>
                    
                
            </div> 
            {layers ? <div className="layer_list_wrapper">
                        <List>
                            {layers.map((layer) => 
                                <LayerListItem  layer={layer} key={layer.id} />)}
                        </List>
                    </div> : <></>}
            
        </div>
    );
}

export default LayersPage;