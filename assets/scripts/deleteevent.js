function Delete(event_id) {
    console.log('Deleted', event_id)
    $.ajax({
        url: `http://localhost:8000/admin/delete-event`,
        type: "PUT",
        data: {
            "_id": event_id
        },
        dataType: 'json',
        success: function () {
            console.log("Event deleted successfully")
            window.location.reload();
        },
        error: function (err) {
            // console.log('error to  approve',err);
            window.location.reload();
        }
    })
}

function getEventList() {
    console.log("Hello");
    $.ajax({
        url: `http://localhost:8000/admin/admin-events`,
        type: "GET",
        success: function (events) {

            const container = document.getElementById("list");
            let i = 0;
            events.forEach(events => {
                let imageexisting;
                if(events.imageLink==="")
                {
                    console.log("hey");
                    imageexisting= "https://i.pinimg.com/736x/6d/e9/1c/6de91c11a6c674a79cf315fe1929c135.jpg";
                }
                else{
                    imageexisting=events.imageLink;
                }
                if (i % 2 == 0) {
                    // const row = document.createElement('div');
                    // row.classList = 'row align-items-center event-block no-gutters margin-40px-bottom';
                    // Construct row content
                    let content = `
                    
  <div class="row align-items-center event-block no-gutters margin-40px-bottom">
                    <div class="col-lg-7 order-2 order-lg-1">
                    <div class="padding-40px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                      <h5
                        class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 title-mg-phone">
                        <a href=" ${events.registerationLink}" class="text-theme-color">${events.title}</a></h5>
                      <ul class="event-time margin-10px-bottom md-margin-5px-bottom" style="padding-left: 0px;">
                        <li><i class="far fa-clock margin-10px-right"></i> ${events.startTime}  - ${events.endTime} </li>
                        <li><i class="fas fa-map-marker-alt margin-5px-right"></i> Location: ${events.location} </li>
                      </ul>
                      <p>
                      ${events.desc} 
                      </p>
                      <!-- <a class="butn small margin-10px-top md-no-margin-top" href="event-details.html">Read More <i class="fas fa-long-arrow-alt-right margin-10px-left"></i></a> -->
                      <button type="button" class="rmbtn" data-toggle="modal" data-target="#${events.id} ">
                        Read More
                      </button>
                        <a class="submitform" href="/editevent/${events.id} " style="text-decoration: none;"><button type="button" class="rmbtn">Edit Event</button></a>
                        <form class="submitform" action="/deleteevent" method="POST"> 
                          <input type="hidden" name="eventid" value="${events.id} ">
                         <button class="rmbtn" onclick="Delete('${events._id}')">Delete Event</button>
                        </form>
                      <!-- Modal -->
                      <div class="modal fade" id="${events.id} " tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLongTitle">${events.modaltitle}</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                            ${events.modalDesc}
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 order-1 order-lg-2">
                    <div class="position-relative right-align-img">
                        <img src=${imageexisting} alt="eventimage" class="resize">
                      <div class="events-date">
                        <div class="font-size28">${events.day}</div>
                        <div class="font-size14">${events.month}</div></div>
                    </div>
                  </div>`
                  

                    container.innerHTML += content;

                }
                 else {
                    let content = ` 
    <div class="row align-items-center event-block no-gutters margin-40px-bottom">
                    <div class="col-lg-5 col-sm-12">
      <div class="position-relative left-align-img">
        <img src=${imageexisting} alt="eventimage" class="resize">
      
        <div class="events-date">
          <div class="font-size28">${events.day}</div>
          <div class="font-size14">${events.month}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-7 col-sm-12">
      <div class="padding-40px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
        <h5
          class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 title-mg-phone">
          <a href="$(events.registrationLink)" class="text-theme-color">${events.title}</a></h5>
        <ul class="event-time margin-10px-bottom md-margin-5px-bottom" style="padding-left: 0px;">
          <li><i class="far fa-clock margin-10px-right"></i> ${events.startTime} - ${events.endTime}</li>
          <li><i class="fas fa-map-marker-alt margin-5px-right"></i> Location : ${events.location}</li>
        </ul>
        <p>$(events.desc)</p>
        <!-- <a class="butn small margin-10px-top md-no-margin-top" href="event-details.html">Read More <i class="fas fa-long-arrow-alt-right margin-10px-left"></i></a> -->
        <!-- Button trigger modal -->
        <button type="button" class="rmbtn " data-toggle="modal" data-target="#${events.id}" style="outline: none;">
          Read More
        </button>
          <a class="submitform" href="/editevent/${events.id}" style="text-decoration: none;"><button type="button" class="rmbtn">Edit Event</button></a>
          <form class="submitform" action="/deleteevent"  method="POST"> 
            <input type="hidden" name="eventid" value="${events.id}">
            <button  class="rmbtn" onclick="Delete('${events._id}')" >Delete Event</button>
           </form>
        <!-- Modal -->
        <div class="modal fade" id="${events.id}" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">${events.modaltitle}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>${events.modalDesc}</p>
              </div>
              <div class="modal-footer">
                <button  class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`

                    container.innerHTML += content;
                    
                }

             i++;
            });
        },
        error: function (err) {
            console.log('error ', err);
        }
    })
}

window.onload = function () {
    getEventList();
}