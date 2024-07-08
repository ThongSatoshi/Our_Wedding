// Show topBtn when scrolls down past x amount of px
function showTopBtn() {
  if (pageContent.scrollTop > 1000) {
    topBtn.style.display = "block";
  } else {
    return (topBtn.style.display = "none");
  }
}

// When user clicks on the button, scroll to the top of the document
topBtn.onclick = () => {
  scrollTopFunction();
};

function scrollTopFunction() {
  pageContent.scrollTop = 0;
}

// When user clicks on the site logo, reload page
siteLogo.onclick = () => {
  reloadPage();
};

function reloadPage() {
  window.location.reload();
}
