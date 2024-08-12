/* ----------------------------------------------- */
/* -------------------- MY FW -------------------- */
/* ------------------ Version 8 ------------------ */
/* ----------------------------------------------- */

"use strict";

const RANDOM_INT = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };

/* ------------------ According ------------------ */

function AccordionCollapse(evt){
    let target = evt.target;
    let father = evt.target.parentNode;

    target.childNodes.forEach(ch => {
        if(ch.tagName === "I"){
            if(ch.classList.contains("fa-angle-down")){
                ch.classList.add("fa-angle-up");
                ch.classList.remove("fa-angle-down");
            }else{
                ch.classList.remove("fa-angle-up");
                ch.classList.add("fa-angle-down");
            }
        }
    });

    father.childNodes.forEach(ch => {
        if(ch.tagName==="DIV" && ch.classList.contains("accordion-body")){
            if(ch.classList.contains("hidden")){
                ch.classList.remove("hidden");
            }else{
                ch.classList.add("hidden");
            }
        }
    });    
}

/* -------------------- Alerts ------------------- */

function RemoveAlert(evt){
    let father = evt.target.parentNode;
    let grand = father.parentNode;
    if(grand && father){
        grand.removeChild(father);
    }
}

/* ------------------ DatePicker ----------------- */

let DATEPICKER_INPUT;

const DATEPICKER_EMPTY_DAYS_NAMES = {
    'Sun':0, 
    'Mon':1, 
    'Tue':2, 
    'Wed':3, 
    'Thu':4, 
    'Fri':5, 
    'Sat':6
};

function DatePickerShow(target_input_id){
    DATEPICKER_INPUT = document.getElementById(target_input_id);
    let input_value = DATEPICKER_INPUT.value;
    if(input_value !== ""){
        // set date values
        let select_year = document.getElementById("datepicker-select-year");
        let select_month = document.getElementById("datepicker-select-month");
        let days_numbers = document.getElementById("datepicker-body");
        let year = input_value.split("/")[2];
        let month = input_value.split("/")[0];
        select_year.value = year;
        select_month.value = month;
        let all_days = new Date(year, month, 0).getDate();
        let first_day = new Date(year, month-1, 1).toDateString().split(" ")[0];
        let empty_days = DATEPICKER_EMPTY_DAYS_NAMES[first_day]
        let valid_dates = Array(empty_days).fill(false)
            .concat(Array(all_days).fill(true))
            .concat(Array(Math.abs(empty_days+all_days-35)).fill(false));
        // set calendar days
        all_days = 1;
        days_numbers.innerHTML = "";
        for(let days=0; days<42; days++){
            if(valid_dates[days]){
                let str_date = select_month.value+"/"+((all_days<10) ? "0"+all_days : ""+all_days)+"/"+select_year.value; 
                days_numbers.innerHTML += `<a href="javascript:DatePickerSetDateToInput('${str_date}');" class="datepicker-daynumber">${all_days}</a>`;
                all_days++;
            }else{
                days_numbers.innerHTML += `<div class=""></div>`;
            }
        }
        // set selected day
        let day_selected = parseInt(input_value.split("/")[1]) + "";
        let days = days_numbers.childNodes;
        for(let d=0; d<days.length; d++){
            let day = days[d];
            if(day_selected === day.innerHTML){
                day.classList.add("datepicker-dayselected");
            }else{
                day.classList.remove("datepicker-dayselected");
            }
        }
    }else{
        DatePickerSetToday();
    }
    document.getElementById("datepicker-container").style.display = "block";
}

function DatePickerSetDateToInput(date_str){
    if(DATEPICKER_INPUT){
        DATEPICKER_INPUT.value = date_str;
    }else{
        console.log(date_str, DATEPICKER_INPUT);
    }
    document.getElementById("datepicker-container").style.display = "none";
}

