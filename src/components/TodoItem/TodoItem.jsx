import React from "react";
import "./TodoItem.css";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox.jsx";

export default function TodoItem(props) {
  const [isChecked, setIsChecked] = React.useState(props.isChecked);

  React.useEffect(() => {
    //console.log(props.isChecked);
    setIsChecked(props.isChecked);
  }, [props.isChecked, setIsChecked]);

  function handleTodoEdit() {
    props.handleTodoEdit(props.text, props.id);
  }

  function handleTodoDublicate() {
    props.handleTodoDublicate(props.text);
  }

  function handleTodoDelete() {
    props.handleTodoDelete(props.id);
  }

  function handleCheckbox() {
    props.handleCheckbox(!isChecked, props.id, props.text);
  }

  return (
    <li className="todo" id={props.id}>
      <Checkbox onChange={handleCheckbox} checked={isChecked} hasLabel={false} type="forTodo" title="Отметить выполненое" />
      <p
        className={`todo__text ${
          props.isChecked ? "todo__text_type_checked" : null
        }`}
      >
        {props.text}
      </p>
      <p className="todo__date">{props.date}</p>
      <Button
        className="button_type_icon todo__btn_type_edit"
        onClick={handleTodoEdit}
        disabled={isChecked}
        title="Редактировать"
        type="button"
      >
        <svg
          width="24"
          height="23"
          viewBox="0 0 24 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4246 21.5861H1.02206V4.8663H10.7842V3.8623H0.0180664V22.5901H19.4285V12.1687H18.4246V21.5861Z"
            fill="white"
          />
          <path
            d="M22.0657 1.43924L21.5771 0.953979C20.9658 0.343135 20.137 0 19.2729 0C18.4088 0 17.58 0.343135 16.9687 0.953979L8.53857 9.38415V14.4777H13.6355L22.0657 6.04756C22.6757 5.43589 23.0183 4.60727 23.0183 3.7434C23.0183 2.87953 22.6757 2.05091 22.0657 1.43924ZM13.2205 13.4871H9.53922V9.80583L16.7144 2.6273L20.3957 6.30859L13.2205 13.4871ZM21.3562 5.33807L21.1018 5.59242L17.4205 1.91112L17.6749 1.65677C18.0977 1.23497 18.6706 0.998085 19.2679 0.998085C19.8652 0.998085 20.438 1.23497 20.8609 1.65677L21.3495 2.14538C21.5598 2.35445 21.7268 2.60293 21.841 2.87661C21.9552 3.15029 22.0143 3.4438 22.0149 3.74034C22.0155 4.03688 21.9576 4.33063 21.8446 4.60479C21.7316 4.87895 21.5656 5.12813 21.3562 5.33807Z"
            fill="white"
          />
        </svg>
      </Button>
      <Button
        className="button_type_icon todo__btn_type_duplicate"
        onClick={handleTodoDublicate}
        title="Дублировать"
        type="button"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0066 12.2745V3.73211C16.0066 1.65872 14.3479 0 12.2745 0H3.73211C1.65872 0 0 1.65872 0 3.73211V12.2745C0 14.3479 1.65872 16.0066 3.73211 16.0066H12.2745C14.3479 16.0066 16.0066 14.3479 16.0066 12.2745ZM0.870825 12.2745V3.73211C0.870825 2.11486 2.15633 0.829358 3.77358 0.829358H12.316C13.9332 0.829358 15.2187 2.11486 15.2187 3.73211V12.2745C15.2187 13.8917 13.9332 15.1773 12.316 15.1773H3.73211C2.15633 15.1773 0.829358 13.8917 0.870825 12.2745Z"
            fill="white"
          />
          <path
            d="M12.0256 24.3001H20.568C22.6414 24.3001 24.3001 22.6414 24.3001 20.568V12.0256C24.3001 9.95217 22.6414 8.29346 20.568 8.29346H19.3239V9.12282H20.568C22.1852 9.12282 23.4707 10.4083 23.4707 12.0256V20.568C23.4707 22.1852 22.1852 23.4707 20.568 23.4707H12.0256C10.4083 23.4707 9.12282 22.1852 9.12282 20.568V19.3239H8.29346V20.568C8.29346 22.5999 9.95217 24.3001 12.0256 24.3001Z"
            fill="white"
          />
        </svg>
      </Button>
      <Button
        className="button_type_icon todo__btn_type_delete"
        onClick={handleTodoDelete}
        disabled={isChecked}
        title="Удалить"
        type="button"
      >
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="16.2637"
            width="23"
            height="1"
            transform="rotate(-45 0 16.2637)"
            fill="white"
          />
          <rect
            x="1"
            width="23"
            height="1"
            transform="rotate(45 1 0)"
            fill="white"
          />
        </svg>
      </Button>
    </li>
  );
}
