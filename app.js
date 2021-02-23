//App functions
async function loadData(meal) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal
  );
  const data = await response.json();
  return data;
}
//initilasation
(() => {
  loadData().then(renderData());
})();

function renderData() {
  //getdata from API

  loadData(document.querySelector("#search-box").value).then((data) => {
    for (let i = 0; i < data.meals.length; i++) {
      let html = `
      <div class="recipe__items" onclick="details(event)">
      <img src="${data.meals[i].strMealThumb}" alt="Photo" id="img-${i}" />
      <h1 class="recipe__name" >${data.meals[i].strMeal}</h1>
      <h3 class="recipe__catagory">Catagory: ${data.meals[i].strCategory}</h3>
      <h3 class="recipe__catagory">Cuisine: ${data.meals[i].strArea}</h3>
      <h4 class="recipe__catagory">Main ingedients: ${data.meals[i].strIngredient1}, ${data.meals[i].strIngredient2}, ${data.meals[i].strIngredient3}</h4>
      </div>  
      `;
      const recipeContainer = document.querySelector(".recipe");
      recipeContainer.insertAdjacentHTML("beforeend", html);

      //onclick event
    }
    console.log(data.meals);
    document.querySelector("#search-box").value = "";
  });
}

//eventListerns
const searchBtn = document.querySelector("#search-btn");
const searchBox = document.querySelector("#search-box");

searchBtn.addEventListener("click", function () {
  document.querySelector(".recipe").innerHTML = "";
  renderData();
});
searchBox.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
});

function details(event) {
  console.log(event.target);
}
