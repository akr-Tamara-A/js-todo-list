import React from "react";
import './Input.css';

export default function Input(props) {
  return (
    <input
      type="text"
      name="todo"
      className="todos__input"
      placeholder={props.placeholder}
    />
  );
}
