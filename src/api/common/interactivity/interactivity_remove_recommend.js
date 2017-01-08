import request from '../../requestHandler';

export function deleteRecommendFlag(type,entityId,saveId) {
	let entity;
	if(type === 'story')
		entity = 'stories/'
	else if(type == 'event')
		entity = 'events/'
    return request.post('/v1/'+entity+entityId+'/recommends/'+saveId+'/delete');
}
