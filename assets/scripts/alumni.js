function getAlumniList(batch) {
	$.ajax({
		url: `http://localhost:8000/alumni/batch/${batch}`,
		type: 'GET',
		success: function (alumnis) {
			console.log(alumnis);
			document.getElementById('all-alumnis').innerHTML = '';
			const container = document.getElementById('all-alumnis');
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
          <div class='card-horizontal'>
              <div class='image-square-wrapper'>
                <img style='max-width:200px;max-height:200px;' src=${
					alumni.imageURL === null ? '/images/user_default.png' : alumni.imageURL
				} class='card-img-left' alt='User Image'/>
              </div>
              <div id="${alumni._id}" class="collapse show" >
                <div class="card-body">
                  <h5>${alumni.email}</h5>
                  <p>${alumni.linkedin}</p>
                  <p>${alumni.batch}</p>
                </div>
              </div>     
          </div>
        </div>
        `;

				container.innerHTML += content;
			});
		},
		error: function (err) {
			console.error('error ', err);
		},
	});
}

var menu = document.getElementById('batch');
menu.onchange = function (e) {
	e.preventDefault();
	getAlumniList(menu.value);
};

window.onload = function () {
	var currentBatch = sessionStorage.getItem('batch');
	console.log('batch is ', currentBatch);
	if (currentBatch == null) {
		currentBatch = 'all';
	}
	$('#batch').val(currentBatch);
	getAlumniList(currentBatch);
};

$('#batch').change(function () {
	var selVal = $(this).val();
	sessionStorage.setItem('batch', selVal);
});

const hideModal = function (event) {
	const form = $('.alumni-submit')[0];
	form.style.transitionDuration = '0ms';
	form.style.transform = 'scale(0)';
	let heading = $('.alumni-submit')[0].children[0].children[0];
	heading.innerHTML = 'Register as an Alumnus';
	this.style.display = 'none';
};

const showModal = event => {
	const cbutton = $('.cancel-button')[0];
	cbutton.style.display = 'block';
	const form = $('.alumni-submit')[0];
	form.style.transitionDuration = '200ms';
	form.style.transform = 'scale(1)';
	if (window.innerWidth <= 450) {
		let heading = $('.alumni-submit')[0].children[0].children[0];
		heading.innerHTML = 'Register';
	}
};
