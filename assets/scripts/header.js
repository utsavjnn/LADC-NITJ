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