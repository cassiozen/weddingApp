/** @jsx React.DOM */

var React = require('react'),
  Tappable = require('react-tappable'),
  Navigation = require('touchstonejs').Navigation,
  Link = require('touchstonejs').Link,
  UI = require('touchstonejs').UI;

module.exports = React.createClass({
  mixins: [Navigation],


  render: function() {

    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Padrinhos" className="red">
          <UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" icon="ion-chevron-left" label="Back" />
        </UI.Headerbar>
        <UI.FlexBlock scrollable>
          <div className="panel panel--first">
            Aqui vai a lista de padrinhos e madrinhas.
          </div>
        </UI.FlexBlock>
      </UI.FlexLayout>
    );
  }
});