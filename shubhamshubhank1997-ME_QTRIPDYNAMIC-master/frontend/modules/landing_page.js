import config from "../conf/index.js";

async function init() {
  // console.log("hi");
  //Fetches list of all cities along with their images and description
    let cities = await fetchCities();
    // console.log(cities)//array(8);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}
// console.log("hi") ;

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {

    let dataPromise = await fetch(config.backendEndpoint + "/cities");
    let data = await dataPromise.json();
    return data;

  }catch (error) {

    return null;
    
  }
}

const getImageElement = (src, alt) => {
    let image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    return image; // <img src="src" alt='alt'> 
  }

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentDiv = document.getElementById("data");
  
  //2. make a element 
  let section = document.createElement("section");
  section.setAttribute("class","mt-5 col-12 col-md-6 col-lg-3");
    
  //make a <a> tag;<a> with id ="id"
  let aTag = document.createElement("a"); 
    aTag.href = `pages/adventures/?city=${id}`;
    aTag.setAttribute("id",id);
    // aTag.setAttribute("href",`pages/adventures/?city=<${id}>`);
  
  //div with class text-centre text-centre
  let elderDiv = document.createElement("div");
  elderDiv.setAttribute("class","tile");

  //childDiv contain all information;
  let childDiv = document.createElement("div");
  childDiv.setAttribute("class","tile-text text-centre");

  //h5 for city name
  let cityName = document.createElement("h5");
  cityName.textContent = city;

  //3.description
  let  des = document.createElement("p");
  des.textContent = description;

   //4.image,Generate the image using getImageElement() function
  const img = getImageElement(image, id);
  img.setAttribute("class","activity-card");

  //5.append detils cityName, des in  div
//   childDiv.append(img);
  childDiv.append(cityName);
  childDiv.append(des);
  
  //append childDiv to elderDiv ;
  elderDiv.append(img);
  elderDiv.append(childDiv);
  //append elderDiv to aTag
  aTag.append(elderDiv);

  //append aTag to section
  section.append(aTag);

  //append the section in parentDiv element with id "data"
  parentDiv.append(section)
 
}

export { init, fetchCities, addCityToDOM };



/*
8
[
    {
        "id": "bengaluru",
        "city": "Bengaluru",
        "description": "100+ Places",
        "image": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": "goa",
        "city": "Goa",
        "description": "250+ Places",
        "image": "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": "kolkata",
        "city": "Kolkata",
        "description": "100+ Places",
        "image": "https://images.pexels.com/photos/2524368/pexels-photo-2524368.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        "id": "singapore",
        "city": "Singapore",
        "description": "100+ Places",
        "image": "https://i.ibb.co/WVL7n8K/singapore.jpg"
    },
    {
        "id": "malaysia",
        "city": "Malaysia",
        "description": "100+ Places",
        "image": "https://images.pexels.com/photos/2940925/pexels-photo-2940925.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    },
    {
        "id": "bangkok",
        "city": "Bangkok",
        "description": "250+ Places",
        "image": "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?cs=srgb&dl=pexels-ingo-joseph-1682748.jpg&fm=jpg"
    },
    {
        "id": "new-york",
        "city": "New York",
        "description": "100+ Places",
        "image": "https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": "paris",
        "city": "Paris",
        "description": "100+ Places",
        "image": "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    }
]
*/
