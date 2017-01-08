import { checkForLoginState } from './login_modal_actions'

export default function getLoginState(dispatch) {
  return Promise.resolve(dispatch(checkForLoginState()));
}
