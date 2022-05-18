/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <a name="aboutProject" className="main__anhor"></a>
      <AboutProject />
      <a name="techs" className="main__anhor"></a>
      <Techs />
      <a name="aboutMe" className="main__anhor"></a>
      <AboutMe />
      <Portfolio />
    </main>
  );
}
