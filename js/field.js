"use strict";
import * as t from "./sound.js";
export const ItemType = Object.freeze({ carrot: "carrot", bug: "bug" });
export class Field {
  constructor(t, e, i, r) {
    (this.carrotCount = t),
      (this.bugCount = e),
      (this.carrotSize = i),
      (this.isGameRunning = r),
      (this.gameField = document.querySelector(".game-field")),
      this.gameField.addEventListener("click", (t) => {
        this.onFieldClick(t);
      });
  }
  setOnClickListener(t) {
    this.onItemClick = t;
  }
  initImage() {
    (this.gameField.innerHTML = ""),
      this.addImage("carrot", this.carrotCount, "./img/carrot.png"),
      this.addImage("bug", this.bugCount, "./img/bug.png");
  }
  addImage(t, e, i) {
    let r = this.gameField.offsetWidth,
      s = this.gameField.offsetHeight,
      o = r - this.carrotSize,
      a = s - this.carrotSize;
    for (let l = 0; l < e; l++) {
      let n = document.createElement("img");
      n.setAttribute("class", t),
        n.setAttribute("alt", t),
        n.setAttribute("src", i);
      let c = Math.floor(Math.random() * o),
        m = Math.floor(Math.random() * a);
      (n.style.left = `${c}px`),
        (n.style.top = `${m}px`),
        this.gameField.appendChild(n);
    }
  }
  onFieldClick(e) {
    if (!this.isGameRunning()) return;
    let i = e.target;
    i.matches(".carrot")
      ? (i.remove(),
        t.playCarrot(),
        this.onItemClick && this.onItemClick(ItemType.carrot))
      : i.matches(".bug") &&
        (t.playBug(), this.onItemClick && this.onItemClick(ItemType.bug));
  }
}
