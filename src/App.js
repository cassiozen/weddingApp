require("./css/app.less");
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classnames = require('classnames');
var Touchstone = require('touchstonejs');


var views = {
  // app
  'home': require('./views/home'),
  'sponsors': require('./views/sponsors')
};

var App = React.createClass({
  mixins: [Touchstone.createApp(views)],

  getInitialState() {
    var initialState = {
      currentView: 'home',
      online: true,
      isNativeApp: (typeof cordova !== 'undefined')
    };

    return initialState;
  },

  getViewProps() {
    return {
      online: this.state.online
    };
  },
  
  gotoDefaultView() {
    this.showView('home', 'fade');
  },

  render() {
    var appWrapperClassName = classnames({
      'app-wrapper': true,
      'is-native-app': this.state.isNativeApp
    });

    return (
      <div className={appWrapperClassName}>
        <ReactCSSTransitionGroup transitionName={this.state.viewTransition.name} transitionEnter={this.state.viewTransition.in} transitionLeave={this.state.viewTransition.out} className="view-wrapper" component="div">
          {this.getCurrentView()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

function startApp() {
  React.render(<App />, document.body);
}

function onDeviceReady() {
  StatusBar.styleDefault();
  startApp();
}

if (typeof cordova === 'undefined') {
  startApp();
} else {
  document.addEventListener('deviceready', onDeviceReady, false);
}