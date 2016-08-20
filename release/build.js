function Animation(game,sprite,frameWidth,frameHeight,speed){this.spr=sprite;this.frame=new AnimFrame(0,0,frameWidth,frameHeight);this.frameCounter=0;this.setAnimationIndex=function(i){this.frame.setAnimationIndex(i,this.spr.image.height)};this.setFrameIndex=function(i){this.frame.setFrameIndex(i,this.spr.image.width)};this.nextAnimation=function(){this.frame.nextAnimation(this.spr.image.height)};this.nextFrame=function(){this.frame.nextFrame(this.spr.image.width)};this.updateFrame=function(){this.frameCounter=(this.frameCounter+1)%Math.floor(game.fps/speed);if(this.frameCounter==0)this.nextFrame()};this.render=function(){this.spr.start_update();game.graphics.context.drawImage(this.spr.image,this.frame.px,this.frame.py,this.frame.w,this.frame.h,this.spr.rect.width/-2,this.spr.rect.height/-2,this.spr.rect.width,this.spr.rect.height);this.spr.end_update()}}function AnimFrame(px,py,w,h){this.px=px;this.py=py;this.w=w;this.h=h;this.getAnimationIndex=function(){return this.px/this.w};this.getFrameIndex=function(){return this.py/this.h};this.setAnimationIndex=function(i,max_height){this.py=(this.py+this.h*i)%max_height};this.setFrameIndex=function(i,max_width){this.px=i*this.w%max_width};this.nextAnimation=function(max_height){this.py=(this.py+this.h)%max_height};this.nextFrame=function(max_width){this.px=(this.px+this.w)%max_width}}function AnimSprite(game,x,y,width,height,url,frameWidth,frameHeight,animSpeed){this.spr=new Sprite(game,x,y,width,height,url);this.anim=new Animation(game,this.spr,frameWidth,frameHeight,animSpeed);this.interval=null;this.startAnimation=function(){var that=this;if(this.interval==null)this.interval=setInterval(function(){that.anim.nextFrame()},1/animSpeed*1e3);else console.warn("JSCF: [startAnimation] animation already started!")};this.stopAnimation=function(){if(this.interval){clearInterval(this.interval);this.interval=null}};this.updateAnim=function(){this.anim.updateFrame()};this.render=function(){this.anim.render()};this.staticRender=function(){this.spr.render()}}function AssetManager(assetsDir){this.rules={};this.getExtention=function(name){return name.substring(name.lastIndexOf("."),name.length)};this.getAssetPath=function(name){return assetsDir+"\\"+name};this.getAssetDir=function(){return assetsDir};this.getRule=function(ext){return this.rules[ext]};this.setRule=function(ext,dir){this.rules[ext]=dir}}function Graphics(canvasWidth,canvasHeight){this.init=function(){if(document.body==null){alert("JSCF: Fatal error!\nCan't initialize graphics before body is loaded!")}this.canvas=document.createElement("canvas");if(canvasWidth<0)this.canvas.width=window.innerWidth-50;else this.canvas.width=canvasWidth;if(canvasHeight<0)this.canvas.height=window.innerHeight-50;else this.canvas.height=canvasHeight;this.context=this.canvas.getContext("2d");document.body.insertBefore(this.canvas,document.body.childNodes[0])};this.init();this.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}}function InputManager(){var keys=[];this.isKeyDownChar=function(c){return keys[c.toUpperCase().charCodeAt()]};this.isKeyDown=function(code){return keys[code]};function updateKeyTrue(e){keys[e.keyCode]=true}function updateKeyFalse(e){keys[e.keyCode]=false}document.addEventListener("keydown",updateKeyTrue);document.addEventListener("keyup",updateKeyFalse)}function Game(canvasWidth,canvasHeight,fps,assetDir){this.init=function(){this.state="loading";this.fps=fps;this.interval=null;this.inputManager=null;this.assetManager=null;this.graphics=null;this.inputManager=new InputManager;this.assetManager=new AssetManager(assetDir)};this.init();this.setup=function(){this.graphics=new Graphics(canvasWidth,canvasHeight)};this.start=function(update){if(this.state!="running"){this.interval=setInterval(update,1e3/fps);this.state="running"}};this.stop=function(){if(this.interval!=null)clearInterval(this.interval)};this.getCanvasWidth=function(){if(this.graphics!=null)return this.graphics.canvas.width;else return canvasWidth};this.getCanvasHeight=function(){if(this.graphics!=null)return this.graphics.canvas.height;else return canvasHeight};this.FPS2AnimSpeed=function(fps){return fps*this.fps}}var MathUtils={toRad:function(deg){return deg*Math.PI/180}};function Rect(game,x,y,width,height){this.width=width;this.height=height;this.x=x;this.y=y;this.angle=0;this.render=function(){var ctx=game.graphics.context;ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.angle);game.graphics.context.fillRect(this.width/-2,this.height/-2,this.width,this.height);ctx.restore()};this.isColliding=function(rect){var x1=this.x-this.width/2;var x2=rect.x-rect.width/2;var y1=this.y-this.height/2;var y2=rect.y-rect.height/2;if(x1<x2+rect.width&&x1+this.width>x2&&y1>y2-rect.height&&-this.height+this.y<y2){return true}return false}}function Plane(game,x,y,width,height,color){this.rect=new Rect(game,x,y,width,height);this.render=function(){ctx=game.graphics.context;ctx.fillStyle=color;this.rect.render()}}var SceneUtils={makeFloor:function(game,x,y,floor_width,tile_width,type){var platforms=[];for(var i=0;i<floor_width/tile_width;i++)platforms[i]=new Sprite(game,x+64*i+32,y+game.getCanvasHeight()-32,64,64,type);return platforms}};function SoundPlayer(src){this.sound=document.createElement("audio");this.sound.style.display="none";this.sound.src=src;this.sound.setAttribute("preload","auto");this.sound.setAttribute("controls","none");document.body.appendChild(this.sound);this.play=function(){this.sound.play()};this.stop=function(){this.sound.pause()}}function Sprite(game,x,y,width,height,url){this.rect=new Rect(game,x,y,width,height);this.image=new Image;this.image.src=url;this.start_update=function(){var ctx=game.graphics.context;ctx.save();ctx.translate(this.rect.x,this.rect.y);ctx.rotate(this.rect.angle)};this.end_update=function(){game.graphics.context.restore()};this.render=function(){this.start_update();game.graphics.context.drawImage(this.image,0,0,this.image.width,this.image.height,this.rect.width/-2,this.rect.height/-2,this.rect.width,this.rect.height);this.end_update()};this.setImageSrcFromAsset=function(asset){this.image.src=game.assetManager.getAssetPath(asset)}}