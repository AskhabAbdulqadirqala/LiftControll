import React, { useState, useEffect, useRef  }  from 'react';

import './styles/AutoReq.css';

export default function AutoReq (){
    const [errorsToModerate, setErrorsToModerate] = useState([]);
    const [elevatorsToModerate, setElevatorsToModerate] = useState([]);
    const [currentJournalID, setCurrentJournalID] = useState('');
    const [journal, setJournal] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const buttonRef = useRef(null);

    const togglePopup = (ID) => {
      if (showPopup && currentJournalID === ID) return 0; 
      setCurrentJournalID(ID)
      if (ID === '') return setShowPopup(false);
      for (let elev of elevatorsToModerate)
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
      fetch('http://localhost:5000/lifterror/lifterrorstomoder', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(response => response.text())
            .then(response => {
               setErrorsToModerate(JSON.parse(response).slice(0,-1));
               
               let respParsed = JSON.parse(response);
               let [elevsM] = [...respParsed.slice(-1)];
               setElevatorsToModerate(elevsM); 
            });
    } , [showPopup])

    const getAdress = (ID) => {
        for (let elev of elevatorsToModerate)
            if (elev._id === ID)
                return `${elev.adress} (${elev.coordX}, ${elev.coordY})`
    }
    const acceptError = (ID) => {
      editErrorStatus(ID, true)
    }
    const editErrorStatus = (ID, status) => {
      fetch('http://localhost:5000/lifterror/editstatus', {
        method: 'POST',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
         }),
        body: JSON.stringify({liftID: ID, status})
      })
    }

    const deleteError = (ID) => {
      editErrorStatus(ID, false)
    }
    return (
    <div className="list-item">
    {!!errorsToModerate[0] && 
        errorsToModerate.map(liftError => 
        <div className='it-block'>
      <div className="item-info">
        <p><strong>Адрес:</strong> {getAdress(liftError.liftID)}</p>
        <p><strong>ID лифта:</strong> {liftError.liftID} <button ref={buttonRef} onClick={()=>togglePopup(liftError.liftID)}>Журнал</button></p>
        <p><strong>Категория неисправности:</strong> {liftError.issueCategory}</p>
        <p><strong>Описание неисправности:</strong> {liftError.description}</p>
        <p><strong>Дата заявки:</strong> {liftError.date}</p>
      </div>
      <div className="item-actions">
        <button className="accept-btn" onClick={() => acceptError(liftError.liftID)}>Принять</button>
        <button className="reject-btn" onClick={() => deleteError(liftError.liftID)}>Отклонить</button>
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