function Approve(member_id){
    console.log('approvedfff',member_id)
    $.ajax({
        url:`http://localhost:8000/admin/approve-member`,
        type:"PUT",
        data: {
            "_id": member_id
        },
        dataType: 'json',
        success:function()
        {  
            console.log("mmeber approved successfully")
            window.location.reload();
        },
        error:function(err)
        {
            // console.log('error to  approve',err);
            window.location.reload();
        }
    })
}

function getMemberList()
{
  $.ajax({
    url:`http://localhost:8000/admin/member-admin`,
    type:"GET",
    success:function(members){

    const container = document.getElementById("list");
      members.forEach(member => {
            const card = document.createElement('div');
  card.classList = 'card-body';
        
  // Construct card content
  let content = `
    <div class="card col-md-3 col-12">
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
    <div class="card-btn btn btn-primary" onclick="Approve('${member._id}')">
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
    getMemberList();
}