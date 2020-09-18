import React from "react";
import "./Checkbox.css";

export default function Checkbox(props) {
  return (
    <label className={`todos__label ${props.label ? 'todos__label_left' : 'todos__label_right'}`} title={props.title}>
      {props.label}
      <input
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
        className="todos__checkbox"
      />
      <span className={`
          todos__styledCheckbox 
          ${props.label ? 'todos__styledCheckbox_right' : 'todos__styledCheckbox_left'} 
          ${props.type === 'forTodo' ? 'todos__styledCheckbox_todo' : 'todos__styledCheckbox_filter'}
          `} />
    </label>
  );
}
