import React, { useState, useEffect, useRef  }  from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import './styles/AutoReq.css';

export default function Distribution (){
    const [errorsToDistribute, setErrorsToDistribute] = useState([]);
    const [elevators, setElevators] = useState([]);
    const [currentJournalID, setCurrentJournalID] = useState('');
    const [journal, setJournal] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const buttonRef = useRef(null);

    const defaultState = {
        center: [55.141742, 37.452214],
        zoom: 11.5,
      };
    

    const togglePopup = (ID) => {
      if (showPopup && currentJournalID === ID) return 0; 
      setCurrentJournalID(ID)
      if (ID === '') return setShowPopup(false);
      for (let elev of elevators)
        if (elev._id === ID)
            setJournal(elev.journal)
      setShowPopup(true);
    };

    const calculatePopupPosition = () => {
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect();
          return {
            bottom: buttonRect.bottom + window.scrollY,
          };
        }
        return {};
      };
    
    useEffect(() => {
        fetch('http://localhost:5000/lifterror/lifterrorstodistribute', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(response => response.text())
            .then(response => {
               setErrorsToDistribute(JSON.parse(response).slice(0,-1));
               let respParsed = JSON.parse(response);
               let [elevsM] = [...respParsed.slice(-1)];
               setElevators(elevsM);
               console.log(JSON.parse(response));
            });
    } , [])

    const getAdress = (ID) => {
        for (let elev of elevators)
            if (elev._id === ID)
                return `${elev.adress} (${elev.coordX}, ${elev.coordY})`
    }
    return (
    <div className="list-item">
      <YMaps>
        <Map defaultState={defaultState}>
         {(!!errorsToDistribute) ? errorsToDistribute.map((error, index) => {
               return (
                <Placemark geometry={[elevators[index].coordX, elevators[index].coordY]}
                       options={{
                           preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                           iconColor: 'red', }}// цвет иконки, можно также задавать в hex
                        properties={{
                         iconContent: index+1, // пару символов помещается
                         }}//создаём пустой элемент с заданными размерами
                    />)
           }) : <p>Идёт загрузка...</p>}
           <Placemark geometry={[55.15, 37.45]}
                       options={{
                           preset: 'islands#circleIcon',
                           iconColor: 'blue', }}
                        properties={{
                         iconContent: 1,
                         }}
                    />
           <Placemark geometry={[55.12, 37.45]}
                       options={{
                           preset: 'islands#circleIcon',
                           iconColor: 'blue', }}
                        properties={{
                         iconContent: 2,
                         }}
                    /> 
            <Placemark geometry={[55.14, 37.47]}
                       options={{
                           preset: 'islands#circleIcon',
                           iconColor: 'blue', }}
                        properties={{
                         iconContent: 3,
                         }}
                    /> 
          </Map>
        </YMaps>

    {!!errorsToDistribute[0] && 
        errorsToDistribute.map((liftError, index) => 
        <div className='it-block'>  
      <div className="item-info">
        <p><strong>{index+1}. Адрес:</strong> {getAdress(liftError.liftID)}</p>
        <p><strong>ID лифта:</strong> {liftError.liftID} <button ref={buttonRef} onClick={()=>togglePopup(liftError.liftID)}>Журнал</button></p>
        <p><strong>Категория неисправности:</strong> {liftError.issueCategory}</p>
        <p><strong>Описание неисправности:</strong> {liftError.description}</p>
        <p><strong>Дата заявки:</strong> {liftError.date}</p>
      </div>
      <div className="item-actions">Отрправить подразделению:
      <button className="accept-btn">1</button>
      <button className="accept-btn">2</button>
      <button className="reject-btn">3</button>
      </div>
     </div>)
    }
      {showPopup && (
        <div className="popup" style={calculatePopupPosition()}>
          <div className="popup-inner">
            <span className="close-btn" onClick={()=>togglePopup('')}>x</span>
            <p>{journal}</p><br></br>
          </div>
        </div>
      )}
    </div>
  );
}