// 화면 상태 정의 (enum처럼 사용)
const State = {
    Home: 0,            // 메인 홈 화면
    ScanFace: 1,        // 얼굴 인식 화면
    Situation: 2,       // 상황 제시 화면
    CollectEmotion: 3,  // 감정 조각 수집 화면
    Report: 4,          // 리포트(결과 요약) 화면
};

// 상태별 입력 처리 함수 매핑 객체 (딕셔너리처럼 사용)
const InputHandler = {
  [State.Home]: pressedHome,
  [State.ScanFace]: pressedScanFace,
  [State.Situation]: pressedSituation,
  [State.CollectEmotion]: pressedCollectEmotion,
  [State.Report]: pressedReport,
};

let currentState = 0; // 현재 화면 상태 (기본값: Home)

// 상태 전환 함수 (정상 범위 체크 포함)
function setCurrentState(i) {
  if (i >= 0 && i <= Object.keys(State).length - 1) {
    currentState = i;
  } else {
    console.warn(`잘못된 인덱스 들어옴 : ${i}`);
  }
}

// 초기 세팅
function setup() {
  fullscreen(true); // 전체화면 모드
  createCanvas(displayWidth, displayHeight); // 화면 해상도에 맞춰 캔버스 생성
}

// 창 크기 변경 시 캔버스 재조정
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 매 프레임마다 현재 상태에 맞는 화면을 그리기
function draw() {
  background(0); // 배경을 검정으로 초기화

  switch (currentState) {
    case State.Home:
      drawHome(); break;
    case State.ScanFace:
      drawScanFace(); break;
    case State.Situation:
      drawSituation(); break;
    case State.CollectEmotion:
      drawCollectEmotion(); break;
    case State.Report:
      drawReport(); break;
  }
}

// 마우스 클릭 시 현재 상태에 맞는 입력 처리
function mousePressed() {
  InputHandler[currentState]?.(); // 정의된 함수가 있을 경우만 실행
}

// 키보드 입력 시 현재 상태에 맞는 입력 처리
function keyPressed() {
  InputHandler[currentState]?.(); // 정의된 함수가 있을 경우만 실행
}

// 상태별 입력 처리 함수 정의 (빈 함수는 나중에 기능 추가 예정)

// [Home] 홈 화면에서의 입력 반응 처리
function pressedHome() {

}

// [ScanFace] 얼굴 인식 화면에서의 입력 처리
function pressedScanFace() {

}

// [Situation] 상황 제시 화면에서의 입력 처리
function pressedSituation() {

}

// [CollectEmotion] 감정 조각 수집 화면에서의 입력 처리
function pressedCollectEmotion() {

}

// [Report] 리포트 화면에서의 입력 처리
function pressedReport() {

}
