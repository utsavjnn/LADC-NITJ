//NAVBAR SCROLL EFFECT
window.onscroll = function(event){
  let bigHeader = document.getElementsByClassName('bigHeader')[0];
  let justText = document.getElementById('justText');
  let otherNav = document.getElementById('navbarToggleExternalContent');
  let lim = bigHeader.getBoundingClientRect().bottom;
  if(lim <= 100){
    justText.style.opacity = '1';
    otherNav.style.opacity = '0';
    justText.innerHTML = `<h2 class="Josephine-Sans">Team LADC</h2>`;
  } else {
    justText.style.opacity = '0';
    otherNav.style.opacity = '1';
    justText.innerHTML = '';
  }
}
//END
let elementsToShow = document.querySelectorAll('.memberCard');

function getMemberList(batch)
{
  $.ajax({
    url:`http://localhost:8000/membership/batch/all`,
    type:"GET",
    success:function(members){
      
      const container = document.getElementById("final-year");
      let finalYear = members.filter(member => member.batch==2021)
      let content;
      finalYear.forEach(member => {
        let url = member.image ?? '/images/user_default.png';
        if(typeof member.image !== 'string')
          url = '/images/user_default.png';
        const card = document.createElement('div');
        card.classList = 'card-body';
        // Construct card content
         content = `
        <div class='memberCard'>
          <div style='background-image:url("${member.image}")' class='memberImage'>
          </div>
          <div class='memberDetails josephine-sans'>
            <h5>${member.name}</h5>
            <h6>${member.batch}</h6>
          </div>
        </div>
        `;
              container.innerHTML += content;
      });

      let prefinal = members.filter(member => member.batch==2022);
      // document.getElementById("third-year").innerHTML = "";
      const container1 = document.getElementById("third-year");
      prefinal.forEach(member => {
        let url = member.image ?? '/images/user_default.png';
        if(typeof member.image !== 'string')
          url = '/images/user_default.png';
        const card = document.createElement('div');
        card.classList = 'card-body';
        // Construct card content
         content = `
        <div class='memberCard'>
          <div style='background-image:url("${member.image}")' class='memberImage'>
          </div>
          <div class='memberDetails josephine-sans'>
            <h5>${member.name}</h5>
            <h6>${member.batch}</h6>
          </div>
        </div>
        `;
              container1.innerHTML += content;
      });
    },
    error:function(err){
      console.log('error ',err);
    }
  })
}

window.onload = function() {
  getMemberList('all');
}

function isElementInViewport(el) {

  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

var scroll = window.requestAnimationFrame ||
            function(callback){ window.setTimeout(callback, 1000/60)};

            function loop() {
                elementsToShow = document.querySelectorAll('.memberCard');
              elementsToShow.forEach(function (element) {
                if (isElementInViewport(element)) {
                  element.classList.add('is-visible');
                } else {
                  element.classList.remove('is-visible');
                }
              });
            
              scroll(loop);
            }
            loop();
  