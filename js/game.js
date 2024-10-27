"use strict";
import { Field as t, ItemType as e } from "./field.js";
import * as s from "./sound.js";
export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  pause: "pause",
});
export class GameBuilder {
  gameDuration(t) {
    return (this.gameDuration = t), this;
  }
  carrotCount(t) {
    return (this.carrotCount = t), this;
  }
  bugCount(t) {
    return (this.bugCount = t), this;
  }
  carrotSize(t) {
    return (this.carrotSize = t), this;
  }
  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount,
      this.carrotSize
    );
  }
}
class Game {
  constructor(e, s, i, a) {
    (this.GAME_DURATION = e),
      (this.gameDuration = e),
      (this.gameBtn = document.querySelector(".game-btn")),
      (this.timer = document.querySelector(".timer")),
      (this.count = document.querySelector(".count")),
      (this.started = !1),
      (this.timerValue = void 0),
      (this.countValue = 0),
      (this.gameField = new t(s, i, a, () => this.started)),
      this.gameField.setOnClickListener(this.onItemClick),
      this.gameBtn.addEventListener("click", () => {
        this.started
          ? this.stop(Reason.pause)
          : (this.start(), (this.started = !0));
      });
  }
  onItemClick = (t) => {
    this.started &&
      (t === e.carrot
        ? (this.countValue++, this.startCount())
        : t === e.bug && this.stop(Reason.lose));
  };
  setGameStopListener(t) {
    this.onGameStop = t;
  }
  setHidePopUpListener(t) {
    this.onHidePopUp = t;
  }
  start() {
    "" === this.gameField.gameField.innerHTML && this.gameField.initImage(),
      this.showStopBtn(),
      this.showTimerAndCount(),
      this.startTimer(),
      this.startCount(),
      this.onHidePopUp(),
      s.playBackground();
  }
  showStopBtn() {
    let t = this.gameBtn.querySelector(".fa-play");
    t.classList.remove("fa-play"), t.classList.add("fa-pause");
  }
  showTimerAndCount() {
    this.timer.classList.add("on"), this.count.classList.add("on");
  }
  startTimer() {
    this.updateTimerText(this.gameDuration),
      (this.timerValue = setInterval(() => {
        if (
          (this.updateTimerText(--this.gameDuration), this.gameDuration <= 0)
        ) {
          this.stop(
            this.countValue === this.gameField.carrotCount
              ? Reason.win
              : Reason.lose
          ),
            clearInterval(this.timerValue);
          return;
        }
      }, 1e3));
  }
  updateTimerText(t) {
    let e = `0${Math.floor(t / 60)}`.substr(-2),
      s = `0${Math.floor(t % 60)}`.substr(-2);
    this.timer.innerHTML = `${e}:${s}`;
  }
  startCount() {
    (this.count.innerHTML = this.gameField.carrotCount - this.countValue),
      this.countValue === this.gameField.carrotCount && this.stop(Reason.win);
  }
  stop(t) {
    (this.started = !1),
      this.stopTimer(),
      this.onGameStop && this.onGameStop(t),
      s.stopBackground(),
      t === Reason.pause ? this.showGameBtn() : this.hideGameBtn();
  }
  stopTimer() {
    clearInterval(this.timerValue);
  }
  showGameBtn() {
    let t = this.gameBtn.querySelector(".fa-pause");
    t.classList.remove("fa-pause"), t.classList.add("fa-play");
  }
  hideGameBtn() {
    this.showGameBtn(), (this.gameBtn.style.visibility = "hidden");
  }
  reStart() {
    (this.gameDuration = this.GAME_DURATION),
      (this.started = !0),
      (this.countValue = 0),
      (this.gameBtn.style.visibility = "visible"),
      this.gameField.initImage(),
      this.start();
  }
}
