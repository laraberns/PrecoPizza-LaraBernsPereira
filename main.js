const namePizza = document.getElementById('idNamePizza')
const size = document.getElementById('idSize')
const price = document.getElementById('idPrice')
const buttonSubmit = document.getElementById('idSubmit')
const bodyTable = document.getElementById('idBodyTable')
const buttonResults = document.getElementById('idButtonResults')
const buttonClear = document.getElementById('idButtonClear')
var table = document.querySelector('.table')

var arrayName = []
var arraySize = []
var arrayPrice = []
var arrayUSCM = []
var matrix = []
var index = 0
var arrayDiff = ["Best CB"]

// button submit and check if size has not been sent
function preventDefault(event) {
    event.preventDefault()
    checkSize()
}

// check if size has already been submited
function checkSize(){
    if(arraySize.includes(Number(size.value)) == false){
        saveArray()
        clearfields()
    }else{
        alert("The Pizza Size provided has already been submited! Type another size please.")
    }
}

// clear fields when submited
function clearfields() {
    namePizza.value = ""
    size.value = ''
    price.value = ''
}

// save each input in a specif array and push all infos into matrix array
function saveArray() {
    let UsCm = (Number(price.value) / (Math.PI * ((Number(size.value) / 2) * (Number(size.value) / 2)))).toFixed(2)

    arrayName.push(namePizza.value)
    arraySize.push(Number(size.value))
    arrayPrice.push(Number(price.value))
    arrayUSCM.push(Number(UsCm))

    matrix.push([arrayName[index], arraySize[index], arrayPrice[index], arrayUSCM[index]])

    index++

    sortMatrix()
    console.log(matrix)
}

// sort matrix array by col3 = arrayUSCM(U$/CM2) = Sort by cost-benefit
function sortMatrix() {
    matrix.sort(function (a, b) {
        return a[3] - b[3]
    });
}

//show results on page
buttonResults.addEventListener("click", showResults)

function showResults() {
    table.innerHTML = `
    <thead>
        <tr class="fw-bold">
            <th scope="col">Name</th>
            <th scope="col">Pizza Size (cm)</th>
            <th scope="col">Price</th>
            <th scope="col">U$ p/cm²</th>
            <th scope="col">Price Diff</th>
        </tr>
    </thead>
    `
    calculateDiff()
    arrayDiff = ["Best CB"]
}

// calculate diff between prices in each row
function calculateDiff() {
    for (let index = 1; index < arrayName.length; index++) {
        if (matrix[index][2] > matrix[index - 1][2]) {
            arrayDiff.push("+" + ((((matrix[index][2] * 100) / (matrix[index - 1][2])) - 100).toFixed(2)) + '%')
        } else {
            arrayDiff.push((((matrix[index][2] / matrix[index - 1][2]) - 1) * 100).toFixed(2) + '%')
        }
    }

    for (let index = 0; index < arrayName.length; index++) {
        table.innerHTML += `
        <tbody>
            <tr>
                <td scope="col">${matrix[index][0]}</td>
                <td scope="col">${matrix[index][1]}</td>
                <td scope="col">${matrix[index][2]}</td>
                <td scope="col">${matrix[index][3]}</td>
                <td scope="col">${arrayDiff[index]}</td>
            </tr>
        </tbody>
        `
    }
}

// reaload page when button Clear is clicked
buttonClear.addEventListener("click", realoadWindow)

function realoadWindow() {
    location.reload();
}
