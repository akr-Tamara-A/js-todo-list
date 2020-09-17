import React from "react";
import "./Section.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TodoList from "../TodoList/TodoList";
import TodoItem from "../TodoItem/TodoItem";
import {todos as todosList} from "../../utils/todos";

/** Компонет "Секция" */
export default function Section() {
  const [todos, setTodos] = React.useState(todosList);
  const [inputValue, setInputValue] = React.useState('');
  const [buttonValue, setButtonValue] = React.useState('Добавить');
  const [selectedTodoId, setSelectedTodoId] = React.useState('');

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
    if (buttonValue === 'Добавить') {
      setTodos([{id: Date.now(), text: inputValue, isChecked: false}, ...todos]);
      clearForm();
      event.preventDefault();
    } else if (buttonValue === 'Сохранить') {
      let newTodos = [];
      for (let todo of todos) {
        if (todo.id !== selectedTodoId) {
          newTodos.push(todo);
        } else {
          newTodos.push({id: selectedTodoId, text: inputValue, isChecked: false});
        }
      };
      setTodos(newTodos);
      clearForm();
      event.preventDefault();
    }
  }

  /** Очистка формы */
  function clearForm() {
    setButtonValue('Добавить');
    setInputValue('');
  }

  /** Обработка редактирования todo */
  function handleTodoEdit(text, id) {
    setSelectedTodoId(id);
    setInputValue(text);
    setButtonValue('Сохранить');
  }

  /** Обработка копирования todo */
  function handleTodoDublicate(text) {
    clearForm();
    setTodos([{id: Date.now(), text: text, isChecked: false}, ...todos]);
  }
  
  /** Обработка удаления todo */
  function handleTodoDelete(id) {
    clearForm();
    let newTodos = [];
    for (let todo of todos) {
      if(todo.id !== id) {
        newTodos.push(todo);
      };
    };
    setTodos(newTodos);
  };

  function handleCheckbox(booleen, id, text) {
    console.log(id + ' ' + booleen);
    let newTodos = [];
    for (let todo of todos) {
      if (todo.id !== id) {
        newTodos.push(todo);
      } else {
        newTodos.push({id: id, text: text, isChecked: booleen});
      }
    };
    setTodos(newTodos);
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
              id={todo.id} 
              isChecked={todo.isChecked}
              handleCheckbox={handleCheckbox}
              handleTodoEdit={handleTodoEdit}
              handleTodoDublicate={handleTodoDublicate}
              handleTodoDelete={handleTodoDelete} />
          );
        })}
      </TodoList>
    </section>
  );
}
