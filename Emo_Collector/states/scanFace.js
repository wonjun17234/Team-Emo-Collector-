import { State, setState } from '../stateManager.js';
import { global } from '../globalStore.js';
import { drawStarMousePointer, setFontStyle } from './utils.js';
import { dropShadowStart, dropShadowEnd } from './utils.js';

export function drawScanFace() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("얼굴 인식 중...", global.centerX, global.centerY);

}

export function pressedScanFace() {
  console.log("스캔 상태에서 클릭됨");
  setState(State.Home);
}