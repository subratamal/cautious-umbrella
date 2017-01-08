import request from '../requestHandler';


export function sendSMSVerificationCode(accountId) {
  return request.post(`/v1/accounts/${accountId}/phone_otp`, {})
}

export function sendVerificationEmail(accountId) {
  return request.post(`/v1/accounts/${accountId}/email_vlink`)
}

export function validateOTP(accountId, otp) {
  let data = {
    code: otp
  }
  return request.post(`/v1/accounts/${accountId}/phone_verify`, data)
}
