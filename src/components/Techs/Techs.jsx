import React from "react";
import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__section">
        <h2 className="techs__title">Технологии</h2>
      </div>
      <h3 className="techs__name">7 технологий</h3>
      <p className="techs__about">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__item">
          <p className="techs__item-title">HTML</p>
        </li>
        <li className="techs__item">
          <p className="techs__item-title">CSS</p>
        </li>
        <li className="techs__item">
          <p className="techs__item-title">JS</p>
        </li>
        <li className="techs__item">
          <p className="techs__item-title">React</p>
        </li>
        <li className="techs__item">
          <p className="techs__item-title">Git</p>
        </li>
        <li className="techs__item">
          <p className="techs__item-title">Express.js</p>
        </li>
        <li className="techs__item">
          <p className="techs__item-title">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}
