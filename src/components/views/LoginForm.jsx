import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { FieldError } from '../elements/FieldError';
import { validationErrors } from '../../constants/messagesConfig';
import { createPageNavigationUrl } from '../../utils/createNavigationUrl';

export const fields = ['username', 'password', 'email', 'fullname'];

/* Validation rules as per redux-form */
export const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = validationErrors.required;
  } else if (!validationErrors.email.emailRegEx.test(values.email) && !validationErrors.mobile.RgEx.test(values.email)) {
    errors.email = validationErrors.email.invalidEmailMsg;
  }

  if (!values.fullname) {
    errors.fullname = validationErrors.fullname.required;
  } else if (!validationErrors.fullname.RgEx.test(values.fullname) || values.fullname.length < 3) {
    errors.fullname = validationErrors.fullname.invalid;
  }

  if (!values.password) {
    errors.password = validationErrors.required;
  } else if (values.password.length < 6) {
    errors.password = validationErrors.password.minLengthMsg;
  }
  return errors;
};

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleRemeberState = this.handleRemeberState.bind(this);
    this.formOnBlur = this.formOnBlur.bind(this);
    this.state = {
      rememberMe: true,
      inputValue: '',
      passValue: '',
      isRegistering: false,
    };
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { valid, fields, actions, touchAll } = this.props;
    const { isRegistering: isSignup } = this.state;

    actions.clearLoginErrorMessage();

    const password = fields.password.value;
    const email = fields.email.value;
    const fullname = fields.fullname.value;
    const isRegistering = event.target.id === 'register';
    let data;
    if (isRegistering) {
      if (!isSignup) {
        this.setState({
          isRegistering: true,
        });
        return;
      }
    } else if (isSignup) {
      this.setState({
        isRegistering: false,
      });
    }

    touchAll();
    if (valid || (!isRegistering && fields.email.valid && fields.password.valid)) {
      const isLoggingInThroughPhoneNumber = validationErrors.mobile.RgEx.test(email);

      data = {
        password,
      };

      if (isLoggingInThroughPhoneNumber) {
        data.phone = email;
      } else {
        data.email = email;
      }
        // append is_new=1, and name if is registering for a new acocunt
      if (isRegistering) {
        data.name = fullname;
        data.is_new = 1;
      }

      if (this.state.rememberMe) {
        data.remember_me = 1;
      } else {
        data.remember_me = 0;
      }
      actions.loginWithEmail(data);
    }
    /*
      check if user was registering and clikced on register or login
      on click of register - do nothing
      on click of login - hide name field and call login api
    */
  }

  handleRemeberState() {
    const isChecked = this.state.rememberMe;
    if (isChecked) {
      this.setState({
        rememberMe: false,
      });
    } else {
      this.setState({
        rememberMe: true,
      });
    }
  }

  formOnBlur() {
    if (this.props.errorMsg) {
      this.props.actions.clearLoginErrorMessage();
    }
  }

  componentDidMount() {
    this.forgotPasswardUrl = createPageNavigationUrl('user/password')
  }


  handleInputChange(e) {
    const isEmailOrPhoneInput = e.target.id === 'emailOrPhone';
    if (isEmailOrPhoneInput) {
      this.setState({
        inputValue: e.target.value,
      });
    } else {
      this.setState({
        passValue: e.target.value,
      });
    }
  }

  render() {
    const {
      fields: { password, email, fullname },
      isLoggingInVia,
      errorMsg,
    } = this.props;

    const { isRegistering } = this.state;

    return (
      <form className="ui form" id="id-modal-loginsignup-form" onBlur={this.formOnBlur}>
        <div className="ui vertical segment">
          <div className="field">
            <div className="ui input">
              <input
                type="text"
                placeholder="E-mail
                address"
                name="email"
                id="emailOrPhone" {...email}
              />
            </div>
                  {
                    email.touched && email.error &&
                      <FieldError message={email.error} />
                  }
          </div>
          <div className="field">
            <div className="ui input">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password" {...password}
              />
            </div>
            {
              password.touched && password.error &&
                <FieldError message={password.error} />
            }
          </div>

              { isRegistering ?
                <div className="field">
                  <div className="ui input">
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Full name"
                      id="fullname" {...fullname}
                    />
                  </div>
                    {
                      fullname.touched && fullname.error &&
                        <FieldError message={fullname.error} />
                    }
                </div> : null
              }

              {
                errorMsg ?
                  <div className="field">
                    <div className="ui auth-form error message">
                    {errorMsg}
                    </div>
                  </div>
                : null
              }
          <div className="two fields">
            <div className="field">
              <button
                className={isLoggingInVia === 'new_account' ?
                  'ui fluid red button loading' : 'ui fluid red button'}
                type="submit"
                id="register"
                onClick={this.handleOnSubmit}
              >
                Register
              </button>
            </div>
            <div className="field">
              <button
                className={isLoggingInVia === 'email' ?
                  'ui fluid inverted red button loading' :
                  'ui fluid inverted red button'}
                type="submit"
                id="login"
                onClick={this.handleOnSubmit}
              >
                    Login
              </button>
            </div>
          </div>
          <div className="field ui centered grid">
            <div className="ui text centered container">
              <div className="ui checkbox">
                <input
                  name="remember"
                  type="checkbox"
                  checked={this.state.rememberMe}
                  onChange={this.handleRemeberState}
                />
                    <label>Remember me</label>
              </div>
            </div>
          </div>
          <div className="field ui centered grid">
            <a className="ui primary" href={this.forgotPasswardUrl} >Forgot your password ? </a>
          </div>
          <div className="field ui centered grid">
            <p>By signing up, you agree to Campus Diaries</p>
            <a
              className="ui primary"
              href={createPageNavigationUrl('terms')}
              target="_blank"
              rel="noopener noreferrer"
            >
            Terms & Conditions
            </a>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object,
  isLoggingInVia: PropTypes.bool,
  errorMsg: PropTypes.string,
  actions: PropTypes.object,
  valid: PropTypes.bool,
  touchAll: PropTypes.func,
};

const LoginWithEmailForm = reduxForm({
  form: 'loginForm',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
  // workaround for converting redux-form state to immutable
})(LoginForm);

export default LoginWithEmailForm;
