"use strict";
import e from "./popup.js";
import { GameBuilder as a, Reason as o } from "./game.js";
import * as r from "./sound.js";
let gamePopUpBanner = new e(),
  game = new a()
    .gameDuration(5)
    .carrotCount(15)
    .bugCount(5)
    .carrotSize(80)
    .build();
game.setGameStopListener((e) => {
  let a;
  switch (e) {
    case o.pause:
      (a = "Replay❓"), r.playAlert();
      break;
    case o.win:
      (a = "You Won 🎉"), r.playWin();
      break;
    case o.lose:
      (a = "You Lost 💀"), r.playBug();
      break;
    default:
      throw Error("not valued reason");
  }
  gamePopUpBanner.showPopUp(a);
}),
  gamePopUpBanner.setOnClickListener(() => {
    game.reStart();
  }),
  game.setHidePopUpListener(() => {
    gamePopUpBanner.hidePopUp();
  });
