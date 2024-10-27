"use strict";
let carrotSound = new Audio("./sound/carrot_pull.mp3"),
  bugSound = new Audio("./sound/bug_pull.mp3"),
  alertSound = new Audio("./sound/alert.wav"),
  winSound = new Audio("./sound/game_win.mp3"),
  bgSound = new Audio("./sound/bg.mp3");
export function playCarrot() {
  playSound(carrotSound);
}
export function playBug() {
  playSound(bugSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playWin() {
  playSound(winSound);
}
export function playBackground() {
  playSound(bgSound);
}
export function stopBackground() {
  stopSound(bgSound);
}
function playSound(n) {
  (n.currentTime = 0), n.play();
}
function stopSound(n) {
  n.pause();
}
