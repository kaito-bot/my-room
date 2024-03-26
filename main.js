import "./style.css";
import Experience from "./Experience/Experience";
const experience = new Experience(document.querySelector(".experience-canvas"));

function redirectTo(url) {
  window.open(url, "_blank");
}

var connectButtons = document.querySelectorAll(".connect-button");
connectButtons.forEach(function (button) {
  button.addEventListener("touchstart", function (event) {
    event.preventDefault();
    console.log("it clicked");
    var url = button.querySelector("a").getAttribute("href");
    redirectTo(url);
  });
});
