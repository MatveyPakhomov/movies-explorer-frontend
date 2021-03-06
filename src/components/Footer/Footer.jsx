import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const pathname = location.pathname;
  const arr = ["/", "/movies", "/saved-movies"];
  const match = arr.includes(pathname, 0);
  const currentYear = new Date().getFullYear();

  return match ? (
    <footer className="footer">
      <div className="footer__section">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
      </div>
      <div className="footer__links-section">
        <p className="footer__links-year">&copy; {currentYear}</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/" className="footer__link">
            Github
          </a>
          <a href="https://ru-ru.facebook.com/" className="footer__link">
            Facebook (был когда-то)
          </a>
        </div>
      </div>
    </footer>
  ) : null;
}
