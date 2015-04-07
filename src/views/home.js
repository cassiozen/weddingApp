var React = require('react'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI,
    _ = require('underscore'),
    Particles = require('../libs/particles').Particles,
    ParticleAnimation = require('../libs/particles').ParticleAnimation;

module.exports = React.createClass({
  mixins: [Navigation],

  createParticles() {
    // preparing the elements we'll need further
    var particlesCanvas = React.findDOMNode(this.refs.canvas);
    var particlesContext;
    if (particlesCanvas.getContext) {
        particlesContext = particlesCanvas.getContext("2d");
    }
    particlesCanvas.width = 345;
    particlesCanvas.height = 200;
    // genarate particles
    Particles.init(particlesContext,{
        count: 150,
        clip: [[20,0],[325, 0],[328, 10],[333, 17],[345, 21],[345, 365],[333, 369],[327, 376],[325, 385],[20, 385],[18, 376],[13, 369],[0, 365],[0, 21],[13, 17],[18, 9]],
        clipImg: "img/mask.png",
        particleSprites: {
            "url": "img/hearts.png",
            "count": 3,
            "individualWidth": 33,
            "individualHeight": 33
        },
        particleMovement: {
            "minScale": 0.4,
            "maxScale": 1.25,
            "minOpacity": 0,
            "maxOpacity": 0.4,
            "maxOpacityIncrement": 90,
            "speedFactor": 0.1
        }
    });
    Particles.generate();
    Particles.updateBounds(345, 385);
    // initialize out animation functions and start animation:
    // falling particles
    ParticleAnimation.addFrameRenderer(Particles.render, particlesContext);
    ParticleAnimation.start();
  },

  componentDidMount() {
    this.createParticles();
  },

  componentWillUnmount() {
    ParticleAnimation.removeFrameRenderers();
  },

  render() {
    style={
      height: '385px',
      width: '345px',
      background: 'url("img/insert.png")',
      backgroundSize: '345px 385px',
      margin: 'auto',
      position: 'relative'
    };

    canvasStyle={
      position:'absolute'
    };

    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Nosso Casamento" className="red">
          <UI.HeaderbarButton icon="ion-navicon-round" />
        </UI.Headerbar>
        <UI.FlexBlock className="base-view">
          <div style={style}>
            <canvas id="particles-canvas" ref="canvas" style={canvasStyle}></canvas>
            <img src="img/nhamas.png" width="345" style={canvasStyle} />            
          </div>
        </UI.FlexBlock>
        <Link component="div" to="sponsors" viewTransition="show-from-right">
          Sponsors
        </Link>
        
      </UI.FlexLayout>
    );
  }
});


// <UI.FlexBlock className="base-view">
  
//   <Link component="div" to="sponsors" viewTransition="show-from-right">
//     Sponsors
//   </Link>
  
// </UI.FlexBlock>