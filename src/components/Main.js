import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import './styles/Main.css';


export default function Main(){
    const [buttonNum, setButton] = useState(0);
    return (
        <div className="butDiv">
            <button className="mainbutton" onClick={()=>setButton(1)}>Формирование заявок</button>
            <button className="mainbutton" onClick={()=>setButton(2)}>Автоматические срабатывания</button>
            <button className="mainbutton" onClick={()=>setButton(3)}>Распределение заявок</button>
            <button className="mainbutton" onClick={()=>setButton(4)}>Изменение статуса заявки</button>

            {buttonNum===1 && <Navigate to="/newreq" />}
            {buttonNum===2 && <Navigate to="/autoreq" />}
            {buttonNum===3 && <Navigate to="/distribution" />}
            {buttonNum===4 && <Navigate to="/fixed" />}
        </div>
    )
}

