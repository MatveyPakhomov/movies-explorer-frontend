import React from "react";
import "./AboutMe.css";
import avatar from "../../images/Bill.jpeg";

export default function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__header-section">
        <h2 className="aboutMe__title">Студент</h2>
      </div>
      <div className="aboutMe__info-section">
        <span className="aboutMe__info">
          <h3 className="aboutMe__name">Билл Килгор</h3>
          <p className="aboutMe__job">Подполковник, 40 лет</p>
          <p className="aboutMe__bio">
            Чувствуешь запах? Это напалм, сынок. Больше ничто в мире не пахнет
            так. Я люблю запах напалма поутру. Однажды мы бомбили одну высоту,
            двенадцать часов подряд. И когда всё закончилось, я поднялся на неё.
            Там уже никого не было, даже ни одного вонючего трупа. Но запах!
            Весь холм был им пропитан. Это был запах… победы! Когда-нибудь эта
            война закончится.
          </p>
          <div className="aboutMe__links">
            <a href="http://#" className="aboutMe__link">
              Facebook
            </a>
            <a href="http://#" className="aboutMe__link">
              Github
            </a>
          </div>
        </span>
        <img className="aboutMe__avatar" src={avatar} alt={"аватар"} />
      </div>
    </section>
  );
}
