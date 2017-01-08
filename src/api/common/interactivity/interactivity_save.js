import request from '../../requestHandler';

export function postInteractivitySave(type,id) {
	let entity;
	if(type === 'story')
		entity = 'stories/'
	else if(type == 'event')
		entity = 'events/'
	else if(type == 'opportunities')
		entity='opportunities/'
    return request.post('/v1/'+entity+id+'/saves');
}
