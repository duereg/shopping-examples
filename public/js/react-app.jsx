/** @jsx React.DOM */

var MailGrid = React.createClass({
  render: function() {
    var folder = this.props.mailbox.filter(function(folder){
      return folder.id == this.props.active;
    }.bind(this))[0];

    return <table className="mails">
      <thead><tr><th>From</th><th>To</th><th>Subject</th><th>Date</th></tr></thead>
      <tbody>
        {folder.mails.map(function(data) {
          return <tr>
            <td>{data.from}</td>
            <td>{data.to}</td>
            <td>{data.subject}</td>
            <td>{data.date}</td>
          </tr>
        })}
      </tbody>
    </table>;
  }
});



var Mailbox = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.mailbox[0].id
    };
  },
  selectFolder: function(e) {
    this.setState({active: e.activeTab});
  },
  render: function() {
    var mailbox = this.props.mailbox;
    var active = this.state.active;

    return <div id="mailbox">
      <Tabs className="folders"
       onSelect={this.selectFolder} active={active}>
        {mailbox.map(function(folder) {
          return <Tab>{folder.id}</Tab>
        })}
      </Tabs>
      <MailGrid mailbox={mailbox} active={active} />
    </div>;
  }
});



React.renderComponent(
  <Mailbox mailbox={window.folders} />,
  document.querySelector('main[role="main"]')
);
