var React = require('react'),
    GiftItem = require('./components/GiftItem');
    Navigation = require('touchstonejs').Navigation,
    UI = require('touchstonejs').UI,
    Parse = require('parse').Parse;


var gifts = [
  {
    name: 'Coquetéis à Beira-mar',
    value: 80.0,
    imageURL: 'img/gifts/cocktails.png'
  },
  {
    name: 'Balada no Coco Bongo',
    value: 150.0,
    imageURL: 'img/gifts/cocobongo.png'
  },
  {
    name: 'Jantar Românico',
    value: 220.0,
    imageURL: 'img/gifts/dinner.png'
  },
  {
    name: 'Visita às ruínas Maias',
    value: 310.0,
    imageURL: 'img/gifts/ruins.png'
  },
  {
    name: 'Nadar com golfinhos',
    value: 390.0,
    imageURL: 'img/gifts/dolphin.png'
  },
  {
    name: 'Fim de semana em Key West',
    value: 500.0,
    imageURL: 'img/gifts/keywest.png'
  }
];

module.exports = React.createClass({
  mixins: [Navigation],

  onBuyClick(item){
    // console.log(item);
    // var paymentDetails = new PayPalPaymentDetails(item.value, "0.00", "0.00");
    // var payment = new PayPalPayment(item.value, "BRL", item.name, "Sale", paymentDetails);
    // PayPalMobile.renderSinglePaymentUI(payment,
    //   (payment)=>{ 
    //     navigator.notification.alert(
    //         'Muito obrigado por tornar nossa lua de mel mais especial!',
    //         ()=>{this.showView("home", "fade", null);},
    //         'Obrigado',
    //         'Ok'
    //     );
    //     var PaymentObject = Parse.Object.extend("Gifts");
    //     var pamentObject = new PaymentObject();
    //     pamentObject.save(payment.response).then((object) => { console.log("Payment Registered") });
    //   },
    //   (result)=>{console.log(result); });
  },

  render() {
    textBlock = {
      padding: '10px',
      backgroundColor:'#81bce0',
      color: '#ffffff',
      fontSize: '16px'
    };
    giftItems = gifts.map((gift, index)=>(
      <GiftItem product={gift} styleNum={index%2==0? 0 : 1} onBuyClick={this.onBuyClick} />
    ));
    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Lista de Presentes" className="red">
          <UI.HeaderbarButton icon="ion-navicon-round" onTap={this.props.toggleLeftBar} />
        </UI.Headerbar>
        <UI.FlexBlock scrollable={true}>
          <div style={textBlock}>Como nós já moramos juntos há dois anos, já temos nossas panelas queridas. Então agradeceríamos se você pudesse ajudar a tornar nossa lua de mel mais especial.</div>
          <div style={textBlock}>Faça um depósito de um dos valores sugeridos (ou de qualquer valor) na nossa conta conjunta:<br/>Melina Pereira Martins<br/>CPF: 337.773.078-82<br/>Banco Bradesco<br/>agência 1991<br/>conta corrente 09644</div>
          {giftItems}
          
        </UI.FlexBlock>
        
      </UI.FlexLayout>
    );
  },

});