import React from "react";
import "./Section.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TodoList from "../TodoList/TodoList";
import TodoItem from "../TodoItem/TodoItem";
import {todos as todosList} from "../../utils/todos";
import { useEffect } from "react";

/** Компонет "Секция" */
export default function Section() {
  const [todos, setTodos] = React.useState(todosList);
  const [inputValue, setInputValue] = React.useState('');
  const [buttonValue, setButtonValue] = React.useState('Добавить');

  /** Проверка перерендеринга */
  React.useEffect(() => {
    console.log(todos);
  }, [todos]);

  /** Получение значение инпута */
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  
  /** Обработка сабмита формы */
  function handleFormSubmit(event) {
    setTodos([{id: Date.now(), text: inputValue}, ...todos]);
    clearForm();
    event.preventDefault();
  }

  /** Очистка формы */
  function clearForm() {
    setButtonValue('Добавить');
    setInputValue('');
  }


  
  /** Отрисовка компонента */
  return (
    <section className="todos">
      <Form onSubmit={handleFormSubmit}>
        <Input
          placeholder="Следующее дело..."
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button className="todos__submit-btn" text={buttonValue} />
      </Form>
      <TodoList>
        {todos.map((todo, index) => {
          return (
            <TodoItem 
              key={todo.id} 
              index={index}
              text={todo.text} 
              id={todo.id} />
          );
        })}
      </TodoList>
    </section>
  );
}
