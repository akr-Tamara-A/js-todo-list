import React from "react";
import './Button.css';

export default function Button(props) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
      {props.text}
      {props.children}
      </button>
  );
}
