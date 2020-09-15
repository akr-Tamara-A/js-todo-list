import React from "react";
import './Button.css';

export default function Button(props) {
  return (
    <button className={`button ${props.className}`}>
      {props.text}
      {props.children}
      </button>
  );
}
