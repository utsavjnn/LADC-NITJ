let user = localStorage.getItem('user-type');
console.log('user is ',user);
function getAlumniList(batch)
{
  $.ajax({
    url:`http://localhost:8000/alumni/batch/${batch}`,
    type:"GET",
    success:function(alumnis){
      document.getElementById("all-alumnis").innerHTML = "";
      var ul = document.getElementById("all-alumnis");
      alumnis.forEach(alumni => {
            // console.log('alumni is ',alumni)
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(alumni.name));
            ul.appendChild(li);
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