function DatePickerSetToday(){
    // get elements
    let select_year = document.getElementById("datepicker-select-year");
    let select_month = document.getElementById("datepicker-select-month");
    let days_numbers = document.getElementById("datepicker-body");
    // set date values
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let all_days = new Date(year, month, 0).getDate();
    let first_day = new Date(year, month-1, 1).toDateString().split(" ")[0];
    let empty_days = DATEPICKER_EMPTY_DAYS_NAMES[first_day]
    let valid_dates = Array(empty_days).fill(false)
        .concat(Array(all_days).fill(true))
        .concat(Array(Math.abs(empty_days+all_days-35)).fill(false));
    // set current year and month
    select_year.value = year;
    select_month.value = (month<10) ? "0"+month : ""+month;
    // set calendar days
    all_days = 1;
    days_numbers.innerHTML = "";
    for(let days=0; days<42; days++){
        if(valid_dates[days]){
            let str_date = select_month.value+"/"+((all_days<10) ? "0"+all_days : ""+all_days)+"/"+select_year.value; 
            if(all_days === day){
                DatePickerSetDateToInput(str_date);
                days_numbers.innerHTML += `<a href="javascript:DatePickerSetDateToInput('${str_date}');" class="datepicker-daynumber datepicker-dayselected">${all_days}</a>`;
            }else{
                days_numbers.innerHTML += `<a href="javascript:DatePickerSetDateToInput('${str_date}');" class="datepicker-daynumber">${all_days}</a>`;
            }
            all_days++;
        }else{
            days_numbers.innerHTML += `<div class=""></div>`;
        }
    }
}

function DatePickerSetUp(){
    // set datepicker inner html
    let datepicker = document.getElementById("datepicker-container");
    if(datepicker){
        datepicker.innerHTML = `
    <div class="datepicker-content" id="datepicker-content">
        <div class="datepicker-header datepicker-dark-background">
            <div class="datepicker-icon-close" onclick="document.getElementById('datepicker-container').style.display = 'none';">&#10006;</div>
            <select class="datepicker-select" id="datepicker-select-year">
                <option value="" selected disabled>AÑO</option>
            </select>
            <select class="datepicker-select" id="datepicker-select-month">
                <option value="" selected disabled>MES</option>
                <option value='01'>ENERO</option>
                <option value='02'>FEBRERO</option>
                <option value='03'>MARZO</option>
                <option value='04'>ABRIL</option>
                <option value='05'>MAYO</option>
                <option value='06'>JUNIO</option>
                <option value='07'>JULIO</option>
                <option value='08'>AGOSTO</option>
                <option value='09'>SEPTIEMBRE</option>
                <option value='10'>OCTUBRE</option>
                <option value='11'>NOVIEMBRE</option>
                <option value='12'>DICIEMBRE</option>
            </select>
            <button class="datepicker-btn-today" onclick="DatePickerSetToday();">HOY</button>
        </div>
        <div class="datepicker-header datepicker-default-background">
            <div class="datepicker-dayname">DO</div>
            <div class="datepicker-dayname">LU</div>
            <div class="datepicker-dayname">MA</div>
            <div class="datepicker-dayname">MI</div>
            <div class="datepicker-dayname">JU</div>
            <div class="datepicker-dayname">VI</div>
            <div class="datepicker-dayname">SA</div>
        </div>
        <div class="datepicker-body datepicker-light-background" id="datepicker-body">
            <!--
            <a class="datepicker-daynumber" href="#">1</a>
            <a class="datepicker-daynumber" href="#">2</a>
            <a class="datepicker-daynumber" href="#">3</a>
            <a class="datepicker-daynumber datepicker-dayselected" href="#">4</a>
            <a class="datepicker-daynumber" href="#">5</a>
            <a class="datepicker-daynumber" href="#">6</a>
            <a class="datepicker-daynumber" href="#">7</a>
            <a class="datepicker-daynumber" href="#">8</a>
            <a class="datepicker-daynumber" href="#">9</a>
            <a class="datepicker-daynumber" href="#">10</a>
            -->
        </div>
    </div>`;
    }else{
        return;
    }
    // get elements
    let select_year = document.getElementById("datepicker-select-year");
    let select_month = document.getElementById("datepicker-select-month");
    let days_numbers = document.getElementById("datepicker-body");
    for(let year=1900; year<=2200; year++){
        select_year.innerHTML += `<option value='${year}'>${year}</option>`;
    }
    // set onchange function to selects
    let RebuildDatePicker = ()=>{
        // set date values
        let year = select_year.value;
        let month = select_month.value;
        let all_days = new Date(year, month, 0).getDate();
        let first_day = new Date(year, month-1, 1).toDateString().split(" ")[0];
        let empty_days = DATEPICKER_EMPTY_DAYS_NAMES[first_day]
        let valid_dates = Array(empty_days).fill(false)
            .concat(Array(all_days).fill(true))
            .concat(Array(Math.abs(empty_days+all_days-35)).fill(false));
        // set calendar days
        all_days = 1;
        days_numbers.innerHTML = "";
        for(let days=0; days<42; days++){
            if(valid_dates[days]){
                let str_date = select_month.value+"/"+((all_days<10) ? "0"+all_days : ""+all_days)+"/"+select_year.value; 
                days_numbers.innerHTML += `<a href="javascript:DatePickerSetDateToInput('${str_date}');" class="datepicker-daynumber">${all_days}</a>`;
                all_days++;
            }else{
                days_numbers.innerHTML += `<div class=""></div>`;
            }
        }
    }
    select_year.addEventListener('change', RebuildDatePicker);
    select_month.addEventListener('change', RebuildDatePicker);
    // set outside click
    document.addEventListener('click', (event)=>{
        if(event.target.id === datepicker.id){
            datepicker.style.display = "none";
        }
    });
}

