(function(){
  'use strict';

  let UserInfoComponent = React.createClass({
    getInitialState() {
      return {username: ''};
    },
    componentDidMount() {
      $.get('/api/auth/me', (data) => {
        this.setState({
          username: data.user.username
        });
      });
    },
    render() {
      return (
        <div className="user-info">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">User Information</h3>
            </div>
            <div className="panel-body">
              <h4>Welcome <i>{this.state.username}</i></h4>
              <a
                className="btn btn-primary"
                href="/auth/logout">
                Logout
              </a>
            </div>
          </div>
        </div>
      );
    }
  });

  let userInfo = document.querySelector('[data-react="user-info"]');

  if (userInfo) {
    ReactDOM.render(
      <UserInfoComponent />,
      userInfo
    );
  }
}());
