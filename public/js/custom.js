let side_bar = document.querySelector(".sidebar");
let header = document.querySelector(".header");
let content = document.querySelector(".content");
let sidebar_heading = document.querySelector(".sidebar_heading");

function downLevel(item) {
  let itemId = item.getAttribute("data-level-id");
  let itemClass = item.getAttribute("data-level-class");
  const currentItems = document.querySelectorAll("." + itemClass);
  currentItems.forEach((e) => {
    e.style.display = "none";
  });
  const nextLevelItems = document.querySelectorAll("#" + itemId);
  nextLevelItems.forEach((e) => {
    e.style.display = "block";
  });

  sidebar_heading.innerHTML = item.innerHTML;
}

function upLevel(item) {
  let itemParentClass = item.getAttribute("data-parent-class");
  let itemClass = item.getAttribute("data-level-class");
  const currentItems = document.querySelectorAll("." + itemClass);
  currentItems.forEach((e) => {
    e.style.display = "none";
  });
  const nextLevelItems = document.querySelectorAll("." + itemParentClass);
  nextLevelItems.forEach((e) => {
    e.style.display = "block";
  });
  sidebar_heading.innerHTML = "Note Books";
}

function upLevel2(item) {
  let itemParentId = item.getAttribute("data-parent-id");
  let itemClass = item.getAttribute("data-level-class");
  let sidebar_heading_selector = "[data-level-id =" + itemParentId + "]";

  const currentItems = document.querySelectorAll("." + itemClass);
  currentItems.forEach((e) => {
    e.style.display = "none";
  });
  const nextLevelItems = document.querySelectorAll("#" + itemParentId);
  nextLevelItems.forEach((e) => {
    e.style.display = "block";
  });
  sidebar_heading.innerHTML = document.querySelector(
    sidebar_heading_selector
  ).innerHTML;
}

function toggleSideBar(item) {
  item.classList.toggle("active");

  if (side_bar.style.display == "block") {
    side_bar.style.display = "none";
    content.style.display = "block";
    header.style.display = "block";
  } else {
    side_bar.style.display = "block";
    content.style.display = "none";
    header.style.display = "none";
  }
}
