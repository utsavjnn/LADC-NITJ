
function getMemberList(batch)
{
  $.ajax({
    url:`http://localhost:8000/membership/batch/${batch}`,
    type:"GET",
    success:function(members){
      document.getElementById("all-members").innerHTML = "";
      const container = document.getElementById("all-members");
      members.forEach(member => {
        const card = document.createElement('div');
        card.classList = 'card-body';
              
        // Construct card content
        let content = `
          <div class="card col-md-8 col-12">
          <div class="card-header" id="heading-${member._id}">
            <h5 class="mb-0">
                  ${member.name}
            </h5>
          </div>
      
          <div id="${member._id}" class="collapse show" >
            <div class="card-body">
      
              <h5>${member.email}</h5>
             
              <p>${member.batch}</p>
            </div>
          </div>
         
         
        </div>
        `;
      
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