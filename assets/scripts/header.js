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

let mainNav = document.getElementById('mainnavbar');
console.log(atHome);
if(atHome){
  mainNav.style.background = 'linear-gradient(to bottom, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0) 100%)'
} else {
  mainNav.style.background = '#0e585d';
}
console.log(mainNav.style.background);