import React from "react";
import './TodoList.css';

export default function TodoList(props) {
  return (
    <ul className="todos__list">
      {props.children}
    </ul>
  )
}