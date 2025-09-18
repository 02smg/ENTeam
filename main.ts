// main.ts - 애니메이션 효과 및 네비게이션 스크롤
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  // 페이드 인 효과
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((sec) => observer.observe(sec));

  // 부드러운 스크롤
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(
        (this as HTMLAnchorElement).getAttribute("href")!
      );
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
