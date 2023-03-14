import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let id = params.get("adventure");
  // console.log(id);//working
  return id ;

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    //43.204.201.123:8082/adventures/detail?adventure=2447910730
    let res = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let data = await res.json();
    // console.log(data)
    return data ;
  
  } catch (error) {
    return null
  } 

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let heading = document.querySelector("#adventure-name");
  heading.textContent = adventure.name ;

  let subtitle = document.querySelector("#adventure-subtitle");
  subtitle.textContent = adventure.subtitle;

  let content = document.querySelector("#adventure-content");
  content.textContent = adventure.content ;
  
  let img = document.querySelector("#photo-gallery")
  adventure.images.forEach(element => {
    img.innerHTML +=  `<img class="activity-card-image" src=${element} alt="">`
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // images is an array having 3 links 
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // /*
  let carousel = document.querySelector("#photo-gallery");
  carousel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`


  let carouselInner = document.querySelector(".carousel-inner");
    // console.log("IMG777" + carouselInner)
  // console.log(images);
  images.forEach(element => {
    carouselInner.innerHTML += `<div class="carousel-item ">
                        <img src=${element} class="d-block w-100 activity-card-image" alt="" />
                      </div>`
  });
  

  let activeImage = document.querySelector(".carousel-item");
  activeImage.className = "carousel-item active" ;
// */

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure.reserved);//false

  if(adventure.available)
  {    // document.querySelector("#reservation-panel-sold-out").className = "d-none"
    document.querySelector("#reservation-panel-sold-out").style.display = "none"
    document.querySelector("#reservation-panel-available").style.display = "block"
    document.querySelector("#reservation-person-cost").textContent = adventure.costPerHead ;
  }else{
    // document.querySelector("#reservation-panel-available").className = "d-none"
    document.querySelector("#reservation-panel-available").style.display = "none"
    document.querySelector("#reservation-panel-sold-out").style.display = "block"
  } 

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let cost = document.querySelector("#reservation-cost") ;
  cost.textContent = persons * adventure.costPerHead    ;
  // cost.innerText = persons * adventure.costPerHead    ;not working ?
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let form = document.querySelector('#myForm');
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const url = config.backendEndpoint + "/reservations/new" ;
    const formData = {
      name : form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure:adventure.id,
    } ;
    //now upload the formData using api post call ;
    try {
      const response = await fetch(url,{
        method:"POST",
        body:JSON.stringify(formData) ,
        headers:{
          "Content-type":"application/json; charset=UTF-8 "
        }
      })
      window.alert("Success!")
    } catch (error) {
      console.log(error);
      window.alert("Failed")
    }
  })
 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.querySelector("#reserved-banner").style.display = "block" ;
  }else{
    document.querySelector("#reserved-banner").style.display = "none" ;
  };
  

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
