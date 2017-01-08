import request from '../requestHandler';

export default function getAccountInfo() {
  const accountFields = 'email_verification_status,phone_verification_status,phone,email,name,status';
  return request.get(`/v1/accounts/me?fields=${accountFields},profile{fields=name,display_picture,current_campus,status}`);
}
