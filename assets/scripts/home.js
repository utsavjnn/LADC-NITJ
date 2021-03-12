anchors.forEach(ele => ele.classList.remove('white'));
let prevColor = [];
let navItems = Array.from($('.nav-item'));
console.log(navItems);
bars.style.color = 'black'
window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
});
anchors.forEach(ele => ele.classList.add('black'));
window.onscroll = function(event){
    let scrollAmount = document.scrollingElement.scrollTop;
    let headerHt = $('.homeimage')[0].offsetHeight;
    let navHt = $('#mainnavbar')[0].offsetHeight;
    let bars = $('.bars')[0];
    let comp = (scrollAmount + navHt) - headerHt;
    let bg = $('#justbg')[0];
    bg.style.height = `${Math.min(100,Math.max(0,comp))}px`;
    if(bg.offsetHeight === 100){
        let anchors = Array.from(document.getElementsByClassName('nav-link'));
        anchors.forEach(ele => ele.style.color = 'white');
        anchors.forEach(ele => ele.classList.remove('black'));
        anchors.forEach(ele => ele.classList.add('white'));
        bars.style.color = 'white';
        navItems.forEach(ele => ele.style.background = 'none');
    } else {
        let anchors = Array.from(document.getElementsByClassName('nav-link'));
        anchors.forEach(ele => ele.style.color = 'black');
        anchors.forEach(ele => ele.classList.remove('white'));
        anchors.forEach(ele => ele.classList.add('black'))
        bars.style.color = 'black';
        navItems.forEach((ele,i) => {
            if(prevColor[i] ?? false){
                ele.style.background = prevColor[i];
            } else prevColor[i] = ele.style.background;
        })
    }
    //SETTING UP SAME THING AS ABOVE BUT FOR THE DROP DOWN...
    let dropButton = $('.dashdropdownbutton')[0];
    let dropDown = $('.dashdropdown')[0];
    if(dropButton ?? dropButton ?? false){
        let dropHt = dropDown.offsetHeight;
        comp = (scrollAmount + dropHt + 90) - headerHt;
        let dropBg = $('.dropbg')[0];
        dropBg.style.height = `${Math.max(0,comp )}px`;
    }
}


//SETTING UP DROP DOWN - THIS SHOULD OVERRIDE HEADER.JS
let ash_dropdownbutton = $('.dashdropdownbutton')[0];
let ash_dropdown = $('.dashdropdown')[0];
if(ash_dropdown ?? ash_dropdownbutton ?? false){
    //RESET STYLES
    let lastnavitem = Array.from($('.nav-item'));
    let navItem = lastnavitem[lastnavitem.length - 1];
    navItem.style.background = navItem.style.background === 'none' ? 'rgba(204, 204, 204, 0.541)' : 'none';
    ash_dropdown.style.display = 'none';
    //REST OF IT:
    console.log(ash_dropdown.style.display, navItem.style.background);
    if(ash_dropdown ?? ash_dropdownbutton ?? false){
        ash_dropdown.style.background = 'rgba(204, 204, 204, 0.541)';
        ash_dropdownbutton.onclick = function(event){
            ash_dropdown.style.display = (ash_dropdown.style.display === 'none' ? 'flex' : 'none');
            let navItem = lastnavitem[lastnavitem.length - 1];
            navItem.style.background = navItem.style.background === 'none' ? 'rgba(204, 204, 204, 0.541)' : 'none';
        }
    }
}