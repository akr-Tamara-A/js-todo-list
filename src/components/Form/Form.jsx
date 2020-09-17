import React from "react";
import './Form.css';

export default function Form(props) {
  return (
    <form name="todo-form" className="todos__form" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}
