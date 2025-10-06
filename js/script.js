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
    landingImg.style.backgroundImage = `url(imgs/${imgs[randomNumber]})`;
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

// Select the skills section
const skillsSection = document.querySelector('.skills');
const spans = document.querySelectorAll('.skill-progress span');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate the bars
            spans.forEach(span => {
                const progress = span.getAttribute('data-progress');
                span.style.width = progress;
            });
        } else {
            // Reset bars when section leaves the viewport
        }
    });
}, {
    threshold: 0.5
});

observer.observe(skillsSection);



const galleryImages = document.querySelectorAll('.gallery .images-box img');
const imageList = Array.from(galleryImages); // to support next/prev

let currentIndex = 0;

function showPopup(index) {
    const img = imageList[index];

    // Create popup elements
    const popup = document.createElement('div');
    popup.className = 'image-popup';

    const popupImg = document.createElement('img');
    popupImg.src = img.src;

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = img.alt || 'No title';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => popup.remove());

    // Next/Prev buttons
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-btn next-btn';
    nextBtn.innerHTML = '&#10095;'; // >
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.remove();
        showPopup((index + 1) % imageList.length);
    });

    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-btn prev-btn';
    prevBtn.innerHTML = '&#10094;'; // <
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.remove();
        showPopup((index - 1 + imageList.length) % imageList.length);
    });

    // Close popup on background click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });

    // Assemble
    popup.appendChild(closeBtn);
    popup.appendChild(prevBtn);
    popup.appendChild(nextBtn);
    popup.appendChild(popupImg);
    popup.appendChild(title);
    document.body.appendChild(popup);
}

// Attach click event to each gallery image
imageList.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        showPopup(index);
    });
});

// Toggle navigation on small screens
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.landing-page .header ul');
const iconn = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    iconn.classList.toggle('fa-xmark');
});