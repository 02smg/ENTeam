// TypeScript: 펫 상태 시뮬레이션과 UI 바인딩 (업데이트된 초기값/애니메이션 유지)
// 빌드: tsc script.ts --outFile script.js

type PetState = "tired" | "happy" | "stressed";

const petCard = document.getElementById("petCard") as HTMLElement | null;
const moodRange = document.getElementById("moodRange") as HTMLInputElement | null;
const randomBtn = document.getElementById("randomMood") as HTMLButtonElement | null;
const petMouth = document.getElementById("petMouth") as SVGPathElement | null;
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement | null;

if (!petCard || !moodRange || !randomBtn || !petMouth) {
  console.warn("UI 요소 일부를 찾을 수 없습니다.");
}

function scoreToState(score: number): PetState {
  if (score <= 30) return "tired";
  if (score <= 70) return "stressed";
  return "happy";
}

function applyState(state: PetState) {
  if (!petCard || !petMouth) return;
  petCard.dataset.state = state;
  switch (state) {
    case "tired":
      petMouth.setAttribute("d", "M70,140 Q100,125 130,140"); // 아래로 처진 입
      break;
    case "stressed":
      petMouth.setAttribute("d", "M75,135 Q100,120 125,135"); // 평범한 입
      break;
    case "happy":
      petMouth.setAttribute("d", "M70,125 Q100,150 130,125"); // 웃는 입
      break;
  }
}

function updateFromRange() {
  const val = moodRange ? parseInt(moodRange.value, 10) : 50;
  const state = scoreToState(val);
  applyState(state);
}

if (moodRange) {
  updateFromRange();
  moodRange.addEventListener("input", () => {
    updateFromRange();
  });
}

if (randomBtn) {
  randomBtn.addEventListener("click", () => {
    const v = Math.floor(Math.random() * 101);
    if (moodRange) moodRange.value = String(v);
    updateFromRange();
  });
}

// 애니메이션 루프: happy 상태에서 부드럽게 떠오르는 효과
let animId = 0;
function animate() {
  const state = (petCard && petCard.dataset.state) as PetState | undefined;
  if (state === "happy") {
    if (petCard) petCard.style.transform = `translateY(${Math.sin(Date.now()/420) * 4}px)`;
  } else {
    if (petCard) petCard.style.transform = "";
  }
  animId = requestAnimationFrame(animate);
}
animate();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isAlt = document.documentElement.classList.toggle("alt-vibe");
    themeToggle.setAttribute("aria-pressed", String(isAlt));
    themeToggle.textContent = isAlt ? "Vibe: Soft" : "Vibe: Bright";
    // 간단한 색감 토글 (클래스만 추가해두면 CSS로 확장 가능)
  });
}

export {};