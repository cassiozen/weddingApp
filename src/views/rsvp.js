var React = require('react'),
    Tappable = require('react-tappable'),
    Navigation = require('touchstonejs').Navigation,
    UI = require('touchstonejs').UI;


module.exports = React.createClass({
  mixins: [Navigation],
  getInitialState: function() {
    return {
      going: true
    }
  },

  handleGoingChange: function(going) {

    this.setState({
      going: going
    });

  },

  render() {
    headerStyle={
      width: '100%',
      backgroundColor: '#DEE2EB',
      marginBottom: '18px'
    };
    headerImageStyle={
      display: 'block',
      width: '325px',
      margin:'auto',
    };

    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="RSVP" className="red">
          <UI.HeaderbarButton icon="ion-navicon-round" onTap={this.props.toggleLeftBar} />
        </UI.Headerbar>
        <UI.FlexBlock scrollable={true}>
          <div style={headerStyle}><img src="img/rsvp/header.png" style={headerImageStyle} width="325" /></div>
          <div style={{padding: '10px'}}>
            <span className="red-text">Favor imenso!</span><br/>
            <span className="blue-text">Se você não puder ir, avisa a gente, está bem? Será um casamento pequenininho e gostaríamos de encher a casa!</span> <span className="red-text">Ficamos mega agradecidos!!</span>
          </div>
          <div className="panel">
            <UI.LabelTextarea label="Nome"  placeholder="(Inclua seus acompanhantes)" />

            <UI.LabelSelect label="Você Vai?" value={this.state.going} onChange={this.handleGoingChange} options={[
              { label: 'Sim!',    value: true },
              { label: 'Infelizmente não vou poder.',  value: false }
            ]} />

            <Tappable component="div" className="rsvp__submit-button"></Tappable>

            
            
          </div>
          
        </UI.FlexBlock>
        
      </UI.FlexLayout>
    );
  },

});