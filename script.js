function validate(){
    let errors = document.getElementsByClassName("Error")
    for (i = 0; i < errors.length ; i++){
        errors[i].remove()
    }
    let valueX = [document.getElementById("checkX_1"),document.getElementById("checkX_2"),
        document.getElementById("checkX_3"),document.getElementById("checkX_4"),
        document.getElementById("checkX_5"), document.getElementById("checkX_6"),
        document.getElementById("checkX_7"),document.getElementById("checkX_8"),
        document.getElementById("checkX_9")]
    let valueR = [document.getElementById("checkR_1"),document.getElementById("checkR_2"),
        document.getElementById("checkR_3"),document.getElementById("checkR_4"),
        document.getElementById("checkR_5")]
    let valueY = document.getElementById("checkY")
    let xChecked = false
    let rChecked = false
    let xArr = [];
    let rArr = [];
    for (i = 0; i<9; i++){
        if (valueX[i].checked) {
            xArr.push(-4+i)
            xChecked = true;
        }
    }
    i = 0
    for (i = 0; i<5; i++){
        if (valueR[i].checked) {
            rArr.push(1+i)
            rChecked = true;
        }
    }

    if (!isNaN(valueY.value.replace(",","."))){
        if (valueY.value < -5 || valueY.value > 5){
            showError(valueY.parentElement.parentElement,"Number must be in range -5 ... 5")
            return false
    }
        else {

            if (valueY.value.trim() === ""){
                showError(valueY.parentElement.parentElement,"Y is missed.")
                return false
            }
            if (xChecked === false){
                showError(valueX[0].parentElement.parentElement,"X is missed.")
                return false
            }
            if (rChecked === false){
                showError(valueR[0].parentElement.parentElement,"R is missed.")
                return false
            }
            sendForm(xArr, valueY.value.replace(",","."), rArr)
            return true
        }
}
    else {
        showError(valueY.parentElement.parentElement,"Y is NaN !")
        return false
    }
}

function addRow( X, Y, R, res, runtime, currTime){
    {
        var tbody = document.getElementById('res')
        var row = document.createElement("tr");
        tbody.appendChild(row);
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        td1.innerHTML = "X = " + X + " Y = " + Y + " R = " + R;

        if(res){
            td2.innerHTML = "Попадание";
        }
        else {
            td2.innerHTML = "Промах";
        }
        td3.innerHTML =(runtime*1000).toFixed(3) + " ms";
        td4.innerHTML = currTime;
    }
}

function showError(inputElem, text){
    var errorCase = document.createElement("tr")
    var errorCell = document.createElement("td")
    errorCell.innerHTML = text
    inputElem.insertAdjacentElement('beforebegin',errorCase)
    errorCase.appendChild(errorCell)
    errorCell.classList.add("Error")
    errorCase.classList.add("Error")
}

function sendForm(xArr, y, rArr){
    let x;
    let r;
    let data;
    for (x in xArr) {
        for (r in rArr) {
            data = "X=" + x + "&Y=" + y + "&R=" + r
            $.ajax({
                url: "index.php",
                type: "GET",
                data: data,
                success: function (msg) {
                    let results = String(msg).split(",")
                    addRow(results[0], results[1], results[2], results[3], results[4], results[5])
                }
            })
        }
    }
}
