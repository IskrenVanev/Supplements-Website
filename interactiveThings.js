const toggleMenu = document.querySelector(".toggle");
const navigation= document.querySelector('.navigation');
const navigationOnMobile= document.querySelector('.mobileNavigation');

toggleMenu.onclick = function () {
  toggleMenu.classList.toggle("active");
  navigation.classList.toggle('active');
  navigationOnMobile.classList.toggle('active');
};

$(function(){
    $("#LiElements1").load("about.html"); 
  });


const Supplements = document.getElementsByClassName('ContentSupplements');
for(i=0; i< Supplements.length; i++){
  Supplements[i].addEventListener('click', function(){
    this.classList.toggle('active');
  })
}


