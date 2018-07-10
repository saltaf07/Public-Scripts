// Leave this service with standard nodejs requires as it's needed where we
// don't have compilation
const { Strategy, initialize, isEnabled } = require('unleash-client');

class ActiveForUserInCohort extends Strategy {
  constructor() {
    super('ActiveForUserInCohort');
  }

  isEnabled({ cohorts }, { cohort }) {
    return cohorts.split(',').indexOf(cohort) !== -1;
  }
}

class UserEnabled extends Strategy {
  constructor() {
    super('UserEnabled');
  }

  isEnabled(_, { enabled }) {
    return enabled;
  }
}

function init(options) {
  return initialize(Object.assign(options, {
    url: 'https://weco-feature-flags.herokuapp.com/api/',
    refreshInterval: 60 * 1000,
    strategies: [new ActiveForUserInCohort(), new UserEnabled()]
  }));
}

module.exports = {
  initialize: init,
  ActiveForUserInCohort,
  isEnabled
};
