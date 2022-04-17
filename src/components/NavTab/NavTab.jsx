import React from "react";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="navTab">
      <a href="#aboutProject" className="navTab__link">
        {"О проекте"}
      </a>
      <a href="#techs" className="navTab__link">
        {"Технологии"}
      </a>
      <a href="#aboutMe" className="navTab__link">
        {"Студент"}
      </a>
    </nav>
  );
}
