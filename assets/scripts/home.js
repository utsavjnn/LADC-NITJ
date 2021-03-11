console.log('hi');
window.onscroll = function(event){
    let scrollAmount = document.scrollingElement.scrollTop;
    let headerHt = $('.homeimage')[0].offsetHeight;
    let navHt = $('#mainnavbar')[0].offsetHeight;
    let comp = (scrollAmount + navHt) - headerHt;
    let bg = $('#justbg')[0];
    bg.style.height = `${Math.min(100,Math.max(0,comp))}%`;
    if(bg.offsetHeight === 100){
        let anchors = Array.from(document.getElementsByClassName('nav-link'));
        anchors.forEach(ele => ele.style.color = 'white');
    } else {
        let anchors = Array.from(document.getElementsByClassName('nav-link'));
        anchors.forEach(ele => ele.style.color = 'black');
    }
}