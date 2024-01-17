import React from 'react';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { usePrinters } from '../context/printer_context';

const AddPrinterDrawerComponent = ({uid, name, setUid, setName,handleUserDataChange,isDrawerOpen, toggleDrawer }) => {
 
  const handleUidChange = (event) => {
    const value = event.target.value
    if (value === '' || /^[0-9]+$/.test(value)) {
      setUid(value);
    }
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const {printers} = usePrinters()
  const handleSubmit =() =>{
    for (let printer of printers){
      if (printer.uid === uid) return;
    }
    if (!uid || !name) {
      return;
    }
    handleUserDataChange(uid, name);
  } 


  const drawerContent = () => (
    
    <div>
      <div className="inputs" style={{margin: '0px 15px'}}>
          <TextField
          fullWidth
          id="uid-input"
          label="Введите UID"
          variant="standard"
          margin="normal"
          InputLabelProps={{
            style: { color: 'var(--text-color)' }, // Цвет метки
          }}
          sx={{
            '& .MuiInput-underline:after': {
              borderBottomColor: 'var(--text-color)', // Цвет подчеркивания во время фокуса
            },
          }}
          value ={uid}
          onChange={handleUidChange}
        />
        <TextField
          fullWidth
          id="name-input"
          label="Введите имя"
          variant="standard"
          margin="normal"
          InputLabelProps={{
            style: { color: 'var(--text-color)' }, // Цвет метки
          }}
          sx={{
            '& .MuiInput-underline:after': {
              borderBottomColor: 'var(--text-color)', // Цвет подчеркивания во время фокуса
            },
          }}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      
      <div style={{display: 'flex', justifyContent: 'center',   margin: '15px 0px'}}>
        <Button onClick={handleSubmit} variant="outlined" style={{borderColor: 'var(--text-color)',backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
          Добавить принтер
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Drawer sx={{
        '& .MuiDrawer-paper': {
          maxWidth: '50%',
          margin: '0 auto',
          bgcolor: 'var(--bg-color)',
          borderRadius: '25px 25px 0 0',
          '@media (max-width: 768px)': {
            maxWidth: '100%',
          }
        },
      }}
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent()}
      </Drawer>
    </div>
  );
};

export default AddPrinterDrawerComponent;