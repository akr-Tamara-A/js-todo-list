import React from "react";
import './TodoItem.css';

export default function TodoItem(props) {
  return (
    <li className="todo">
      <p className="todo__text">{props.text}</p>
      {props.children}
    </li>
  );
}
