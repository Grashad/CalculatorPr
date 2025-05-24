
/* HTML and Regexp for Functions */
/*note: rewrite the condition based on condCheck*/

    const inputButton = document.querySelectorAll(".buon");
    const dispErr = document.getElementsByClassName("dispErr");
    let displayCalc = document.getElementById("disP");
    const inputType = /(.*[\+\-\/\*])(?!.[\d])/
    const inputType2 = /(.*[\+\-\/\*=])(?!.[\d])/
    const filtDig = /(\d)/g;
    const decPointCheck = /(.*[\.])(.*[\.])/g
    const decPoint = /(.*[\.])/g
    const delDEL = /(DEL)/g;
    const delAC = /(AC)/g;
    /*Function global scope storage*/
    let calcArray = {
        value: [],
        value2: [],
        result: [],
    }
    let stringOperatorObj = {
        strLongStorage: "",
        strSepStore: "",
        strOpArrayStorage: [],
        strPassResult: "",
    };
    let ResCalc = calcArray.result;
    let sOOA = stringOperatorObj.strOpArrayStorage;
    let sSS = stringOperatorObj.strSepStore;
    let sLS = stringOperatorObj.strLongStorage;
    let total = 0;
    let total2 = 0;
    let arraY = calcArray.value;
    let arraY2 = calcArray.value2;
    let historyStorage = {
        currentVal: [],
        operatorVal: [],
        previousVals: [],
        resultStorage: [],
    }
    let condCheck = 0
  
    

    /* Calculator Functions */
    function calc(input) {
        if (condCheck === 0) {
            if (input.match(filtDig) != null) { total = sSS += input }
            if (input.match(decPoint) != null && total.indexOf(".") === -1) {
                total = sSS += input
            }

        }
        if (input.match(delDEL) != null && total > 0) {
            total = total.slice(0, -1)

        }
        if (input.match(inputType) != null && total > 0 && condCheck === 0) {
            arraY.splice(0, 1, total);
            sSS = "";
            total = 0;
            condCheck = 1
        }
    }


function storeOp(input) {
    if (input.match(inputType) != null && sOOA.length <= 1 && condCheck === 1) {
        sLS += input;
        sOOA.splice(0, 1, sLS);
        sLS = "";
        condCheck = 2
    }
}


function calc2(input) {
    if (input.match(inputType2) === null && condCheck === 2) {
        if (input.match(filtDig) != null) { total2 = sSS += input }
        if (input.match(decPoint) != null && total2.indexOf(".") === -1) { total2 = sSS += input }
        if (input.match(delDEL) != null && total2 > 0) {
            total2 = total2.slice(0, -1)
        }
    } else if (input.match(inputType2) != null && total2 > 0 && condCheck === 2) {
        let resArray = historyStorage.resultStorage
        arraY2.splice(0, 1, total2);
        sSS = "";
        total = 0;
        ResCalc = arraY[0].concat(sOOA[0], arraY2[0]);
        let resF = Function("return " + ResCalc)();
        resArray.push(resF)
        console.log(`result ${resF}`);
        total = 0;
        sSS = 0;
        arraY = [];
        sLS = "";
        sOOA = [];
        total2 = 0;
        arraY2 = [];
        condCheck = 0
    }

}


function allClear(input) {
    if (input.match(delAC) != null) {
        total = 0;
        sSS = 0;
        arraY = [];
        sLS = "";
        sOOA = [];
        total2 = 0;
        arraY2 = [];
        resF = [];
        condCheck = 0;
    }
}


function display(cond) {
    if(cond === 0 && total > 0) {
   displayCalc.innerText = `${total}`
    }
    else if(cond === 2) {
      displayCalc.innerText = `${total2}`
    }
    else if(cond === 0 && resArray.length > 0) {
        displayCalc.innerText = `${resArray[-1]}`
    }
}   




for (button of inputButton) {
    button.addEventListener("click", (f) => {
        input = f.target.textContent;
        calc(input);
        storeOp(input);
        calc2(input);
        allClear(input);
        display(condCheck);
        console.log(total);
        console.log(total2)
        console.log(sSS)
        console.log(sLS);
        console.log(input);
        console.log(arraY);
        console.log(arraY2)
        console.log(sOOA);
        console.log(`condition2: ${condCheck}`)
    })
}
