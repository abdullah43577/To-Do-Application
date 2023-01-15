"use strict";

const sunSvg = document.querySelector(".sun");
const moonSvg = document.querySelector(".moon");
const header = document.querySelector("header");
const main = document.querySelector("main");
const containerEl = document.querySelector(".input");
const checkers = document.querySelectorAll('input[type="checkbox"]');
const menuBG = document.querySelector(".menuBtn");
const menuPlaceholders = document.querySelectorAll(".menuBtn > div > p");
const ulItems = document.querySelectorAll(".render");
// const paragraph = document.querySelectorAll(".todo > p");
// const renderedEl = document.querySelectorAll(".renderedEl");

sunSvg.addEventListener("click", () => {
  sunSvg.classList.add("hidden");
  moonSvg.classList.remove("hidden");
  header.classList.add("headerActive");

  main.classList.add("white-bg");
  // // change later
  // paragraph.classList.add("activeTxt");
  input.classList.add("inputActive");
  ulItems.forEach((item) => item.classList.add("renderActive"));
  checkers.forEach((checkbox) => checkbox.classList.add("checkboxActive"));
  menuBG.classList.add("menuActive");

  menuPlaceholders.forEach((placeholder) =>
    placeholder.classList.toggle("activeParagragh")
  );
});

moonSvg.addEventListener("click", () => {
  sunSvg.classList.remove("hidden");
  moonSvg.classList.add("hidden");
  header.classList.remove("headerActive");

  main.classList.remove("white-bg");
  // // change later
  // // paragraph.classList.remove("activeTxt");
  input.classList.remove("inputActive");
  ulItems.forEach((item) => item.classList.remove("renderActive"));
  checkers.forEach((checkbox) => checkbox.classList.remove("checkboxActive"));
  menuBG.classList.remove("menuActive");

  menuPlaceholders.forEach((placeholder) =>
    placeholder.classList.toggle("activeParagragh")
  );
});
