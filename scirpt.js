let url;
//let xx = "https://restcountries.com/v3.1/alpha/ug";
//search by name example
let APiforSearching = "https://restcountries.com/v3.1/name/{name}";
//fetch countries based on cca3
let countryCOde = "https://restcountries.com/v3.1/alpha/UGA";
// use APi to get the county name

//keep the loader Off from this function
function hideloader() {
  document.querySelector("#loader").style.display = "none";
}

//displays how each Cards will look like when the data from the api is sloted into them
function showData(data) {
  let display = "";

  for (let i in data) {
    if ((data.length = 40)) {
      display += `<div class="col-sm-3 col-12 my-3 my-sm-5 px-4 card-block" onclick="MoreInfo(${i})">
  <div class="">
    <div class="cards country-cards shadow rounded">
      <img src=${data[i].flags.png} class="card-img-top img-fluid" style="height:180px" alt="..." />
      <div class="card-body">
        <div class="card-text px-4 py-4">
          <h5 class="my-1 country-name text-wrap">${data[i].name.common}</h5>
          <div class="py-3">
            <span><b>Population</b> : ${data[i].population}</span>
            <span><b> Region</b> : ${data[i].region}</span>
            <span><b>Capital </b> : ${data[i].capital[0]}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
    }
    document.getElementById("datalist").innerHTML = display;
  }
}

document.getElementById(
  "datalist"
).innerHTML = `<div class="loader" id="loader"></div>`;

//asycn function to get the api, extarct the value and display it with the SHOW() function
function getheApi(i) {
  url =
    "https://restcountries.com/v3.1/independent?status=true&fields=name,region,capital,population,flags,currencies,languages,subregion,tld,borders,fifa,cca2,cca3";

  //loader is rolling

  //using the try catch to spot erros to assist with debugging
  fetch(url)
    .then((response) => response.json())
    .then((data) => showData(data, i))
    .catch((err) => {
      console.log(err, "Error somewhere");
    });
}
getheApi();

//asyc function to get teh descirption of the api, which means we are extracting from the same API but getting another info
function getDescription(url, i) {
  //loader is rolling
  document.getElementById(
    "datalist"
  ).innerHTML = `<div class="loader" id="loader"></div>`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      hideloader();
      showDesc(data, i);
    })
    .catch((err) => {
      console.log(err, "Error somewhere");
    });
}
// the search and filter Block in side the DOM
let SearchFIlterCategory = document.getElementById("Search&Filter");

function showDesc(data, i) {
  //initialize the Display
  let display = "";

  // What HTML is expected to Render With The data collected for the Descirption of Each countries
  display = `<div class="DescriptionBlock container">
    <a href="#" onclick="goToHome(${i})">
      <button class="shadow bg-white btn px-5 py-1 my-4">
        <img src="../assets/arrow-left (1).svg" alt="" /> Back
      </button></a
    >
    <div class="row mt-5 align-items-center justify-content-between">
      <div class="col-sm-5 col-12">
        <img src="${data[i].flags.png}" class="img-fluid w-100" alt="" />
      </div>
      <div class="col-sm-6 col-12 mt-4  text-wrap ">
        <h4 class="bolder">${data[i].name.common}</h4>
        <div class="row justify-content-between my-4">
          <div class="col-sm-6 col-12  text-wrap">
            <p class=" text-wrap"><b> Native Name </b>: ${
              data[i].name.official
            }</p>
            <p><b> Population </b>: ${data[i].population}</p>
            <p><b> Region </b>: ${data[i].region}</p>
            <p><b> Sub-Region </b>: ${data[i].subregion}</p>
            <p class=" text-wrap"><b> Capital </b>:<span class=" text-wrap"> ${
              data[i].capital[0]
            }</span></p>
          </div>  
          <div class="col-sm-6 col-12 my-sm-0 my-4 ">
            <p><b> Top Level Domain </b>: ${data[i].tld}</p>
            <p class=" text-wrap"><b> Currencies </b>: ${
              data[i].currencies[Object.keys(data[i].currencies)[0]].name
            }</p>
            <p><b> Language </b>: ${Object.values(
              data[i].languages
            ).toString()}</p>
          </div>
          <div class="mt-4 d-flex flex-wrap align-items-center justify-content-start">
            <span class="text-dark me-3">Border Countries : </span>
            <span
              class="text-dark fw-normal fs-6 px-3 py-2 shadow badge badge-light">
              France
            </span>
            <span
              class="text-dark fw-normal fs-6 px-3 mx-2 py-2 shadow badge badge-light">
              Germany
            </span>
            <span
              class="text-dark fw-normal fs-6 px-3 py-2 shadow badge badge-light">
              NeitherLand
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById("DESC-SEC").innerHTML = display;
}

// function to Transfer back to The Main Page After visisting the Description Page
function goToHome(i) {
  SearchFIlterCategory.classList.remove("hidden");
  //fetch the Api Agin to render the main Page
  getheApi(url, i).then(() => {
    console.log("completed");
    //Dislplay the search And Category Section of teh DOm while going back by making it vsisble
    document.querySelector(".blocks").style.display = "block";
  });
}

//Funtion to Navigate you to the More Info Page of each Country card whne you click any of them
function MoreInfo(i) {
  //Start the Loader
  document.getElementById(
    "datalist"
  ).innerHTML = `<div class="loader" id="loader"></div>`;

  //extract the api and get the JSON data
  getDescription(url, i);

  //Hide the Search and Filter section of the DOM
  SearchFIlterCategory.classList.add("hidden");
  // Pass these HTML Tags into the DOM
  document.querySelector("#datalist").innerHTML = ` 
    <div class="row" id="datalist">
      <div class="loader" id="loader"></div>
   </div> <div id="DESC-SEC"></div>`;
}

let DomBody = document.querySelector("body").classList;
let DomNav = document.querySelector(".nav").classList;
let DomSearch = document.querySelector("input").classList;
let DomFilter = document.querySelector("select").classList;

function darkMode() {
  document.getElementById("x").src = toggleImg();
  document.getElementById("search-icon").src = toogleSearch();

  if (!DomBody.contains("blackMode")) {
    DomBody.add("blackMode");
  } else {
    DomBody.remove("blackMode");
  }
  if (!DomNav.contains("navblackmode")) {
    DomNav.add("navblackmode");
    DomNav.remove("bg-white");
    DomNav.remove("shadow-bottom");
    DomSearch.add("navblackmode");
    DomFilter.add("navblackmode");
    document
      .querySelector("input[type=search]")
      .style.setProperty("--c", "white");
  } else {
    DomNav.remove("navblackmode");
    DomNav.add("bg-white");
    DomNav.add("shadow-bottom");
    DomSearch.remove("navblackmode");
    DomFilter.remove("navblackmode");
    document
      .querySelector("input[type=search]")
      .style.setProperty("--c", "black");
  }

  document.querySelectorAll(".cards").forEach((element) => {
    DomNav.contains("navblackmode") == true
      ? (element.style.backgroundColor = "hsl(209, 23%, 22%)")
      : (element.style.backgroundColor = "white");
  });
}

function toogleSearch() {
  let initialImg = document.getElementById("search-icon").src;
  let src2 = initialImg.includes("assets/search2.svg");
  let newImg2 = {
    true: "assets/search.svg",
    false: "assets/search2.svg",
  }[src2];
  return newImg2;
}

function toggleImg() {
  let initialImg = document.getElementById("x").src;
  let srcTest = initialImg.includes("assets/moonlight.svg");
  let newImg = {
    true: "assets/moon.svg",
    false: "assets/moonlight.svg",
  }[srcTest];
  return newImg;
}

//consume endpoints

//Search and filter section
let search = document.getElementById("search");
let search_icon = document.getElementById("search-icon");
let displayList = document.getElementById("datalist");

// get the generated JSON based on what you are searching for
async function getheApiSearchResult(url) {
  try {
    //extartc data from teh API to display search result
    const response = await fetch(url);
    let data = await response.json();

    //display the results from teh API data to the DOM
    showData(data);

    // console.log(data[0].flags);
  } catch (err) {
    //incase we have an error display this on teh DOM section #datalist;
    console.log(err, "No data found");
    document.getElementById(
      "datalist"
    ).innerHTML = `<h2 class="px-5 text-center mx-auto my-5">Search term Not Found in The Records</h2>`;
  }
}

//Initiates a search when you press teh enter button
search.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-icon").click();
  }
});

