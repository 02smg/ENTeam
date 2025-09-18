// main.js - 섹션 애니메이션 및 차트 생성
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for fade-in
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

  document.querySelectorAll("section").forEach((sec) => observer.observe(sec));

  // Smooth scroll
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(
        this.getAttribute("href")
      );
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Chart.js - Retention Chart
  const retentionCtx = document.getElementById("retentionChart");
  if (retentionCtx) {
    new Chart(retentionCtx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 7", "Day 14", "Day 30"],
        datasets: [
          {
            label: "리텐션 (%)",
            data: [100, 60, 45, 30],
            borderColor: "#00c896",
            backgroundColor: "rgba(0,200,150,0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#eee" } },
        },
        scales: {
          x: { ticks: { color: "#eee" } },
          y: { ticks: { color: "#eee" }, min: 0, max: 100 },
        },
      },
    });
  }

  // Chart.js - Growth Chart
  const growthCtx = document.getElementById("growthChart");
  if (growthCtx) {
    new Chart(growthCtx, {
      type: "bar",
      data: {
        labels: ["1년차", "2년차", "3년차"],
        datasets: [
          {
            label: "유료 고객 수",
            data: [500, 5000, 50000],
            backgroundColor: "#00c896",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#eee" } },
        },
        scales: {
          x: { ticks: { color: "#eee" } },
          y: { ticks: { color: "#eee" } },
        },
      },
    });
  }
});
