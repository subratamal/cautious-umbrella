import request from '../../requestHandler';

export function saveFollow(type,id) {
	let entity;
	let relation;

	if(type === 'page'){
		entity = 'pages/',
		relation = '/followers'
	}
	else if(type == 'topic'){
		entity = 'topics/'
		relation = '/subscribers'

	}
    return request.post('/v1/'+entity+id+relation);
}
