let topBtn = document.getElementById("topBtn");
let pageContent = document.getElementById("pageContent");
let navigationMenu = document.getElementById("navigationMenu");
let headerContainer = document.getElementById("headerContainer");

pageContent.onscroll = function () {
  shrinkNavigationMenu();
  showTopBtn();
};

// Shrink navigation menu and rearrange menu tabs when scrolls down past x amount of px
function shrinkNavigationMenu() {
  if (pageContent.scrollTop > 80) {
    navigationMenu.style.width = "70vw";
    navigationMenu.style.paddingLeft = "9vw";
    navigationMenu.style.paddingTop = "0.25vh";
    navigationMenu.style.paddingBottom = "0.25vh";
    navigationMenu.style.borderBottomLeftRadius = "10px";
    navigationMenu.style.borderBottomRightRadius = "10px";
    navigationMenu.style.boxShadow = "8px 8px #ff7878";
    navigationMenu.style.transform = "translateX(15vw)";
    headerContainer.style.display = "none";
  } else {
    navigationMenu.style.width = "99vw";
    navigationMenu.style.paddingLeft = "45vw";
    navigationMenu.style.paddingTop = "1vh";
    navigationMenu.style.paddingBottom = "1vh";
    navigationMenu.style.borderRadius = "0";
    navigationMenu.style.boxShadow = "none";
    navigationMenu.style.transform = "translate(0)";
    headerContainer.style.display = "block";
  }
}

// Show topBtn when scrolls down past x amount of px
function showTopBtn() {
  if (pageContent.scrollTop > 1000) {
    topBtn.style.display = "block";
  } else {
    return (topBtn.style.display = "none");
  }
}

// When the user clicks on the button, scroll to the top of the document
topBtn.onclick = function () {
  scrollTopFunction();
};

function scrollTopFunction() {
  pageContent.scrollTop = 0;
}
