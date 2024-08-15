let topBtn = document.getElementById("topBtn");
let pageContent = document.getElementById("pageContent");
let navigationMenu = document.getElementById("navigationMenu");
let headerContainer = document.getElementById("headerContainer");
let siteLogo = document.getElementById("siteLogo");
let siteName = document.getElementById("siteName");
let shortClip = document.getElementById("shortClip");

pageContent.onscroll = () => {
  shrinkNavigationMenu();
  showTopBtn();
};

// Shrink navigation menu and rearrange menu tabs when scrolls down past x amount of px
function shrinkNavigationMenu() {
  if (pageContent.scrollTop > 80) {
    navigationMenu.style.minWidth = "70%";
    navigationMenu.style.paddingLeft = "10rem";
    navigationMenu.style.paddingTop = "0.5rem";
    navigationMenu.style.paddingBottom = "0.5rem";
    navigationMenu.style.borderBottomLeftRadius = "10px";
    navigationMenu.style.borderBottomRightRadius = "10px";
    navigationMenu.style.boxShadow = "8px 8px #ff7878";
    navigationMenu.style.transform = "translateX(25%)";
    headerContainer.style.display = "none";
  } else {
    navigationMenu.style.minWidth = "99%";
    navigationMenu.style.paddingLeft = "0";
    navigationMenu.style.paddingTop = "1rem";
    navigationMenu.style.paddingBottom = "1rem";
    navigationMenu.style.borderBottomLeftRadius = "0";
    navigationMenu.style.borderBottomRightRadius = "0";
    navigationMenu.style.boxShadow = "none";
    navigationMenu.style.transform = "translateX(0)";
    headerContainer.style.display = "block";
  };
};

// Autoscroll animation for wedding photos
let weddingPhotoIdArr = [];
for (i = 1; i < 11; i++) {
  var str = "weddingPhoto" + i;
  weddingPhotoIdArr.push(str);
  console.log(weddingPhotoIdArr);
};

if (pageContent.style.width == "100%" && pageContent.style.height == "100%") {
  window.setInterval(autoScrollImg(false), 10000);
};

function autoScrollImg(isStop) {
  if (isStop == false) {
    console.log((n += 1));
  } else {
    return;
  };
};
