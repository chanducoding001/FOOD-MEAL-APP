
let input=document.getElementById("input");
let searchBtn=document.getElementById("btn");
let suggestInput=document.getElementById("suggest-input");
let defaultMealSection1=document.getElementById("default-meal-section1");
let defaultMealSection2=document.getElementById("default-meal-section2");
let suggestions=["chicken","mutton","biryani","burger","lamb","pizza","fish"];
let inputValue=input.value;
let count=document.getElementById("cart-count");


input.addEventListener("keyup",placeSuggestion);
searchBtn.addEventListener("click",navigateToAnotherPage);
function placeSuggestion(){
    suggestInput.innerHTML="";
    let filtered=[]
    if(input.value){
        suggestInput.classList.add("add-class-toList");
        filtered=suggestions.filter((each)=>{return each.toLowerCase().startsWith(input.value.replace(/\s/g,'').toLowerCase())})
    }
    filtered.map((each)=>{
        suggestInput.innerHTML+=`<li class="suggest-li">${each}</li>`
    })
    let suggestionList=document.querySelectorAll(".suggest-li");
    suggestionList.forEach((each)=>{each.addEventListener("click",()=>{input.value=each.innerHTML;})});
}
function navigateToAnotherPage(){
    if(input.value!=""&&input.value.replace(/\s/g,'')){
        let up=input.value.replace(/\s/g,'');
        localStorage.setItem("searchedDish",up);
        
    window.location.href="navigationPage.html"
    }else{
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

window.onload=fetchApi;

async function fetchApi(){
    let defaultJson=await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast");
        let defaultData=await defaultJson.json();
        defaultData.meals.map(async (each)=>{
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

function addToCart(event){
    let arr=JSON.parse(localStorage.getItem("mealId"));
    arr.push(event);
    localStorage.setItem("mealId",JSON.stringify(arr));
    updatelocalStorage();
}
function updatelocalStorage(){
let cartCountValue=JSON.parse(localStorage.getItem("mealId"));
count.innerHTML=cartCountValue.length;
console.log(cartCountValue);
}
if(window.onload){
    let cartCountValue=JSON.parse(localStorage.getItem("mealId"));
count.innerHTML=cartCountValue.length;
}