import React from "react";
import "./Section.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TodoList from "../TodoList/TodoList";
import TodoItem from "../TodoItem/TodoItem";
import Checkbox from "../Checkbox/Checkbox.jsx";
import {todos as todosList} from "../../utils/todos";

/** Компонет "Секция" */
export default function Section() {
  const [todos, setTodos] = React.useState(todosList);
  const [todosForRender, setTodosForRender] = React.useState(todos);
  const [inputValue, setInputValue] = React.useState('');
  const [buttonValue, setButtonValue] = React.useState('Добавить');
  const [selectedTodoId, setSelectedTodoId] = React.useState('');
  const [checkDoneTodos, setCheckDoneTodos] = React.useState(true);
  const [checkNotDoneTodos, setCheckNotDoneTodos] = React.useState(true);

  /** Проверка перерендеринга */
  React.useEffect(() => {
    filterTodos();
  }, [todos, checkDoneTodos, checkNotDoneTodos]);

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
    setTodos([{id: Date.now(), text: text, isChecked: false}, ...todos]);
    clearForm();
    setCheckNotDoneTodos(true);
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

  /**  */
  function handleCheckbox(booleen, id, text) {
    let newTodos = [];
    for (let todo of todos) {
      if (todo.id !== id) {
        newTodos.push(todo);
      } else {
        newTodos.push({id: id, text: text, isChecked: booleen});
      }
    };
    setTodos(newTodos);
  };

  /** Обработка чека выполненных todo */
  function handleCheckDoneTodos() {
    setCheckDoneTodos(!checkDoneTodos);
  }
  
  /** Обработка чека невыполненных todo */
  function handleCheckNotDoneTodos() {
    setCheckNotDoneTodos(!checkNotDoneTodos);
  }

  /** Фильтрация списка todo в зависимости от выбранных чекбоксов */
  function filterTodos() {
    let newTodos = [];
    if (checkDoneTodos && checkNotDoneTodos) {
      for (let todo of todos) {
        newTodos.push(todo);
      };
    } else if (checkDoneTodos && !checkNotDoneTodos) {
      for (let todo of todos) {
        if (todo.isChecked) {
          newTodos.push(todo);
        };
      };
    } else if (!checkDoneTodos && checkNotDoneTodos) {
      for (let todo of todos) {
        if (!todo.isChecked) {
          newTodos.push(todo);
        };
      };
    }
    setTodosForRender(newTodos);
  }


  /** Отрисовка компонента */
  return (
    <section className="todos">
      <form className="todos__form">
        <div className="todos__fieldset">
        <span className="todos__legend">Вывести на экран:</span>
          <Checkbox onChange={handleCheckNotDoneTodos} checked={checkNotDoneTodos} label="Не выполненные" type="forFilter" />
          <Checkbox onChange={handleCheckDoneTodos} checked={checkDoneTodos} label="Выполненные" type="forFilter" />
        </div>
      </form>
      <form
        name="todo-form"
        className="todos__form"
        onSubmit={handleFormSubmit}
      >
        <Input
          placeholder="Следующее дело..."
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button className="todos__submit-btn" text={buttonValue} />
      </form>
      <TodoList>
        {
        todosForRender.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              text={todo.text}
              id={todo.id}
              isChecked={todo.isChecked}
              handleCheckbox={handleCheckbox}
              handleTodoEdit={handleTodoEdit}
              handleTodoDublicate={handleTodoDublicate}
              handleTodoDelete={handleTodoDelete}
            />
          );
        })}
      </TodoList>
    </section>
  );
}
