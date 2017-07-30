function Animation(t,e,i,n,s){this.spr=e,this.frame=new AnimFrame(0,0,i,n),this.frameCounter=0,this.setAnimationIndex=function(t){this.frame.setAnimationIndex(t,this.spr.image.height)},this.setFrameIndex=function(t){this.frame.setFrameIndex(t,this.spr.image.width)},this.nextAnimation=function(){this.frame.nextAnimation(this.spr.image.height)},this.nextFrame=function(){this.frame.nextFrame(this.spr.image.width)},this.updateFrame=function(){this.frameCounter=(this.frameCounter+1)%Math.floor(t.fps/s),0==this.frameCounter&&this.nextFrame()},this.render=function(){t.graphics.context.drawImage(this.spr.image,this.frame.px,this.frame.py,this.frame.w,this.frame.h,this.spr.width/-2,this.spr.height/-2,this.spr.width,this.spr.height)}}function AnimFrame(t,e,i,n){this.px=t,this.py=e,this.w=i,this.h=n,this.getAnimationIndex=function(){return this.px/this.w},this.getFrameIndex=function(){return this.py/this.h},this.setAnimationIndex=function(t,e){this.py=(this.py+this.h*t)%e},this.setFrameIndex=function(t,e){this.px=t*this.w%e},this.nextAnimation=function(t){this.py=(this.py+this.h)%t},this.nextFrame=function(t){this.px=(this.px+this.w)%t}}function AnimSprite(t,e,i,n,s,r,h){this.spr=new Sprite(t,e,i,n),this.anim=new Animation(t,this.spr,s,r,h),this.interval=null,this.startAnimation=function(){var t=this;null==this.interval?this.interval=setInterval(function(){t.anim.nextFrame()},1/h*1e3):console.warn("JSCF: [startAnimation] animation already started!")},this.stopAnimation=function(){this.interval&&(clearInterval(this.interval),this.interval=null)},this.updateAnim=function(){this.anim.updateFrame()},this.render=function(){this.anim.render()},this.staticRender=function(){this.spr.render()}}function AssetManager(t){this.rules={},this.getExtention=function(t){return t.substring(t.lastIndexOf("."),t.length)},this.getAssetPath=function(e){return t+"\\"+e},this.getAssetDir=function(){return t},this.getRule=function(t){return this.rules[t]},this.setRule=function(t,e){this.rules[t]=e}}function resolveSprDimentions(t){return t?t.width&&t.height?new Point2d(t.width,t.height):t.spr?resolveSprDimentions(t.spr):null:null}function Entity(t,e,i,n,s,r){this.init=function(){var h,a,o=resolveSprDimentions(s);o?(h=o.getX(),a=o.getY()):(h=0,a=0),this.rect=new Rect(i,n,h,a),this.name=t,this.alive=e,this.spr=s,this.auto_physics=r,this.auto_render=r,this.auto_update=r},this.init(),this.start_render=function(){var t=game.graphics.context;t.save(),t.translate(this.rect.x,this.rect.y),t.rotate(this.rect.angle)},this.end_update=function(){game.graphics.context.restore()},this.render=function(){this.start_render(),this.spr.render(),this.end_update()},this.update=function(){this.spr.update&&this.spr.update()}}function Graphics(t,e){this.init=function(){null==document.body&&alert("JSCF: Fatal error!\nCan't initialize graphics before body is loaded!"),this.canvas=document.createElement("canvas"),t<0?this.canvas.width=window.innerWidth-50:this.canvas.width=t,e<0?this.canvas.height=window.innerHeight-50:this.canvas.height=e,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0])},this.init(),this.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}}function InputManager(t){function e(t){h[t.keyCode]=!0}function i(t){h[t.keyCode]=!1}function n(e){s=e.clientX-t.offsetLeft,r=e.clientY-t.offsetTop}var s,r,h=[];this.isKeyDownChar=function(t){return h[t.toUpperCase().charCodeAt()]},this.isKeyDown=function(t){return h[t]},this.getMouseX=function(){return s},this.getMouseY=function(){return r},document.addEventListener("keydown",e),document.addEventListener("keyup",i),document.addEventListener("mousemove",n)}function Game(t,e,i,n){this.init=function(){this.state="loading",this.fps=i,this.interval=null,this.inputManager=null,this.assetManager=null,this.graphics=null,this.update=null,this.automated=!0,this.resourceManager=new ResourceManager,this.assetManager=new AssetManager(n),this.sceneManager=new SceneManager},this.init(),this.setup=function(){this.graphics=new Graphics(t,e),this.inputManager=new InputManager(this.graphics.canvas)},this.start=function(t,e){if("running"!=this.state){this.update=t,this.automated=e,this.state="running";var n=this;this.interval=setInterval(function(){n.handler()},1e3/i)}},this.stop=function(){null!=this.interval&&clearInterval(this.interval)},this.handler=function(){this.automated&&(this.sceneManager.update(),this.graphics.clear(),this.sceneManager.render()),this.update&&this.update()},this.getCurrentScene=function(){return this.sceneManager.getCurrentScene()},this.getCanvasWidth=function(){return null!=this.graphics?this.graphics.canvas.width:t},this.getCanvasHeight=function(){return null!=this.graphics?this.graphics.canvas.height:e},this.FPS2AnimSpeed=function(t){return t*this.fps},this.renderText=function(t,e,i,n,s){var r=this.graphics.context;s&&(r.font=s),n&&(r.fillStyle=n),r.fillText(i,t,e)}}function Plane(t,e,i,n){this.width=e,this.height=i,this.color=n,this.render=function(){ctx=t.graphics.context,ctx.fillStyle=this.color,ctx.fillRect(this.width/-2,this.height/-2,this.width,this.height)}}function Point2d(t,e){this.vec=new Vector2d(t,e),this.distanceTo=function(t){return Vector.subVector(this.vec,t.vec).length()},this.setX=function(t){this.vec.x=t},this.setY=function(t){this.vec.y=t},this.getX=function(){return this.vec.x},this.getY=function(){return this.vec.y}}function Rect(t,e,i,n,s){this.width=i,this.height=n,this.x=t,this.y=e,this.angle=0,s||(s="box"),this.containsPoint=function(t,e){return t>this.x-this.width/2&&t<this.x+this.width/2&&e>this.y-this.height/2&&e<this.y+this.height/2},this.isColliding=function(t){var e=CollDetectors[s];return e?e(this,t):(console.warn("[JSCF] invalid detector was given to rect object!"),!1)}}function _clone(t){if(!t)return t;var e,i=[Number,String,Boolean];if(i.forEach(function(i){t instanceof i&&(e=i(t))}),"undefined"==typeof e)if("[object Array]"===Object.prototype.toString.call(t))e=[],t.forEach(function(t,i,n){e[i]=clone(t)});else if("object"==typeof t)if(t.nodeType&&"function"==typeof t.cloneNode)var e=t.cloneNode(!0);else if(t.prototype)e=t;else if(t instanceof Date)e=new Date(t);else{e={};for(var n in t)e[n]=_clone(t[n])}else e=t;return e}function ResourceManager(){this.resources={},this.getResourceName=function(t){for(var e=0,i=this.resources.length;e<i;e++)if(t==this.resources.data[e])return this.resources.data[e].name},this.get=function(t){return t&&this.resources[t]?this.resources[t]:(console.warn("[JSCF] resrouce manager get() - got invalid key."),null)},this.getClone=function(t){var e=this.get(t),i=_clone(e);return i.game&&(i.game=e.game),this.add(t+"_clone",i)?i:e},this.add=function(t,e){return t?this.resources[t]?(console.warn("[JSCF] resource manager set() - resource already exists!"),!1):(this.resources[t]=e,!0):(console.warn("[JSCF] resource manager set() - got invalid key."),!1)},this.remove=function(t){return t&&this.resources[t]?(this.resources[t]=null,!0):(console.warn("[JSCF] resrouce manager remove() - got invalid key."),null)},this.removeByValue=function(t){var e=this.getResourceName(t);return!!e&&this.remove(e)}}function Scene(){this.max_euid=0,this.entities={},this.paused=!1,this.pause=function(){this.paused=!0},this.resume=function(){this.paused=!1},this.update=function(){if(this.paused)return!1;for(entityName in this.entities)if(this.entities.hasOwnProperty(entityName)){var t=this.entities[entityName];if(!t)continue;t.auto_physics,t.auto_update&&t.update()}return!0},this.render=function(){if(this.paused)return!1;for(entityName in this.entities)if(this.entities.hasOwnProperty(entityName)){var t=this.entities[entityName];t&&t.auto_render&&t.render()}return!0},this.addEntity=function(t){return!(t.name in this.entities)&&(this.entities[t.name]=t,t)},this.createManualEntity=function(t,e,i,n){return this.addEntity(new Entity(t,!0,e,i,n,!1))},this.createEntity=function(t,e,i,n){return this.addEntity(new Entity(t,!0,e,i,n,!0))},this.createNewEntity=function(t){return this.addEntity(new Entity(this.getEntityName(),!0,0,0,t,!0))},this.getEntityName=function(){return this.max_euid++,"entity_"+this.max_euid}}function SceneManager(){this.scenes={splash:new Scene},this.cur_scene=this.scenes.splash,this.update=function(){return this.cur_scene.update()},this.render=function(){return this.cur_scene.render()},this.getCurrentScene=function(){return this.cur_scene},this.setCurrentScene=function(t){return t&&this.scenes[t]?(this.cur_scene=this.scenes[t],!0):(console.warn("[JSCF] tried to change into an invalid scene!"),!1)},this.createScene=function(t){return t?this.scenes[t]?(console.warn("[JSCF] scene "+t+" already exists (scene creation)!"),!1):(this.scenes[t]=new Scene,!0):(console.warn("[JSCF] got an invalid scene name in creation!"),!1)},this.deleteScene=function(t){return t?!!this.scenes[t]||(console.warn("[JSCF] scene "+t+" doesn't exists (scene creation)!"),!1):(console.warn("[JSCF] got an invalid scene name in deletion!"),!1)}}function SoundPlayer(t){this.sound=document.createElement("audio"),this.sound.style.display="none",this.sound.src=t,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),document.body.appendChild(this.sound),this.play=function(){this.sound.play()},this.stop=function(){this.sound.pause()}}function Sprite(t,e,i,n){this.width=e,this.height=i,this.image=new Image,this.image.src=n,this.render=function(){t.graphics.context.drawImage(this.image,0,0,this.image.width,this.image.height,this.width/-2,this.height/-2,this.width,this.height)},this.setImageSrcFromAsset=function(e){this.image.src=t.assetManager.getAssetPath(e)}}function Vector2d(t,e){this.x=t,this.y=e,this.add=function(t,e){return this.x+=t,this.y+=e,this},this.sub=function(t,e){return this.add(-t,-e)},this.addVector=function(t){return this.add(t.x,t.y)},this.subVector=function(t){return this.sub(t.x,t.y)},this.length=function(){return Math.sqrt(MathUtils.square(this.x)+MathUtils.square(this.y))},this.getNormal=function(){var t=this.length();return 0!=t?new Vector2d(this.x/t,this.y/t):new Vector2d(0,0)},this.normalize=function(){var t=this.length();return t?(this.x/=t,void(this.y/=t)):(this.x=0,void(this.y=0))},this.dotProduct=function(t){return this.x*t.x+this.y*t.y},this.makeArray=function(){return[this.x,this.y]},this.clone=function(){return new Vector2d(this.x,this.y)}}var CollDetectors={circle:function(t,e){return t.center-e.center<=cricle1.R+e.R},box:function(t,e){var i=t.x-t.width/2,n=e.x-e.width/2,s=t.y-t.height/2,r=e.y-e.height/2,h=i+t.width,a=n+e.width,o=s+t.height,c=r+e.height;return i<a&&h>n&&s<c&&o>r}},MathUtils={toRad:function(t){return t*Math.PI/180},square:function(t){return t*t}},SceneUtils={makeFloor:function(t,e,i,n,s,r){for(var h=[],a=0;a<n/s;a++)h[a]=new Sprite(t,e+s*a+s/2,i+t.getCanvasHeight()-s/2,s,s,r);return h}};const Vector={addVector:function(t,e){return t.clone().addVector(e)},subVector:function(t,e){return t.clone().subVector(e)}};