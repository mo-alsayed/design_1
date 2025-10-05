// handle settings menu
const iconContainer = document.querySelector('.icon-container')
const icon = document.querySelector('.icon')
var menu = document.querySelector('.settings-box')
iconContainer.addEventListener('click', () => {
    icon.classList.toggle('fa-spin')
    menu.classList.toggle('open')
})

var root = document.querySelector(':root')
var savedColor = localStorage.getItem('selectedColor') || 'aqua';
root.style.setProperty('--main-color', savedColor)
var savedDivColor = document.querySelector(`.colors div[data-color="${savedColor}"]`);
if (savedDivColor) {
    document.querySelectorAll('.colors div').forEach(c => {
        c.classList.remove('active')
    })
    savedDivColor.classList.add('active');
}


//handle active color opactiy
document.querySelectorAll('.colors div').forEach(color => {
    color.addEventListener('click', (e) => {
        //change main color on clicking any color based on data-color attribute
        root.style.setProperty('--main-color', e.target.dataset.color)
        localStorage.setItem('selectedColor', e.target.dataset.color)
        //remove active class from each color
        document.querySelectorAll('.colors div').forEach(c => {
            c.classList.remove('active')
        })
        color.classList.toggle('active');
    })
});

// Function to change background image
function changeBackground() {
    const imgs = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];
    const randomNumber = Math.floor(Math.random() * imgs.length);
    const landingImg = document.querySelector('.landing-page');
    landingImg.style.backgroundImage = `url(../imgs/${imgs[randomNumber]})`;
}

let bgInterval;
const btns = document.querySelectorAll('.btns span');

// function to start background shuffle
// Function to change background image
function changeBackground() {
    const imgs = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];
    const randomNumber = Math.floor(Math.random() * imgs.length);
    const landingImg = document.querySelector('.landing-page');
    landingImg.style.backgroundImage = `url(../imgs/${imgs[randomNumber]})`;
}


// Function to start background shuffle
function startShuffle() {
    clearInterval(bgInterval);
    bgInterval = setInterval(changeBackground, 10000);
    localStorage.setItem("shuffle", "true");
}

// Function to stop background shuffle
function stopShuffle() {
    clearInterval(bgInterval);
    localStorage.setItem("shuffle", "false");
}

// On page load
window.addEventListener("load", () => {
    const savedShuffle = localStorage.getItem("shuffle");
    const shuffleBtn = document.querySelector('.btns span:first-child');
    const stopBtn = document.querySelector('.btns span:last-child');

    // remove all actives first
    btns.forEach(b => b.classList.remove('active'));

    if (savedShuffle === "true" || savedShuffle === null) {
        // default: background changing is active
        shuffleBtn.classList.add("active");
        startShuffle();
    } else {
        // background change stopped
        stopBtn.classList.add("active");
        stopShuffle();
    }
});

// Handle button clicks
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const shuffleBtn = document.querySelector('.btns span:first-child');
        if (shuffleBtn.classList.contains('active')) {
            startShuffle();
        } else {
            stopShuffle();
        }
    });
});