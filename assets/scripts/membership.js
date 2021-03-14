//NAVBAR SCROLL EFFECT
window.onscroll = function(event){
  let bigHeader = document.getElementsByClassName('bigHeader')[0];
  let justText = document.getElementById('justText');
  let otherNav = document.getElementById('navbarToggleExternalContent');
  let lim = bigHeader.getBoundingClientRect().bottom;
  if(lim <= 100){
    justText.style.opacity = '1';
    otherNav.style.opacity = '0';
    justText.innerHTML = `<h2>Team LADC</h2>`;
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
    url:`http://localhost:8000/membership/batch/${batch}`,
    type:"GET",
    success:function(members){
      document.getElementById("all-members").innerHTML = "";
      const container = document.getElementById("all-members");
      members.forEach(member => {
        let url = member.image ?? '/images/user_default.png';
        if(typeof member.image !== 'string')
          url = '/images/user_default.png';
        const card = document.createElement('div');
        card.classList = 'card-body';
        // Construct card content
        let content = `
        <div class='memberCard'>
          <div style='background-image:url("${member.image}")' class='memberImage'>
          </div>
          <div class='memberDetails'>
            <h5>${member.name}</h5>
            <h6>${member.batch}</h6>
          </div>
        </div>
        `;
        // let content = `
        //   <div class="card col-md-8 col-12">
        //   <div class="card-header" id="heading-${member._id}">
        //     <h5 class="mb-0">
        //           ${member.name}
        //     </h5>
        //   </div>
      
        //   <div id="${member._id}" class="collapse show" >
        //     <div class="card-body">
      
        //       <h5>${member.email}</h5>
             
        //       <p>${member.batch}</p>
        //     </div>
        //   </div>
         
         
        // </div>
        // `;
      
              container.innerHTML += content;
      });
    },
    error:function(err){
      console.log('error ',err);
    }
  })
}

var menu = document.getElementById("batch");
  menu.onchange=function(e){
  e.preventDefault();

  getMemberList(menu.value);
}


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
  var currentBatch = sessionStorage.getItem("batch");  
  console.log('batch is ',currentBatch);
  if(currentBatch==null)
  {
    currentBatch = "all";
  }
  $('#batch').val(currentBatch);
  getMemberList(currentBatch);
  }
  $('#batch').change(function() { 
      var selVal = $(this).val();
      sessionStorage.setItem("batch", selVal);
  });