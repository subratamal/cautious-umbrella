import firebaseDB from '../firebase_request_handler';

/* eslint-disable */
export function fetchSimilarOpportunities(requestId) {
/* eslint-enable */
  return new Promise((resolve) => {
    const similarOpportunitiesPromise = firebaseDB.child(`/relations/similar/${requestId}`).once('value').then((similarOpportunitiesSnap) => {
      const similarOpportunitiesObject = similarOpportunitiesSnap.val();
      const similarOpportunities = [];
      const similarOpportunitiesDetailsArray = [];
      if (similarOpportunitiesObject) {
        /* eslint-disable */
        for (const similarOpportunityKey in similarOpportunitiesObject)
        /* eslint-enable */
          if ({}.hasOwnProperty.call(similarOpportunitiesObject, similarOpportunityKey)) {
            similarOpportunities.push(similarOpportunityKey);
          }

        similarOpportunities.forEach((opportunityId) => {
          const similarOpportunitiesDetailPromise = firebaseDB.child(`resources/${opportunityId}`).once('value').then((opportunityDetailSnap) => {
            const opportunityDetail = opportunityDetailSnap.val();

            const opportunityDetailAuthorPromise = firebaseDB.child(`/relations/on_behalf_of/${opportunityDetail.id}`).once('value').then((authorSnap) => {
              let authorId = '';

              if (authorSnap.val() != null) {
                authorId = Object.keys(authorSnap.val())[0];
              }

              const opportunityDetailAuthorDetailPromise = firebaseDB.child(`resources/${authorId}`).once('value').then((authorDetailsSnap) => {
                const authorDetails = authorDetailsSnap.val();
                if (opportunityDetail) {
                  opportunityDetail.author = authorDetails;
                }

                return opportunityDetail;
              }, err => Promise.reject(err));
              return Promise.resolve(opportunityDetailAuthorDetailPromise);
            }, err => Promise.reject(err));
            return Promise.resolve(opportunityDetailAuthorPromise);
          }, err => Promise.reject(err));
          similarOpportunitiesDetailsArray.push(similarOpportunitiesDetailPromise);
        });
      }
      return Promise.all(similarOpportunitiesDetailsArray);
    }, err => Promise.reject(err));
    resolve(similarOpportunitiesPromise);
  }).then((values) => {
    const finalObj = {};
    finalObj.data = values;
    return (finalObj);
  });
}
