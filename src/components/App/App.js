import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Section from "../Section/Section";
import Footer from "../Footer/Footer";
import PopupWithForm from "../Popup/PopupWithForm";

function App() {  
  const [popupIsOpened, setPopupIsOpened] = React.useState(false);
  const [todoIsDone, setTodoIsDone] = React.useState(false);
  const [todoInfo, setTodoInfo] = React.useState({});

  React.useEffect(() => {
    if (!popupIsOpened) {
      clearData();
    }
  }, [popupIsOpened]);

  /** Обработка подтверждения */
  function handlePopupYes(e) {
    setTodoIsDone(true);
    handlePopupClose();
    e.preventDefault();
  }
  
  /** Обработка отрицания */
  function handlePopupNo() {
    setTodoIsDone(false);
    handlePopupClose();
  }
  
  /** Закрытие попапа */
  function handlePopupClose() {
    setPopupIsOpened(!popupIsOpened);
    //clearData();
  }

  /** Запрос на подтверждение */
  function toConfirm(booleen, id, text) {
    setPopupIsOpened(booleen);
    setTodoInfo({id: id, text: text});
  }

  /** Очистка данных*/
  function clearData() {
    setTodoInfo({id: '', text: ''});
    setTodoIsDone(false);
  }

  return (
    <div className="page__content">
      <Header />
      <Section toConfirm={toConfirm} fromConfirm={{booleen: todoIsDone, id: todoInfo.id, text: todoInfo.text}} />
      <Footer />
      <PopupWithForm isOpen={popupIsOpened} onCLickYes={handlePopupYes} onCLickNo={handlePopupNo} text="А точно сделали?"/>
    </div>
  );
}

export default App;