/* ---------------- Fixed Alerts ----------------- */

const FIXED_ALERTS = (alert) => {
    document.getElementById("fixed-alerts").innerHTML += alert;
}

/* -------------------- Modals ------------------- */

const SWOH_WINDOW_MODAL = (id_modal) => {
    let WINDOW_MODAL = document.getElementById(id_modal);
    if(WINDOW_MODAL.style.left != '-100%') WINDOW_MODAL.style.left = '-100%';
    else WINDOW_MODAL.style.left = '0%';
}

/* ------------------- SnackBar ------------------ */

const FRAMEWORK_SNACKBAR = (cssClass = 'default', message = 'Short Message!', btnLabel = 'ACTION', linkAction = '#') => {
    let id = "snack-" + RANDOM_INT(100000, 999999);
    let mssgId = "snack-mssg-" + RANDOM_INT(100000, 999999);
    let count = 0;
    let snackbar = `
    <div class="snackbar ${cssClass}" id="${id}">
        <div class="message" id="${mssgId}">
            ${TOAST_DURATION - count} - ${message}
        </div>
        <div class="action">
            <a href="${linkAction}">${btnLabel}</a>
        </div>
    </div>
    `;
    document.getElementById('div-snackbar').innerHTML += snackbar;
    let duration = setInterval(() => {
        if(document.getElementById(mssgId)){
            document.getElementById(mssgId).innerText = `${TOAST_DURATION - count} - ${message}`;
        }
        count++;
        if(count > TOAST_DURATION){
            snackbar = document.getElementById(id);
            if(snackbar){
                snackbar.parentNode.removeChild(snackbar);
            }
            clearInterval(duration);
        }
    }, 1000);
}

/* -------------------- Toasts ------------------- */

const TOAST_DURATION = 10;

const FRAMEWORK_TOAST = (toast, toast_id) => {
    document.getElementById("div-toasts").innerHTML += toast;
    let count = 0;
    let duration = setInterval(() => {
        //console.log(count);
        if(count > TOAST_DURATION-1){
            let toast_item = document.getElementById(toast_id);
            if(toast_item){
                toast_item.parentNode.removeChild(toast_item);
            }
            clearInterval(duration);
        }
        count++;
    }, 1000);
}

function TOAST(colorClass, textMsg){
    let toast_id = "toast-" + RANDOM_INT(100000, 999999);
    let toast = `<div class="alert ${colorClass}" id="${toast_id}">
        <i class="fa fa-times clickable" aria-hidden="true" onclick="RemoveAlert(event);"></i>
        ${textMsg}
    </div>`;
    FRAMEWORK_TOAST(toast, toast_id);
}

/* ------------------ Change Mode ---------------- */

function ChangeMode(){
    let icon = document.getElementById("change-mode-icon");
    if(icon.classList.contains('fa-moon-o')){
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
    }else{
        icon.classList.remove('fa-sun-o');
        icon.classList.add('fa-moon-o');
    }
    let body = document.getElementById('app-root');
    if(body.classList.contains('dark-mode')){
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(APP_DARK_THEME, JSON.stringify({"dark-mode" : false}));
        } else {
            TOAST("danger", "LocalStorage no soportado!");
        }
    }else{
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(APP_DARK_THEME, JSON.stringify({"dark-mode" : true}));
        } else {
            TOAST("danger", "LocalStorage no soportado!");
        }
    }
}

