//FOR LIVE CHAR COUNTER
const generator = (lim) => {
  return function(e){
    const label= document.getElementById(`${e.target.id}Label`);
    label.innerHTML = `${e.target.value.length}/${lim}`;
    if(e.target.value.length >= lim + 1)
      this.value = e.target.value.slice(0,lim-1);
  };
}
const form = document.getElementsByClassName('blog-submit')[0].getElementsByTagName('form')[0];
const inputs = Array.from(form.getElementsByTagName('input'));
inputs.push(document.getElementById('explanation'));
inputs.forEach(ele => {
  const choice = {
    'title' : 50,
    'desc' : 100,
    'explanation' : 1000,
  }
  if(ele.id in choice){
    ele.oninput = generator(choice[ele.id]);
  }
})
//END

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
    let resp = '< class="blog-body">';
    const parent = $('.container')[0];
    for(let [i,vali] of newPosts.entries()){
        let {title,desc,_id : id,name = 'Anonymous',branch,year,imageLink,date,modaltitle: modalTitle,modalDesc} = vali;
        if(imageLink.length === 0)
            imageLink = defaultImg;
        let args = [title,desc,id,name,branch,year,imageLink,date,modalTitle,modalDesc,() => injectButton(opt,id)];
        resp += alternateTemplate(...args);
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
    const parent = $('.allParent')[0];
    let opt = await getAuthStatus();
    parent.innerHTML = 'Loading...';
    let res = await fetch('blog/blogs', {
        method : "GET"
    }).then(res => res.json());
    if('dberr' in res){
        alert(res.dberr);
        return;
    } 
    let resp = '<div class="blog-body">';
    posts = res.blogs;
    for(let [i,vali] of res.blogs.entries()){
        let {title,desc,_id : id,name = 'Anonymous',branch,year,imageLink,date,modaltitle: modalTitle,modalDesc} = vali;
        if(imageLink.length === 0)
            imageLink = defaultImg;
        let args = [title,desc,id,name,branch,year,imageLink,date,modalTitle,modalDesc,() => injectButton(opt,id)];
        resp += alternateTemplate(...args);
    }
    resp += '</div>'
    parent.innerHTML = resp;
}

function alternateTemplate(title,desc,id,name,branch,year,imageLink,date,modalTitle,modalDesc,injectButton){
  return `
  <div class='blog-card'>
    <div class='blog-image'>
      <img src="${imageLink}" alt="blogimgae">
      <div class='blog-desc'>
        <h4>${title}</h4>
        <h6> <span id='blog-author'>by ${name}</span> </h6>
        <div class='blog-desc-footer'>
        <p>${desc}</p>
          <div>
            <p>${date},</p>&nbsp;<p>${Math.ceil(modalDesc.length/500)}min read</p>
             <i data-toggle="modal" data-target="#${id}" class="fa fa-arrow-circle-right"></i>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!-- MODAL CODE TILL END -->
    <div class="modal fade" style="word-wrap: break-word;" id="${id}" tabindex="-1"
      role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
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
            <img id="modal-image" src="${imageLink}" alt="Blog Image">
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
  `;
}