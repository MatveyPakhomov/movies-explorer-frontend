import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <section className="pageNotFound">
      <div className="pageNotFound__section">
        <h1 className="pageNotFound__title">404</h1>
        <p className="pageNotFound__subtitle">Страница не найдена</p>
        <button
          className="pageNotFound__button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Назад
        </button>
      </div>
    </section>
  );
}
