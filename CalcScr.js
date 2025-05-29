
/* HTML and Regexp for Functions */
/*note: rewrite the condition based on condCheck*/
{
    const inputButton = document.querySelectorAll(".buon");
    const dispErr = document.getElementsByClassName("dispErr");
    let displayCalc = document.getElementById("disP");
    let displayCalcHist = document.getElementById("disH");
    const inputType = /(.*[\+\-\/\*])(?!.[\d])/
    const inputType2 = /(.*[\+\-\/\*=])(?!.[\d])/
    const filtDig = /(\d)/g;
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
    let arrStrgeRes = historyStorage.resultStorage;
    let arrStrgeCalc1 = historyStorage.previousVals;
    let arrStrgeOp = historyStorage.operatorVal;
    let arrStrgeCalc2 = historyStorage.currentVal;
    let condCheck = 0;
    let dispLogic = 0;
    let currentDisplay = 0;


    /* Calculator Functions */
    function calc(input) {
        if (condCheck === 0) {
            if (input.match(filtDig) != null) {
                total = sSS += input
            }
            if (input.match(decPoint) != null && total.indexOf(".") === -1) {
                total = sSS += input
            }
            currentDisplay = 1;
        }
        if (input.match(delDEL) != null && total > 0) {
            total = total.slice(0, -1)

        }
        if (input.match(inputType) != null && total > 0 && condCheck === 0) {
            arraY.splice(0, 1, total);
            arrStrgeCalc1.splice(0, 1, total);
            sSS = "";
            total = 0;
            condCheck = 1
        }
    }


    function storeOp(input) {
        if (input.match(inputType) != null && sOOA.length <= 1 && condCheck === 1) {
            sLS += input;
            currentDisplay = 2
            sOOA.splice(0, 1, sLS);
            arrStrgeOp.splice(0, 1, sLS);
            sLS = "";
            dispLogic = 2
        }
    }


    function calc2(input) {
        if (input.match(inputType2) === null && sOOA.length > 0) {
            currentDisplay = 3;
            if (input.match(filtDig) != null) {
                
                total2 = sSS += input;
            }
            if (input.match(decPoint) != null && total2.indexOf(".") === -1) { total2 = sSS += input }
            if (input.match(delDEL) != null && total2 > 0) {
                total2 = total2.slice(0, -1);
            }
            condCheck = 2;
            
        } else if (input.match(inputType2) != null && total2 > 0 && condCheck === 2) {
            let resArray = historyStorage.resultStorage
            arraY2.splice(0, 1, total2);
            arrStrgeCalc2.splice(0, 1, total2);
            sSS = "";
            total = 0;
            ResCalc = arraY[0].concat(sOOA[0], arraY2[0]);
            let resF = Function("return " + ResCalc)();
            resArray.push(resF)
            console.log(`result ${resF}`);
            currentDisplay = 4
            arrStrgeRes.splice(0, 1, resF)
            dispLogic = 4
            condCheck = 0
            function clnMemory(condCheck) {
                total = 0;
                sSS = 0;
                arraY = [];
                sLS = "";
                sOOA = [];
                total2 = 0;
                arraY2 = [];
            }
            clnMemory(condCheck)
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
    function display1(currentDisplay) {
        if (currentDisplay === 1) {
            displayCalc.innerText = `${total}`
        } else if (currentDisplay === 2) {
            displayCalc.innerText = `${sOOA.join("")}`
        } else if (currentDisplay === 3) {
            displayCalc.innerText = `${total2}`
        }
        else if (currentDisplay === 4) {
            displayCalc.innerText = `${arrStrgeRes.join("")}`
        }
    }

    function display2(dispL) {
        if (dispL === 2) {
            displayCalcHist.innerText = `${arrStrgeCalc1.join("")}`
        } else if (dispL === 3) {
            displayCalcHist.innerText = `${arrStrgeCalc1.join("") + arrStrgeOp.join("")}`
        } else if (dispL === 4) {
            displayCalcHist.innerText = `${arrStrgeCalc1.join("") + arrStrgeOp.join("") + arrStrgeCalc2.join("")}`
        }
        else if (condCheck === 0 && total > 0 && arrStrgeRes.length === 1) {
            displayCalcHist.innerText = `${arrStrgeRes.join("")}`
        }
    }



    for (button of inputButton) {
        button.addEventListener("click", (f) => {
            input = f.target.textContent;
            calc(input);
            storeOp(input);
            calc2(input);
            allClear(input);
            display1(currentDisplay);
            display2(dispLogic);
            console.log(total);
            console.log(total2)
            console.log(sSS)
            console.log(sLS);
            console.log(input);
            console.log(arraY);
            console.log(arraY2)
            console.log(sOOA);
            console.log(arrStrgeRes);
            console.log(arrStrgeCalc1);
            console.log(arrStrgeCalc2)
            console.log(`condition2: ${condCheck}`)
        })
    }
}