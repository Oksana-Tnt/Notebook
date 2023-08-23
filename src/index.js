import "bootstrap/dist/css/bootstrap.min.css";
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { uid } from "uid";

import { markupForm, markupNote, markupAllNotebook } from "./templates/markup";
import { setToLocal, getStatus, saveNewData } from "./api";


const btnElAdd = document.querySelector(".btn");
const tableEl = document.querySelector(".table");


btnElAdd.addEventListener("click", onShowForm);
window.addEventListener("load", init);
tableEl.addEventListener("click", onDeleteNote);



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
    
}

function createFlarpicker(element) {
  
  const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {  

        const fpDate=selectedDates[0];

        fp = flatpickr.formatDate(fpDate, "Y-m-d h:i K");

        if((selectedDates[0]).getTime() < Date.now()){
            Notiflix.Report.warning("Please choose a date in the future");           
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

  formData.set("id", uid());
  formData.set("name", event.target.elements.name.value);
  formData.set("created", fp);
  formData.set("content", event.target.elements.content.value);
  formData.set("category", event.target.elements.category.value);

   for (let [name, value] of formData) {
    formDataObj[name] = value;
  }

   
  tableEl.insertAdjacentHTML("beforeend", markupNote(formDataObj));

  setToLocal(formDataObj);

  instance.close();
}

function init(){
  const array = getStatus();
  if (!array.length) return;

  tableEl.insertAdjacentHTML("beforeend", markupAllNotebook(array));

}

function onDeleteNote(event) {
  if (!event.target.classList.contains("btn-delete")) return;
  
  const parentEl = event.target.closest(".item");
  const idToFind = parentEl.dataset.id;
  

  parentEl.remove();

  const filteredArr = getStatus().filter(({ id }) => id !== idToFind);

  saveNewData(filteredArr);
}