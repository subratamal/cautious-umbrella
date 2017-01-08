import { each } from 'underscore';
import firebaseDB from '../firebase_request_handler';
import { opportunitiesPageCount } from '../recordFetchCount';

/* eslint-disable */
export function getOpportunitiesSideBarSkills() {
/* eslint-enable */
  return new Promise((resolve, reject) => {
    firebaseDB.child('resources/').orderByChild('type').equalTo('opportunities').once('value')
    .then((opportunitiesSnap) => {
      const opportunitiesObject = opportunitiesSnap.val();
      const objectsArray = [];
      const objectsPromiseArray = [];
      const skillsArray = [];

      /* eslint-disable */
      for (const key in opportunitiesObject) {
      /* eslint-enable */
        if ({}.hasOwnProperty.call(opportunitiesObject, key)) {
          objectsArray.push(opportunitiesObject[key]);
        }
      }

      objectsArray.sort((a, b) =>
        parseInt(b.updated_time, 10) - parseInt(a.updated_time, 10)
      );

      objectsArray.forEach((opportunity) => {
        const skillPromise = firebaseDB.child(`/relations/required_skills/${opportunity.id}`).once('value').then((opportunitySnap) => {
          const skillsMasterObject = opportunitySnap.val();
          if (skillsMasterObject !== null) {
            each(skillsMasterObject, (skill) => {
              const skillDataPromise = firebaseDB.child(`resources/${skill.id}`).once('value').then((skillSnap) => {
                const skillData = skillSnap.val();
                return skillData;
              }, err => Promise.reject(err));
              skillsArray.push(skillDataPromise);
            });
          }
          return Promise.all(skillsArray);
        }, err => Promise.reject(err));
        objectsPromiseArray.push(skillPromise);
      });

      return Promise.all(objectsPromiseArray);
    }, err => Promise.reject(err))
    .then((values) => {
      const refObject = {};
      let skillsCount = opportunitiesPageCount.sideBarSkillsCount;
      let penUltimateSkillsArray = [];
      const ultimateSkillsArray = [];
      values.forEach((area) => {
        const arr = area;
        penUltimateSkillsArray = penUltimateSkillsArray.concat(arr);
      });
      penUltimateSkillsArray.forEach((skyl) => {
        const native = skyl;
        if (!refObject[native.name] && skillsCount > 0) {
          ultimateSkillsArray.push(skyl);
          refObject[native.name] = native;
          skillsCount--;
        }
      });
      resolve(ultimateSkillsArray);
    }, err => reject(err));
  });
}
