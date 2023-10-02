const display1Element = document.querySelector(".display-1");
const display2Element = document.querySelector(".display-2");
const tempResultElement = document.querySelector(".temp-result");
const numbersElements = document.querySelectorAll(".number");
const operationsElements = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearAllElement = document.querySelector(".all-clear");
const clearLastElement = document.querySelector(".last-entity-clear");
let dis1number = ""; //First operant
let dis2number = ""; //Second operant
let result = null;
let lastOperation = "";
let haveDot = false; //Check whether the number is floating point

numbersElements.forEach((number) => {
  number.addEventListener("click", (e) => {
    // e.preventDefault();
    if(e.target.innerText === "." && !haveDot){
      haveDot = true;
    } else if(e.target.innerText === "." && haveDot) { //Check if the number already contains a decimal dot .
      return;
    }
    dis2number += e.target.innerText;
    display2Element.innerText = dis2number;
  });
});

operationsElements.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    // e.preventDefault();
    if(!dis2number){
      return;
    }
    haveDot = false;
    const operationName = e.target.innerText;
    if(dis1number && dis2number && lastOperation){
      mathOperation();
    }else{
      result = parseFloat(dis2number);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

const clearVar = (name="") => {
  dis1number += dis2number + " " + name + " ";
  display1Element.innerText = dis1number;
  display2Element.innerText = "";
  dis2number = "";
  tempResultElement.innerText = result;
}

const mathOperation = () => {
  if(lastOperation === "x"){
    result = parseFloat(result) * parseFloat(dis2number);
  } else if(lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2number);
  } else if(lastOperation === "-"){
    result = parseFloat(result) - parseFloat(dis2number);
  } else if(lastOperation === "/"){
    result = parseFloat(result) / parseFloat(dis2number);
  } else if(lastOperation === "%"){
    result = parseFloat(result) % parseFloat(dis2number);
  }
}

equalElement.addEventListener("click", (event) => {
  // event.preventDefault();
  if(!dis1number || !dis2number){
    return;
  }
  haveDot = false;
  mathOperation();
  clearVar();
  display2Element.innerText = result;
  tempResultElement.innerText = "";
  dis2number = result;
  dis1number = "";
});

clearAllElement.addEventListener("click", (event) =>{
  // event.preventDefault();
  dis1number = "";
  dis2number = "";
  display1Element.innerText = "";
  display2Element.innerText = "";
  result = "";
  tempResultElement.innerText = "";
});

clearLastElement.addEventListener("click", (event) => {
  // event.preventDefault();
  display2Element.innerText = "";
  dis2number = "";
});

window.addEventListener("keydown", (event) => {
  if(
    event.key === "0" ||
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "." 
    ){
      clickButtonEl(event.key);
  } else if(
    event.key === "+" ||
    event.key === "-" ||
    event.key === "/" ||
    event.key === "%" 
  ){
    clickOperationEl(event.key);
  } else if(event.key === "*" ){
    clickOperationEl("x");
  } else if(event.key === "Enter" || event.key === "="){
    clickEqual();
  }
});

const clickButtonEl = (key) => {
  numbersElements.forEach((button) => {
    if(button.innerText === key){
      button.click();
    }
  });
};

const clickOperationEl = () => {
  operationsElements.forEach((operation) => {
    if(operation.innerText === key){
      operation.click();
    }
  });
}

const clickEqual = () => {
  equalElement.click();
}