
function getAlumniList(batch)
{
  $.ajax({
    url:`http://localhost:8000/alumni/batch/${batch}`,
    type:"GET",
    success:function(alumnis){
      document.getElementById("all-alumnis").innerHTML = "";
      const container = document.getElementById("all-alumnis");
      alumnis.forEach(alumni => {
        const card = document.createElement('div');
        card.classList = 'card-body';
              
        // Construct card content
        let content = `
          <div class="card col-md-8 col-12">
          <div class="card-header" id="heading-${alumni._id}">
            <h5 class="mb-0">
                  ${alumni.name}
            </h5>
          </div>
      
          <div id="${alumni._id}" class="collapse show" >
            <div class="card-body">
      
              <h5>${alumni.email}</h5>
              <p>${alumni.linkedin}</p>
              <p>${alumni.batch}</p>
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

  getAlumniList(menu.value);
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
  getAlumniList(currentBatch);
  }
  $('#batch').change(function() { 
      var selVal = $(this).val();
      sessionStorage.setItem("batch", selVal);
  });