const screenTablet = window.matchMedia("(max-width: 1080px)").matches

const tab = document.getElementsByClassName('tab');
const navpanel = document.getElementById('navpanel')
const tabs = ["2020", "2021", "2022", "2023", "2024"];

const photo = document.getElementById("photo");

const panel = document.getElementById("panel");
const main = document.getElementById("main");
const mainImg = document.getElementsByClassName("zoomed");
let album = "2020";


const screenCheck = () => {
  if (screenTablet) {
    panel.addEventListener("wheel", (event) => {
      if (event.deltaY !==0) {
        panel.scrollLeft += event.deltaY;
      }
    }, {passive: false});
  } 
};

screenCheck();

window.addEventListener("resize", screenCheck())

// Tabs 2020~2024 years
addTab = () => {
  for (let i = 0; i < tabs.length; i++){
    const newDiv = document.createElement('div');
    newDiv.textContent = tabs[i];
    newDiv.className = 'tab';
    newDiv.setAttribute('data-index', i);
    navpanel.appendChild(newDiv);
  };
  Array.from(tab).forEach((e) => {
    e.addEventListener('click', () => {
      const tabIndex = e.getAttribute('data-index');
      album = tabs[tabIndex];
      Array.from(tab).forEach((e) => {e.classList.remove("current")});
      e.classList.toggle("current");
      addImg();
    });
  });
};

addTab();

imgEvent = () => {
    let imgList = document.getElementsByClassName('jpeg');
    Array.from(imgList).forEach((e) => {
    e.addEventListener('click', () => {
      const i = e.getAttribute('data-index'); 
      main.innerHTML = "";
      const newDiv = document.createElement("img");
      newDiv.className = 'zoomed'
      newDiv.setAttribute('data-index', i)
      newDiv.src = album + "\\" + i + '.jpg';
      main.appendChild(newDiv);
      Array.from(imgList).forEach((e) => {e.classList.remove("current")});
      e.classList.toggle("current");
    });
  });
};

addImg = () => {
    panel.innerHTML = '';
    for (let i = 0; i < 10; i++){
      const newDiv = document.createElement("img");
      newDiv.className = 'jpeg'
      newDiv.setAttribute('data-index', i)
      newDiv.src = album + "\\" + i + '.jpg';
      panel.appendChild(newDiv);
    };
    imgEvent()
};
  
addImg();
