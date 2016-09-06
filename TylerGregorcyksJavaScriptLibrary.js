/**
 * Created by Tyler on 8/7/2016.
 */


//---------------------------------------MATHS---------------------------------------//


//------------------VECTOR2F------------------\\
var Vector2f = function (x, y)
{
    this.x = x;
    this.y = y;
};

Vector2f.prototype.add = function (other, b)
{
    if(b != null)
    {
        return new Vector2f(other.x + b.x, other.y + b.y);
    }
    else
    {
        if(other instanceof Vector2f)
        {
            this.x += other.x || 0;
            this.y += other.y || 0;
        } else
        {
            this.x += other || 0;
            this.y += other || 0;
        }
    }
};

Vector2f.prototype.sub = function (other)
{
    if(other instanceof Vector2f)
    {
        this.x -= other.x;
        this.y -= other.y;
    } else
    {
        this.x -= other;
        this.y -= other;
    }
};

Vector2f.prototype.multiple = function(a, b)
{
    if(b != null)
    {
        return new Vector2f(a.x * b.x, a.y * b.y);
    }
    else
    {
        if(a instanceof Vector2f)
        {
            this.x = this.x * a.x;
            this.y = this.y * a.y;
        }
        else
        {
            this.x = this.x * a;
            this.y = this.y * a;
        }
    }
};

Vector2f.prototype.divide = function (a, b)
{
    if(b != null)
    {
        return new Vector2f(a.x / b.x, a.y / b.y);
    }
    else
    {
        if(a instanceof Vector2f)
        {
            this.x = this.x / a.x;
            this.y = this.y / a.y;
        }
        else
        {
            this.x = this.x / a;
            this.y = this.y / a;
        }
    }
};

Vector2f.prototype.set = function(other)
{
    if(other instanceof Vector2f)
    {
        this.x = other.x;
        this.y = other.y;
    }
    else
    {
        this.x = other;
        this.y = other;
    }
};

Vector2f.prototype.limit = function (max)
{
    if(this.x > max || this.x < -max)
    {
        if(this.x > 0)
            this.x = max;
        else
            this.x = -max;
    }
    if(this.y > max || this.y < -max)
    {
        if(this.y > 0)
            this.y = max;
        else
            this.y = -max;
    }
};

Vector2f.prototype.distance = function(a, b)
{
    if(b != null)
    {
        return new Vector2f(a.x - b.x, a.y - b.y);
    }
    else
    {
        if(a instanceof Vector2f)
        {
            return new Vector2f(this.x - a.x, this.y - a.y);
        }
    }
};

Vector2f.prototype.magnitude = function()
{
    return sqrt((this.x  * this.x) + (this.y * this.y));
};

Vector2f.prototype.normalize = function()
{
    var magnitude = this.magnitude();
    if(magnitude > 0)
    {
        return new Vector2f(this.x / magnitude, this.y / magnitude);
    }
};

Vector2f.prototype.heading = function()
{
    var h = Math.atan2(this.y, this.x);
    radiansToDegrees(h);
    return h;
};

function createVector2f(x, y)
{
    if(x != null && y != null)
    {
        return new Vector2f(x, y);
    }
    else
    {
        return new Vector2f(0, 0);
    }
}

function radiansToDegrees(x) {
    return 360 * x / (2 * Math.PI);
}
//---------------------END---------------------\\


//----------------------------------------END----------------------------------------//


//--------------------------------------Engine--------------------------------------//


//--------------------Engine--------------------\\

var Engine = function(canvas, FPS, color) {
    this.canvas = canvas;
    this.contex = this.canvas.getContext("2d");
    this.FPS = 1000 / FPS;
    this.gameObjects = [];
    this.contex.mouse = {
        x: 0,
        y: 0,
        clicked: false,
        down: false
    };
    if(color != null)
    {
        this.color = color;
    }
    this.setupEventListener();
};

Engine.prototype.run = function() {
    var desiredTime = Date.now() + this.FPS;

    this.update();
    this.draw();

    var interval = Math.max(0, desiredTime-Date.now());
    setTimeout(_.bind(this.run, this), interval);
};


Engine.prototype.setupEventListener = function()
{
    var engine = this;

    this.canvas.addEventListener("mousemove", function(e) {
        engine.contex.mouse.x = e.offsetX;
        engine.contex.mouse.y = e.offsetY;
        engine.contex.mouse.clicked = (!engine.contex.mouse.down && e.which == 1);
        engine.contex.mouse.down = (e.which == 1);
    });

    this.canvas.addEventListener("mousedown", function(e) {
        engine.contex.mouse.clicked = !engine.contex.mouse.down;
        engine.contex.mouse.down = true;
    });

    this.canvas.addEventListener("mouseup", function(e) {
        engine.contex.mouse.down = false;
        engine.contex.mouse.clicked = false;
    });
};

Engine.prototype.update = function()
{
    _.each(this.gameObjects, function(obj) {
        obj.update(this.canvas);
    }, this);
};

Engine.prototype.draw = function()
{
    if(this.color == undefined)
    {
        this.contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    else
    {
        this.contex.fillStyle = this.color;
        this.contex.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    _.each(this.gameObjects, function(obj) {
        obj.draw(this.contex);
    }, this);
};
//---------------------END---------------------\\


//---------------------------------------END---------------------------------------//
