const namePizza = document.getElementById('idNamePizza')
const size = document.getElementById('idSize')
const price = document.getElementById('idPrice')
const buttonSubmit = document.getElementById('idSubmit')
const bodyTable = document.getElementById('idBodyTable')
const buttonResults = document.getElementById('idButtonResults')
const buttonClear = document.getElementById('idButtonClear')
var table = document.querySelector('.table')
var selectShape = document.getElementById('idSelectShape')
const circle = document.getElementById('idCircle')
const square = document.getElementById('idSquare')
const rectangle = document.getElementById('idRectangle')
const sizeHelp = document.getElementById('idSizeHelp')
var divWidth = document.querySelector(".div-width")
const width = document.getElementById('idSizeWidth')

var arrayName = []
var arraySize = []
var arrayPrice = []
var arrayUSCM = []
var matrix = []
var index = 0
var arrayDiff = ["Best CB"]
var arraySizeForTable = []

// button submit and check if size has not been sent
function preventDefault(event) {
    event.preventDefault()
    checkSize()
}

// check if size has already been submited
function checkSize() {

    if (circle.selected) {
        if (arraySizeForTable.includes((size.value)) == false) {
            saveArray()
            clearfields()
        } else {
            alert("The Pizza Size provided has already been submited! Type another diameter please.")
        }
    } else {
        if (square.selected) {
            if (arraySizeForTable.includes(((size.value + "x" + size.value))) == false) {
                saveArray()
                clearfields()
            } else {
                alert("The Pizza Size provided has already been submited! Type another side please.")
            }
        } else {
            if (arraySizeForTable.includes(((size.value + "x" + width.value))) == false) {
                saveArray()
                clearfields()
            } else {
                alert("The Pizza Size provided has already been submited! Type another height/width please.")
            }
        }
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

    let USCM = 0

    if (circle.selected) {
        USCM = (Number(price.value) / (Math.PI * ((Number(size.value) / 2) * (Number(size.value) / 2)))).toFixed(2)
        arraySizeForTable.push(size.value)
    } else {
        if (square.selected) {
            USCM = (Number(Number(price.value) / (Number(size.value) * Number(size.value)))).toFixed(2)
            arraySizeForTable.push(size.value + "x" + size.value)
        } else {
            USCM = (Number(Number(price.value) / (Number(size.value) * Number(width.value)))).toFixed(2)
            arraySizeForTable.push(size.value + "x" + width.value)
        }
    }

    arrayName.push(namePizza.value)
    arraySize.push(Number(size.value))
    arrayPrice.push(Number(price.value))
    arrayUSCM.push(Number(USCM))


    matrix.push([arrayName[index], arraySize[index], arrayPrice[index], arrayUSCM[index], arraySizeForTable[index]])

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
                <td scope="col">${matrix[index][4]}</td>
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

selectShape.addEventListener("change", shapeSelected)

// checking which shape is selected
function shapeSelected() {
    if (square.selected) {
        sizeHelp.innerText = "side in centimeters"
        divWidth.style.display = "none"
    } else {
        if (circle.selected) {
            sizeHelp.innerText = "diameter in centimeters"
            divWidth.style.display = "none"
        } else {
            sizeHelp.innerText = "height in centimeters"
            divWidth.style.display = "block"
        }
    }

}
