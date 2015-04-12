var React = require('react'),
    Tappable = require('react-tappable'),
    Navigation = require('touchstonejs').Navigation,
    UI = require('touchstonejs').UI,
    Parse = require('parse').Parse;


module.exports = React.createClass({
  mixins: [Navigation],
  getInitialState() {
    return {
      name: '',
      going: true,
      loading: false
    }
  },

  handleGoingChange(going) {
    this.setState({
      going: going
    });
  },

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value
    });
  },
  
  handleFormSubmit() {
    this.state.loading = true;
    var RSVPObject = Parse.Object.extend("RSVP");
    var rsvpObject = new RSVPObject();
    rsvpObject.save({name: this.state.name, going: this.state.going}).then((object) => {
      this.state.loading = false;
      if(this.state.going){
        navigator.notification.alert(
            'Obrigado por nos avisar, encontramos você lá!',
            ()=>{this.showView("home", "fade", null);},
            'Nos vemos lá!',
            'Ok'
        );
      } else {
        navigator.notification.alert(
            'Sentiremos sua falta, mas obrigado por avisar!',
            ()=>{this.showView("home", "fade", null);},
            'Obrigado',
            'Ok'
        );
      }
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
            <UI.LabelInput label="Nome" value={this.state.name} onChange={this.handleNameChange} />

            <UI.LabelSelect label="Você Vai?" value={this.state.going} onChange={this.handleGoingChange} options={[
              { label: 'Sim!',    value: true },
              { label: 'Infelizmente não vou poder.',  value: false }
            ]} />

            <Tappable component="div" onTap={this.handleFormSubmit} className="rsvp__submit-button"><UI.LoadingButton loading={this.state.loading} /></Tappable>

            
            
          </div>

          
        </UI.FlexBlock>
        
      </UI.FlexLayout>
    );
  },

});