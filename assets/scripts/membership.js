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


function getMemberList(batch)
{
  $.ajax({
    url:`http://localhost:8000/membership/batch/all`,
    type:"GET",
    success:function(members){
      // document.getElementById("all-members").innerHTML = "";
      // const container = document.getElementById("all-members");
      const container = document.getElementById("final-year");
      console.log('container is ',container);
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
      console.log('prefinal ',prefinal)
      // document.getElementById("third-year").innerHTML = "";
      const container1 = document.getElementById("third-year");
      console.log("third year is ",container1);
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

// var menu = document.getElementById("batch");
//   menu.onchange=function(e){
//   e.preventDefault();

//   getMemberList(menu.value);
// }


// let alumniList = function(alumni){
//   return $(`
//     <div id="${alumni._id}">
//   <li>
//               <p>
//                   ${ alumni.name }
//                   <br>
//                   <small>
//                   ${ alumni.linkedin }
//                   </small>
//               </p>         
//           </li></div>`)
// }


window.onload = function() {
  // var currentBatch = sessionStorage.getItem("batch");  
  // console.log('batch is ',currentBatch);
  // if(currentBatch==null)
  // {
  //   currentBatch = "all";
  // }
  // $('#batch').val(currentBatch);
  getMemberList('all');
  }
  // $('#batch').change(function() { 
  //     var selVal = $(this).val();
  //     sessionStorage.setItem("batch", selVal);
  // });