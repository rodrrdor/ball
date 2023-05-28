const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const MTR = 50;
const PI = Math.PI;
var ball;
var up = false, down = false, left = false, right = false;

class Player {
    constructor () {
        this.color = "orange";
        this.x = cnv.width / 2;
        this.y = cnv.height / 2;
        this.radius = MTR;
        this.walkForce = 10;

    }

    update() {
        let xy = toXY(calForThe(up, down, left, right));

        this.x += xy[0];
        this.y -= xy[1];
    }

    draw() {
        drawArc(this.color, this.x, this.y, this.radius);
    }
}

function drawArc(color, x, y, radius) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * PI);
    ctx.fill();
    ctx.stroke();
}

function drawRect(color, x, y, w, h) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.stroke();
}

function write(text, space) {
    ctx.fillStyle="white";
    ctx.textAlign="center";
    ctx.font="30px Comic Sans MS";
    ctx.fillText(text, cnv.width / 2, space * 30);
}

function calForThe(up, down, left, right) {
    let force = ball.walkForce;

    if (up && down) return [0, 0];

    if (up) {
        if (left == right) return [force, PI / 2];
        if (left || right) {
            if (left) {
                return [force, 3 * PI / 4];
            } else {
                return [force, PI / 4];
            }
        }
    }

    if (down) {
        if (left == right) return [force, 3 * PI / 2];
        if (left || right) {
            if (left) {
                return [force, 5 * PI / 4];
            } else {
                return [force, 7 * PI / 4];
            }
        }
    }

    if (left && right) return [0, 0];
    if (left || right) {
        if (left) {
            return [force, PI];
        } else {
            return [force, 0];
        }
    }

    return [0, 0];
}

function toXY([force, theta]) {
    let y = Math.sin(theta) * force;
    let x = Math.cos(theta) * force;
    return [x, y];
}

(function init() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    ball = new Player();

    addEventListener("keydown", (e) => {
        switch (e.code) {
            case "KeyW":
                up = true;
                break;
            case "KeyS":
                down = true;
                break;
            case "KeyA":
                left = true;
                break;
            case "KeyD":
                right = true;
        }
    });

    addEventListener("keyup", (e) => {
        switch (e.code) {
            case "KeyW":
                up = false;
                break;
            case "KeyS":
                down = false;
                break;
            case "KeyA":
                left = false;
                break;
            case "KeyD":
                right = false;
        }
    });

    requestAnimationFrame(main);
}());

function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    update();
    draw();
    requestAnimationFrame(main);
}

function update() {
    ball.update();
}

function draw() {
    drawRect("black", 0, 0, cnv.width, cnv.height);
    ball.draw();
}