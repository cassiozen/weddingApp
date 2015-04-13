var React = require('react'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI,
    Tappable = require('react-tappable'),
    Typeahead = require('react-typeahead').Typeahead;

module.exports = React.createClass({
  mixins: [Navigation],

  handleOption(option){
    this.setState({showButton:true});
    window.localStorage["couple"] = option;
    setTimeout(()=>{
    var el = React.findDOMNode(this.refs.enter);
    el.classList.remove('fade');
    },10)
  },

  getInitialState() {
    return {
      showButton: false
    }
  },

  handleTap(){
    this.showView('home', "fade", null, {home_class:"view home"});
  },

  render() {
    style={
      height: '350px',
      width: '345px',
      background: 'url("img/insert_heart.png") no-repeat',
      backgroundSize: '345px 295px',
      margin: 'auto',
      position: 'relative'
    };

    var display = this.state.showButton? 'block':'none';
    imageStyle={
      position:'absolute',
      top: '220px',
      right: '20px',
      display: display
    };
 

    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Casamento" className="red">
        </UI.Headerbar>
        <UI.FlexBlock className="base-view">
          <div style={style}>
            <Typeahead placeholder="Digite o nome dos noivos" options={["Melina & Cássio"]} maxVisible={2} autoFocus={true} onOptionSelected={this.handleOption} />
            <Tappable component="div" onTap={this.handleTap} style={imageStyle}><img className="fadeable fade" ref="enter" src="img/gate/enter.png" width="164" /></Tappable>
          </div>
        </UI.FlexBlock>
      </UI.FlexLayout>
    );
  }
});