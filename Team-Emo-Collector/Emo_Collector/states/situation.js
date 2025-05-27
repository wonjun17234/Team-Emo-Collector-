// ✅ states/situation.js – 표정 인식 연동 Scene
import { State, currentState, setState } from '../stateManager.js';
import { global } from '../globalStore.js';
import { drawStarMousePointer, setFontStyle } from './utils.js';
import { dropShadowStart, dropShadowEnd } from './utils.js';

let emotions = ["neutral","happy", "sad", "angry","fearful", "disgusted","surprised"];
let capture;
let faceapi;
let detections = [];

let isInitialized = false;

export function Situation() {
  background(0);

  if (!isInitialized) {
    setupFaceApi();
    isInitialized = true;
  }

  if (capture) {
    imageMode(CENTER);
    translate(global.centerX, global.centerY);
    scale(-1, 1); // 좌우반전
    image(capture, 0, 0, 640, 480);
    resetMatrix();
  }

  drawDetections();
}

export function pressedSituation() {
  console.log("pressed in situation scene");
  // 예: 다음 상태로 전환
  setState(State.Home);
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
    withLandmarks: true,
    withExpressions: true,
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
    if (currentState.value === State.Situation && faceapi) {
      faceapi.detect(gotFaces);
    }
  }, 200);
}

function drawDetections() {
  if (detections.length > 0) {
    push();
    translate(40, 30);
    fill(0, 255, 0);
    noStroke();
    textSize(14);
    for (let i = 0; i < emotions.length; i++) {
      const e = emotions[i];
      const level = detections[0].expressions[e];
      text(`${e}: ${level.toFixed(2)}`, 0, i * 25);
      fill(100, 200, 255, 150);
      rect(0, i * 25 + 5, level * 150, 10);
      fill(0, 255, 0);
    }
    pop();
  }
}