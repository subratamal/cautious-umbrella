import request from '../../requestHandler';

export function deleteFollow(type,connectionId) {
	let relation = 'connections';
  //connection/connectionId?/delete

  return request.post('/v1/'+relation+'/delete');
}
