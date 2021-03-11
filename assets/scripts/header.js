function hamburgerexpandtoggler() 
{
  var logoimage=document.getElementById("logoimage");
   var element = document.getElementById("mainheading");
   if(window.location.pathname=="/")
   {
    element.classList.toggle("maintexterase");
   }
   var element2 = document.getElementById("navbarToggleExternalContent");
   var ham=document.getElementById("menubutton").getAttribute("aria-expanded");
   console.log(ham);
  if(ham==="false")
  {
    element2.classList.add("navcolor");
    logoimage.classList.add("logodisappear");
  }
   else
   {
   element2.classList.remove("navcolor");
   logoimage.classList.remove("logodisappear");
  }
}

let anchors = Array.from(document.getElementsByClassName('nav-link'));
let atHome = window.location.pathname === '/';
anchors.forEach(ele => ele.style.color = (atHome ? 'black' : 'white'));
anchors.forEach(ele => ele.classList.add('white'));

let mainNav = document.getElementById('mainnavbar');

if(atHome){
  mainNav.style.background = 'linear-gradient(to bottom, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0) 100%)'
} else {
  mainNav.style.background = '#0e585d';
}

let button = $('#upButton')[0];
button.onclick = function(event){
  window.scroll({top: 0,left: 0, behavior : "smooth"})
};

//SETTING UP SIDEBAR:
let bars = $('.bars')[0];
let sidebar = $('.sidebar')[0];
let cross = $('.cross')[0];
bars.onclick = function(event){
  sidebar.style.transform = 'scaleX(1)';
}
cross.onclick = function(event){
  sidebar.style.transform = 'scaleX(0)';
}