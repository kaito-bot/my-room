export default function (ele) {
  ele.style.overflow = "hidden";
  ele.innerHTML = ele.innerText
    .split("")
    .map((char) => {
      if (char === " ") {
        return `<span>${char}</span>`;
      }
      return `<span class="animate-it">${char}</span>`;
    })
    .join("");
  return ele;
}
