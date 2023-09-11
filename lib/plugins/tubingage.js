'use strict';

var _ = require('lodash');
var moment = require('moment');

function init(ctx) {
  var translate = ctx.language.translate;
  var levels = ctx.levels;

  var tage = {
    name: 'tage'
    , label: 'Tubing Age'
    , pluginType: 'pill-minor'
  };

  tage.getPrefs = function getPrefs (sbx) {
    // TAGE_INFO = 200 TAGE_WARN=240 TAGE_URGENT=999
    return {
      info: sbx.extendedSettings.info || 200
      , warn: sbx.extendedSettings.warn || 288
      , urgent: sbx.extendedSettings.urgent || 480
      , display: sbx.extendedSettings.display ? sbx.extendedSettings.display : 'days'
      , enableAlerts: sbx.extendedSettings.enableAlerts || false
    };
  };

  tage.setProperties = function setProperties (sbx) {
    sbx.offerProperty('tage', function setProp ( ) {
      return tage.findLatestTimeChange(sbx);
    });
  };

  tage.checkNotifications = function checkNotifications (sbx) {
    var tubingInfo = sbx.properties.tage;

    if (tubingInfo.notification) {
      var notification = _.extend({}, tubingInfo.notification, {
        plugin: tage
        , debug: {
          age: tubingInfo.age
        }
      });
      sbx.notifications.requestNotify(notification);
    }
  };

  tage.findLatestTimeChange = function findLatestTimeChange (sbx) {

    var prefs = tage.getPrefs(sbx);

    var tubingInfo = {
      found: false
      , age: 0
      , treatmentDate: null
      , checkForAlert: false
    };

    var prevDate = 0;

    _.each(sbx.data.tubechangeTreatments, function eachTreatment (treatment) {
      var treatmentDate = treatment.mills;
      if (treatmentDate > prevDate && treatmentDate <= sbx.time) {

        prevDate = treatmentDate;
        tubingInfo.treatmentDate = treatmentDate;

        var a = moment(sbx.time);
        var b = moment(tubingInfo.treatmentDate);
        var days = a.diff(b,'days');
        var hours = a.diff(b,'hours') - days * 24;
        var age = a.diff(b,'hours');

        if (!tubingInfo.found || (age >= 0 && age < tubingInfo.age)) {
          tubingInfo.found = true;
          tubingInfo.age = age;
          tubingInfo.days = days;
          tubingInfo.hours = hours;
          tubingInfo.notes = treatment.notes;
          tubingInfo.minFractions = a.diff(b,'minutes') - age * 60;
        }
      }
    });

    tubingInfo.level = levels.NONE;

    var sound = 'incoming';
    var message;
    var sendNotification = false;

    if (tubingInfo.age >= prefs.urgent) {
      sendNotification = tubingInfo.age === prefs.urgent;
      message = translate('Tubing change overdue!');
      sound = 'persistent';
      tubingInfo.level = levels.URGENT;
    } else if (tubingInfo.age >= prefs.warn) {
      sendNotification = tubingInfo.age === prefs.warn;
      message = translate('Time to change tubing');
      tubingInfo.level = levels.WARN;
    } else  if (tubingInfo.age >= prefs.info) {
      sendNotification = tubingInfo.age === prefs.info;
      message = 'Change tubing soon';
      tubingInfo.level = levels.INFO;
    }

    if (prefs.display === 'days' && tubingInfo.found) {
      tubingInfo.display = '';
      if (tubingInfo.age >= 24) {
        tubingInfo.display += tubingInfo.days + 'd';
      }
      tubingInfo.display += tubingInfo.hours + 'h';
    } else {
      tubingInfo.display = tubingInfo.found ? tubingInfo.age + 'h' : 'n/a ';
    }

    //allow for 20 minute period after a full hour during which we'll alert the user
    if (prefs.enableAlerts && sendNotification && tubingInfo.minFractions <= 20) {
      tubingInfo.notification = {
        title: translate('Tubing age %1 hours', { params: [tubingInfo.age] })
        , message: message
        , pushoverSound: sound
        , level: tubingInfo.level
        , group: 'TAGE'
      };
    }

    return tubingInfo;
  };

  tage.updateVisualisation = function updateVisualisation (sbx) {

    var tubingInfo = sbx.properties.tage;

    var info = [{ label: translate('Inserted'), value: new Date(tubingInfo.treatmentDate).toLocaleString() }];

    if (!_.isEmpty(tubingInfo.notes)) {
      info.push({label: translate('Notes') + ':', value: tubingInfo.notes});
    }

    var statusClass = null;
    if (tubingInfo.level === levels.URGENT) {
      statusClass = 'urgent';
    } else if (tubingInfo.level === levels.WARN) {
      statusClass = 'warn';
    }

    sbx.pluginBase.updatePillText(tage, {
      value: tubingInfo.display
      , label: translate('TAGE')
      , info: info
      , pillClass: statusClass
    });
  };
  return tage;
}

module.exports = init;

