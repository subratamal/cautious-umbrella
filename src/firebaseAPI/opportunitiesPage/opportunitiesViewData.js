import firebaseDB from '../firebase_request_handler';
import {
checkLoggedIn,
} from '../../actions/checkLoggedIn';

export function getOpportunitiesViewData(requestId) {
  return new Promise((resolve) => {
    const uuid = checkLoggedIn(false);
    const opportunityPromise = firebaseDB.child(`resources/${requestId}`).once('value').then((opportunitySnap) => {
      const opportunity = opportunitySnap.val();
      const authorPromise = firebaseDB.child(`/relations/on_behalf_of/${requestId}`).once('value').then((authorSnap) => {
        let authorId = '';
        if (authorSnap.val() !== null) {
          authorId = Object.keys(authorSnap.val())[0];
        }

        const authorDetailsPromise = firebaseDB.child(`resources/${authorId}`).once('value').then((authorDetailsSnap) => {
          const authorDetails = authorDetailsSnap.val();
          if (opportunity) {
            opportunity.author = authorDetails;
          }
          const followRelation = firebaseDB.child(`relations/followers/${authorId}`).orderByKey().once('value').then((followSnap) => {
            if (opportunity && uuid && followSnap.val() && followSnap.val()[uuid]) {
              opportunity.author.following = followSnap.val()[uuid].rel_id;
            } else {
              if (opportunity && opportunity.author) {
                opportunity.author.following = '0';
              }
            }
            return opportunity;
          });
          return Promise.resolve(followRelation);
        });
        return Promise.resolve(authorDetailsPromise);
      });

      const applicantPromise = firebaseDB.child(`/relations/applicants/${requestId}`).once('value').then((applicantSnap) => {
        const applicantsObject = applicantSnap.val();
        const applicants = [];
        const applicantDetailsArray = [];

        if (applicantsObject) {
          for (const applicantKey in applicantsObject) {
            if ({}.hasOwnProperty.call(applicantsObject, applicantKey)) {
              applicants.push(applicantKey);
            }
          }

          applicants.forEach((applicantId) => {
            const applicantDetailPromise = firebaseDB.child(`resources/${applicantId}`).once('value').then((applicantDetailSnap) => {
              const applicantDetail = applicantDetailSnap.val();
              return applicantDetail;
            });
            applicantDetailsArray.push(applicantDetailPromise);
          });
        }
        return Promise.all(applicantDetailsArray);
      });

      const appliedPromise = firebaseDB.child(`/relations/applicants/${requestId}`).once('value').then((applicantSnap) => {
        const applicantsObject = applicantSnap.val();
        let applied = false;
        if (applicantsObject && uuid && applicantsObject[uuid] !== undefined) {
          applied = applicantsObject[uuid].rel_id;
        }
        return applied;
      });

      const requiredSkillsPromise = firebaseDB.child(`/relations/required_skills/${requestId}`).once('value').then((requiredSkillSnap) => {
        const requiredSkillsObject = requiredSkillSnap.val();
        const requiredSkills = [];
        const requiredSkillsDetailsArray = [];
        if (requiredSkillsObject) {
          for (const requiredSkillKey in requiredSkillsObject) {
            if ({}.hasOwnProperty.call(requiredSkillsObject, requiredSkillKey)) {
              requiredSkills.push(requiredSkillKey);
            }
          }

          requiredSkills.forEach((skillId) => {
            const requiredSkillDetailPromise = firebaseDB.child(`resources/${skillId}`).once('value').then((skillDetailSnap) => {
              const skillDetail = skillDetailSnap.val();
              return skillDetail;
            });
            requiredSkillsDetailsArray.push(requiredSkillDetailPromise);
          });
        }
        return Promise.all(requiredSkillsDetailsArray);
      });

      const workAreasPromise = firebaseDB.child(`/relations/work_areas/${requestId}`).once('value').then((workAreaSnap) => {
        const workAreasObject = workAreaSnap.val();
        const workAreas = [];
        const workAreasDetailsArray = [];
        if (workAreasObject) {
          for (const workAreaKey in workAreasObject) {
            if ({}.hasOwnProperty.call(workAreasObject, workAreaKey)) {
              workAreas.push(workAreaKey);
            }
          }

          workAreas.forEach((workAreaId) => {
            const workAreaDetailPromise = firebaseDB.child(`resources/${workAreaId}`).once('value').then((workAreaDetailSnap) => {
              const workAreaDetail = workAreaDetailSnap.val();
              return workAreaDetail;
            });
            workAreasDetailsArray.push(workAreaDetailPromise);
          });
        }
        return Promise.all(workAreasDetailsArray);
      });

      const savePromise = firebaseDB.child(`/relations/saves/${requestId}`).once('value').then((saveSnap) => {
        const saveRelationData = saveSnap.val();
        let savedFlag;
        if (uuid && saveRelationData != null) {
          if (saveRelationData[uuid] !== undefined) {
            savedFlag = saveRelationData[uuid].rel_id;
          } else {
            savedFlag = 0;
          }
        } else {
          savedFlag = 0;
        }
        return savedFlag;
      });

      const similarOpportunitiesPromise = firebaseDB.child(`/relations/similar/${requestId}`).once('value').then((similarOpportunitiesSnap) => {
        const similarOpportunitiesObject = similarOpportunitiesSnap.val();

        const similarOpportunities = [];
        const similarOpportunitiesDetailsArray = [];
        if (similarOpportunitiesObject) {
          for (const similarOpportunityKey in similarOpportunitiesObject) {
            if ({}.hasOwnProperty.call(similarOpportunitiesObject, similarOpportunityKey)) {
              similarOpportunities.push(similarOpportunityKey);
            }
          }

          similarOpportunities.forEach((opportunityId) => {
            const similarOpportunitiesDetailPromise = firebaseDB.child(`resources/${opportunityId}`).once('value').then((opportunityDetailSnap) => {
              const opportunityDetail = opportunityDetailSnap.val();

              const opportunityDetailAuthorPromise = firebaseDB.child(`/relations/on_behalf_of/${opportunityDetail.id}`).once('value').then((authorSnap) => {
                let authorId = '';

                if (authorSnap.val() !== null) {
                  authorId = Object.keys(authorSnap.val())[0];
                }

                const opportunityDetailAuthorDetailPromise = firebaseDB.child(`resources/${authorId}`).once('value').then((authorDetailsSnap) => {
                  const authorDetails = authorDetailsSnap.val();
                  opportunityDetail.author = authorDetails;

                  return opportunityDetail;
                });
                return Promise.resolve(opportunityDetailAuthorDetailPromise);
              });
              return Promise.resolve(opportunityDetailAuthorPromise);
            });
            similarOpportunitiesDetailsArray.push(similarOpportunitiesDetailPromise);
          });
        }
        return Promise.all(similarOpportunitiesDetailsArray);
      });

      return Promise.all([authorPromise, applicantPromise, appliedPromise, requiredSkillsPromise, workAreasPromise, savePromise, similarOpportunitiesPromise]);
    });

    resolve(opportunityPromise);
  }).then((values) => {
    const opportunity = values[0];
    opportunity.applicants = values[1];
    opportunity.applied = values[2];
    opportunity.requiredSkills = values[3];
    opportunity.workAreas = values[4];
    opportunity.saved = values[5];
    opportunity.similarOpportunities = values[6];
    const resultObject = {};
    resultObject.data = opportunity;
    return (resultObject);
  });
}
