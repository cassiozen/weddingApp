var React = require('react'),
    GiftItem = require('./components/GiftItem');
    Navigation = require('touchstonejs').Navigation,
    UI = require('touchstonejs').UI;


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
    console.log(item);
  },

  render() {
    giftItems = gifts.map((gift, index)=>(
      <GiftItem product={gift} styleNum={index%2==0? 0 : 1} onBuyClick={this.onBuyClick} />
    ));
    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Lista de Presentes" className="red">
          <UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" icon="ion-chevron-left" label="Back" />
        </UI.Headerbar>
        <UI.FlexBlock scrollable={true}>
          {giftItems}
        </UI.FlexBlock>
        
      </UI.FlexLayout>
    );
  },

});