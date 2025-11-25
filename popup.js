function openDoor(day) {
  const today = new Date().getDate();
  const door = document.querySelector(`.door[data-day="${day}"]`);

  if (today < day) {
    showPopup("Du kan ikkje åpna dinna luko endo!\nVær litt tålmodig<3");
    return;
  }

  // Markér som åpnet
  door.classList.remove("available");
  door.classList.add("opened");
  localStorage.setItem(`${calendarOwner}-door${day}`, "opened");

  window.location.href = `luke${day}.html`;
}

// ---------------- POPUP ---------------------

function showPopup(message) {
  let popup = document.getElementById("popup");

  if (!popup) {
    popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup";
    popup.innerHTML = `
      <div class="popup-content">
        <span id="closePopup" class="close">&times;</span>
        <p id="popupMessage"></p>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("closePopup").onclick = () => {
      popup.style.display = "none";
    };

    window.onclick = event => {
      if (event.target === popup) popup.style.display = "none";
    };
  }

  document.getElementById("popupMessage").innerText = message;
  popup.style.display = "flex";
}

// ---------------- STATUS PÅ LUKENE ---------------------

document.addEventListener("DOMContentLoaded", () => {
  const doors = document.querySelectorAll(".door");
  const today = new Date().getDate();

  doors.forEach(door => {
    const day = parseInt(door.dataset.day);

    const state = localStorage.getItem(`${calendarOwner}-door${day}`);

    if (state === "opened") {
      door.classList.add("opened");

      // Sett bilde på åpne luker
      const imgPath = `../images/${calendarOwner}/day${day}.jpg`;
      door.style.backgroundImage = `url('${imgPath}')`;
      door.style.backgroundSize = "cover";
      door.style.backgroundPosition = "center";
      door.textContent = "";

    } else if (day <= today) {
      door.classList.add("available");
    } else {
      door.classList.add("locked");
    }
  });
});

// ---------------- RESET ---------------------

function resetCalendar() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(calendarOwner + "-door"))
    .forEach(key => localStorage.removeItem(key));

  alert("Kalenderen er nå tilbakestilt!");
  location.reload();
}