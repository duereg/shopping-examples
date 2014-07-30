/** @jsx React.DOM */

var noop = function(){};

var Tabs = React.createClass({
  getDefaultProps: function() {
    return {
      onSelect: noop
    };
  },
  getInitialState: function() {
    return {
      active: this.props.active
    };
  },
  onClick: function(e) {
    var selected = e.target.dataset.tabValue;
    this.setState({ active: selected });
    e.activeTab = selected;
    this.props.onSelect.apply(this, arguments);
  },
  groom: function(tab) {
    if (!tab.props.value) {
      tab.props.value = tab.props.children
    }
    if (tab.props.value == this.state.active) {
      tab.props.selected = true;
    }
    return tab;
  },
  render: function() {
    var tabs = this.props.children.map(this.groom);

    return this.transferPropsTo(
      <ul onClick={this.onClick}>
        {tabs}
      </ul>);
  }
});

var Tab = React.createClass({
  render: function() {
    var label = this.props.children;
    var value = this.props.value;
    var className = this.props.selected ? 'selected' : '';
    return this.transferPropsTo(
      <li data-tab-value={value} className={className}>
        {label}
      </li>);
  }
});


/* Usage:

<tabs onSelect={this.activate}>
  <tab value="Inbox">Inbox</tab>
</tabs>
*/