//function to display the Results after entering some words in the input Tag and Press enter.
function displayResults() {
  //The loader Starts whne you Press enter in the search Bar
  document.getElementById(
    "datalist"
  ).innerHTML = `<div class="loader" id="loader"></div>`;

  let input = search.value;
  let searchApi;
  //Simply Reload if no words is entred
  if (input == "") {
    location.reload();
  } else {
    //slot the search term in the api link and extratc teh results form the API
    url = `https://restcountries.com/v3.1/name/${input}`;
    getheApiResult(url);
  }
}

//get value

//Initiates a search after cliking the icon with some words insde the input tag
search_icon.addEventListener("click", function () {
  let input = search.value;
  let searchApi = `https://restcountries.com/v3.1/name/${input}`;
  getheApiSearchResult(searchApi);
});

//Extract selected Continent after selecting A category from the Select Tag
function selectNum() {
  document.getElementById(
    "datalist"
  ).innerHTML = `<div class="loader" id="loader"></div>`;
  var strUser = document.getElementById("select").value;
  console.log(strUser);
  url = `https://restcountries.com/v3.1/region/${strUser}`;
  getheApiSearchResult(url);
}

//

//extract api
//display results

// to solve the border country issues here is ho wyou should do oit

//step 1
//get the border country arr each one

// Use the serch by COuntry ocde to searhc for the array details , by extratcing api and dipsly the county in console

// once yous get the country based on the cca3, get the common name

// now store that name in a array

// do for the remaianing county codes that are three letters
