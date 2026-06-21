/* ==================================
   MONLAJT WORKSHOP
   SCRIPT.JS
================================== */


/* ==========================
   GOOGLE SHEETS
========================== */

const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSEx-Yth7lrD6zvvN8owvWmSYr0xdey995kERQpOym9X_ksxJuvk99c4z6kIWyaIkm2bVZtknm4ejf8/pub?output=csv";


let sheetCommissions = {};



/* ==========================
   JĘZYKI
========================== */


function setLanguage(lang){


    const elements =
    document.querySelectorAll("[data-pl]");


    elements.forEach(element=>{


        const translation =
        element.getAttribute(
            `data-${lang}`
        );


        if(translation){

            element.textContent =
            translation;

        }


    });



    /* PLACEHOLDERY */


    const placeholders =
    document.querySelectorAll(
        "[data-placeholder-pl]"
    );


    placeholders.forEach(element=>{


        const placeholder =
        element.getAttribute(
            `data-placeholder-${lang}`
        );


        if(placeholder){

            element.placeholder =
            placeholder;

        }


    });



    localStorage.setItem(
        "language",
        lang
    );


}




window.addEventListener(
"load",
()=>{


    const savedLanguage =
    localStorage.getItem("language")
    || "pl";


    setLanguage(savedLanguage);


});




/* ==========================
   MODAL ZAMÓWIENIA
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const modal =
document.getElementById(
"orderModal"
);



const openButton =
document.getElementById(
"openOrderForm"
);



const closeButton =
document.querySelector(
".close-modal"
);



const continueButton =
document.getElementById(
"continueButton"
);



const acceptRules =
document.getElementById(
"acceptRules"
);



const orderSection =
document.getElementById(
"orderSection"
);



if(openButton){

openButton.addEventListener(
"click",
(e)=>{


e.preventDefault();


modal.style.display =
"block";


});


}



if(closeButton){


closeButton.addEventListener(
"click",
()=>{


modal.style.display =
"none";


});


}



window.addEventListener(
"click",
(e)=>{


if(e.target === modal){


modal.style.display =
"none";


}


});





if(continueButton){


continueButton.addEventListener(
"click",
()=>{


if(!acceptRules.checked){


const lang =
localStorage.getItem(
"language"
)
|| "pl";



alert(

lang === "en"

?

"Please accept the rules first."

:

"Najpierw zaakceptuj regulamin."

);



return;


}



orderSection.style.display =
"block";


continueButton.style.display =
"none";



});


}



});






/* ==========================
   ŁAPKI 🐾
========================== */


function createPaw(x,y){


const paw =
document.createElement(
"div"
);



paw.classList.add(
"paw-click"
);



paw.innerHTML =
"🐾";



paw.style.left =
x+"px";



paw.style.top =
y+"px";



document.body.appendChild(
paw
);



setTimeout(
()=>{


paw.remove();


},
800
);


}





document.addEventListener(
"DOMContentLoaded",
()=>{


const buttons =
document.querySelectorAll(
".button"
);



buttons.forEach(button=>{


button.addEventListener(
"click",
(e)=>{


createPaw(
e.pageX,
e.pageY
);


});


});


});






/* ==========================
   STATUS CHECKER
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const button =
document.getElementById(
"checkStatus"
);



const input =
document.getElementById(
"animalCode"
);



const result =
document.getElementById(
"statusResult"
);



if(!button)
return;




button.addEventListener(
"click",
()=>{



const code =
input.value
.trim()
.toLowerCase();




const commission =
sheetCommissions[code];





const language =
localStorage.getItem(
"language"
)
|| "pl";





if(!commission){



result.innerHTML = `

<h3>

${
language === "en"

?

"❌ Commission not found"

:

"❌ Nie znaleziono zamówienia"

}

</h3>

`;

return;


}





const animal =


language === "en"


?

`🐾 ${commission.animalEN}`


:


`🐾 ${commission.animalPL}`;




const status =


language === "en"


?


commission.statusEN


:


commission.statusPL;






result.innerHTML = `


<div class="status-card">


<h3>

${animal}

</h3>


<p>

${status}

</p>



<div class="progress-bar">


<div

class="progress-fill"

style="width:${commission.progress}%"

>

</div>


</div>



<p>

${commission.progress}%

</p>



<p>

📅 ${commission.updated}

</p>


</div>


`;




});


});


});






/* ==========================
   LOAD GOOGLE SHEETS
========================== */


async function loadSheetData(){


try{


const response =
await fetch(
SHEET_URL
);



const csv =
await response.text();




const rows =
csv.trim()
.split("\n");




rows.shift();





rows.forEach(row=>{



const cols =
row.split(",");




const code =
cols[0]
?.trim()
.toLowerCase();




if(!code)
return;





sheetCommissions[code]={



statusPL:
cols[1]?.trim(),



statusEN:
cols[2]?.trim(),



progress:
Number(cols[3]),



updated:
cols[4]?.trim(),



animalEN:
cols[5]?.trim(),



animalPL:
cols[6]?.trim()



};




});





console.log(
"Google Sheets loaded:",
sheetCommissions
);




}



catch(error){



console.error(
"Sheet error:",
error
);



}



}





loadSheetData();
