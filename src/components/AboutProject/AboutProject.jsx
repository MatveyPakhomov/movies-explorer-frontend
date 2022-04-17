import React from "react";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="aboutProject" name="aboutProject">
      <div className="aboutProject__section">
        <h2 className="aboutProject__title">О проекте</h2>
      </div>
      <div className="aboutProject__info-section">
        <span className="aboutProject__info">
          <h3 className="aboutProject__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </span>
        <span className="aboutProject__info">
          <h3 className="aboutProject__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </span>
      </div>
      <div className="aboutProject__infographic-section">
        <span className="aboutProject__infographic-backend">
          <div className="aboutProject__infographic aboutProject__backend-colorizer">
            <p className="aboutProject__infographic-title">1 неделя</p>
          </div>
          <p className="aboutProject__infographic-subtitle">Back-end</p>
        </span>
        <span className="aboutProject__infographic-frontend">
          <div className="aboutProject__infographic aboutProject__frontend-colorizer">
            <p className="aboutProject__infographic-title">4 недели</p>
          </div>
          <p className="aboutProject__infographic-subtitle">Front-end</p>
        </span>
      </div>
    </section>
  );
}