/* ----------------- App Functions --------------- */

const APP_DARK_THEME = "APP-DARK-THEME";

const APP_FIRST_TIME = "APP-FIRST-TIME";

const APP_TASKS_KEY = "APP-TASKS-KEY";

let TASKS = [];

function SetValueToSelect(select_id, value){
    let select = document.getElementById(select_id);
    select.value = value;
}

function ChangeSectionTask(select_id, task_id){
    let section = document.getElementById(select_id).value;
    let task = TASKS.filter(obj => { return obj.id === task_id })[0];
    task.section = section;
    SaveOnLocalStorage(TASKS);
    LoadAllTask(TASKS);
}

function ChangeSectionTaskOnDrop(section, task_id){
    let task = TASKS.filter(obj => { return obj.id === task_id })[0];
    task.section = section;
    SaveOnLocalStorage(TASKS);
    LoadAllTask(TASKS);
}

function LoadAllTask(array){
    document.getElementById("state-column-1").innerHTML = "";
    document.getElementById("state-column-2").innerHTML = "";
    document.getElementById("state-column-3").innerHTML = "";
    document.getElementById("state-column-4").innerHTML = "";
    array.forEach(it => {
        let item_class = "light";
        if(it.section === "1"){
            item_class = "secondary";
        }else if(it.section === "2"){
            item_class = "primary";
        }else if(it.section === "3"){
            item_class = "warning";
        }else if(it.section === "4"){
            item_class = "success";
        }
        if(it.end_dt.trim() !== ""){
            let end = new Date(it.end_dt);
            let curr = new Date();
            if(end<curr && it.section!=="4"){
                item_class = "danger";
                let toast_id = "toast-" + RANDOM_INT(100000, 999999);
                let toast = `<div class="alert danger" id="${toast_id}">
                    <i class="fa fa-times clickable" aria-hidden="true" onclick="RemoveAlert(event);"></i>
                    La tarea "${it.title.trim()}" supero la fecha de finalización!
                </div>`;
                FIXED_ALERTS(toast);
            }
        }
        let select_id = "select-" + it.id.trim();
        let inner = `<div class="accordion-item ${item_class}" id="${it.id.trim()}" draggable="true" ondragstart="drag(event);" ondrop="return false;">
                            <div class="accordion-header clickable" title="Mueveme" onclick="AccordionCollapse(event)">
                                ${it.title.trim()}
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                            <div class="accordion-body hidden">
                                <select class="form-select" id="${select_id}" onchange="ChangeSectionTask('${select_id}', '${it.id.trim()}');">
                                    <option value="1">Por Hacer</option>
                                    <option value="2">En Proceso</option>
                                    <option value="3">En Revisión</option>
                                    <option value="4">Completado</option>
                                </select>
                                <span><strong>Inicia:</strong> ${it.start_dt.trim()}</span>
                                <br>
                                <span><strong>Termina:</strong> ${it.end_dt.trim()}</span>
                                <br>
                                <span><strong>Responsable:</strong> ${it.subject.trim()}</span>
                                <br><br>
                                <p>${it.description.trim()}</p>
                                <br>
                                <button class="btn danger" title="Eliminar Tarea" onclick="DeleteTask('${it.id.trim()}');">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>`;
        document.getElementById("state-column-" + it.section).innerHTML += inner;
        SetValueToSelect(select_id, it.section);
    });
}

function SaveOnLocalStorage(obj){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(APP_TASKS_KEY, JSON.stringify(obj));
    } else {
        TOAST("danger", "LocalStorage no soportado!");
    }
}

function AddTask(){
    let section = document.getElementById("select-section");
    let title = document.getElementById("input-title");
    let start_dt = document.getElementById("input-start-date");
    let end_dt = document.getElementById("input-end-date");
    let subject = document.getElementById("input-subject");
    let description = document.getElementById("input-description");
    let empty_values = 0;

    if(section.value.trim() === ""){
        TOAST("warning", "Sección vacía!");
        empty_values++;
    }
    if(title.value.trim() === ""){
        TOAST("warning", "Título vacío!");
        empty_values++;
    }
    if(start_dt.value.trim() === ""){
        TOAST("warning", "Dia de inicio vacío!");
        empty_values++;
    }
    if(end_dt.value.trim() === ""){
        TOAST("warning", "Día final vacío!");
        empty_values++;
    }
    if(subject.value.trim() === ""){
        TOAST("warning", "Responsable vacío!");
        empty_values++;
    }
    if(description.value.trim() === ""){
        TOAST("warning", "Descripción vacía!");
        empty_values++;
    }

    AddAnyWay(empty_values);
}

