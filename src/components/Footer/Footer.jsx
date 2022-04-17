import React from "react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__section">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
      </div>
      <div className="footer__links-section">
        <p className="footer__links-year">&copy; {currentYear}</p>
        <div className="footer__links">
          <a href="http://#" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="http://#" className="footer__link">
            Github
          </a>
          <a href="http://#" className="footer__link">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
