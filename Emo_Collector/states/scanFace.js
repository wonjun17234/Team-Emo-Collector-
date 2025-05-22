import { State, setState } from '../stateManager.js';
import { global } from '../globalStore.js';
import { drawStarMousePointer, setFontStyle } from './utils.js';
import { dropShadowStart, dropShadowEnd } from './utils.js';

let cam;

export function drawScanFace() {
  background(0);

  if (!cam) {
    cam = createCapture(VIDEO);
    cam.size(640, 480);
    cam.hide();
  }

  push();
  translate(global.centerX, global.centerY);

  // 반전 시작
  scale(-1, 1); // X축 반전
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(0, 0, 300, 0, TWO_PI);
  drawingContext.clip();

  // 반전된 상태에서 그리므로 X좌표는 음수로 줘야 중심에 맞음
  imageMode(CENTER);
  image(cam, 0, 0, 640, 480);

  drawingContext.restore();
  pop();

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("얼굴을 중앙에 맞춰주세요", global.centerX, global.centerY + 280);
}

export function pressedScanFace() {
  console.log("스캔 상태에서 클릭됨");
  setState(State.Situation);
} 