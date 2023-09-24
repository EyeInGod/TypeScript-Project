import "./style/style.css";

const rollButton = document.querySelector("[data-roll]");
const adviceContainer = document.querySelector("[data-advice]");

const fetchAdvice = () => {
  console.log("fetching");
};

rollButton?.addEventListener("click", fetchAdvice);