function AddAnyWay(emptys){
    if(emptys === 0){
        SaveTask();
    }else{
        let message = `Tienes ${emptys} datos vacíos!`;
        FRAMEWORK_SNACKBAR('dark', message, 'AGREGAR', 'javascript:SaveTask();');
    }
}

function SaveTask(){
    let section = document.getElementById("select-section");
    let title = document.getElementById("input-title");
    let start_dt = document.getElementById("input-start-date");
    let end_dt = document.getElementById("input-end-date");
    let subject = document.getElementById("input-subject");
    let description = document.getElementById("input-description");
    let task = {
        "id" : "task-" + RANDOM_INT(100000, 999999),
        "section" : section.value.trim(),
        "title" : title.value.trim(),
        "start_dt" : start_dt.value.trim(),
        "end_dt" : end_dt.value.trim(),
        "subject" : subject.value.trim(),
        "description" : description.value.trim(),
    };

    TASKS.push(task);
    TOAST("success", "Tarea Guardada!");
    section.value = "1";
    title.value = "";
    start_dt.value = "";
    end_dt.value = "";
    subject.value = "";
    description.value = "";
    SWOH_WINDOW_MODAL('div-modal-middle');
    document.getElementById("div-snackbar").innerHTML = "";

    SaveOnLocalStorage(TASKS);
    LoadAllTask(TASKS);
}

function DeleteTask(task_id){
    let message = `Desea eliminar la tarea?`;
    FRAMEWORK_SNACKBAR('dark', message, 'ELIMINAR', `javascript:RemoveTask('${task_id.trim()}');`);
}

function RemoveTask(task_id){
    TASKS = TASKS.filter(function(item) { return item.id != task_id; });
    SaveOnLocalStorage(TASKS);
    LoadAllTask(TASKS);
    document.getElementById("div-snackbar").innerHTML = "";
}

function FindTaskByText(){
    let text = document.getElementById("input-find-task").value.trim();
    let columns = document.getElementsByClassName("state-column");
    for(let c=0; c<columns.length; c++){
        let column = columns[c];
        let children = column.childNodes;
        children.forEach(child => {
            let inner = child.innerHTML.trim();
            if(inner.includes(text)){
                child.style.display = "block";
            }else{
                child.style.display = "none";
            }
        });
    }
}

/* ----------------- Drag And Drop --------------- */

function allowDrop(evt) {
    evt.preventDefault();
}

function drag(evt) {
    evt.dataTransfer.setData("id", evt.target.id);
}

function drop(evt) {
    evt.preventDefault();
    let task_id = evt.dataTransfer.getData("id");
    let section = evt.target.id.trim();
    if(section.includes("state-column")){
        section = section.replace("state-column-", "");
        //console.log(task_id, section);
        ChangeSectionTaskOnDrop(section, task_id);
    }
}

/* ------------------- Load Window --------------- */

window.addEventListener('load', () => {
    let tasks = localStorage.getItem(APP_TASKS_KEY);
    if(tasks){
        TASKS = JSON.parse(tasks);
    }

    let first_time = localStorage.getItem(APP_FIRST_TIME);
    if(!first_time){
        let toast_id = "toast-" + RANDOM_INT(100000, 999999);
        let toast = `<div class="alert info" id="${toast_id}">
            <i class="fa fa-times clickable" aria-hidden="true" onclick="RemoveAlert(event);"></i>
            Las tareas se guardaran en LocalStorage!
        </div>`;
        FIXED_ALERTS(toast);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(APP_FIRST_TIME, JSON.stringify({"first-time" : true}));
        } else {
            TOAST("danger", "LocalStorage no soportado!");
        }
    }

    let dark_theme = JSON.parse(localStorage.getItem(APP_DARK_THEME));
    if(dark_theme){
        if(dark_theme["dark-mode"]){
            ChangeMode();
        }
    }

    LoadAllTask(TASKS);
});

