import React from "react";
import "./Portfolio.css";
import linkArrow from "../../images/link-arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://matveypakhomov.github.io/how-to-learn/index.html"
            className="portfolio__link-name"
          >
            Статичный сайт
          </a>
          <img
            className="portfolio__link-img"
            src={linkArrow}
            alt="Картинка: стрелка"
          />
        </li>
        <li className="portfolio__link">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://MatveyPakhomov.github.io/russian-travel/index.html"
            className="portfolio__link-name"
          >
            Адаптивный сайт
          </a>
          <img
            className="portfolio__link-img"
            src={linkArrow}
            alt="Картинка: стрелка"
          />
        </li>
        <li className="portfolio__link">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://matveypakhomov.github.io/mesto/"
            className="portfolio__link-name"
          >
            Одностраничное приложение
          </a>
          <img
            className="portfolio__link-img"
            src={linkArrow}
            alt="Картинка: стрелка"
          />
        </li>
      </ul>
    </section>
  );
}
