
function Game(canvasWidth, canvasHeight, fps, assetDir) {

    // c'tor
    this.init = function()
    {
        this.state = "loading";
        this.fps = fps;
        this.interval = null;
        this.inputManager = null;
        this.assetManager = null;
        this.graphics = null;
        this.assetManager = new AssetManager(assetDir);
    };
    // calling c'tor
    this.init();

    // State functions
    this.setup = function()
    {
        this.graphics = new Graphics(canvasWidth, canvasHeight);
        this.inputManager = new InputManager(this.graphics.canvas);
    };

    this.start = function(update) {
        if (this.state != "running") {
            this.interval = setInterval(update, 1000.0/fps);
            this.state = "running";
        }
    };

    this.stop = function() {
        if (this.interval != null)
            clearInterval(this.interval);
    }

    // Graphics functions

    this.getCanvasWidth = function() {
        if (this.graphics != null)
            return this.graphics.canvas.width;
        else
            return canvasWidth;
    }

    this.getCanvasHeight = function() {
        if (this.graphics != null)
            return this.graphics.canvas.height;
        else
            return canvasHeight;
    }

    this.FPS2AnimSpeed = function(fps) {
        return fps * this.fps;
    };

    this.renderText = function(x, y, txt, color, font) {
        var ctx = this.graphics.context;
        if (font)
            ctx.font = font;
        if (color)
            ctx.fillStyle = color;
        ctx.fillText(txt, x, y);
    }

}
