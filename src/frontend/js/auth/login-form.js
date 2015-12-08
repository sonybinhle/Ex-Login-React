(function() {
  'use strict';

  let LoginFormErrorComponent = React.createClass(
    {
      render() {
        return (
          <div className="login-form__error">
            <span className="text-danger">{this.props.error}</span>
          </div>
        );
      }
    });

  let LoginFormComponent = React.createClass(
    {
      getInitialState() {
        return {username: '', password: '', error: {}};
      },
      validateForm() {
        const usernameRegex = /^[a-zA-Z][0-9a-zA-Z]{5,}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

        let error = {};

        if (! usernameRegex.test(this.state.username)) {
          error.username = 'Username must contain at least 6 characters and begin with a letter, special characters are not allowed';
        }

        if (! passwordRegex.test(this.state.password)) {
          error.password = 'Password must contain at least 6 characters, a digit, and an uppercase character, special characters are not allowed';
        }

        this.setState({
          error: error
        });

        return $.isEmptyObject(error);

      },
      handleSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
          $.post('/api/auth/login', this.state)
            .done( () => {
              window.location = '/';
            })
            .fail((data) => {
              let error = Object.assign({}, this.state.error, data.responseJSON.error);
              this.setState({
                error: error
              });
            });
        }
      },
      onInputUsernameChanged(e) {
        this.setState({
          username: e.target.value
        });
      },
      onInputPasswordChanged(e) {
        this.setState({
          password: e.target.value
        });
      },
      render() {
        return (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Login</h3>
              </div>
              <div className="panel-body">

                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.username}
                    onChange={this.onInputUsernameChanged}
                    placeholder="Username"
                  />
                  {
                    this.state.error.username
                      ? <LoginFormErrorComponent error={this.state.error.username}/>
                      : null
                  }
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    value={this.state.password}
                    onChange={this.onInputPasswordChanged}
                    placeholder="password"
                  />
                  {
                    this.state.error.password
                      ? <LoginFormErrorComponent error={this.state.error.password}/>
                      : null
                  }
                </div>

                <div className="form-group">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Login"
                  />
                </div>
              </div>
            </div>

          </form>
        );
      }
    });

  let loginForm = document.querySelector('[data-react="login-form"]');
  if (loginForm) {
    ReactDOM.render(
      <LoginFormComponent />,
      loginForm
    );
  }
}());