let topBtn = document.getElementById("topBtn");
let pageContent = document.getElementById("pageContent");
let navigationMenu = document.getElementById("navigationMenu");
let siteLogo = document.getElementById("siteLogo");
let shortClip = document.getElementById("shortClip");
let hamburgerBtn = document.getElementById("hamburgerBtn");
let menuPanel = document.getElementById("menuPanel");
let ourStoryPage = document.getElementById("ourStoryPage");
let scrollNavBar = document.getElementById("scrollNavBar");
let leftArrowBtn = document.getElementById("leftArrowBtn");
let rightArrowBtn = document.getElementById("rightArrowBtn");

// Show navigation bar after initPageContent animation ends, then start auto-scroll from first photo
pageContent.addEventListener("animationend", () => {
  navigationMenu.classList.add("navVisible");

  // Scroll to first photo centered, then start the interval
  currentPhotoIndex = 0;
  const firstPhoto = weddingPhotos[0];
  const firstTargetScroll = firstPhoto.offsetLeft - (imgWrapper.offsetWidth / 2) + (firstPhoto.offsetWidth / 2);
  imgWrapper.scrollTo({ left: firstTargetScroll, behavior: "smooth" });

  setInterval(autoScrollPhotos, 15000);
});

// Toggle menu open/close on click
hamburgerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navigationMenu.classList.toggle("menuOpen");
});

// Close menu when any menu tab is clicked (navigate + close)
document.querySelectorAll(".menuTab").forEach(tab => {
  tab.addEventListener("click", () => {
    navigationMenu.classList.remove("menuOpen");
  });
});

// Close menu when clicking/tapping anywhere outside the nav bar
document.addEventListener("click", (e) => {
  if (!navigationMenu.contains(e.target)) {
    navigationMenu.classList.remove("menuOpen");
  }
});

pageContent.onscroll = () => {
  showTopBtn();
  // Swap nav bars when scrolled past the ourStory section
  if (pageContent.scrollTop >= ourStoryPage.offsetTop) {
    navigationMenu.classList.add("navScrollHidden");
    scrollNavBar.classList.add("scrollNavVisible");
  } else {
    navigationMenu.classList.remove("navScrollHidden");
    scrollNavBar.classList.remove("scrollNavVisible");
  }
};

// Auto-scroll wedding photos every 10 seconds
let imgWrapper = document.getElementById("imgWrapper");
let weddingPhotos = document.querySelectorAll(".weddingPhoto");
let currentPhotoIndex = 0;

function autoScrollPhotos() {
  currentPhotoIndex = (currentPhotoIndex + 1) % weddingPhotos.length;
  const photo = weddingPhotos[currentPhotoIndex];
  const targetScroll = photo.offsetLeft - (imgWrapper.offsetWidth / 2) + (photo.offsetWidth / 2);
  imgWrapper.scrollTo({
    left: targetScroll,
    behavior: "smooth"
  });
};

// Left/right arrow buttons scroll to previous/next photo
leftArrowBtn.addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex - 1 + weddingPhotos.length) % weddingPhotos.length;
  const photo = weddingPhotos[currentPhotoIndex];
  const targetScroll = photo.offsetLeft - (imgWrapper.offsetWidth / 2) + (photo.offsetWidth / 2);
  imgWrapper.scrollTo({ left: targetScroll, behavior: "smooth" });
});

rightArrowBtn.addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex + 1) % weddingPhotos.length;
  const photo = weddingPhotos[currentPhotoIndex];
  const targetScroll = photo.offsetLeft - (imgWrapper.offsetWidth / 2) + (photo.offsetWidth / 2);
  imgWrapper.scrollTo({ left: targetScroll, behavior: "smooth" });
});

// Center clicked wedding photo in the imgWrapper
weddingPhotos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    currentPhotoIndex = index;
    const targetScroll = photo.offsetLeft - (imgWrapper.offsetWidth / 2) + (photo.offsetWidth / 2);
    imgWrapper.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
  });
});
