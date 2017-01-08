
export const landingPageMeta = {
  title: 'College News, Stories and Events | Campus Diaries',
  description: 'Join half a million students and recent grads across campuses in India. Find college stories, events and opportunities to help you build a great career.',
  meta: {
    name: {
      'keywords': 'career,opportunities,internships,events,college,students,India,campus,diaries,projects,stories,people,connections,graduate,community,creative,competitions,jobs,ideas,experiences,colaborate,organization,talent,young,profile',
    },
    property: {
      'og:title': 'Campus Diaries',
      'og:description': "A discovery platform for the world's most talented students. Showcase your work and find opportunities.",
      'og:image': 'https://campusdiaries.com/cd_logo.png',
    },
  },
};

export const discoverPageMeta = {
  title: 'Career opportunities, internships and events for college students',
  description: 'Make the most of your student life. Find jobs, internships, events, competitions for career development. Find the right university. Whether you are a first year, second year or final year - join Campus Diaries to get the right guidance for your college life.',
  meta: {
    property: {
      'og:title': 'Campus Diaries | Discover',
      'og:description': 'Find the best connections and opportunities for your student life',
      'og:image': 'https://campusdiaries.com/cd_logo.png',
    },
  },
};

export const homePageMeta = {
  title: 'Career opportunities, internships and events for college students',
  description: 'Make the most of your student life. Find jobs, internships, events, competitions for career development. Find the right university. Whether you are a first year, second year or final year - join Campus Diaries to get the right guidance for your college life.',
  meta: {
    property: {
      'og:title': 'Campus Diaries | Home',
      'og:description': 'Find the best connections and opportunities for your student life',
      'og:image': 'https://campusdiaries.com/cd_logo.png',
    },
  },
};

export const universityPageMeta = {
  title: 'Best Colleges in India | College Finder | Campus Diaries',
  description: 'Search for engineering, medical, commerce, science, architecture, arts, humanities, law and other colleges in India with fees, admission and hostel details.',
  meta: {
    name: {
      keywords: 'college search, college finder, campus diaries, top colleges in india, best colleges in india, top universities in india, best universities in india, campus stories, college admission, campus hostel, college fees',
    },
    property: {
      'og:title': 'Find the right college and university + admissions help',
      'og:description': 'Confused about which course and college is best for you? Click for answers.',
      'og:image': 'https://s3.amazonaws.com/prod_object_assets/assets/147492595905302/university_finder_og_image.jpg?AWSAccessKeyId=AKIAIXM6FRIC5QVSA63Q&Expires=1467096905&Signature=aSukiv%2FmCnVaugni%2FZpF6vpC750%3D#_=_',
    },
  },
};

export const opportunitiesPageMeta = {
  title: 'Internships, Jobs, Career Opportunities for Students | Campus Diaries',
  description: 'Search for engineering, medical, commerce, science, architecture, arts, humanities, law and other colleges in India with fees, admission and hostel details.',
  meta: {
    name: {
      description: 'Looking for work opportunities as a student? Find the best internships, jobs and career opportunities and apply with your student profile at Campus Diaries',
    },
    property: {
      'og:title': 'Internships, Jobs, Career Opportunities for Students',
      'og:type': 'article',
      'og:url': 'https://campusdiaries.com/discover/opportunities',
      'og:description': 'Discover some of the best internships, jobs and career opportunities for students',
      'og:image': 'https://campusdiaries.com/cd_logo.png',
    },
  },

};


export const eventsPageMeta = {
  title: 'College Events and Competitions India | Campus Diaries',
  description: 'Discover the best college events and students competitions in India. Find college fests, workshops, contests and more events in and around your campus.',
  keywords: 'college search, college finder, campus diaries, top colleges in india, best colleges in india, top universities in india, best universities in india, campus stories, college admission, campus hostel, college fees',
  meta: {
    name: {
      keywords: 'college events, campus diaries, college fests, college workshops, college competitions, college contests, student competitions, campus events',
    },
    property: {
      'og:title': 'Events',
      'og:description': 'A discovery platform for the world\'s most talented students. Showcase your work and find opportunities.',
      'og:image': 'https://campusdiaries.com/cd_logo.png',
    },
  },

};

export function generateOpportunityViewPageMetaTags(opportunityDetails) {
  if (!opportunityDetails) {
    return {};
  }
  let description = '';
  if (opportunityDetails.description && opportunityDetails.description.length) {
    opportunityDetails.description.map(obj => {
      description = `${description} ${obj.text}`;
      return null;
    });
  }
  const metaTagObject = {
    title: opportunityDetails.title,
    description,
    meta: {
      property: {
        'og:title': opportunityDetails.title,
        'og:type': 'article',
        'og:url': opportunityDetails.href,
        'og:description': description,
        'og:image': opportunityDetails.image ? opportunityDetails.image : 'https://campusdiaries.com/cd_logo.png',
      },
    },
  };
  return metaTagObject;
}
