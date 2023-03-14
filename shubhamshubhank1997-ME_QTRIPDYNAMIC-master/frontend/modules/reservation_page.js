import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(config.backendEndpoint + `/reservations`);
    let data = await response.json();
    // console.log(data);//array
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null ;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);//array of objects;
  // let date = reservations[0].date.split("-");


  // let date = new Date(reservations[0].date);
  // // console.log(date)
  // console.log(date.toLocaleDateString("en-GB")) //dd-mm-yyyy;
  
  // let time = new Date(reservations[0].time)
  // // console.log(time);
  // let timeArr = time.toLocaleString("en-IN").split(" ");
  // let resTime = `${timeArr[1]} ${timeArr[2]}`
  // console.log(resTime);
  // // request a weekday along with a long date
  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // let resDate = time.toLocaleDateString("en-IN", options);
  // //4 November 2020, 9:32:31 pm
  // let resevationTime = `${resDate}, ${resTime}`
  // console.log(resevationTime)


  reservations.forEach(element => {

    let time = new Date(element.time)
    // console.log(time);
    let timeArr = time.toLocaleString("en-IN").split(" ");
    let resTime = `${timeArr[1]} ${timeArr[2]}`
    // request a weekday along with a long date
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let resDate = time.toLocaleDateString("en-IN", options);
    let resevationTime = `${resDate}, ${resTime}`
    // console.log(resevationTime);

      let newRow = document.createElement("tr");

      newRow.innerHTML =`<th scope="col">${element.id}</th>
                        <th scope="col">${element.name}</th>
                        <th scope="col">${element.adventureName}</th>
                        <th scope="col">${element.person}</th>
                        <th scope="col">${new Date(element.date).toLocaleDateString("en-IN")}</th>
                        <th scope="col">${element.price}</th>
                        <th scope="col">${resevationTime}</th>
                        <th scope="col"><div class="reservation-visit-button" id = ${element.id}>
                        <a href="../detail/?adventure=${element.adventure}">Visit Adventure</a></div></th>`
      document.querySelector("#reservation-table").append(newRow)                  
                      
    });


  //Conditionally render the no-reservation-banner and reservation-table-parent
  
  if(reservations.length == 0){
    document.querySelector("#no-reservation-banner").style.display = "block";
    document.querySelector("#reservation-table-parent").style.display = "none";
    
  }else{
    document.querySelector("#no-reservation-banner").style.display = "none";
    document.querySelector("#reservation-table-parent").style.display = "block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
