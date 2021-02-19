function Approve(alumni_id){
    console.log('approvedfff',alumni_id)
    $.ajax({
        url:`http://localhost:8000/admin/approve-alumni`,
        type:"PUT",
        data: {
            "_id": alumni_id
        },
        dataType: 'json',
        success:function()
        {  
            console.log("alumni approved successfully")
            window.location.reload();
        },
        error:function(err)
        {
            // console.log('error to  approve',err);
            window.location.reload();
        }
    })
}

function getAlumniList()
{
  $.ajax({
    url:`http://localhost:8000/admin/alumni-admin`,
    type:"GET",
    success:function(alumnis){
    //   document.getElementById("all-alumnis").innerHTML = "";
    //   var ul = document.getElementById("all-alumnis");
    const container = document.getElementById("list");
      alumnis.forEach(alumni => {
            const card = document.createElement('div');
  card.classList = 'card-body';
        
  // Construct card content
  let content = `
    <div class="card col-md-3 col-12">
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
    <div class="card-btn btn btn-primary" onclick="Approve('${alumni._id}')">
            Approve
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

window.onload = function() {
    getAlumniList();
}