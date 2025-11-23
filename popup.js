function openDoor(day) {
  const today = new Date().getDate();
  const door = document.querySelector(`.door[data-day="${day}"]`);
  if (today < day) {
    showPopup("Du kan ikkje åpna dinna luko endo!\nVær litt tålmodig<3");
    return;
  }
  // Marker som åpnet
  door.classList.remove("available");
  door.classList.add("opened");
  localStorage.setItem(`door${day}`, "opened");

  window.location.href = `luke${day}.html`;
}

function showPopup(message) {
  let popup = document.getElementById("popup");

  if (!popup) {
    // Hvis popup ikke finnes på siden, opprett den
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

    // Lukk popup når man klikker på "x"
    document.getElementById("closePopup").onclick = function() {
      popup.style.display = "none";
    };

    // Lukk popup når man klikker utenfor innholdet
    window.onclick = function(event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    };
  }

  // Sett meldingen
  document.getElementById("popupMessage").innerText = message;
  popup.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const doors = document.querySelectorAll(".door");
  const today = new Date().getDate();

  doors.forEach(door => {
    const day = parseInt(door.dataset.day);

    // Sjekk om lukken er åpnet før
    if (localStorage.getItem(`door${day}`) === "opened") {
      door.classList.add("opened");
    } else if (day <= today) {
      door.classList.add("available");
    } else {
      door.classList.add("locked");
    }
  });
});

function resetCalendar() {
  localStorage.clear();
  alert("Kalenderen er nå tilbakestilt!");
  location.reload(); // laster siden på nytt
}