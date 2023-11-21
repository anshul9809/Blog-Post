window.onscroll = function() {
  const bars = document.querySelectorAll(".bar");
  const links = document.querySelectorAll("nav.navigation a");
  if (window.scrollY >= 10) {
      document.getElementsByClassName("background-div")[0].style.top= "0";
      document.getElementById("signin").style.color="black";
      for(let bar of bars){
        bar.style.backgroundColor = "black";
      }
      for(let link of links){
        link.style.setProperty('--a-front-color', 'black');
      }
    } else {
      document.getElementsByClassName("background-div")[0].style.top= "-100%";
      document.getElementById("signin").style.color="white";
      for(let bar of bars){
        bar.style.backgroundColor = "white";
      }for(let link of links){
        link.style.setProperty('--a-front-color', 'white');
      }
    }
};

const mainBackground = document.getElementById("main-section-background");
if(mainBackground){
  const images = mainBackground.querySelectorAll(".background-image");
  function toggleImages(){
    setInterval(()=>{
      images[0].classList.toggle("active");
      images[1].classList.toggle("active");
    },7000);
  }
  toggleImages(); 
}

//for toggle menu
const hamburger = document.querySelector(".hamburger-container");
const navigation = document.querySelector(".navigation");

hamburger.addEventListener("click", toggleMenu);

function toggleMenu(){
  hamburger.classList.toggle("open");
  navigation.classList.toggle("show");
}

document.addEventListener("click", function(event){
  const isInsideMenu = navigation.contains(event.target) || hamburger.contains(event.target);
  if(!isInsideMenu && navigation.classList.contains('show')) {
    closeMenu();
  }
});
function closeMenu(){
  hamburger.classList.remove("open");
  navigation.classList.remove("show");
}


