// import DS from 'ember-data';

// export default DS.JSONAPIAdapter.extend({
// });
import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import { pluralize } from 'ember-inflector';

const { String: { underscore } } = Ember;

export default JSONAPIAdapter.extend({

  pathForType(type) {
    return pluralize(underscore(type));
  },

  shouldReloadRecord() {
    return false;
  },

  shouldBackgroundReloadRecord(store, snapshot) {

    console.log("Calling shouldBackgroundReloadRecord");
    const loadedAt = snapshot.record.get('loadedAt');

    // if it was loaded more than an hour ago
    if (Date.now() - loadedAt > 3600000) {
      return true;
    } else {
      return false;
    }
  }
});