import request from '../../requestHandler';

export function saveConnect(type,id) {
	let entity = 'profiles/';
	let relation = '/connections';
  return request.post('/v1/'+entity+id+relation);
}
