import request from '../../requestHandler';

export function deleteSavesFlag(type,entityId,saveId) {
	let entity;
	if(type === 'story')
		entity = 'stories/'
	else if(type == 'event')
		entity = 'events/'
	else if(type == 'opportunities')
		entity = 'opportunities/'
    return request.post('/v1/'+entity+entityId+'/saves/'+saveId+'/delete');
}
