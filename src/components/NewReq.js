import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

import './styles/NewReq.css';

const ISSUECATERORYES = ["Неисправность электрических компонентов", "Неисправность механических компонентов", "Неисправность кабельной системы", "Неисправность системы управления движением", "Неисправность системы сигнализации и оповещения", "Нарушение правил безопасности при работе с лифтом", "Некорректная нагрузка на лифт", "Другое"];

export default function NewReq(){
    const [addressData, setAddressData] = useState([]);

    const [address, setAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [adressFill, setAdressFill] = useState(false);


    const [elevator, setElevator] = useState('');
    const [elevatorSuggestions, setElevatorSuggestions] = useState([]);
    const [elevatorFill, setElevatorFill] = useState(false);

    const [issueCategory, setIssueCategory] = useState('');
    const [issueCategorySuggestions, setIssueCategorySuggestions] = useState([...ISSUECATERORYES]);
    const [issueFill, setIssueFill] = useState(false);

    const [description, setDescription] = useState('');

    const [endReq, SetEndReq] = useState(false);
    const [postError, SetPostError] = useState('');
    useEffect(() => {
      //let today = new Date();
      //let milliseconds = today.getMilliseconds();
      fetch('http://localhost:5000/adress/getadresses', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(response => response.text())
            .then(response => {
              //let today2 = new Date();
              //let milliseconds2 = today2.getMilliseconds();
              //console.log(milliseconds2-milliseconds)
                setAddressSuggestions(JSON.parse(response).map(sug => sug.adress))
                setAddressData(JSON.parse(response))
              });
    } , [])
    
    const handleAddressChange = (e) => {
      const value = e.target.value;
      setAddress(value);
      setElevator('')
      const suggestions = addressData.map(sug => sug.adress); // Mock suggestions
      setAddressSuggestions(suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ));
      activateLiftSelect(value);
    }
    const activateLiftSelect = (value) =>{
        if (addressData.map(sug => sug.adress).includes(value)){
            addressData.map(sug => {
                if (sug.adress === value){
                    setElevatorSuggestions(sug.elevators)
                }})
            return setAdressFill(true)
        }
        setAdressFill(false);
    }
    const activateCategorySelect = (value) =>{
        if (elevatorSuggestions.includes(value)) {
            return setElevatorFill(true)
        }
        else setElevatorFill(false);
    }
    const activateDescrioption = (value) =>{
        if (ISSUECATERORYES.includes(value)) {
            return setIssueFill(true)
        }
        else setIssueFill(false);
    }

    const handleAddressSelect = (selectedAddress) => {
      setAddress(selectedAddress);
      setAddressSuggestions([]);
      activateLiftSelect(selectedAddress);
    };
    const handleElevatorSelect = (selectedElev) => {
        setElevator(selectedElev);
        setElevatorSuggestions([]);
        activateCategorySelect(selectedElev);
      };
    const handleIssueCategorySelect = (selectedIssue) => {
        setIssueCategory(selectedIssue);
        setIssueCategorySuggestions([]);
        activateDescrioption(selectedIssue);
      };
  
    const handleElevatorChange = (e) => {
        const value = e.target.value;
        setElevator(value);
        addressData.map(sug => {
            if (sug.adress === address){
                setElevatorSuggestions(sug.elevators)
            }
        })
        activateCategorySelect(value);
      };
  
    const handleIssueCategoryChange = (e) => {
      setIssueCategory(e.target.value);
      setIssueCategorySuggestions([...ISSUECATERORYES])
      activateDescrioption(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleSubmit = (e) => {
        fetch('http://localhost:5000/lifterror/newlifterror', {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
             }),
            body: JSON.stringify({liftID: elevator, issueCategory, description, date: new Date(), moderated: true
             })
        })
            .then(response => response.text())
            .then(response => {
                let res = JSON.parse(response);
                if (res.message === 'liftError successfully posted'){
                    SetPostError('')
                    SetEndReq(true);
                }
                else SetPostError('Ошибка, проверьте введённые данные')
            })
    }


    return (
      <div className="lift-form">
        <label>
          Выберите адрес:
          <input type="text" value={address} onChange={handleAddressChange} />
          {addressSuggestions.length > 0 && (
            <ul className="suggestions">
              {addressSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleAddressSelect(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </label>
        <br />
        <label  style={adressFill ? {display: "block"} : {display: "none"}}>
          Выберите лифт:
          <input type="text" value={elevator} onChange={handleElevatorChange}/>
          {elevatorSuggestions.length > 0 && (
            <ul className="suggestions">
              {elevatorSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleElevatorSelect(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

        </label>
        <br />
        <label  style={elevatorFill ? {display: "block"} : {display: "none"}}>
          Выберите категорию неисправности:
          <input type="text" value={issueCategory} onChange={handleIssueCategoryChange} />
          {issueCategorySuggestions.length > 0 && (
            <ul className="suggestions">
              {issueCategorySuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleIssueCategorySelect(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </label>
        <br />
        <label  style={issueFill ? {display: "block"} : {display: "none"}}>
          Напишите подробное описание проблемы:
          <textarea value={description} onChange={handleDescriptionChange} maxlength="1000"/>
        </label>
        <button style={issueFill ? {display: "block"} : {display: "none"}} className="button-send" onClick={handleSubmit}>Отправить</button>
      {endReq && <Navigate to="/" />}
      {postError && <label>{postError}</label>}
      </div>
    );
}