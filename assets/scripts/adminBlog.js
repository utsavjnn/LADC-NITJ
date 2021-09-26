function Approve(blog_id) {
  console.log("approvedfff", blog_id);
  $.ajax({
    url: `http://localhost:8000/admin/approve-blog`,
    type: "PUT",
    data: {
      _id: blog_id,
    },
    dataType: "json",
    success: function () {
      console.log("blog approved successfully");
      window.location.reload();
    },
    error: function (err) {
      // console.log('error to  approve',err);
      window.location.reload();
    },
  });
}

function Delete(blog_id) {
  console.log("deleted", blog_id);
  $.ajax({
    url: `http://localhost:8000/admin/disapprove-blog`,
    type: "DELETE",
    data: {
      _id: blog_id,
    },
    dataType: "json",
    success: function () {
      console.log("blog deleted successfully");
      window.location.reload();
    },
    error: function (err) {
      // console.log('error to  approve',err);
      window.location.reload();
    },
  });
}

function getBlogList() {
  // console.log("Hi");
  $.ajax({
    url: `http://localhost:8000/admin/blog-admin`,
    type: "GET",
    success: function (blogs) {
      const container = document.getElementById("list");
      let i = 0;
      blogs.forEach((blog) => {
        console.log("blogs are ", blog);
        let imgl;
        if (blog.imageLink != "") imgl = blog.imageLink;
        else
          imgl =
            "https://i.pinimg.com/736x/6d/e9/1c/6de91c11a6c674a79cf315fe1929c135.jpg";

        if (i % 2 == 0) {
          // const row = document.createElement('div');
          // row.classList = "row align-items-center event-block no-gutters margin-40px-bottom";

          // Construct card content
          let content = `
            <div class="row align-items-center event-block no-gutters margin-40px-bottom">
            <div class="col-lg-7 order-2 order-lg-1">
            <div class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
              <h5
                style='word-wrap: break-word' class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 title-mg-phone">
                ${blog.title}</h5>
              <p style='word-wrap: break-word'>
                ${blog.desc}
              </p>
              <!-- <a class="butn small margin-10px-top md-no-margin-top" href="event-details.html">Read More <i class="fas fa-long-arrow-alt-right margin-10px-left"></i></a> -->
              <button type="button" class="rmbtn" data-toggle="modal" data-target="#${blog._id}">
                Read More
              </button>
              <button class="rmbtn" onclick="Approve('${blog._id}')">
              Approve
            </button>
            <button class="rmbtn" onclick="Delete('${blog._id}')">
              Delete
            </button>
      
      
              <!-- Modal -->
              <div class="modal fade" style="word-wrap: break-word;" id="${blog._id}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div style='word-wrap: break-word' class="modal-header">
                      <h5 style='word-wrap: break-word' class="modal-title" id="exampleModalLongTitle">${blog.modaltitle}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" style="word-wrap: break-word;">
                    <p>  ${blog.modalDesc}<p>
                      <i>By 
                        ${blog.name}
                        <p>${blog.branch}</p>
                    </i>
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
             
                <img src="${imgl}" alt="eventimage" class="resize">

              <div class="events-date">
                <div class="font-size28">${blog.date}</div>
                </div>
            </div>
          </div>
            `;
          container.innerHTML += content;
        } else {
          // const row = document.createElement('div');
          // row.classList = "row align-items-center event-block no-gutters margin-40px-bottom";

          // Construct card content
          let content = `
            <div class="row align-items-center event-block no-gutters margin-40px-bottom">
            <div class="col-lg-5 col-sm-12">
            <div class="position-relative left-align-img">
             
              <img src="${imgl}" alt="eventimage" class="resize">
              <div class="events-date">
                <div class="font-size28">${blog.date}</div>
               
              </div>
            </div>
          </div>
          <div class="col-lg-7 col-sm-12">
            <div class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
              <h5
              style='word-wrap: break-word' class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 title-mg-phone">
              ${blog.title}</h5>
          
              <p style='word-wrap: break-word'>${blog.desc}</p>
              <!-- <a class="butn small margin-10px-top md-no-margin-top" href="event-details.html">Read More <i class="fas fa-long-arrow-alt-right margin-10px-left"></i></a> -->
              <!-- Button trigger modal -->
              <button type="button" class="rmbtn " data-toggle="modal" data-target="#${blog._id}" style="outline: none;">
                Read More
              </button>
              <button class="rmbtn" onclick="Approve('${blog._id}')">
              Approve
            </button>
      
              <!-- Modal -->
              <div class="modal fade" style="word-wrap: break-word;" id="${blog._id}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div style='word-wrap: break-word' class="modal-header">
                      <h5 style='word-wrap: break-word' class="modal-title" id="exampleModalLongTitle">${blog.modaltitle}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>${blog.modalDesc}</p>
                      <i>By 
                      ${blog.name}
                      <p>${blog.branch}</p>
                  </i>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;

          container.innerHTML += content;
        }

        i++;
      });
    },
    error: function (err) {
      console.log("error ", err);
    },
  });
}

window.onload = function () {
  getBlogList();
};
