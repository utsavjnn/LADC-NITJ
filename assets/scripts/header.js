<<<<<<< HEAD

function hamburgerexpandtoggler() 
{
  var logoimage=document.getElementById("logoimage");
   var element = document.getElementById("mainheading");
   if(window.location.href=="http://localhost:8000/")
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
=======
function hamburgerexpandtoggler() 
    {
       var element = document.getElementById("mainheading");
       element.classList.toggle("maintexterase");
       var element2 = document.getElementById("navbarToggleExternalContent");
       var ham=document.getElementById("menubutton").getAttribute("aria-expanded");
       console.log(ham);
      if(ham==="false")
      {
        element2.classList.add("navcolor");
      }
       else
       {
       element2.classList.remove("navcolor");
      }
    }
>>>>>>> 5e37e37 (Added scripts folder in assets,meta tags in layout file and changed function name)
