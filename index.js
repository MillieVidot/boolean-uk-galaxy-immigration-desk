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
  immigrationDetailsArray: [],
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

    if (!state.planets.find(planet => planet.url === applicant.homeworld)) {
      findHomeworld(applicant)
    }
    // we need to append info to infoSection variable
    // Object.values()
    createImmigrationForm(applicant.name)
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
  mass.innerText = `Mass: ${applicant.mass}`

  const homePlanet = state.planets.find(
    planet => planet.url === applicant.homeworld
  )
  const homeworld = document.createElement("h3")
  homeworld.innerText = `Homeworld: ${homePlanet.name}`

  infoBox.append(boxTitle, gender, DOB, height, mass, homeworld)
  infoSection.append(infoBox)
}

function createImmigrationForm(name) {
  actionSection.innerHTML = ""
  const formTitle = document.createElement("form")
  formTitle.innerText = "IMMIGRATION FORM"
  formTitle.setAttribute("class", "immigration-form")

  const immigrationFormName = document.createElement("h4")
  immigrationFormName.setAttribute("class", "applicant-name")
  immigrationFormName.innerText = `Applicant Name: ${name}`

  const destinantionLabel = document.createElement("label")
  destinantionLabel.setAttribute("for", "destination")
  destinantionLabel.innerText = "Destination"

  const travelPurposeLabel = document.createElement("label")
  travelPurposeLabel.setAttribute("for", "travel-purpose")
  travelPurposeLabel.innerText = "Travel purpose:"

  const travelPurposeSelect = document.createElement("select")
  travelPurposeSelect.setAttribute("name", "travel-purpose")
  travelPurposeSelect.setAttribute("id", "travel-purpose")

  const travelPurposePleaseSelect = document.createElement("option")
  travelPurposePleaseSelect.innerText = "Please select..."

  const travelPurposeBusiness = document.createElement("option")
  travelPurposeBusiness.innerText = "Business"
  travelPurposeBusiness.setAttribute("value", "Business")

  const travelPurposeVacation = document.createElement("option")
  travelPurposeVacation.setAttribute("value", "Vacation")
  travelPurposeVacation.innerText = "Vacation"

  travelPurposeSelect.append(
    travelPurposePleaseSelect,
    travelPurposeBusiness,
    travelPurposeVacation
  )

  const destinationInput = document.createElement("input")
  destinationInput.setAttribute("name", "destination")
  destinationInput.setAttribute("id", "destination")
  destinationInput.setAttribute("type", "text")
  destinationInput.required = true

  const terroristRadioLabel = document.createElement("label")
  terroristRadioLabel.setAttribute("for", "terrorist")
  terroristRadioLabel.innerText = "Terrorist activity:"

  const terroristRadioYesElLabel = document.createElement("label")
  terroristRadioYesElLabel.innerText = "Yes"

  const terroristRadioYesEl = document.createElement("input")
  terroristRadioYesEl.setAttribute("type", "radio")
  terroristRadioYesEl.setAttribute("id", "terrorist")
  terroristRadioYesEl.setAttribute("name", "terrorist")
  terroristRadioYesEl.setAttribute("value", "Yes")

  terroristRadioYesElLabel.append(terroristRadioYesEl)

  const terroristRadioNoElLabel = document.createElement("label")
  terroristRadioNoElLabel.innerText = "No"

  const terroristRadioNoEl = document.createElement("input")
  terroristRadioNoEl.setAttribute("type", "radio")
  terroristRadioNoEl.setAttribute("id", "terrorist")
  terroristRadioNoEl.setAttribute("name", "terrorist")
  terroristRadioNoEl.setAttribute("value", "No")
  terroristRadioNoEl.innerText = "No"

  terroristRadioNoElLabel.append(terroristRadioNoEl)

  const acceptBtn = document.createElement("button")
  acceptBtn.setAttribute("class", "form accept-button")
  acceptBtn.setAttribute("type", "submit")
  acceptBtn.setAttribute("class", "accept-button")
  acceptBtn.innerText = "Accept ->"

  formTitle.addEventListener("submit", function (event) {
    event.preventDefault()

    const immigrationDetails = {
      applicantName: state.selectedApplicant,
      destination: destinationInput.value,
      "travel-purpose": travelPurposeSelect.value,
      "terrorist-activity": formTitle.terrorist.value,
    }

    //  LEFT OFF HERE. PUSH TO STATE.
  })

  formTitle.append(
    immigrationFormName,
    destinantionLabel,
    destinationInput,
    travelPurposeLabel,
    travelPurposeSelect,
    terroristRadioLabel,
    terroristRadioYesElLabel,
    terroristRadioNoElLabel,
    acceptBtn
  )
  actionSection.append(formTitle)
}

function render() {
  // const main = document.querySelector("main")
  // main.innerHTML = ""
  createList()
  createsListItems()
}

function findHomeworld(applicant) {
  fetch(applicant.homeworld)
    .then(resp => resp.json())
    .then(data => {
      state.planets = [...state.planets, data]
      createInfoBox(applicant)
    })
}
