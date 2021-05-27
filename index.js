const infoSection = document.querySelector(".info-section")
const listSection = document.querySelector(".list-section")
const actionSection = document.querySelector(".action-section")

//https://swapi.dev/api/people/ URL FOR PEOPLE
// applicants/people
// destination/planets
// purpose of travel:
// vacation
// business
// terrorist activity
// yes or no
let state = {
  planets: [],
  applicants: [],
  selectedApplicant: null,
}

// this is the master fetch, the other fetches are pado wan
function getPeople() {
  fetch("https://swapi.dev/api/people")
    .then(response => response.json())
    // function (response) {
    //     return response.json()
    // }
    .then(function (peopleFromServer) {
      state.applicants = peopleFromServer
      console.log(`people from server`, peopleFromServer)
      //HERE WE HAVE THE PEOPLE
      // getPlanets()
      //HERE WE HAVE ALSO THE PLANETS
      render()
    })
}

// function getPlanets() {
//   fetch("https://swapi.dev/api/planets")
//     .then(response => response.json())
//     .then(data => (state.planets = planetsFromServer))
//   // state.planets = planetsFromServer
// }

getPeople()

function createList() {
  const listHeading = document.createElement("h2")
  listHeading.innerText = "Applicants"

  const applicantsList = document.createElement("ul")
  applicantsList.setAttribute("class", "applicant-list")

  listSection.append(listHeading, applicantsList)
}

function createListItem(applicant) {
  const applicantLi = document.createElement("li")
  applicantLi.setAttribute(`class`, `applicant`)
  applicantLi.innerText = applicant.name

  const viewButton = document.createElement("button")
  viewButton.setAttribute("class", "view-button")
  viewButton.innerText = "VIEW"

  viewButton.addEventListener("click", function () {
    state.selectedApplicant = applicant.name
    createInfoBox(applicant)
<<<<<<< HEAD
    if (condition) {
=======
    if (!state.planets.find( planet => planet.url === applicant.homeworld)) {
>>>>>>> 92e54c79e67926abf55d4c299afe3ff5a39ad63c
      findHomeworld(applicant.homeworld)
    }
    // we need to append info to infoSection variable
    // Object.values()
  })

  applicantLi.append(viewButton)
  //   const applicantsList = document.querySelector(".applicant-list")

  return applicantLi
}

function createsListItems() {
  for (const applicant of state.applicants.results) {
    const applicantLi = createListItem(applicant)
    const applicantsList = document.querySelector(".applicant-list")
    applicantsList.append(applicantLi)
  }
}

function createInfoBox(applicant) {
  infoSection.innerHTML = ""
  const infoBox = document.createElement("div")
  infoBox.setAttribute(`class`, `info-box`)

  const boxTitle = document.createElement(`h2`)
  boxTitle.innerText = applicant.name

  const gender = document.createElement(`h3`)
  gender.innerText = `Gender: ${applicant.gender}`

  const DOB = document.createElement(`h3`)
  DOB.innerText = `D.O.B: ${applicant.birth_year}`

  const height = document.createElement("h3")
  height.innerText = `Height: ${applicant.height}`

  const mass = document.createElement("h3")
  mass.innerText = `Mass ${applicant.mass}`

  // const homeworld = document.createElement("h3")
  // homeworld.innerText = `Homeworld ${applicant.homeworld}`

  infoBox.append(boxTitle, gender, DOB, height, mass)
  infoSection.append(infoBox)
}

function render() {
  // const main = document.querySelector("main")
  // main.innerHTML = ""
  createList()
  createsListItems()
}

function findHomeworld(homeworldURL) {
  fetch(homeworldURL)
    .then(resp => resp.json())
    .then(data => (state.planets = [...state.planets, data]))
}
