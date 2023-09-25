import "./style/style.css";
import Toastify from "toastify-js";
import { Advice, AdviceType } from "./types";

const rollButton = document.querySelector("[data-roll]");
const adviceContainer = document.querySelector("[data-advice]");
const adviceIDElement = document.querySelector("[data-id]");
const adviceDescriptionElement = document.querySelector("[data-description]");

const ADVICE_URL_API = "https://api.adviceslip.com/advice";

const showLoader = (loadingState: boolean) => {
  if (loadingState) {
    adviceContainer?.classList.add("loading");
  } else {
    adviceContainer?.classList.remove("loading");
  }
};

const showToastError = (error: string) => {
  Toastify({
    text: error,
    duration: 1000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
  }).showToast();
};

const renderAdvice = (advice: AdviceType) => {
  if (!adviceIDElement || !adviceDescriptionElement) return;

  adviceIDElement.textContent = String(advice.id);
  adviceDescriptionElement.textContent = advice.advice;
};

const fetchAdvice = async () => {
  try {
    showLoader(true);
    const response = await fetch(ADVICE_URL_API, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Error : ${response.statusText}`);
    }

    const data = await response.json();

    const parsedData = Advice.parse(data.slip);

    renderAdvice(parsedData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      showToastError(err.message);
    }
  } finally {
    showLoader(false);
  }
};

rollButton?.addEventListener("click", fetchAdvice);

fetchAdvice();
