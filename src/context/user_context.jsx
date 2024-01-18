import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
const UserContext = createContext();

export const UserProvider =({children}) =>{
    const [user,setUser] = useState(() =>{
        const localData = localStorage.getItem('user');
        
        return localData ? JSON.parse(localData) : null;

        // const telegramUserId = window.Telegram.WebApp.initDataUnsafe.user.id
        // const getUser = axios({
        //     method:'get',
        //     url:`${api}users/${telegramUserId}`
        // }).then(res =>{
        //     return res.data
        // }).catch(
        //     console.log('не найден')
        // )
    })
    useEffect(() => {
        if (!user){
            const telegramChatId = 0;
        
            axios({
                method: 'post',
                url: `${api}users/`,
                data:{
                    telegram_chat_id:telegramChatId,
                    printers:[]
                }
            }).then(function (response) {
                console.log(response)
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));

            }).catch(function (error) {
                console.error("Ошибка сети при создании пользователя: ", error);
            });
            
        }
    }, [user]);
    return (
        
        <UserContext.Provider value={{ user, setUser,  }}>
            {user ? children : <></>}
        </UserContext.Provider>
    );
}
export const useUser = () => {
    const context = useContext(UserContext);
    
    if (context === undefined) {
        throw new Error('useUser must be used within a PrinterProvider');
    }

    return context;
};

