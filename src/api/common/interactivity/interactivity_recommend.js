/*Api Call for Login by using request handler*/
import request from '../../requestHandler';

export function postInteractivityRecommend(type,id) {
	let entity;
	if(type === 'story')
		entity = 'stories/'
	else if(type == 'event')
		entity = 'events/'
    return request.post('/v1/'+entity+id+'/recommends');
}
