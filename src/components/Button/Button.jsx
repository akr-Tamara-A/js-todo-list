import React from "react";
import './Button.css';

export default function Button(props) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick} disabled={props.disabled} title={props.title}>
      {props.text}
      {props.children}
      </button>
  );
}
