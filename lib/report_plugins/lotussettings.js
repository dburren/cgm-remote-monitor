'use strict';

var _ = window._;
var moment = window.moment;

var lotussettings = {
  name: 'lotussettings'
  , label: 'Lotus Settings'
  , pluginType: 'report'
};

function init() {
  return settings;
}

module.exports = init;

lotussettings.html = function html(client) {
  var translate = client.translate;
  var ret =
      '<h2>' + translate('Lotus Settings') + '</h2>'
    + '<b>' + translate('To see this report, press SHOW while in this view') + '</b>'
    + '<div id="settings-report"></div>'
    ;

  return ret;
};

lotussettings.css =
    '.border_bottom td {'
  + '  border-bottom:1pt solid #eee;'
  + '}'
  ;
    
lotussettings.report = function report_settings(datastorage, sorteddaystoshow, options) {
  var Nightscout = window.Nightscout;
  var client = Nightscout.client;
  var translate = client.translate;
  var report_plugins = Nightscout.report_plugins;

  function maybePrevent (event) {
    if (event) {
      event.preventDefault();
    }
    return false;
  }

  var table = $('<table>');
  table.append($('<tr>').css('background','gray')
    .append($('<th>').css('width','80px').attr('align','left').append(translate('Time')))
    .append($('<th>').css('width','150px').attr('align','left').append(translate('Section')))
    .append($('<th>').attr('align','left').append(translate('Setting')))
  );
  
  sorteddaystoshow.forEach(function (day) {
    table.append($('<tr>')
      .append($('<td>').attr('colspan','3').css('background','lightgray')
        .append($('<b>').append(report_plugins.utils.localeDate(day)))
      )
    );
    var devicestatus = _.clone(datastorage[day].devicestatus);
    if (options.order === report_plugins.consts.ORDER_NEWESTONTOP) {
      devicestatus.reverse();
    }
    var descriptions = {};
    for (var t=0; t<devicestatus.length; t++) {
      var ds = devicestatus[t];
      if (ds.lotusSettings) {
        var report = {};
        if (ds.lotusSettings.description) {
          descriptions = ds.lotusSettings.description;
        }
        if (ds.lotusSettings.settings) {
          var sets = ds.lotusSettings.settings
          var row = $('<tr>').addClass('border_bottom')
            .append($('<td>').attr('rowspan', sets.length)
            .append(new Date(ds.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')));
          for (let group of sets.keys()) {
            row.append($('<td>').attr('align','left').append(group));
            var cell = ''
            sets.get(group).forEach( (value, key, map) => {
              translated = descriptions.get(group).get(key);
              cell = cell + translated + ' = ' + value + "\n";
            })
            table.append(row.append($('<td>').attr('align','left').append(cell)));
            row = $('<tr>').addClass('border_bottom');
          }
        }
      }
    }
  });
  $('#lotussettings-report').html(table);
};