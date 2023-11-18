window.onscroll = function() {
    if (window.scrollY >= 100) {
      document.getElementsByClassName("background-div")[0].style.top= "0";
      document.getElementById("signin").style.color="black";
    } else {
      document.getElementsByClassName("background-div")[0].style.top= "-100%";
      document.getElementById("signin").style.color="white";
    }
};

const mainBackground = document.getElementById("main-section-background");
const images = mainBackground.querySelectorAll(".background-image");
function toggleImages(){
  setInterval(()=>{
    images[0].classList.toggle("active");
    images[1].classList.toggle("active");
  },7000);
}
toggleImages();
