let row1 = document.querySelector(".row1");
let row2 = document.querySelector(".row2");
let row3 = document.querySelector(".row3");

window.addEventListener("scroll", function () {
  if (isScrolledIntoView(row1)) {
    row1.style.opacity = "1";
  }
  if (isScrolledIntoView(row2)) {
    row2.style.opacity = "1";
  }  
  if (isScrolledIntoView(row3)) {
    row3.style.opacity = "1";
  }
});

function isScrolledIntoView(elem) {
  let distanceToTop = elem.getBoundingClientRect().top;
  let windowHeight = window.innerHeight;
  return distanceToTop < windowHeight && distanceToTop > -windowHeight;
}
