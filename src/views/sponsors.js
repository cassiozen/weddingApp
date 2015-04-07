var React = require('react'),
    ReactCanvas = require('react-canvas'),
    Tappable = require('react-tappable'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI,
    Page = require('./components/Page');

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;

var articles = [
  {
    title: 'Maria e Jair',
    excerpt: 'São os pais da Mel, de coração. Se a Mel chegou até aqui, foi por causa deles! Com corações imensos, muito cuidado e carinho, o Jair e a Maria adotaram a Mel em suas vidas. Alimentaram-na com muito macarrão, muito chocolate e muito amor! E agora ela não quer mais ficar longe desses dois... Podem ter certeza de que estarão presentes em todos os pequenos e grandes momentos que estão por vir, pois são parte importante das nossas vidas. Maria, a Melina será sempre a sua menina!!',
    imageUrl: 'img/sponsors/maria_jair.jpg'
  },
  {
    title: 'Dete e Sérgio',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus euismod urna eget imperdiet. Curabitur bibendum urna condimentum varius iaculis. Aliquam vel tempor turpis. Phasellus pretium auctor nisl, vitae interdum odio placerat vel. Ut mollis eu risus nec facilisis. In malesuada vitae ex sed aliquam. Integer luctus tincidunt urna elementum ornare. Maecenas rutrum auctor arcu. Integer posuere risus in dapibus mattis tincidunt, urna ac convallis.',
    imageUrl: 'img/sponsors/dete_sergio.jpg'
  },
  {
    title: 'Olivia e Paulo',
    excerpt: 'São os exemplos de vida da Mel. Eles foram essenciais em momentos difícieis da vida da Mel e mostraram pra ela que ia dar tudo certo e que ela podia confiar em si mesma e contar com eles. Essa é uma lição especial que ela levará para sempre. A Olivia é exemplo de coragem, sensatez e sensibilidade. O Paulo, de trabalho e disciplina. O carinho e gratidão da Mel serão eternos a vocês dois!',
    imageUrl: 'img/sponsors/olivia_paulo.jpg'
  },
  {
    title: 'Wagner e Adriana',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus euismod urna eget imperdiet. Curabitur bibendum urna condimentum varius iaculis. Aliquam vel tempor turpis. Phasellus pretium auctor nisl, vitae interdum odio placerat vel. Ut mollis eu risus nec facilisis. In malesuada vitae ex sed aliquam. Integer luctus tincidunt urna elementum ornare. Maecenas rutrum auctor arcu. Integer posuere risus in dapibus mattis tincidunt, urna ac convallis.',
    imageUrl: 'img/sponsors/adri_wagner.jpg'
  },
  {
    title: 'Gutobat e Paty',
    excerpt: 'Ele é amigo de faculdade da Mel e ela veio no pacote, mas se tornou uma grande amiga. São eles que sempre nos recebem de braços abertos, nos escutam, nos divertem, nos apóiam e nos fazem sentir parte importante da vida deles, como eles são da nossa! Foi a Paty quem ajudou a escolher o vestido de noiva da Mel (e não deixou que ela hesitasse em comprar o terceiro que provou!)... Podem contar conosco para o que der e vier (DE VERDADE), porque a gente já não vive sem vocês!',
    imageUrl: 'img/sponsors/gutopaty.jpg'
  },
  {
    title: 'Lucas e Wagner',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus euismod urna eget imperdiet. Curabitur bibendum urna condimentum varius iaculis. Aliquam vel tempor turpis. Phasellus pretium auctor nisl, vitae interdum odio placerat vel. Ut mollis eu risus nec facilisis. In malesuada vitae ex sed aliquam. Integer luctus tincidunt urna elementum ornare. Maecenas rutrum auctor arcu. Integer posuere risus in dapibus mattis tincidunt, urna ac convallis.',
    imageUrl: 'img/sponsors/lucas_wagner.jpg'
  },
  {    
    title: 'Boléa e Jubinha',
    excerpt: 'Não dá pra descrever o carinho que temos por esses dois. Não, não é porque moramos no apartamento deles. Nem porque foram eles quem nos apresentaram à Pizza Pan (a única que a Mel come com gosto). Também não é porque ela praticamente planejou a nossa lua de mel e executou sozinha o chá bar (emprestando inclusive a sua casa). Não é nada disso. É porque na saúde ou na dor de dente, no japonês ou no churrasco, na casa de vocês ou no nosso apartamento (que também é de vocês), nós os amamos!',
    imageUrl: 'img/sponsors/juboleas.jpg'
  },
  {
    title: 'Fernando e Eliana',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus euismod urna eget imperdiet. Curabitur bibendum urna condimentum varius iaculis. Aliquam vel tempor turpis. Phasellus pretium auctor nisl, vitae interdum odio placerat vel. Ut mollis eu risus nec facilisis. In malesuada vitae ex sed aliquam. Integer luctus tincidunt urna elementum ornare. Maecenas rutrum auctor arcu. Integer posuere risus in dapibus mattis tincidunt, urna ac convallis.',
    imageUrl: 'img/sponsors/eli_mega.jpg'
  },
];

module.exports = React.createClass({
  mixins: [Navigation],

  render() {
    var size = this.getSize();

    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Padrinhos" className="red">
          <UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" icon="ion-chevron-left" label="Back" />
        </UI.Headerbar>
        <Surface top={44} left={0} width={size.width} height={size.height-44}>
          <ListView
            style={this.getListViewStyle()}
            snapping={true}
            scrollingDeceleration={0.92}
            scrollingPenetrationAcceleration={0.13}
            numberOfItemsGetter={this.getNumberOfPages}
            itemHeightGetter={this.getPageHeight}
            itemGetter={this.renderPage} />
        </Surface>
      </UI.FlexLayout>
    );
  },

  renderPage(pageIndex, scrollTop) {
    var size = this.getSize();
    var article = articles[pageIndex % articles.length];
    var pageScrollTop = pageIndex * this.getPageHeight() - scrollTop;
    return (
      <Page
        width={size.width}
        height={size.height-44}
        article={article}
        pageIndex={pageIndex}
        scrollTop={pageScrollTop} />
    );
  },

  getSize() {
    return document.body.getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle() {
    var size = this.getSize();
    return {
      top: 0,
      left: 0,
      width: size.width,
      height: size.height-44
    };
  },

  getNumberOfPages() {
    return 8;
  },

  getPageHeight() {
    return this.getSize().height-44;
  }
});