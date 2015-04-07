module.exports = {
  Particles: (function () {
      "use strict";

      // particles objects collection
      var particles = [];
      var sprites = [];

      var count = 500;
      var clipImg;
      var particleSprites;
      var particleMovement;
      var particleDynamics

      var defaults = {
          particleMovement: {
              // particle movement parameters:
              // we'll advance each particle vertically at least by this amount (think gravity and resistance)
              "minVerticalVelocity": -4,
              // we'll advance each particle vertically at most by this amount (think gravity and resistance)
              "maxVerticalVelocity": -2,
              // we'll shift each particle horizontally at least by this amound (think wind and resistance)
              "minHorizontalVelocity": -3,
              // we'll shift each particle horizontally at least by this amound (think wind and resistance)
              "maxHorizontalVelocity": 3,
              // each particle sprite will be scaled down maxScale / this (this < maxScale) at max
              "minScale": 0.5,
              // each particle sprite will be scaled down this / minScale (this > minScale) at max
              "maxScale": 1.25,
              // each particle also "bobs" on horizontal axis (think volumetric resistance) by this amount at least
              "minHorizontalDelta": 2,
              // each particle also "bobs" on horizontal axis (think volumetric resistance) by this amount at most
              "maxHorizontalDelta": 3,
              // each particle is at least this opaque
              "minOpacity": 0.5,
              // each particle is at least this opaque
              "maxOpacity": 1,
              // change opacity by at max 1/maxOpacityIncrement
              "maxOpacityIncrement": 50,
              // global speed
              "speedFactor": 0.5
          },
          particleDynamics: {
              // we increment particles with this rate
              "countIncrement": 0.1,
              // we can remove aggressively (to quicker free system resources), 
              // basically we remove at countIncrement*removeFactor rate
              "removeFactor": 2
          }
      };

      // canvas bounds used for particles animation
      var bounds = { width: window.innerWidth, height: window.innerHeight };
      
      function extend (target, source) {
          if(!source) source={};
          var a = Object.create(target);
          Object.keys(source).map(function (prop) {
              prop in a && (a[prop] = source[prop]);
          });
          return a;
      };

      function init(context, config) {
          if(config.count) count = config.count;
          if(config.clip){
            context.beginPath();
            context.moveTo.apply(context,config.clip[0]);
            for (var i = 1; i < config.clip.length; i++) {
              context.lineTo.apply(context,config.clip[i]);
            };
            context.clip();
          } 
          particleSprites = config.particleSprites;
          particleMovement = extend(defaults.particleMovement, config.particleMovement);
          particleDynamics = extend(defaults.particleMovement, config.particleDynamics);
      }
      
      // create particles adding if required (or regenerate from scratch)
      function generate(add) {
          // initialize sprite
          var image = new Image();
          image.onload = function () {
              for (var ii = 0; ii < particleSprites.count; ii++) {
                  var sprite = document.createElement("canvas");
                  sprite.width = particleSprites.individualWidth;
                  sprite.height = particleSprites.individualHeight;
                  var context = sprite.getContext("2d");
                  context.drawImage(
                  // source image
                      image,
                  // source x
                      ii * sprite.width,
                  // source y
                      0,
                  // source width
                      sprite.width,
                  // source height
                      sprite.height,
                  // target x
                      0,
                  //target y
                      0,
                  // target width
                      sprite.width,
                  // target height
                      sprite.height);
                  sprites.push(sprite);
              }

              if (!add) {
                  particles = [];
              }
              for (var ii = 0; ii < count; ii++) {
                  particles.push(generateSingleParticle());
              }
          }
          image.src = particleSprites.url;
      }

      function generateSingleParticle() {
          // particle generation
          var scale = Math.random() * (particleMovement.maxScale - particleMovement.minScale) + particleMovement.minScale;
          return {
              // x position
              x: Math.random() * bounds.width,
              // y position
              y: Math.random() * bounds.height,
              // vertical velocity
              vv: Math.random() *
                  (particleMovement.maxVerticalVelocity - particleMovement.minVerticalVelocity) + particleMovement.minVerticalVelocity,
              // horizontal velocity
              hv: Math.random() * (particleMovement.maxHorizontalVelocity - particleMovement.minHorizontalVelocity) + particleMovement.minHorizontalVelocity,
              // scaled sprite width
              sw: scale * particleSprites.individualWidth,
              // scaled sprite width
              sh: scale * particleSprites.individualHeight,
              // maximum horizontal delta
              mhd: Math.random() * (particleMovement.maxHorizontalDelta - particleMovement.minHorizontalDelta) + particleMovement.minHorizontalDelta,
              // horizontal delta
              hd: 0,
              // horizontal delta increment
              hdi: Math.random() / (particleMovement.maxHorizontalVelocity * particleMovement.minHorizontalDelta),
              // opacity
              o: Math.random() * (particleMovement.maxOpacity - particleMovement.minOpacity) + particleMovement.minOpacity,
              // opacity increment
              oi: Math.random() / particleMovement.maxOpacityIncrement,
              // sprite index
              si: Math.ceil(Math.random() * (particleSprites.count - 1)),
              // not landing flag
              nl: false
          }
      }

      // help particles move
      function advanceParticles() {
          for (var ii = 0; ii < particles.length; ii++) {
              var p = particles[ii];
              // we obey the gravity, 'cause it's the law
              p.y += p.vv * particleMovement.speedFactor;
              // while we're obeying the gravity, we do it with style
              p.x += (p.hd + p.hv) * particleMovement.speedFactor;
              // advance horizontal axis "bobbing"                
              p.hd += p.hdi;
              // inverse "bobbing" direction if we get to maximum delta limit
              if (p.hd < -p.mhd || p.hd > p.mhd) {
                  p.hdi = -p.hdi;
              };

              // increment opacity and check opacity value bounds
              p.o += p.oi;
              if (p.o > particleMovement.maxOpacity || p.o < particleMovement.minOpacity) { p.oi = -p.oi };
              if (p.o > particleMovement.maxOpacity) p.o = particleMovement.maxOpacity;
              if (p.o < particleMovement.minOpacity) p.o = particleMovement.minOpacity;
              // return within dimensions bounds if we've crossed them
              // and don't forget to reset the not-landing (sf.nl) flag
              var resetNotLanding = false;
              if (p.y > bounds.height + particleSprites.individualHeight / 2) {
                  p.y = 0
                  resetNotLanding = true;
              };
              if (p.y < -p.sh) {
                  p.y = bounds.height
                  resetNotLanding = true;
              };
              if (p.x > bounds.width + particleSprites.individualWidth / 2) {
                  p.x = 0
                  resetNotLanding = true;
              };
              if (p.x < -p.sw) {
                  p.x = bounds.width
                  resetNotLanding = true;
              };
              if (resetNotLanding) { p.nl = false; }
          }
      }

      function renderFrame(context) {
          // fall down one iteration            
          advanceParticles();
          // clear context and save it 
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          for (var ii = 0; ii < particles.length; ii++) {
              var p = particles[ii];
              context.globalAlpha = p.o;
              
              context.drawImage(
              // image
                  sprites[p.si],
              // source x
                  0,
              // source y
                  0,
              // source width
                  particleSprites.individualWidth,
              // source height
                  particleSprites.individualWidth,
              // target x
                  p.x,
              // target y
                  p.y,
              // target width
                  p.sw,
              // target height
                  p.sh);

          }
      }

      function updateBounds(width, height) {
          if(!width) width = window.innerWidth;
          if(!height) height = window.innerHeight;
          bounds.width = width;
          bounds.height = height;
      }

      function count() {
          return particles.length;
      }

      // increase number of moving particles
      function add(number) {
          if (!number) { number = particles.length * particleDynamics.countIncrement; }
          generate(number, true);
      }

      // remove some particles
      // by default we remove more aggressively (than adding) to free resources faster
      function remove(number) {
          if (!number) { number = particles.length * particleDynamics.countIncrement * particleDynamics.removeFactor; }
          if (particles.length - number > 0) {
              particles = particles.slice(0, particles.length - number);
          }
      }

      return {
          "init": init,
          "generate": generate,
          "add": add,
          "remove": remove,
          "render": renderFrame,
          "count": count,
          "updateBounds": updateBounds
      }

  })(),

  ParticleAnimation: (function () {

      "use strict";

      // collection of function to render single frame (particles falling, background gradient animation)
      var frameRenderersCollection = [];
      // each animation should be rendered on corresponding context. 
      // If animation doesn't have context (non-visual parameter change every frame) - it should be last (several framerenderers can be last without contexts)
      var renderContextesCollection = [];
      // if animation is running
      var isRunning = false;
      // callback pointer for cancelling
      var animationCallback;
      // if browser doesn't support requestAnimationFrame - we use setInterval for 60Hz displays (16.7ms per frame)
      var minInterval = 16.7;

      // fps tracking
      var avgTime = 0;
      var trackFrames = 60;
      var frameCounter = 0;

      // register new renderer and corresponding context
      function addFrameRenderer(frameRender, renderContext) {
          if (frameRender && typeof (frameRender) === "function") {
              frameRenderersCollection.push(frameRender);
              renderContextesCollection.push(renderContext);
          }
      }

      function removeFrameRenderers() {
          frameRenderersCollection = [];
          renderContextesCollection = [];
      }

      // detecting requestAnimationFrame feature
      function getRequestAnimationFrame(code) {
          if (window.requestAnimationFrame) {
              return window.requestAnimationFrame(code);
          } else if (window.msRequestAnimationFrame) {
              return window.msRequestAnimationFrame(code);
          } else if (window.webkitRequestAnimationFrame) {
              return window.webkitRequestAnimationFrame(code);
          } else if (window.mozRequestAnimationFrame) {
              return window.mozRequestAnimationFrame(code);
          } else if (window.oRequestAnimationFrame) {
              return window.oRequestAnimationFrame(code);
          } else {
              return setTimeout(code, minInterval);
          }
      }

      // iterate and render all registered renderers
      function frameRenderCore() {

          var startDate = new Date();

          for (var ii = 0; ii < frameRenderersCollection.length; ii++) {
              if (frameRenderersCollection[ii]) {
                  frameRenderersCollection[ii](renderContextesCollection[ii]);
              }
          }

          if (isRunning) {
              animationCallback = getRequestAnimationFrame(frameRenderCore);
          }

          var endDate = new Date();
          var duration = (endDate - startDate);
          avgTime += duration;

          // we count fps every trackFrames frame
          frameCounter++;
          if (frameCounter >= trackFrames) {
              avgTime = avgTime / trackFrames;
              var avgFps = Math.floor(1000 / avgTime);
              if (avgFps > 60) avgFps = 60;

              avgTime = 0;
              frameCounter = 0;
          }
      }

      // playback control: play, pause, toggle
      function start() {
          if (isRunning) return;
          animationCallback = getRequestAnimationFrame(frameRenderCore);
          isRunning = true;
      }

      function stop() {
          if (!isRunning) return;
          clearInterval(animationCallback);
          isRunning = false;
      }

      function toggle() {
          var playbackControl = (isRunning) ? stop : start;
          playbackControl();
      }

      return {
          "addFrameRenderer": addFrameRenderer,
          "removeFrameRenderers": removeFrameRenderers,
          "start": start,
          "stop": stop,
          "toggle": toggle,
          "getRequestAnimationFrame": getRequestAnimationFrame
      }
  })()
}