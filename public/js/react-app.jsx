/** @jsx React.DOM */

var Folder = React.createClass({
  click: function(e) {
    e.folder = this.props.data.id;
  },
  render: function() {
    var label = this.props.data.id;
    var className = this.props.selected ? 'selected' : '';
    return <li onClick={this.click} className={className}>
        {label}
      </li>;
  }
});

var Folders = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.active
    };
  },
  click: function(e) {
    this.setState({active: e.folder});
    this.props.onSelect.apply(this, arguments);
  },
  render: function() {
    var folders = this.props.folders;
    return <ul className="folders" onClick={this.click}>
      {folders.map(function(folder) {
        return <Folder data={folder} selected={this.state.active == folder.id}/>
      }.bind(this))}
    </ul>;
  }
});

var Mail = React.createClass({
  render: function() {
    var data = this.props.data;
    return <tr>
        <td>{data.from}</td>
        <td>{data.to}</td>
        <td>{data.subject}</td>
        <td>{data.date}</td>
    </tr>;
  }
});

var MailGrid = React.createClass({
  render: function() {
    var folder = this.props.folders.filter(function(folder){
      return folder.id == this.props.active;
    }.bind(this))[0];

    return <table className="mails">
      <thead><tr><th>From</th><th>To</th><th>Subject</th><th>Date</th></tr></thead>
      <tbody>
        {folder.mails.map(function(message) {
          return <Mail data={message} />
        }.bind(this))}
      </tbody>
    </table>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.folders[0].id
    };
  },
  activateFolder: function(e) {
    this.setState({active: e.folder});
  },
  render: function() {
    var folders = this.props.folders;
    var active = this.state.active;

    return <div id="mailbox">
        <Folders folders={folders} active={active} onSelect={this.activateFolder}/>
        <MailGrid folders={folders} active={active} />
      </div>;
  }
});



React.renderComponent(
  <App folders={window.folders} />,
  document.querySelector('main[role="main"]')
);
