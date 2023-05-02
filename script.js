// getting functioning related items from home page to here
let input=document.getElementById("input");
let searchBtn=document.getElementById("btn");
let suggestInput=document.getElementById("suggest-input");
let defaultMealSection1=document.getElementById("default-meal-section1");
let defaultMealSection2=document.getElementById("default-meal-section2");
let suggestions=["chicken","mutton","biryani","burger","lamb","pizza","fish"];
let inputValue=input.value;
let count=document.getElementById("cart-count");

// when keyup is happening on input placeSuggestion function is called
input.addEventListener("keyup",placeSuggestion);
// search button navigate to another page called navigationPage
searchBtn.addEventListener("click",navigateToAnotherPage);
function placeSuggestion(){
    suggestInput.innerHTML="";
    let filtered=[]
    // if input is not null i am adding class to suggestInput div so that it will display the items related to your first letter
    // if that data is present in deafault array suggestions
    // actually suggestions should be displayed from api product title but this api is different like it will show only
    //chicken items if you write chicken only and it is not default data and data will change with your searched items
    //thats why taken default array suggestions
    if(input.value){
        suggestInput.classList.add("add-class-toList");
        // here in suggestions string search plays crucial role
        //as if your input consts only white spaces  and white spaces between letter it should replace to only letter
        //removing all white spaces so replace(/\s/g,'') makes your work simple
        // i am converting searched input and suggestions items to lowercase to make them match with each other
        filtered=suggestions.filter((each)=>{return each.toLowerCase().startsWith(input.value.replace(/\s/g,'').toLowerCase())})
    }
    //so whatever suggestions are there which matches to that array a list of suggestions will be displayed here
    filtered.map((each)=>{
        suggestInput.innerHTML+=`<li class="suggest-li">${each}</li>`
    })
    //so here another feature, from suggestions if you click on that suggestion, suggestion value will be reflected in input
    let suggestionList=document.querySelectorAll(".suggest-li");
    suggestionList.forEach((each)=>{each.addEventListener("click",()=>{input.value=each.innerHTML;})});
}
function navigateToAnotherPage(){
    if(input.value!=""&&input.value.replace(/\s/g,'')){
        // you have to store after doing replace(/\s/g,'') to use that which removes allwhite spaces in a string
        let up=input.value.replace(/\s/g,'');
        localStorage.setItem("searchedDish",up); 
        // so i am setting searchedDish name string in local storage with the value of up
        // after that as you have clicked search button, it will navigate you to navigation page to display your searched type dishes
    window.location.href="navigationPage.html"
    }else{
        // when there is no input, in order to display "please enter your dish" gif i am emptying divs
        defaultMealSection1.innerHTML="";
        defaultMealSection2.innerHTML="";
        document.getElementById("desi").innerHTML="";
        document.getElementById("desi1").innerHTML="";
        defaultMealSection1.innerHTML+=`
        <div class="request-dish">
        <img src="./images/pleaseGif.gif" height=200px width =200px>
        <h4 class="request-text">Enter Your Dish</h4>
        </div>
        `;
    }
}
//when the window is loaded fetchApi is called to display default dish items
window.onload=fetchApi;

async function fetchApi(){
    let defaultJson=await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast");
        let defaultData=await defaultJson.json();
        defaultData.meals.map(async (each)=>{
            // for each item in api i am displaying each item in image card using bootstrap
            let defaultContent=`
            <div class="card" style="width: 18rem; margin:10px;">
                <img src="${await each.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${await each.strMeal}</h5>
                <button class="btn btn-primary favourites" onclick="addToCart(${ each.idMeal})" id=${await each.idMeal}>
                Add
                </button>
                </div>
            </div>
            `;
    
        defaultMealSection1.innerHTML+=defaultContent;
});
// this is another type of default displayoing data
let countryMeal=await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian");
        let countryMealjson=await countryMeal.json();
        countryMealjson.meals.map(async (each)=>{
            
            let countryContent=`
            <div class="card" id="defaultMeal2" style="width: 18rem; margin:10px;">

            <img src="${await each.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${await each.strMeal}</h5>
                <button class="btn btn-primary favourites" onclick="addToCart(${await each.idMeal})" id=${await each.idMeal}>Add</button>
            </div>

        </div>
            `;

        defaultMealSection2.innerHTML+=countryContent;
    });
}
// inside each product i have give add button which when clicked, addToCart() function is called which takes 
//that product id as argument
function addToCart(event){
    // so everytime you click on add button that id is stored in local storage through the below process
    let arr=JSON.parse(localStorage.getItem("mealId"));
    arr.push(event);
    localStorage.setItem("mealId",JSON.stringify(arr));
    updatelocalStorage();
}
// so everytime you click on add button cart count should be updated
function updatelocalStorage(){
let cartCountValue=JSON.parse(localStorage.getItem("mealId"));
count.innerHTML=cartCountValue.length;
console.log(cartCountValue);
}
// in order to show the cart count value i am getting mealId array and displaying its length in cart count
if(window.onload){
    let cartCountValue=JSON.parse(localStorage.getItem("mealId"));
count.innerHTML=cartCountValue.length;
}