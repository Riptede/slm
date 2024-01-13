import './main_page.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import AddPrinterDrawerComponent from '../components/add_printer_drawer_component';
import OptionsPrinterDrawerComponent from '../components/options_printer_drawer_component';
const PrintListItem = ({ setIsOptionsPrinterDrawerOpen,name, status, uid }) => {
    return (
        <ListItem disablePadding >
            <ListItemButton>

                <ListItemText primary={`${name},  UID:${uid}`} primaryTypographyProps={{
                    sx: {
                        color: 'var(--text-color)',
                        fontWeight: 'bold',
                        paddingBottom: '10px',
                        fontSize: '20px',
                        '@media screen and (max-width: 768px)': {
                            fontSize: '16px',
                        }
                    }
                }} secondaryTypographyProps={{
                    sx: {
                        color: 'var(--text-color)',
                        '@media screen and (max-width: 768px)': {
                            fontSize: '12px',
                        }
                    }
                }} secondary={status} />
                <IconButton onClick={() => { setIsOptionsPrinterDrawerOpen(true) }} >
                    <MenuOutlinedIcon sx={{ color: 'var(--text-color)', fontSize: '30px' }} />
                </IconButton>
            </ListItemButton>
        </ListItem>
    )
}



export default function MainPage() {
    const [isAddPrinterDrawerOpen, setIsAddPrinterDrawerOpen] = useState(false);
    const [isOptionsPrinterDrawerOpen, setIsOptionsPrinterDrawerOpen] = useState(false);

    const [uid, setUid] = useState('');
    const [name, setName] = useState('');

    const [printers, setPrinters] = useState([
        
    ])
    const addPrinterToggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if (open) {
            setUid('');
            setName('');
        }
        setIsAddPrinterDrawerOpen(open);
    };

    const optionsPrinterToggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOptionsPrinterDrawerOpen(open);
    }
    const deletePrinter = (printers, setPrinters) => {
        console.log(printers);
    }

    const handleUserDataChange = (uid, name) => {
        setIsAddPrinterDrawerOpen(false);
        addPrinterToggleDrawer(false);
        setPrinters([...printers, { idx: printers.length, name: name, status: 'Ожидает подключения', uid: uid }]);
    }

    return (

        <div className="main_page">
            <div className="add_print">
                <Button onClick={addPrinterToggleDrawer(true)} className='add_print_btn' sx={
                    {
                        color: 'var(--text-color)',
                        borderColor: 'var(--text-color)',
                        padding: '20px 40px',
                    }
                } variant="outlined">Добавить принтер</Button>

            </div>
            <div className="print_list_wrapper">
                <List>
                    {printers.map((printer) => (
                        <PrintListItem setIsOptionsPrinterDrawerOpen={setIsOptionsPrinterDrawerOpen} uid={printer.uid} key={printer.idx} name={printer.name} status={printer.status} />
                    ))}
                </List>
            </div>
            <div className="drawers">
                <AddPrinterDrawerComponent
                    uid={uid}
                    name={name}
                    setUid={setUid}
                    setName={setName}
                    handleUserDataChange={handleUserDataChange}
                    printers={printers}
                    isDrawerOpen={isAddPrinterDrawerOpen}
                    toggleDrawer={addPrinterToggleDrawer} />
                <OptionsPrinterDrawerComponent printers={printers} setPrinters={setPrinters} toggleDrawer={optionsPrinterToggleDrawer} deletePrinter={deletePrinter} isDrawerOpen={isOptionsPrinterDrawerOpen} />
            </div>
        </div>
    )
}