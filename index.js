// Obtener el canvas y el contexto
var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');

var click = false;
var first = false;
var resize = false;
canvas.addEventListener('mousedown', function (event) {
    click = true;
    first = false;
    resize = false;
    container.classList.add("oculto")
})
canvas.addEventListener('mouseup', function () {
    click = false;
    first = false;
    resize = false;
    container.classList.add("oculto")
});

canvas.addEventListener('dblclick', Seleccionar);

var container = document.getElementById('container');


// Definir las propiedades del cuadrado
var square = [];
var squareI = [];

// Función para dibujar el cuadrado
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    square.forEach(square => {
        ctx.lineWidth = 10;
        ctx.strokeStyle = square.border_color;
        ctx.strokeRect(square.x, square.y, square.sizeX, square.sizeY);
        ctx.fillStyle = square.background_color;
        ctx.fillRect(square.x, square.y, square.sizeX, square.sizeY);
        ctx.fillStyle = "#00913f";
        ctx.fillRect(square.x+square.sizeX-20, square.y,20, 20);
        ctx.fillRect(square.x+square.sizeX-20, square.y+square.sizeY-20,20, 20);

        ctx.fillStyle = square.text_color;
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var maxWidth = square.sizeX - 20;
        var maxHeight = square.sizeY / 2;
        var lineHeight = 25;
        var x = square.x + square.sizeX / 2;
        var y = square.y + square.sizeY / 2 - lineHeight / 2;
        var texto = square.text;
        var palabras = texto.split(' ');
        var linea = '';
        var actHeight=0;
        for (var i = 0; i < palabras.length; i++) {
            var testLine = linea + palabras[i] + ' ';
            var actWitdth = ctx.measureText(testLine).width;
            
            if (actWitdth > maxWidth) {
                ctx.fillText(linea, x, y);

                if((actHeight+lineHeight)<maxHeight){
                    linea = palabras[i] + ' ';
                    y += lineHeight;
                    actHeight += lineHeight;
                }else{
                    break
                }
            } else {
                linea = testLine;
            }
        }
        ctx.fillText(linea, x, y);

    });

}

function NewSquare() {
    square.push({
        id: Math.floor(Math.random() * 10000000000) + 1,
        x: 50,
        y: 50,
        sizeX: 100,
        sizeY: 100,
        background_color: "#ffffff",
        border_color: "#000000",
        text_color: "#000000",
        text:"Default"

    })
    squareI=square.slice().reverse();
    update();
}


var cuadrado_select;
var index_select;
var difx;
var dify;
var ult;


function Seleccionar(event) {
    container.classList.add("oculto")
    if (ult = 1) {
        if(cuadrado_select){
            cuadrado_select.border_color = "#000000"
            square[index_select] = cuadrado_select
        }
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

    cuadrado_select = squareI.find(data => {
        return canvasX >= data.x && canvasX <= (data.x + data.sizeX)
            && canvasY >= data.y && canvasY <= (data.y + data.sizeY);
    })
    if (cuadrado_select) {
        index_select = square.findIndex(data => data.id == cuadrado_select)
        square[index_select] = cuadrado_select
        difx = cuadrado_select.x - canvasX
        dify = cuadrado_select.y - canvasY
        if ((difx + cuadrado_select.sizeX) <= 20 && (dify*-1) <= 20) {
            container.style.left = x+difx+cuadrado_select.sizeX+7+"px";
            container.style.top = cuadrado_select.y+22+"px";
            container.classList.remove("oculto")
        }else{
            cuadrado_select.border_color = "#ff5733"
        }
        update()
    } else {
        index_select = undefined
    }
}

document.getElementById("container-close").addEventListener("click",close)

function close(){
    container.classList.add("oculto")
}

document.getElementById("Actualizar").addEventListener("click",modificar)

function modificar(){
    cuadrado_select.text= document.getElementById("Title").value
    cuadrado_select.text_color= document.getElementById("Color_text").value
    cuadrado_select.background_color= document.getElementById("Color_background").value
    
    square[index_select] = cuadrado_select
    update()
}

function Arrastrar(event) {
    if (click) {
        if (ult == 1) {
            if(cuadrado_select){
                cuadrado_select.border_color = "#000000"
                square[index_select] = cuadrado_select
            }
        }
        ult = 0;
        // Obtener las coordenadas del clic
        var x = event.clientX;
        var y = event.clientY;
        // Obtener las coordenadas relativas del clic dentro del canvas
        var rect = canvas.getBoundingClientRect();
        var canvasX = x - rect.left;
        var canvasY = y - rect.top;
        if (first) {
            if (resize) {
                cuadrado_select.sizeX = cuadrado_select.sizeX + -1 * (cuadrado_select.x - canvasX + cuadrado_select.sizeX);
                cuadrado_select.sizeY = cuadrado_select.sizeY + -1 * (cuadrado_select.y - canvasY + cuadrado_select.sizeY);
            } else if (!resize) {
                cuadrado_select.x = canvasX + difx
                cuadrado_select.y = canvasY + dify
            }
            square[index_select] = cuadrado_select
            update()

        }
        if (!first) {

            cuadrado_select = squareI.find(data => {
                return canvasX >= data.x && canvasX <= (data.x + data.sizeX)
                    && canvasY >= data.y && canvasY <= (data.y + data.sizeY);
            })
            if (cuadrado_select) {
                first = true
                index_select = square.findIndex(data => data.id == cuadrado_select)
                difx = cuadrado_select.x - canvasX
                dify = cuadrado_select.y - canvasY
                if ((difx + cuadrado_select.sizeX) <= 20 && (dify + cuadrado_select.sizeY) <= 20) {
                    resize = true
                }
            } else {
                index_select = undefined
            }

        }
    }
}





document.getElementById("add").addEventListener('click', NewSquare)
canvas.addEventListener('mousemove', Arrastrar)

update();
