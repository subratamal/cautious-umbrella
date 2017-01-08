import React, { PropTypes } from 'react'
import { toJS } from 'immutable'
import {FieldError} from '../elements/FieldError'
import {validationErrors} from '../../constants/messagesConfig'
import { reduxForm } from 'redux-form'
import {contains} from 'underscore'
import {createEntityNavigationUrl} from '../../utils/createNavigationUrl'

export const fields = ['fullname', 'email']


/*Validation rules as per redux-form*/
export const validate = values => {
  const errors = {}
  if(!values.fullname) {
    errors.fullname = validationErrors.required
  }else if (!validationErrors.fullname.RgEx.test(values.fullname)) {
    errors.fullname = validationErrors.fullname.invalid
  }

  if (!values.email) {
    //errors.email = validationErrors.required;
  }
   else if (!validationErrors.email.emailRegEx.test(values.email) && !validationErrors.mobile.RgEx.test(values.email)) {
    errors.email = validationErrors.email.invalidEmailMsg;
  }
  return errors
}

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props)
    this.updateProfileName = this.updateProfileName.bind(this)
    this.logout = this.logout.bind(this)

  }

  logout(e) {
    e.preventDefault()
    let { actions } = this.props
    actions.logout()
  }

  updateProfileName(e) {
    e.preventDefault()
    let {valid} = this.props

    if(valid) {
      let data = {}
      let { profileActions } = this.props
      let profile = this.props.profile.toJS()
      if(contains(profile.incompleteFields,'name')){
        let userName = this.refs.name.value;
        data.name = userName;
      }
      /* TODO
        - remove comments when api for email update is implmented
        - add email field from LoginForm for enabling email input
      */


     /* if(contains(profile.incompleteFields,'email')){
        let userEmail = this.refs.email.value;
        data.email = userEmail;
      }
      */
      profileActions.update(profile.data.id, data, "name")
    }
  }

  render () {
    let { error } = this.props
    let profile = this.props.profile.toJS()
    let isRequesting = profile.isRequestingForProfileUpdate
    const { fields: {fullname,email} } = this.props
    var emailFlag =  contains(profile.incompleteFields,'email')
    var nameFlag = contains(profile.incompleteFields,'name')

    return (
      <div className="ui inner-form">
        <form className="ui form" id="id-modal-profile-incomlete-form" onSubmit={this.updateProfileName}>

          <div className="field">
              <label className="ui center aligned container">
                Profile Incomplete.
              </label>
               {nameFlag?
              <p className="ui center aligned container">Please Enter your Full name.</p>:null}
          </div>
          {nameFlag?

            <div className="field">
               <input type="text" class="fullname" name="first-name" ref="name" placeholder="Full Name" {...fullname}/>
              <span>
          {
            fullname.touched && fullname.error &&
            <FieldError message={fullname.error}></FieldError>
            }
          </span>
          </div>

          :null}

          {emailFlag?

          <div className="field">
              <p>Please click  <a href={createEntityNavigationUrl(profile.data.id,'profiles')} target="_blank">
                <span className="ui text red">here</span>
              </a> to register your email address.
              </p>
              <p>
                Once registered successfully, Kindly refresh this page.
              </p>
          </div>
          : null
        }
          {
            error ?
            <div className="field">
              <div className="ui auth-form error message center aligned container">
                <p>{error}</p>
              </div>
            </div>
            : null
          }
          {nameFlag?
          <div className="field">
            <div className="ui center aligned container">
              <button className={ isRequesting ? "ui button primary loading" : "ui button primary" } type="submit">Submit</button>
            </div>
        </div>:
        null}
        </form>
        <div className="modal-footer-fixed">
          <div className="ui divider"></div>
          <div className="field">
            <div className="ui center aligned container">
              <div>Not your Account? </div>
              <a href="#" onClick={this.logout}>
                <span className="ui text red">Login Again</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'profileUpdateForm',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS() //--> workaround for converting redux-form state to immutable
})(UpdateProfile)
