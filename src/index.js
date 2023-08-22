import "bootstrap/dist/css/bootstrap.min.css";
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

import { markupForm, markupNote } from "./templates/markup";


const btnElAdd = document.querySelector(".btn");
const tableEl = document.querySelector(".table");

btnElAdd.addEventListener("click", onShowForm);

let instance;
let formDataObj = {};
let formData = 0;
let fp = 0;


function onShowForm(){

  instance = basicLightbox.create(markupForm());    
  instance.show();

  const btnElClose = document.getElementById("btnClose");
  btnElClose.addEventListener("click", onCloseForm);

  formData = new FormData(document.querySelector("#form"));
   
  const formEl = document.getElementById("form");
  formEl.addEventListener("submit", onAddNote);

  const inputEl = document.getElementById("formGroupExampleInput2");
  createFlarpicker(inputEl);

  fp = inputEl._flatpickr;
  
    
}

function createFlarpicker(element) {
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {  
           
        if((selectedDates[0]).getTime() < Date.now()){
            Notiflix.Report.warning("Please choose a date in the future");
            makeDisableButton();
             return;
        }            
        
        Notiflix.Notify.success("Well done");         
    },
}; 

flatpickr(element, options);
};


function onCloseForm() {

  instance.close();

}

function onAddNote(event) {

  event.preventDefault();
  console.dir(fp.selectedDates);
  formData.set("name", event.target.elements.name.value);
  formData.set("created", fp);
  formData.set("content", event.target.elements.content.value);
  formData.set("category", event.target.elements.category.value)


   for (let [name, value] of formData) {
    formDataObj[name] = value;
  }
  
  tableEl.insertAdjacentHTML("beforeend", markupNote(formDataObj));
}



