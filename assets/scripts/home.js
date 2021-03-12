console.log('hi');
anchors.forEach(ele => ele.classList.remove('white'));
bars.style.color = 'black'
window.scroll({
    top: 250,
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
    bg.style.height = `${Math.min(100,Math.max(0,comp))}%`;
    if(bg.offsetHeight === 100){
        let anchors = Array.from(document.getElementsByClassName('nav-link'));
        anchors.forEach(ele => ele.style.color = 'white');
        anchors.forEach(ele => ele.classList.remove('black'));
        anchors.forEach(ele => ele.classList.add('white'));
        bars.style.color = 'white';
    } else {
        let anchors = Array.from(document.getElementsByClassName('nav-link'));
        anchors.forEach(ele => ele.style.color = 'black');
        anchors.forEach(ele => ele.classList.remove('white'));
        anchors.forEach(ele => ele.classList.add('black'))
        bars.style.color = 'black';
    }
}