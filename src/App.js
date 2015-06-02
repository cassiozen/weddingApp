require("./css/app.less");
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classnames = require('classnames');
var Touchstone = require('touchstonejs');
var TouchEmulator = require('./libs/touch-emulator');
var injectTapEventPlugin = require("react-tap-event-plugin");
var Parse = require('parse').Parse;

var mui = require('material-ui'),
  LeftNav = mui.LeftNav,
  MenuItem = mui.MenuItem;

var views = {
  // app
  'home': require('./views/home'),
  'rsvp': require('./views/rsvp'),
  'gifts': require('./views/gifts'),
  'sponsors': require('./views/sponsors'),
  'locationcostume': require('./views/locationcostume'),
};

var menuItems = [
  { route: 'home', text: 'Convite', number: '❯'},
  { route: 'locationcostume', text: 'Local da Festa e Traje', number: '❯'},
  { route: 'rsvp', text: 'RSVP', number: '❯' },
  { route: 'gifts', text: 'Lista de Presentes', number: '❯' },
  { route: 'sponsors', text: 'Padrinhos', number: '❯' },
];

var autoMenuTimer = null;

var App = React.createClass({
  mixins: [Touchstone.createApp(views)],

  getInitialState() {
    var initialState = {
      currentView: 'home',
      online: true,
      currentViewIndex: 0,
      isNativeApp: (typeof cordova !== 'undefined' && device.platform === "iOS")
    };

    return initialState;
  },

  getViewProps() {
    return {
      online: this.state.online,
      toggleLeftBar: this.toggleLeftBar
    };
  },

  componentWillMount() {
    console.log("Opa");
    Parse.initialize("nAaQd2GKodtQQzUWwSyVkxzORuLC6SJ7GkMwy1fx", "0OVs3ueEyYMR0HUabA9wIH6AiBBy1wQ3rwPWnXTh");
  },

  componentDidMount() {
    document.addEventListener("backbutton", this.toggleLeftBar);
    autoMenuTimer = setTimeout(()=>{
      this.toggleLeftBar()
    }, 5000);
  },

  toggleLeftBar() {
    this.refs.leftNav.toggle();
    if(autoMenuTimer!==null){
      clearTimeout(autoMenuTimer);
      autoMenuTimer = null;
    }
  },

  onLeftNavChange(e, key, payload) {
    this.state.currentViewIndex = key;
    viewState = {}
    viewState[payload.route  + '_class'] = "view " + payload.route;
    this.showView(payload.route, "fade", null, viewState);
  },
  
  gotoDefaultView() {
    this.showView('home', 'fade');
  },

  render() {
    var appWrapperClassName = classnames({
      'app-wrapper': true,
      'is-native-app': this.state.isNativeApp
    });

    var menuHeaderStyle={
      width: '100%',
      backgroundColor: '#d8383b'
    };

    var menuImageStyle={
      display: 'block',
      width: '99px',
      margin:'auto',
    };

    var header = <div style={menuHeaderStyle}><img style={menuImageStyle} src="img/menu_header.png" width="99" /></div>;

    return (
      <div className={appWrapperClassName}>
        <ReactCSSTransitionGroup transitionName={this.state.viewTransition.name} transitionEnter={this.state.viewTransition.in} transitionLeave={this.state.viewTransition.out} className="view-wrapper" component="div">
          {this.getCurrentView()}
        </ReactCSSTransitionGroup>
        <LeftNav 
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          header={header}
          menuItems={menuItems}
          selectedIndex={this.state.currentViewIndex}
          onChange={this.onLeftNavChange} />
      </div>
    );
  }
});






///


///


var app = {
   // Application Constructor
   initialize: function() {
      if (typeof cordova === 'undefined') {
        TouchEmulator();
        injectTapEventPlugin();
        React.render(<App />, document.body);
      } else {
        this.bindEvents();
      }
       
   },
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function() {
       document.addEventListener('deviceready', this.onDeviceReady, false);
   },
   // deviceready Event Handler
   //
   // The scope of 'this' is the event. In order to call the 'receivedEvent'
   // function, we must explicity call 'app.receivedEvent(...);'
   onDeviceReady: function() {
       app.receivedEvent('deviceready');
       if (typeof device != "undefined" && device.platform == "Android")
       {
           navigator.app.overrideBackbutton(true);
       }
       document.addEventListener("backbutton", ()=>{return false}, true);
   },
   // Update DOM on a Received Event
   receivedEvent: function(id) {
       console.log('Received Event: ' + id);
       if(device.platform === "iOS"){
        StatusBar.styleDefault();
       }
       // Start the App
       injectTapEventPlugin();
       React.render(<App />, document.body);

       // start to initialize PayPalMobile library
       //app.initPaymentUI();
   },
   // initPaymentUI : function () {
   //   var clientIDs = {
   //     "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
   //     "PayPalEnvironmentSandbox": "AVfZdY6EhPVysfE3pg5svkANHdhI_NJ5n7wRv8eF8GrIn9B51A7-amZP5liGqKRKCVObw78H3NyeKnTB"
   //   };
   //   PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

   // },
   configuration : function () {
     // for more options see `paypal-mobile-js-helper.js`
     var config = new PayPalConfiguration({merchantName: "Casamento Caco & Mel", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement", languageOrLocale: "pt_BR"});
     return config;   
   },

   // onPayPalMobileInit : function() {
   //   // must be called
   //   // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
   //   PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(), ()=>{console.log("Paypal Initiated")});
   // }
};

app.initialize();