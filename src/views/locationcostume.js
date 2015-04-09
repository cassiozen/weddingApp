var React = require('react'),
    Tappable = require('react-tappable'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI;


module.exports = React.createClass({
  mixins: [Navigation],

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
    redText = {
      fontSize: '16px',
      color: '#d8383b'
    }
    blueText = {
      fontSize: '16px',
      color: '#3c7fad'
    }
    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Local da Festa e Traje" className="red">
          <UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" icon="ion-chevron-left" label="Back" />
        </UI.Headerbar>
        <UI.FlexBlock scrollable={true}>
          <div style={headerStyle}><img src="img/location_costume/header_location.png" style={headerImageStyle} width="325" /></div>
          <div style={{textAlign:'center', marginBottom:'18px'}}>
            <span style={redText}>Estação Lounge</span><br/>
            <span style={blueText}>Estrada José Matias de Camargo, 715<br />Embu das Artes, SP</span>
          </div>
          <div style={headerStyle}><img src="img/location_costume/map.png" style={headerImageStyle} width="325" /></div>
          <div style={{padding: '10px'}}>
            <span style={redText}>Como chegar na Estação Lounge</span><br/>
            <div style={blueText}>
              <p>O Waze sabe chegar lá mas ele não é muito bom com números e acaba passando do local: Preste atenção ;)</p>
              <p>Pra quem vem de São Paulo, o melhor caminho é vir pela Rod. Raposo Tavares até a saída do km 25,9. Observe a placa que indicará Retorno / Embu / Jd da Glória. Atravesse o viaduto por cima da Raposo seguindo a placa Embu / Colégio Arautos.</p>
              <p>Após o Assaí, entre a direita e suba. No final da subida entre à esquerda e você estará na Estrada do Capuava. Siga sempre nessa estrada e não se preocupe, pois ela mudará de nome umas duas vezes. </p>
              <p>Serão quase 6 km até o local. Se você quiser ser bem detalhista, zere o marcador de quilometragem no início da estrada do Capuava e siga as seguinte referências:</p>
              <p>300 m - Gera Força</p>
              <p>700 m - Residencial Jd. Algarve</p>
              <p>2.300 m - Academia Tenis Ranch</p>
              <p>2.680 m - Centro Hípico de Cotia</p>
              <p>3.800 m - Colégio Arautos do Evangélio</p>
              <p>4.000 m - Vila de casas simples</p>
              <p>4.600 m - Escola E. Bairro do Capuava <br/>(início das subidas)</p>
              <p>5.300 m - Sítio Golden Trip</p>
              <p>5.400 m - Centro da terceira idade</p>
              <p>5.600 m - a sua direita verá um muro branco e um banner indicativo do número 715 em vermelho</p>
            </div>
          </div>
          <div style={headerStyle}><img src="img/location_costume/header_costume.png" style={headerImageStyle} width="325" /></div>
          <div style={{textAlign:'center', marginBottom:'18px'}}>
            <span style={redText}>Social Completo</span><br/>
          </div>
        </UI.FlexBlock>
        
      </UI.FlexLayout>
    );
  },

});