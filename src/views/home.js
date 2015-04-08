var React = require('react'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI,
    _ = require('underscore'),
    Particles = require('../libs/particles').Particles,
    ParticleAnimation = require('../libs/particles').ParticleAnimation;

var mui = require('material-ui'),
  LeftNav = mui.LeftNav,
  MenuItem = mui.MenuItem;

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
    particlesCanvas.height = 340;
    // genarate particles
    Particles.init(particlesContext,{
        count: 150,
        clip: [[20,0],[325, 0],[328, 10],[333, 17],[345, 21],[345, 435],[333, 439],[327, 446],[325, 455],[20, 455],[18, 446],[13, 439],[0, 435],[0, 21],[13, 17],[18, 9]],
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

  toggleLeftBar() {
    this.refs.leftNav.toggle();
  },

  onLeftNavChange(e, key, payload) {
    this.showView(payload.route, "fade");
  },

  render() {
    style={
      height: '455px',
      width: '345px',
      background: 'url("img/insert.png")',
      backgroundSize: '345px 455px',
      margin: 'auto',
      position: 'relative'
    };

    canvasStyle={
      position:'absolute'
    };

    menuHeaderStyle={
      width: '100%',
      backgroundColor: '#d8383b'
    };
    menuImageStyle={
      display: 'block',
      width: '99px',
      margin:'auto',
    };

    menuItems = [
      { route: 'home', text: 'Local da Festa e Traje', number: '❯'},
      { route: 'home', text: 'RSVP', number: '❯' },
      { route: 'home', text: 'Lista de Presentes', number: '❯' },
      { route: 'sponsors', text: 'Pais & Padrinhos', number: '❯' },
      { route: 'home', text: 'Peça sua música!', number: '❯' },
    ];

    header = <div style={menuHeaderStyle}><img style={menuImageStyle} src="img/menu_header.png" width="99" /></div>;

    return (
      <div>
        <UI.FlexLayout className={this.props.viewClassName}>
          <UI.Headerbar label="Nosso Casamento" className="red">
            <UI.HeaderbarButton icon="ion-navicon-round" onTap={this.toggleLeftBar} />
          </UI.Headerbar>
          <UI.FlexBlock className="base-view">
            <div style={style}>
              <canvas id="particles-canvas" ref="canvas" style={canvasStyle}></canvas>
              <img src="img/nhamas.png" width="345" style={canvasStyle} />            
            </div>
          </UI.FlexBlock>
        </UI.FlexLayout>
        
        <LeftNav 
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          header={header}
          menuItems={menuItems}
          onChange={this.onLeftNavChange} />
      </div>
    );
  }
});


// <UI.FlexBlock className="base-view">
  
//   <Link component="div" to="sponsors" viewTransition="show-from-right">
//     Sponsors
//   </Link>
  
// </UI.FlexBlock>