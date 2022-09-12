const hamburger = document.querySelector('.hamburger');
const patty = document.querySelector('.patty');
const sideMenu = document.querySelector('.side-menu');
let mobileActive = false;

hamburger.addEventListener('click', () => {
    if(!mobileActive){
        patty.classList.add('active')
        sideMenu.style.right = '0'
        mobileActive = true
    }else{
        patty.classList.remove('active')
        sideMenu.style.right = '-200vw'
        mobileActive = false
    }
})