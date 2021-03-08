const hideModal = function (event) {
	const form = $('.blog-submit')[0];
	form.style.transitionDuration = '0ms';
	form.style.transform = 'scale(0)';
	this.style.display = 'none';
    console.log(this);
};

const showModal = event => {
	const cbutton = $('.cancel-button')[0];
	cbutton.style.display = 'block';
	const form = $('.blog-submit')[0];
	form.style.transitionDuration = '200ms';
	form.style.transform = 'scale(1)';
};

var posts = [];

const getAuthStatus = async () => {
    let res = await fetch('blog/checkAuth',{method : "GET"});
    return res.status === 200;
}

const edit_blogs = async id => {
    const defaultImg = 'https://i.pinimg.com/736x/6d/e9/1c/6de91c11a6c674a79cf315fe1929c135.jpg';
    let opt = await getAuthStatus();
    let newPosts = posts.filter(ele => ele._id !== id);
    posts = newPosts;
    let resp = '';
    const parent = $('.container')[0];
    console.log(newPosts,parent);
    for(let [i,vali] of newPosts.entries()){
        let {title,desc,_id : id,name = 'Anonymous',branch,year,imageLink,date,modaltitle: modalTitle,modalDesc} = vali;
        if(imageLink.length === 0)
            imageLink = defaultImg;
        let args = [title,desc,id,name,branch,year,imageLink,date,modalTitle,modalDesc,() => injectButton(opt,id)];
        resp += (i%2==0 ? getEvenTemplate(...args) : getOddTemplate(...args));
    }
    parent.innerHTML = resp;
};

const deleteBlog = async (id) => {
    let res = await fetch('blog/deleteBlog',{
        method : "DELETE",
            headers : {
                'Content-Type' : 'application/json'
            },
        body : JSON.stringify({id})
    });
    console.log(res);
    if(res.status === 200){
        edit_blogs(id);
        return;
    }
    let err_message = await res.json();
    alert(err_message);
};



const injectButton = (opt,id) => {
    if(!opt) return '';
    return ` <button onclick='deleteBlog("${id}")' type="button" class="btn btn-secondary" data-dismiss="modal">Delete</button>`;
}

window.onload = async () => {
    const defaultImg = 'https://i.pinimg.com/736x/6d/e9/1c/6de91c11a6c674a79cf315fe1929c135.jpg';
    const parent = $('.container')[0];
    let opt = await getAuthStatus();
    parent.innerHTML = 'Loading...';
    let res = await fetch('blog/blogs', {
        method : "GET"
    }).then(res => res.json());
    if('dberr' in res){
        alert(res.dberr);
        return;
    } 
    let resp = '';
    //make posts global...
    posts = res.blogs;
    for(let [i,vali] of res.blogs.entries()){
        let {title,desc,_id : id,name = 'Anonymous',branch,year,imageLink,date,modaltitle: modalTitle,modalDesc} = vali;
        if(imageLink.length === 0)
            imageLink = defaultImg;
        let args = [title,desc,id,name,branch,year,imageLink,date,modalTitle,modalDesc,() => injectButton(opt,id)];
        resp += (i%2==0 ? getEvenTemplate(...args) : getOddTemplate(...args));
    }
    parent.innerHTML = resp;
}

function getEvenTemplate(title,desc,id,name,branch,year,imageLink,date,modalDesc,modalTitle,injectButton){
    return `<div class="row align-items-center event-block no-gutters margin-40px-bottom">
    <div class="col-lg-7 order-2 order-lg-1">
      <div class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
        <h5 style="word-wrap: break-word;" class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 title-mg-phone">
          ${title}
        </h5>
        <p style="word-wrap: break-word;">
          ${desc}
        </p>

        <button type="button" class="rmbtn" data-toggle="modal" data-target="#${id}">
          Read More
        </button>


        <!-- Modal -->
        <div class="modal fade" style="word-wrap: break-word;" id="${id}" tabindex="-1"
          role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 style='word-wrap: break-word' class="modal-title" id="exampleModalLongTitle">
                  ${modalTitle}
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>
                  ${modalDesc}
                </p>

                <i>By
                    ${name}
                    <p>
                      ${branch}
                    </p>
                    ${year}
                </i>
              </div>
              <div class="modal-footer">
                ${injectButton()}
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-5 order-1 order-lg-2">
      <div class="position-relative right-align-img">
     
        <img src="${imageLink}" alt="blogimgae" class="resize">
    
              <div class="events-date">
                <div class="font-size28">
                  ${date}
                </div>
              </div>
      </div>
    </div>
  </div>`;
}

function getOddTemplate(title,desc,id,name,branch,year,imageLink,date,modalTitle,modalDesc,injectButton){
    return `<div class="row align-items-center event-block no-gutters margin-40px-bottom">
    <div class="col-lg-5 col-sm-12">
      <div class="position-relative left-align-img">
      <img src="${imageLink}" alt="eventimage" class="resize">
    
              <div class="events-date">
                <div class="font-size28">
                    ${date}
                </div>
              </div>
      </div>
    </div>
    <div class="col-lg-7 order-2 order-lg-1">
      <div class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
        <h5
        style="word-wrap: break-word;" class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500 title-mg-phone">
          ${title}
        </h5>
        <p style="word-wrap: break-word;">
          ${desc}
        </p>

        <button type="button" class="rmbtn" data-toggle="modal" data-target="#${id}">
          Read More
        </button>
        <!-- Modal -->
        <div class="modal fade" style="word-wrap: break-word;" id="${id}" tabindex="-1"
          role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 style='word-wrap: break-word' class="modal-title" id="exampleModalLongTitle">
                  ${modalTitle}
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>
                  ${modalDesc}
                </p>

                <i>By
                    ${name}
                    <p>
                      ${branch}
                    </p>
                    ${year}
                </i>
              </div>
              <div class="modal-footer">
                ${injectButton()}
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}