import React from "react";
import "./SearchForm.css";
import searchImage from "../../images/search.svg";

export default function SearchForm(onSubmit) {
  const [state, setState] = React.useState({
    movie: "",
  });
  const [isSliderOn, setIsSliderOn] = React.useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSliderClick() {
    isSliderOn ? setIsSliderOn(false) : setIsSliderOn(true);
  }


  function handleSubmit(e) {
    e.preventDefault();
    // сюда добавим логику обработки формы регистрации
    const { movie } = state;
    onSubmit(movie);
  }

  return (
    <section className="searchForm">
      <form className="searchForm__form" onSubmit={handleSubmit}>
        <div className="searchForm__section">
          <img
            className="searchForm__search-image"
            src={searchImage}
            alt="Картинка: Лупа в кружке"
          />
          <input
            className="searchForm__input"
            placeholder="Фильм"
            onChange={handleChange}
            required
          />
          <button type="submit" className="searchForm__submit-button">
            Найти
          </button>
        </div>
      </form>
      <div className="searchForm__slider-section">
        <button
          type="button"
          className={isSliderOn ? "searchForm__slider-button_active" : "searchForm__slider-button"}
          onClick={handleSliderClick}
        ></button>
        <p className="searchForm__slider-title">Короткометражки</p>
      </div>
    </section>
  );
}
