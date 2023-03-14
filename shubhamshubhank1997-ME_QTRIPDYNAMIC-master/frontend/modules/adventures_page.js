
import config from "../conf/index.js";


//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES 
  // 1. Extract the city id from the URL's Query Param and return it
  
  // let str = "?city=singapore";
  // var cityName = str.split('=');//["?city","singapore"]
  // return cityName[1]//"singapore"
  // console.log(cityName[1]);
  let params = new URLSearchParams(search);
  let cityName = params.get("city");
  // console.log(cityName);
  return cityName;
}


//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}` ) 
    let data = await res.json();
    // console.log(data); // array of objects of paticuler city ;
    return data;
    
} catch (error) {
  return null;  
}
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  // 1.get the div with id data in which all data will be appended 
  // <div class="activity-card">
  adventures.forEach(element => {
    let sec =  document.createElement("section");
    sec.className = "col-6 col-lg-3 mb-5 ";
    sec.innerHTML = ` 
                <a href='detail/?adventure=${element.id}' id='${element.id}' class= "activity-card" >
                  <div class="category-banner">${element.category}</div>
                  <img src=${element.image} alt=${element.name} class="img-fluid">
                  <div class="card-text text-md-center w-100 mt-3">
                    <div class="text_1 d-block d-md-flex justify-content-between ">
                      <h6>${element.name}</h6>
                      <p>₹ ${element.costPerHead}</p>
                      </div>
                      <div class="text_2 d-block d-md-flex justify-content-between ">
                      <h6>Duration</h6>
                      <p>${element.duration} Hrs</p>
                      </div>
                    </div>
                  </a> `;
    document.getElementById("data").append(sec) 
  }); 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list ;

    /**
     cont filteredList = list.filter((adventure)=>{
      if(adventure.duration > low && adventure.duration <= high){
        return true ;
      }
     } ) 
     return filteredList
     */
    /* // single line answer ;
     return list.filter(adventure => adventure.duration > low && adventure.duration <= high);
     */
    // console.log(`low:${low}, high:${high}`)
    // console.log(list)
  let farr = []
    for(let i = 0; i< list.length ;i++){
      let element = list[i];
      if( element.duration >= low && element.duration <= high)
          farr.push(element);
    }
    // console.log(farr);
    return farr ;
}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // categorylist is an array containing all categories ; and list is data array;
  // const fCat = list.filter((element) => {
  //   categoryList.includes(element.category)
  // });
  // return fCat ;
  // console.log(list)
  /**
   return list.filter(adventure => categoryList.includes(adventure.category)) ;
   */
  let fc = []; 
  for(let i = 0; i < list.length; i++){
    for(let j = 0 ; j<categoryList.length ; j++ )
    {
    if(list[i].category === categoryList[j] )
        fc.push(list[i]);
    }
  }
  
  // console.log(categoryList);
  return fc ;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // filters = { duration: "", category: [] }; initially
  // duration is a string need to convert in low and high "low-high" i.e. "4-6"
//   const str = "4-6";
// console.log(str[0])="4" ;string h; use parseint
// const words = str.split('-');
// console.log(words);["4","6"]
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  // if(filters.duration) console.log("true")
  // else console.log("false");//jst checking value is accesible or not in console;
  // console.log(filters.duration)

  // console.log(1)
  // console.log(filters.duration.length);


  // let choice = filters["duration"].split("-");
  /*
  if (filters.duration !== "" && filters.category.length !== 0) { 
    let arr1 = filterByDuration(list,parseInt(filters.duration.split('-')[0]),parseInt(filters.duration.split('-')[1]))
    let arr2 = filterByCategory(arr1,filters.category);
    arr1.forEach(element => arr2.push(element));
    return arr1 ; 
  }else if(filters.category.length !== 0 ){ 
    // console.log("2")
    return filterByCategory(list,filters.category)
  }else if(filters.duration !== ""){ 
    // console.log("3")
    return filterByDuration(list,parseInt(filters.duration.split('-')[0]),parseInt(filters.duration.split('-')[1]))
  };
  return list;
  */
  
//  /*
  let filteredList = [];
 //{ duration: "", category: [] }
if (filters["duration"].length > 0 && filters["category"].length > 0){
  let choice = filters["duration"].split("-");
  filteredList = filterByDuration(list,
    parseInt(choice[0]),
    parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
    return filteredList;
}

else if(filters["duration"].length > 0){
  let choice = filters["duration"].split("-");
  filteredList = filterByDuration(list,
    parseInt(choice[0]),
    parseInt(choice[1])
    );
    return filteredList;
  }

else if(filters["category"].length > 0){
  filteredList = filterByCategory(list, filters["category"]);
  return filteredList;
}
return list
// */
  // Place holder for functionality to work in the Stubs
 
}


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // console.log(filters);
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let item = window.localStorage.getItem('filters');
 
  // now item is  ;like this string = “{“name”:”Obaseki Nosa”,”location”:”Lagos”}”
  //to use this value, you would have to convert it back to an object.
  //To do this, we make use of the JSON.parse() method, which converts a JSON string into a JavaScript object
  
  if(item !== null) {return JSON.parse(item)};

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and 
  // 2.Generate Category Pills
  document.getElementById("duration-select").value = filters.duration ;
  // lekin .value attribute tou lagaya nhi h durtaion select m

  let div = document.getElementById("category-list");
  // console.log(filters);  { duration: "", category: [] }; 
  filters.category.forEach(element => {
    let childDiv = document.createElement("div")
    childDiv.className = "category-filter";
    childDiv.innerHTML = `<div>${element}</div>` ;
    div.append(childDiv)
  });
  // console.log(div);
  
}
// console.log("ji")
// console.log(window.deafaultView)
// console.log("ji")
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
