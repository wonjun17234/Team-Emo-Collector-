import { State, currentState, setState } from '../stateManager.js';
import { global } from '../globalStore.js';
import { drawStarMousePointer, setFontStyle } from './utils.js';
import { dropShadowStart, dropShadowEnd } from './utils.js';

let cam;
let capture;
let faceapi;
let detections = [];

let isInitialized = false;

export function ScanFace() {
  background(0);
  imageMode(CORNER);
  image(global.grdImg, 0, 0, width, height);

  // if (!cam) {
  //   cam = createCapture(VIDEO);
  //   cam.size(640, 480);
  //   cam.hide();
  // }

  // push();
  // translate(global.centerX, global.centerY);

  // // 반전 시작
  // scale(-1, 1); // X축 반전
  // drawingContext.save();
  // drawingContext.beginPath();
  // drawingContext.arc(0, 0, 300, 0, TWO_PI);
  // drawingContext.clip();

  // // 반전된 상태에서 그리므로 X좌표는 음수로 줘야 중심에 맞음
  // imageMode(CENTER);
  // image(cam, 0, 0, 640, 480);

  // drawingContext.restore();
  // pop();

  if (!isInitialized) {
      setupFaceApi();
      isInitialized = true;
  }

  if (capture) {
    imageMode(CENTER);
    translate(global.centerX, global.centerY);
    scale(-1, 1); // 좌우반전

    const w = 640;
    const h = 480;
    const r = 40; // 모서리 반지름

    // 🎯 둥근 사각형 마스크 적용
    drawingContext.save();
    drawingContext.beginPath();

    // 💡 HTML5 Canvas 방식으로 라운드 사각형 경로 만들기
    const ctx = drawingContext;
    ctx.moveTo(-w / 2 + r, -h / 2);
    ctx.lineTo(w / 2 - r, -h / 2);
    ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    ctx.lineTo(w / 2, h / 2 - r);
    ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    ctx.lineTo(-w / 2 + r, h / 2);
    ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    ctx.lineTo(-w / 2, -h / 2 + r);
    ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    ctx.closePath();

    drawingContext.clip();

    image(capture, 0, 0, w, h);
    drawingContext.restore();

    stroke(255, 255, 255, 150);
    noFill();
    const radius = 190;
    if (detections.length > 0) {
      const box = detections[0].alignedRect._box;

      const faceW = box._width;
      const faceH = box._height;

      // 얼굴 중심 좌표 (캡처 기준 → 중앙 좌표계로 보정)
      const faceCenterX = box._x + faceW / 2 - 320;
      const faceCenterY = box._y + faceH / 2 - 240;

      // 중앙 원 기준
      
      const distFromCenter = dist(faceCenterX, faceCenterY, 0, 0);

      // 조건 1: 중심이 원 안에 있음
      const centerInside = distFromCenter < radius;

      // 조건 2: 얼굴 전체 크기가 원보다 작음
      const fitsInCircle = faceW < radius * 2 * 0.9 && faceH < radius * 2 * 0.9;
      // 0.9는 여유 여백 (딱 맞으면 안 예쁨)

      const inCircle = centerInside && fitsInCircle;

      // 얼굴 박스 그리기
      stroke(inCircle ? color(0, 255, 50, 150) : color(255, 0, 0, 120));
      strokeWeight(2);
      noFill();
      rectMode(CENTER);
      rect(faceCenterX, faceCenterY, faceW, faceH);
    }

    strokeWeight(25);
    circle(0, 0, radius*2); // 중앙 원
    noStroke();

    resetMatrix();
  }

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("얼굴을 중앙에 맞춰주세요", global.centerX, global.centerY + 280);

  drawStarMousePointer();
}

export function pressedScanFace() {
  // console.log("스캔 상태에서 클릭됨");
  setState(State.Situation);
  // console.log(detections[0])
  isInitialized = false; // 상태 초기화
  if (capture) {
    capture.stop();     // 스트리밍 중지
    capture.remove();   // DOM에서 제거
    capture = null;
  }

  faceapi = null;  // 참조 해제
  detections = [];
} 

function setupFaceApi() {
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  const faceOptions = {
    maxFaces: 1,
    withLandmarks: true,
    // withExpressions: true,
    withDescriptors: false
  };

  faceapi = ml5.faceApi(capture, faceOptions, () => {
    faceapi.detect(gotFaces);
  });
}

function gotFaces(error, result) {
  if (error) return;
  detections = result;

  // 200ms 마다 1회 분석 (초당 5프레임 분석)
  setTimeout(() => {
    if (currentState.value === State.ScanFace && faceapi) {
      faceapi.detect(gotFaces);
    }
  }, 200);
}