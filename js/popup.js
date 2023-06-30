"use strict";
export default class e {
  constructor() {
    (this.gamePopUp = document.querySelector(".game-popup")),
      (this.popUpText = document.querySelector(".popup-text")),
      (this.regameBtn = document.querySelector(".regame-btn")),
      this.regameBtn.addEventListener("click", () => {
        this.onClick && this.onClick();
      });
  }
  setOnClickListener(e) {
    this.onClick = e;
  }
  showPopUp(e) {
    (this.popUpText.innerHTML = e), this.gamePopUp.classList.add("on");
  }
  hidePopUp() {
    this.gamePopUp.classList.remove("on");
  }
}
