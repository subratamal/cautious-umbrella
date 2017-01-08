import request from '../../requestHandler';

export function deleteFollow(type,entityId,followId) {
	let entity;
	let relation;
	if(type === 'page'){
		entity = 'pages/'
		relation = '/followers/'
	}
	else if(type == 'profile'){
		entity 	 = 'profiles/'
		relation = '/followers/'
	}
	else if(type == 'topic')
	{	entity = 'topics/'
		relation = '/subscribers/'
	}
    return request.post('/v1/'+entity+entityId+relation+followId+'/delete');
}
