const searchBtn = document.querySelector("#search-btn");
const userInput = document.querySelector("#user-input");
const recipeMsg = document.querySelector(".recipe-container");

const recipeContent = document.querySelector(".recipe-details-content");
const recipeContentClose = document.querySelector(".close-btn");


const getRecipe = async ()=>{

    recipeMsg.innerHTML =`<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`; 
    const input = userInput.value.trim();
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    const response = await fetch(api);
    const data = await response.json();

    recipeMsg.innerHTML = "";
    

    data.meals.forEach(meal => {

    console.log(meal)

        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="">
        <h2 id="recipe-name"> ${meal.strMeal}</h2>
        <h6 id="category">${meal.strArea} Dish</h6>

        <h6 id="category">Category: ${meal.strCategory}</h6>
      
            `;

            // <button class="read-more-btn"> View Recipe</button>
    
            const button = document.createElement("button");
            button.classList.add("read-more-btn");
            button.textContent = "View Recipe";

     
      
            recipeDiv.appendChild(button);

          


        recipeMsg.appendChild(recipeDiv);


        // -----adding event listners in buttons------///

        button.addEventListener("click", ()=>{
            openPopup(meal);
        })
    });



}

const openPopup = (meal)=>{
    recipeContent.innerHTML = `
    <h2 id="recipe-name"> ${meal.strMeal}</h2>
    <p id="instructions">${meal.strInstructions}</p> 
    <a id="Youtube-link" href="http://${meal.strYoutube}" target="_blank" ><i class="fa-brands fa-youtube"></i></a> `;


    recipeContent.parentElement.style.display = "block";
}



searchBtn.addEventListener("click", (e)=>{
e.preventDefault();
getRecipe();
})



recipeContentClose.addEventListener("click", ()=>{
  recipeContent.parentElement.style.display = "none";
})


