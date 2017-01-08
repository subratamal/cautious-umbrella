/* Api Call for Login by using request handler */
import request from '../requestHandler';

export function loginWithEmail(data) {
  if (data) {
    const postData = {
      account: data,
    };

    if (postData.account.name) {
      const name = postData.account.name;
      delete postData.account.name;
      postData.name = name;
    }

    if (data.is_new && !data.phone) {
      postData.account.redirect_path = `${window.location.href}?email_verification=success`;
    }
    return request.post('/v1/profiles', postData);
  }
  return false;
}

export function logout() {
  const url = '/v1/accounts/logout';
  return request.post(url, {});
}
