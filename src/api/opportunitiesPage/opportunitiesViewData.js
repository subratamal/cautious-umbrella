import request from '../requestHandler';

export function getOpportunitiesViewData(requestId) {
    return request.get('/v1/opportunities/'+requestId);
}

export function applyForOpportunity(opportunityId){
    return request.post('v1/opportunities/'+opportunityId+'/applicants')
}

export function cancelOpportunityApplication(opportunityId,relId){
  return request.post('v1/opportunities/'+opportunityId+'/applicants/'+relId+'/delete')
}
