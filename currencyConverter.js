const BASE_URL="https://v6.exchangerate-api.com/v6/fce095ca43cd77693122f8bc/pair";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// adding all the currency codes
for(let select of dropdowns){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
        if(select.name=="from"&&currCode=="USD"){
            newOptions.selected="selected";
        }else if(select.name=="to"&&currCode=="INR"){
            newOptions.selected="selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change",(evt)=>{
        updateFlags(evt.target);
    })
}

// updaing flags
const updateFlags=(element)=>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src=newSrc;
};

//calculations for conversion 
btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
const response = await fetch(URL);
const data = await response.json();
const rate=(data.conversion_rate);
const finalAmt = amtVal*rate;
msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});
