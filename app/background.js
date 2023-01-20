"use strict";

const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const header = document.querySelector("header");
const main = document.querySelector("main");
const renderEl = document.querySelectorAll(".render");
const checkbox = document.querySelectorAll("input[type='checkbox']");
const menuBtn = document.querySelector(".menuBtn");
const todoTxtColor = document.querySelectorAll("label :last-child");
const filters = document.querySelectorAll(".menuBtn p");
const elementStates = document.querySelector(".elementStates");

sun.addEventListener("click", () => {
  // return string 'white'
  isDarkOrWhite = "white";
  displayTodo("all");
  sun.classList.add("hidden");
  moon.classList.remove("hidden");
  header.classList.add("headerActive");
  main.classList.add("white-bg");
  input.classList.add("inputActive");
  renderEl.forEach((todoEl) => todoEl.classList.add("whiteBox"));
  checkbox.forEach((boxes) => boxes.classList.add("checkboxActive"));
  menuBtn.classList.add("menuActive");
  todoTxtColor.forEach((texts) => texts.classList.add("activeTxt"));
  filters.forEach((filter) => filter.classList.add("activeParagraph"));
  elementStates.classList.add("white-bg-el");
});

moon.addEventListener("click", () => {
  // return string 'dark'
  isDarkOrWhite = "dark";
  displayTodo("all");
  sun.classList.remove("hidden");
  moon.classList.add("hidden");
  header.classList.remove("headerActive");
  main.classList.remove("white-bg");
  input.classList.remove("inputActive");
  renderEl.forEach((todoEl) => todoEl.classList.remove("whiteBox"));
  checkbox.forEach((boxes) => boxes.classList.remove("checkboxActive"));
  menuBtn.classList.remove("menuActive");
  todoTxtColor.forEach((texts) => texts.classList.remove("activeTxt"));
  filters.forEach((filter) => filter.classList.remove("activeParagraph"));
  elementStates.classList.remove("white-bg-el");
});
