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

// Party venue image slideshow — only runs when panel is visible
let partySlideTimers = {};

function startPartySlideshow(sectionId) {
  let section = document.getElementById(sectionId);
  let imgs = section.querySelectorAll(".partyImg");
  if (imgs.length === 0) return;

  // Reset: show first image
  imgs.forEach(img => img.classList.remove("partyImgActive"));
  imgs[0].classList.add("partyImgActive");
  let idx = 0;

  partySlideTimers[sectionId] = setInterval(() => {
    imgs[idx].classList.remove("partyImgActive");
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add("partyImgActive");
  }, 15000);
}

function stopPartySlideshow(sectionId) {
  if (partySlideTimers[sectionId]) {
    clearInterval(partySlideTimers[sectionId]);
    partySlideTimers[sectionId] = null;
  }
  let section = document.getElementById(sectionId);
  section.querySelectorAll(".partyImg").forEach(img => img.classList.remove("partyImgActive"));
}

// Click Nov 2 -> toggle groomSidePartyDate, click Nov 10 -> toggle brideSidePartyDate
let nov2Date = document.getElementById("nov2Date");
let nov10Date = document.getElementById("nov10Date");
let groomPanel = document.getElementById("groomSidePartyDate");
let bridePanel = document.getElementById("brideSidePartyDate");
let theDateLayout = document.getElementById("theDateLayout");

function updateDateLayout() {
  let anyVisible = groomPanel.classList.contains("partyDateVisible") || bridePanel.classList.contains("partyDateVisible");
  if (anyVisible) {
    theDateLayout.classList.add("dateLayoutLeft");
  } else {
    theDateLayout.classList.remove("dateLayoutLeft");
  }
}

function showPartyPanel(panel, sectionId) {
  panel.classList.remove("partyDateHiding");
  panel.classList.add("partyDateVisible");
  startPartySlideshow(sectionId);
  updateDateLayout();
}

function hidePartyPanel(panel, sectionId) {
  panel.classList.remove("partyDateVisible");
  panel.classList.add("partyDateHiding");
  stopPartySlideshow(sectionId);
  panel.addEventListener("animationend", function handler() {
    panel.classList.remove("partyDateHiding");
    panel.removeEventListener("animationend", handler);
    updateDateLayout();
  });
}

nov2Date.addEventListener("click", () => {
  // Hide bride panel if visible
  if (bridePanel.classList.contains("partyDateVisible")) {
    hidePartyPanel(bridePanel, "brideSidePartyDate");
  }
  // Toggle groom panel
  if (groomPanel.classList.contains("partyDateVisible")) {
    hidePartyPanel(groomPanel, "groomSidePartyDate");
  } else {
    showPartyPanel(groomPanel, "groomSidePartyDate");
  }
});

nov10Date.addEventListener("click", () => {
  // Hide groom panel if visible
  if (groomPanel.classList.contains("partyDateVisible")) {
    hidePartyPanel(groomPanel, "groomSidePartyDate");
  }
  // Toggle bride panel
  if (bridePanel.classList.contains("partyDateVisible")) {
    hidePartyPanel(bridePanel, "brideSidePartyDate");
  } else {
    showPartyPanel(bridePanel, "brideSidePartyDate");
  }
});

// Click any other date cell (not Nov 2 or Nov 10) -> hide all party panels
document.getElementById("calendarContainer").addEventListener("click", (e) => {
  let td = e.target.closest("td");
  if (!td || td === nov2Date || td === nov10Date) return;
  if (groomPanel.classList.contains("partyDateVisible")) {
    hidePartyPanel(groomPanel, "groomSidePartyDate");
  }
  if (bridePanel.classList.contains("partyDateVisible")) {
    hidePartyPanel(bridePanel, "brideSidePartyDate");
  }
});

// Set calendarContainer height to half of groomSidePartyDate
let calendarContainer = document.getElementById("calendarContainer");
let groomSidePartyDate = document.getElementById("groomSidePartyDate");

function syncCalendarHeight() {
  calendarContainer.style.height = (groomSidePartyDate.offsetHeight / 2.05) + "px";
}

syncCalendarHeight();
window.addEventListener("resize", syncCalendarHeight);
