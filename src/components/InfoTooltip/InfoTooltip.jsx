import React from "react";
import "./InfoTooltip.css";
import failImage from "../../images/fail.svg";
import successImage from "../../images/success.svg";
import { messages } from "../../utils/utils";

export default function InfoTooltip({ data, ...props }) {
  const answer = data.message;
  const message = messages.find(item => item.name === answer);

  return (
    <div
      className={`popup infoTooltip ${
        props.isOpen ? "infoTooltip_opened" : ""
      }`}
    >
      <div className="infoTooltip__container">
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Кнопка: закрыть"
          className="infoTooltip__close-button"
        ></button>
        <img
          className="infoTooltip__image"
          src={data.className === "success" ? successImage : failImage}
          alt={`Картинка: ${
            data.className === "success" ? "черная галочка" : "красный крестик"
          } в кружке`}
        />
        <p className={`infoTooltip__title`}>{message?.value || ""}</p>
      </div>
    </div>
  );
}
