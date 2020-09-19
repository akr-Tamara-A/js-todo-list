import React from "react";
import "./Popup.css";
import Button from "../Button/Button";

/** Компонент попап */
export default function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : "popup_closed"}`}>
      <form className="popup__form" onSubmit={props.onCLickYes} >
        <p className="popup__title">{props.text}</p>
        <Button 
          className="button_type_submit button_style_success" 
          text="Подтвердить" 
          type="submit"/>
        <Button 
          className="button_type_submit button_style_refuse" 
          text="Еще нет" onClick={props.onCLickNo} 
          type="button"/>
      </form>
    </div>
  );
}