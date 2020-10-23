import React from "react";
import { useEffect, useState } from "react";
import "./Section.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TodoList from "../TodoList/TodoList";
import TodoItem from "../TodoItem/TodoItem";
import Checkbox from "../Checkbox/Checkbox.jsx";


/** Компонет "Секция" */
export default function Section(props) {
  const [todos, setTodos] = useState([]);
  const [todosForRender, setTodosForRender] = useState(todos);
  const [inputValue, setInputValue] = useState('');
  const [buttonValue, setButtonValue] = useState('Добавить');
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [checkDoneTodos, setCheckDoneTodos] = useState(true);
  const [checkNotDoneTodos, setCheckNotDoneTodos] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('todos')) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, [])

  /** Проверка перерендеринга */
  useEffect(() => {
    filterTodos();
  }, [todos, checkDoneTodos, checkNotDoneTodos]);


  useEffect(() => {
    if (props.fromConfirm.booleen) {
      handleCheckOfTodo(props.fromConfirm.booleen, props.fromConfirm.id, props.fromConfirm.text);
    }
  }, [props.fromConfirm])

  /** Получение значение инпута */
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  
  /** Обработка сабмита формы */
  function handleFormSubmit(event) {
    if (buttonValue === 'Добавить') {
      setTodos([{id: Date.now(), text: inputValue, isChecked: false}, ...todos]);
      clearForm();
      localStorage.setItem('todos', JSON.stringify(todos));
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
      localStorage.setItem('todos', JSON.stringify(todos));
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
    localStorage.setItem('todos', JSON.stringify(todos));
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
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  /** Обработка чека в todo */
  function handleCheckbox(booleen, id, text) {
    if (booleen) {
      props.toConfirm(booleen, id, text);
    } else {
      handleCheckOfTodo(booleen, id, text);
    }
  };
  
   /** Передача в список todos результата чекбокса */
  function handleCheckOfTodo(booleen, id, text) {
    let newTodos = [];
    for (let todo of todos) {
      if (todo.id !== id) {
        newTodos.push(todo);
      } else {
        newTodos.push({id: id, text: text, isChecked: booleen});
      }
    };
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(todos));
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
    localStorage.setItem('todos', JSON.stringify(todos));
  }


  /** Отрисовка компонента */
  return (
    <section className="todos">
      <form className="todos__form">
        <div className="todos__fieldset">
          <span className="todos__legend">Вывести на экран:</span>
          <Checkbox
            onChange={handleCheckNotDoneTodos}
            checked={checkNotDoneTodos}
            label="Не выполненные"
            type="forFilter"
          />
          <Checkbox
            onChange={handleCheckDoneTodos}
            checked={checkDoneTodos}
            label="Выполненные"
            type="forFilter"
          />
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
        <Button
          className="button_type_submit button_style_success"
          text={buttonValue}
          type="submit"
        />
      </form>

        <TodoList>
          {todosForRender.map((todo) => {
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
