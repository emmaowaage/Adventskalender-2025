(function () {
  const heading = document.querySelector("h1");
  if (!heading) return;

  // Lag display-element
  const countdownEl = document.createElement("p");
  countdownEl.id = "countdown";
  countdownEl.style.textAlign = "center";
  countdownEl.style.marginBottom = "10px";
  countdownEl.style.fontSize = "1.3rem";
  countdownEl.style.color = "#d73f3f";
  countdownEl.style.fontWeight = "bold";

  heading.insertAdjacentElement("afterend", countdownEl);

  (function() {
  const countdownEl = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date();
    let xmas = new Date(now.getFullYear(), 11, 24, 0, 0, 0); // 25. desember

    // Hvis det er 25. des eller senere → tell mot neste år
    if (now >= xmas) {
      xmas = new Date(now.getFullYear() + 1, 11, 25, 0, 0, 0);
    }

    const diff = xmas - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // 24. desember → vis julaftentekst hele dagen
    const today = now.getDate();
    const month = now.getMonth(); // 11 = desember

    if (today === 24 && month === 11) {
      countdownEl.textContent = "✨ Det er julaften i dag! ✨";
      return;
    }

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    countdownEl.textContent =
      `🎄 ${days} dagar ${h}t ${m}m ${s}s igjen til julafto!`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
  })();

})();
