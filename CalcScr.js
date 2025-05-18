
/* HTML and Regexp for Functions */
/*note: rewrite the condition based on condCheck*/
{
    const inputButton = document.querySelectorAll(".buon");
    const dispErr = document.getElementsByClassName("dispErr");
    const displayCalc = document.getElementsByClassName("calcF");
    const inputType = /(.*[\+\-\/\*])(?!.[\d])/
    const inputType2 = /(.*[\+\-\/\*=])(?!.[\d])/
    const filtNonDig = /(\D)/g;
    const filtDig = /(\d)/g;
    const functionB = /(DEL)|(AC)/g;

    /*Function global scope storage*/
    const calcArray = {
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
    let sPR = stringOperatorObj.strPassResult;
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
            if (input.match(filtDig) === null && total > 0 && condCheck === 0) {
                arraY.push(total);
                sSS = "";
                total = 0;
                condCheck = 1            
            }
        }
    }

    function storeOp(input) {

        if (input.match(inputType) != null && sOOA.length <= 1 && condCheck === 1 | condCheck === 2) {
            sLS += input;
            sOOA.splice(0, 1, sLS);
            sLS = "";
            condCheck = 2  
        }
    }


    function calc2(input) {
        if (input.match(inputType) === null && condCheck === 2) {
            if (input.match(filtDig) != null) { total2 = sSS += input }
        } else if (input.match(filtDig) === null && total2 > 0 && condCheck === 2) {
            arraY2.push(total2);
            sSS = "";
            total = 0;
            condCheck = 3  
        }
    }
    function result(input) {
    let resArray = historyStorage.resultStorage
      
        if (condCheck === 3  && input.match(inputType2) != null) {
            ResCalc = arraY[0].concat(sOOA[0], arraY2[0]);
            let resF = Function("return " + ResCalc)();
            resArray.push(resF)
            console.log(`result ${resF}`);
            condCheck = 4  
        }
    }
         
     function display(check) {
     switch(check) {
        case 0: {
        
        }
        case 1:
        {
         
        }
        case 2:
            {

            }
            case 3:
                {

                }
                case 4: {

                }
                default: {

                }
     }
   
    
    }
   

   
    
  
   function histStorageAndDelete(input) {
     
   }

    for (button of inputButton) {
        button.addEventListener("click", (f) => {
            input = f.target.textContent;
           
            result(input)
            calc(input);
            storeOp(input);
            calc2(input);
            display(condCheck)
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
}



