// Light/Dark Theme
const themeElement = document.querySelector(".themes__toggle");
const activateDarkTheme = () => {
    themeElement.classList.toggle("themes__toggle--isActive");
};
const toggleDarkThemeWithEnter = (event)=>{
    event.key === "Enter" && activateDarkTheme();
}
themeElement.addEventListener("click",activateDarkTheme); 
themeElement.addEventListener("keydown", toggleDarkThemeWithEnter);

// Logic 

let currentNumber = "", storedNumber = "", operation = "";

const keyElements = document.querySelectorAll("[data-type]");
const resultElement = document.querySelector(".calc__result");


const updateScreen = (value) => {
    resultElement.innerText = !value ?"0": value;
};

const numberButtonHandler = (value) =>{
    if(value === "." && currentNumber.includes("."))return;
    if(value === "0" && !currentNumber) return;
    currentNumber+=value;
    updateScreen(currentNumber);
}
const resetButtonHandler = () =>{
    currentNumber = ""; 
    storedNumber = "";
    operation = "";
    updateScreen(currentNumber);
}
const deleteButtonHandler = () =>{
    if(currentNumber.length === "1"){
        currentNumber = "";
    }else {
        currentNumber = currentNumber.substring(0,currentNumber.length-1);
    }
    updateScreen(currentNumber);
}
const executeOperation = () =>{
    if(currentNumber && storedNumber && operation){
    switch(operation){
        case "+":
            storedNumber = parseFloat(currentNumber) + parseFloat(storedNumber);
            break;
        case "-":
            storedNumber = parseFloat(currentNumber) - parseFloat(storedNumber);
            break;
        case "*":
            storedNumber = parseFloat(currentNumber) * parseFloat(storedNumber);
            break;
        case "/":
            storedNumber = parseFloat(currentNumber) / parseFloat(storedNumber);
            break;
    }
    currentNumber="";
    updateScreen(storedNumber);
    
    
}
}
const operationButtonHandler = (operationValue) =>{
    if(!currentNumber && !storedNumber)return;
    if(currentNumber && !storedNumber){
        storedNumber = currentNumber;
        currentNumber = "";
        operation = operationValue;
    }else if(storedNumber) {
        operation = operationValue;
        if(currentNumber) executeOperation();
    }
    

}
const keyElementsHandler = (element) => {
    element.addEventListener("click", () =>{
        const type = element.dataset.type;
        if(type=== "number"){
            numberButtonHandler(element.dataset.value);
        }
        else if (type ==="operation"){
            switch (element.dataset.value){
                case "c":
                    resetButtonHandler();
                    break;
                
                case "Backspace":
                    deleteButtonHandler();
                    break;
                
                case "Enter":
                    executeOperation();
                    break;
                
                default: 
                    operationButtonHandler(element.dataset.value);

            }

        }
}
    )
}

keyElements.forEach (keyElementsHandler);

// keyboard 
const availableNumbers = ["0","1","2","3","4","5","6","7","8","9",".",];
const availableOperations = [ "+", "-", "*", "/"];
const availableKeys = [...availableNumbers, ...availableOperations, "Backspace", "Enter", "c"];
window.addEventListener("keydown", (event)=>{
    const key = event.key;
    // keyboardWithoutHover(key);
    keyboardWithHover(key);
});

const keyboardWithoutHover = (key) =>{
    if(availableNumbers.includes(key)) {
        numberButtonHandler(key);
    }else if(availableOperations.includes(key)){
        operationButtonHandler(key);
    }else if(key === "Enter"){
        executeOperation();
    }else if(key === "Backspace"){
        deleteButtonHandler();
    }else if(key === "c"){
        resetButtonHandler();
    }
}
const keyboardWithHover = (key) =>{
    if(availableKeys.includes(key)){
        const element = document.querySelector(`[data-value="${key}"]`);
        element.classList.add("hover");
        element.click();
        setTimeout(()=>element.classList.remove("hover"), 100);
    }
};