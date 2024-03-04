// Obtener el canvas y el contexto
var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');

var click = false;
var first = false
canvas.addEventListener('mousedown', function (event) {
    click = true;
    first = false
})
canvas.addEventListener('mouseup', function () {
    click = false;
    first = false
});

canvas.addEventListener('dblclick', Seleccionar);



// Definir las propiedades del cuadrado
var square = [];

// Función para dibujar el cuadrado
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    square.forEach(square => {
        ctx.lineWidth = 10;
        ctx.strokeStyle = square.border_color;
        ctx.strokeRect(square.x, square.y, square.size, square.size);
        ctx.fillStyle = square.background_color;
        ctx.fillRect(square.x, square.y, square.size, square.size);

    });

}

function NewSquare() {
    square.push({
        id: Math.floor(Math.random() * 10000000000) + 1,
        x: 50,
        y: 50,
        size: 100,
        background_color: "#000000",
        border_color: "#000000",
    })
    update();
}


var cuadrado_select;
var index_select;
var difx;
var dify;
var ult;


function Seleccionar(event) {
    if(ult=1){
        cuadrado_select.border_color = "#000000"
        square[index_select]=cuadrado_select
    }
    ult = 1;

    // Obtener las coordenadas del clic
    click = false;
    first = false
    var x = event.clientX;
    var y = event.clientY;
    // Obtener las coordenadas relativas del clic dentro del canvas
    var rect = canvas.getBoundingClientRect();
    var canvasX = x - rect.left;
    var canvasY = y - rect.top;
    // Mostrar las coordenadas en la consola

    cuadrado_select = square.find(data => {
        return canvasX >= data.x && canvasX <= (data.x + data.size)
            && canvasY >= data.y && canvasY <= (data.y + data.size);
    })
    if (cuadrado_select) {
        index_select = square.findIndex(data => data.id == cuadrado_select)
        cuadrado_select.border_color = "#ff5733"
        square[index_select]=cuadrado_select
        update()
    } else {
        index_select = undefined
    }

    

}

function Arrastrar(event) {
    if (click) {
        if (ult == 1) {
            cuadrado_select.border_color = "#000000"
            square[index_select]=cuadrado_select
        }
        ult = 0;
        // Obtener las coordenadas del clic
        var x = event.clientX;
        var y = event.clientY;
        // Obtener las coordenadas relativas del clic dentro del canvas
        var rect = canvas.getBoundingClientRect();
        var canvasX = x - rect.left;
        var canvasY = y - rect.top;
        // Mostrar las coordenadas en la consola
        if (first) {
            cuadrado_select.x = canvasX + difx
            cuadrado_select.y = canvasY + dify
            square[index_select] = cuadrado_select
            update()
        }
        if (!first) {

            cuadrado_select = square.find(data => {
                return canvasX >= data.x && canvasX <= (data.x + data.size)
                    && canvasY >= data.y && canvasY <= (data.y + data.size);
            })
            if (cuadrado_select) {
                first = true
                index_select = square.findIndex(data => data.id == cuadrado_select)
                difx = cuadrado_select.x - canvasX
                dify = cuadrado_select.y - canvasY
            } else {
                index_select = undefined
            }

        }
    }
}





document.getElementById("add").addEventListener('click', NewSquare)
canvas.addEventListener('mousemove', Arrastrar)

update();
