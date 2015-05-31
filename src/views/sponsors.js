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
    excerpt: 'São os pais da Mel, de coração. Se a Mel chegou até aqui, foi por causa deles! Com corações imensos, o Jair e a Maria adotaram a Mel em suas vidas. Alimentaram-na com muito macarrão, muito chocolate e muito amor! Podem ter certeza de que estarão presentes em todos os pequenos e grandes momentos que estão por vir, pois são parte importante das nossas vidas. Maria, a Melina será sempre a sua menina!!',
    imageUrl: 'img/sponsors/maria_jair.jpg'
  },
  {
    title: 'Dete e Sérgio',
    excerpt: 'São os pais do Cássio. Ele tem os melhores pais que poderia desejar! No percorrer dos caminhos da vida, na satisfação de suas conquistas, na decepção de suas derrotas, no desempenho de suas atitudes, eles sempre foram a base, a inspiração e a força de todas as ações do Cássio...',
    imageUrl: 'img/sponsors/dete_sergio.jpg'
  },
  {
    title: 'Olivia e Paulo',
    excerpt: 'São os exemplos de vida da Mel. Eles foram essenciais em momentos difícieis da vida da Mel e mostraram pra ela que ia dar tudo certo e que ela podia confiar em si mesma e contar com eles. Essa é uma lição especial que ela levará para sempre. A Olivia é exemplo de coragem, sensatez e sensibilidade. O Paulo, de trabalho e disciplina. O carinho e gratidão da Mel serão eternos a vocês dois!',
    imageUrl: 'img/sponsors/olivia_paulo.jpg'
  },
  {
    title: 'Wagner e Adriana',
    excerpt: 'Wagner é o primo que segurou o Cássio no colo e Adri está na família desde sempre (afinal de contas os dois estão juntos praticamente desde crianças - foram 15 anos de namoro!). Estiveram sempre presentes em momentos importantes da vida do Cássio, nos momentos difíceis e, claro, nos momentos felizes (que não foram poucos, incluindo aqui as madrugadas na fila de Interlagos pra ver o Senna vencer.)',
    imageUrl: 'img/sponsors/adri_wagner.jpg'
  },
  {
    title: 'Gutobat e Paty',
    excerpt: 'Ele é amigo de faculdade da Mel e ela veio no pacote, mas se tornou uma grande amiga. São eles que sempre nos recebem de braços abertos, nos apóiam e nos fazem sentir parte importante da vida deles, como eles são da nossa! Foi a Paty quem ajudou a escolher o vestido de noiva da Mel (e não deixou que ela hesitasse em comprar o terceiro que provou!)... Podem contar conosco para o que der e vier (DE VERDADE)!',
    imageUrl: 'img/sponsors/gutopaty.jpg'
  },
  {
    title: 'Lucas e Wagner',
    excerpt: 'Lucas era o colega de trabalho que virou inspiração que virou amigo que virou sócio (E pensa que é fácil o relacionamento com sócio?) O Wagner é a gentileza e a alegria em pessoa e sempre participou da caminhada dos sócios amigos. Como o Lucas foi o primeiro a saber da Mel, nada mais justo do que eles estarem dois anos e pouco depois aqui. Podem contar com a gente pra tudo, porque sabemos que podemos contar com vocês.',
    imageUrl: 'img/sponsors/lucas_wagner.jpg'
  },
  {    
    title: 'Boléa e Jubinha',
    excerpt: 'Não dá pra descrever o carinho que temos por esses dois. Não, não é porque moramos no apartamento deles. Nem porque ela praticamente planejou a nossa lua de mel e emprestou sua casa pro nosso chá bar. Não é nada disso. É porque na saúde ou na dor de dente, no japonês ou no churrasco, na casa de vocês ou no nosso apartamento (que também é de vocês), nós os amamos!',
    imageUrl: 'img/sponsors/juboleas.jpg'
  },
  {
    title: 'Fernando e Eliana',
    excerpt: 'Se você está lendo isso foi porque a Li emprestou seu talento de designer pro nosso convite e App. E se hoje o Fernando é conhecido como Mega-Drive foi porque o Cássio o apresentou anos atrás numa agência ressaltando não seu currículo (nem seus olhos azuis) mas o fato de ter programado jogos para o console de mesmo nome. Dizem que o Cássio e o Fernando parecem irmãos que fazem birra e provocações entre sí, e a verdade é que depois de projetos, cervejas, palestras, bikes e negócios juntos, a brincadeira não está longe da verdade.',
    imageUrl: 'img/sponsors/eli_mega.jpg'
  },
];

module.exports = React.createClass({
  mixins: [Navigation],

  render() {
    var size = this.getSize();
    
    footerStyle={
      width: '100%',
      backgroundColor: '#81bce0',
      position: 'absolute',
      bottom: '0px',
      margin: 'auto',
      pointerEvents: 'none'

    };
    footerImageStyle={
      display: 'block',
      width: '323px',
      margin:'auto',
    };

    return (
      <UI.FlexLayout className={this.props.viewClassName}>
        <UI.Headerbar label="Padrinhos" className="red">
          <UI.HeaderbarButton icon="ion-navicon-round" onTap={this.props.toggleLeftBar} />
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
        <div ref="footer" style={footerStyle} className="fadeable"><img src="img/more.png" style={footerImageStyle} width="323" /></div>
      </UI.FlexLayout>
    );
  },

  renderPage(pageIndex, scrollTop) {
    if(pageIndex>0){
      var el = React.findDOMNode(this.refs.footer)
      if (!el.classList.contains('fade')) {
        el.classList.add('fade');
      }
    }
    
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