var React = require('react');
var Portal = require('react-portal');

var ReactEditableSvgLabel = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
    minLabelWidth: React.PropTypes.number,
    children: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      onChange: function () {},
      minLabelWidth: 100
    };
  },

  getInitialState () {
    return {
      isEditing: false,
      labelX: 0,
      labelY: 0,
      labelWidth: 0,
      labelHeight: 0
    };
  },

  toggleEditing (e) {
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  handleChangeText (e) {
    var text = e.target.value;
    this.props.onChange(text);
  },

  updateLabelBounds () {
    var rect = this.refs.label.getBoundingClientRect();
    this.setState({
      labelX: rect.left,
      labelY: rect.top,
      labelWidth: rect.width,
      labelHeight: rect.height
    });
  },

  componentDidMount () {
    this.updateLabelBounds();
  },

  render () {
    var label = <text ref='label' {...this.props}>{this.props.children}</text>;
    return (
      <Portal openByClickOn={label} closeOnOutsideClick style={{position: 'absolute', top: this.state.labelY, left: this.state.labelX}}>
        <input type='text' value={this.props.children} onChange={this.handleChangeText} style={{width: Math.max(this.props.minLabelWidth, this.state.labelWidth), height: this.state.labelHeight}} />
      </Portal>
    );
  }

});

export default ReactEditableSvgLabel;
