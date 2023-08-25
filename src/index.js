import "bootstrap/dist/css/bootstrap.min.css";
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { uid } from "uid";

import { markupForm, markupNote, markupNotes } from "./templates/markup";
import { setToLocal, getStatus, saveNewData } from "./api";


const btnElAdd = document.querySelector(".btn");
const tableEl = document.querySelector(".table");


btnElAdd.addEventListener("click", onShowForm);
window.addEventListener("load", init);
tableEl.addEventListener("click", onDeleteNote);
tableEl.addEventListener("click", onEditNote);



let instance;
let formDataObj = {};
let fp = 0;


function init(){
  const array = getStatus();
  if (!array.length) return;
  const markup = markupNotes(array);
  
  addMarkup(markup);

}

function onShowForm(){

  instance = basicLightbox.create(markupForm());    
  instance.show();

  const btnElClose = document.getElementById("btnClose");
  btnElClose.addEventListener("click", onCloseForm);

  const flatpickerEl = document.querySelector(".js-flatpicker");

  createFlatpicker(flatpickerEl);
     
  form.addEventListener("submit", onAddNote);
    
}

function onCloseForm() {

  instance.close();

}

function onAddNote(event) {

  event.preventDefault(); 

  const name = event.target.elements.name.value;
  const created = fp;
  const category = event.target.elements.category.value;
  const content = event.target.elements.content.value;  

  const noteObj = createNoteObj(name, created, category, content); 

  const markup = markupNote(noteObj);

  addMarkup(markup); 

  setToLocal(noteObj);

  instance.close();

}


function onDeleteNote(event) {
  if (!event.target.classList.contains("btn-delete")) return;

    deleteEl(event.target.closest(".item"));
  
}

function onEditNote(event) {
  
  if (!event.target.classList.contains("btn-edit")) return;  
  
  const parentNode = event.target.closest(".item");
  const name = parentNode.querySelector(".name").textContent;
  const content = parentNode.querySelector(".content").textContent;

  deleteEl(parentNode);

  instance = basicLightbox.create(markupForm(name, content));    
  instance.show();  
  
  const btnEl = document.querySelector(".js-btn");
  btnEl.textContent = "Edit note";

  const flatpickerEl = document.querySelector(".js-flatpicker");
  createFlatpicker(flatpickerEl);

  form.addEventListener("submit", onAddNote);  

};

function deleteEl(element) {

  const parentEl = element;
  const idToFind = element.dataset.id;  

  element.remove();

  const filteredArr = getStatus().filter(({ id }) => id !== idToFind);

  saveNewData(filteredArr);
}

function createNoteObj(name, created, category, content) {
  return {
    id:uid(),
    name,
    created,
    category,
    content
  };
}   

function addMarkup(arr) {
  tableEl.insertAdjacentHTML("beforeend", arr);
}

function createFlatpicker(element) {
  
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