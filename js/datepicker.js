"use strict";

/* ------------------ DatePicker ----------------- */

const DATEPICKER_EMPTY_DAYS_NAMES = {
    'Sun':0, 
    'Mon':1, 
    'Tue':2, 
    'Wed':3, 
    'Thu':4, 
    'Fri':5, 
    'Sat':6
};

let DATEPICKER_INPUT;

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
