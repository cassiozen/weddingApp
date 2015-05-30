var React = require('react'),
    Tappable = require('react-tappable');

var backgrounds = ["#dee2eb", "#efeff4" ];

module.exports = React.createClass({
  propTypes: {
    styleNum: React.PropTypes.number.isRequired,
    product: React.PropTypes.object.isRequired,
    onBuyClick: React.PropTypes.func.isRequired
  },

  render() {
    itemStyle={
      width: '100%',
      height: '200px',
      padding: '10px',
      backgroundColor: backgrounds[this.props.styleNum]
    };

    leftImageStyle = {
      display: 'block',
      float: 'left',
      marginRight: '20px',
    };
    rightImageStyle = {
      display: 'block',
      float: 'left',
      marginLeft: '10px',
    };

    leftImage = null;
    rightImage = null;

    if(this.props.styleNum === 0){
      leftImage = <img style={leftImageStyle} src={this.props.product.imageURL} width="130" />
    } else {
      rightImage = <img style={rightImageStyle} src={this.props.product.imageURL} width="130" />
    }

    return(
      <div style={itemStyle}>
        {leftImage}
        <div className="gift-item__description">
          <div className="red-text">{this.props.product.name}</div>
          <div className="blue-text">R$ {parseInt(this.props.product.value)},00</div>
        </div>
        {rightImage}
      </div>
    );
  },
});
