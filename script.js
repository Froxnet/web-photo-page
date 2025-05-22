//main element
const nav = document.getElementById("nav");
const photo = document.getElementById("photo");
const list = document.getElementById("list");

//for eventlistener
const tagList = document.getElementsByClassName("tag")
const photoList = document.getElementsByClassName("card");

const dbTag = [
  '2020',
  '2021', 
  '2022', 
  '2023', 
  '2024', 
  '2025'
];

//database open
let db = null;
initSqlJs({
  locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
}).then(async SQL => {
  const response = await fetch('data');
  const buffer = await response.arrayBuffer();
  db = new SQL.Database(new Uint8Array(buffer));
});

//select tag from database
const getData = (tag) => {
  if (!db) {
    console.log("data loading");
    return;
  }
  try {
    const result = db.exec(`SELECT * FROM Media WHERE Tag='${tag}'`);
    if (result.length === 0 || result[0].values.length === 0) {
      console.log("not tag");
      return;
    }
    const rows = result[0].values;
    return rows;
  } catch (e) {
    console.log("error");
    return;
  }
};

// for creat tag list
const addTab = () => { 
  for (let i = 0; i < dbTag.length; i++){
    const newDiv = document.createElement('div');
    newDiv.textContent = dbTag[i];
    newDiv.className = 'tag';
    newDiv.setAttribute('data-index', i);
    nav.appendChild(newDiv);
  }
};

const events = () => {
  Array.from(tagList).forEach((e) => {
    e.addEventListener('click', () => {
      const Index = e.getAttribute('data-index');
      list.innerHTML = "";
      const Spisok = getData(dbTag[Index]);
      for (let i = 0; i < Spisok.length; i++){
        const newDiv = document.createElement('img');
        // const newSpan = document.createElement('span');
        newDiv.className = 'card';
        newDiv.src = Spisok[i][3];
        newDiv.setAttribute('data-index', i);
        // newDiv.setAttribute('tag-index', Spisok.length);
        // newSpan.textContent = Spisok[i][2] + " - " + Spisok[i][3];
        list.appendChild(newDiv);
      };
      Array.from(photoList).forEach((e) => {
        e.addEventListener('click', () => {
          const Index = e.getAttribute('data-index');
          const tagIndex = e.getAttribute('tag-index')
          photo.setAttribute('data-index', Index);
          photo.setAttribute('data-index', tagIndex);
          photo.src = Spisok[Index][2];
          Array.from(photoList).forEach((e) => {e.classList.remove("currentIMG")});
          e.classList.toggle("currentIMG");
        })
      })
      Array.from(tagList).forEach((e) => {e.classList.remove("currentTAB")});
      e.classList.toggle("currentTAB");
    });
  });
};
      
addTab();
events();
// events();
