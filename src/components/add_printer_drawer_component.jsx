import React from 'react';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { usePrinters } from '../context/printer_context';
import { useUser } from '../context/user_context';
import axios from 'axios';

const AddPrinterDrawerComponent = ({ uid, setUid, handleUserDataChange, isDrawerOpen, toggleDrawer }) => {

  const handleUidChange = (event) => {
    setUid(event.target.value)
  }
  const { user } = useUser();

  const { printers, setPrinters } = usePrinters()
  const handleSubmit = () => {

    if (!uid) {
      return;
    }
    axios({
      method: 'get',
      url: `http://158.160.126.165:8000/subscribe_for_printer?printer_uid=${uid}&user_id=${user.id}`
    }).then(function () {
      
      axios({
        method: 'get',
        url: `http://158.160.126.165:8000/get_printers_for_user/${user.id}`,

      }).then(function (response) {
        const printersData = response.data.printers;
        let newPrinter = null;
        for (let printer of printersData){
          if (printer.uid ===  uid){
            newPrinter = printer
          } 
        }
        handleUserDataChange(newPrinter);
      }).catch(error => console.error("Ошибка получения принтеров usera внутри запроса на подписку:" + error))
    
    }).catch(function (error) {
      console.error('Ошибка при подписке на принтер:' + error)
    })

    
  }


  const drawerContent = () => (

    <div>
      <div className="inputs" style={{ margin: '0px 15px' }}>
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
          value={uid}
          onChange={handleUidChange}
        />

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px' }}>
        <Button onClick={handleSubmit} variant="outlined" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
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