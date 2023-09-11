'use strict';

var lotussettings = {
  name: 'lotussettings'
  , label: 'Lotus Settings'
  , pluginType: 'report'
};

function init() {
  return lotussettings;
}

module.exports = init;

lotussettings.html = function html(client) {
  var translate = client.translate;
  var ret =
      '<h2>' + translate('Lotus Settings') + ' (' + '<span id="lotussettings-days"></span>' + ')' + '</h2>'
    + '<b>' + translate('To see this report, press SHOW while in this view') + '</b>'
    + '<div id="lotussettings-report"></div>'
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

  var reportPlugins = Nightscout.report_plugins;
  var firstDay = reportPlugins.utils.localeDate(sorteddaystoshow[sorteddaystoshow.length - 1]);
  var lastDay = reportPlugins.utils.localeDate(sorteddaystoshow[0]);
  var countDays = sorteddaystoshow.length;

  $('#lotussettings-days').text(countDays + ' ' + translate('days total') + ', ' + firstDay + ' - ' + lastDay);

  var table = $('<table>');
  table.append($('<tr>').css('background','gray')
    .append($('<th>').css('width','80px').attr('align','left').append(translate('Time')))
    .append($('<th>').css('width','150px').attr('align','left').append(translate('Section')))
    .append($('<th>').attr('align','left').append(translate('Setting')))
  );
  
  sorteddaystoshow.forEach(function (day) {
    var devicestatus = _.clone(datastorage[day].devicestatus);

    // Day header
    table.append($('<tr>')
      .append($('<td>').attr('colspan','2').css('background','lightgray').append($('<b>').append(report_plugins.utils.localeDate(day))))
      .append($('<td>').append(devicestatus.length))
    );

    var descriptions = {};
    for (var t=0; t<devicestatus.length; t++) {
      table.append($('<tr>')
          .append($('<td>')
          .append(new Date(ds.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'))
          .append($('<td>').append('--'))));

      var ds = devicestatus[t];
      if (_.get(ds, 'configuration') !== undefined) {
        if (_.get(ds.configuration, 'lotussettings') !== undefined) {
          var settings = _.clone(ds.configuration.lotussettings);
          table.append($('<tr>')
              .append($('<td>')
              .append(new Date(ds.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'))
              .append($('<td>').append('got'))));
          var report = {};
          if (_get(settings, 'description') !== undefined) {
            descriptions = _close(settings.description);
          }

          if (_get(settings, 'settings') !== undefined) {
            var sets = _.clone(settings.settings);
            var row = $('<tr>').addClass('border_bottom')
              .append($('<td>').attr('rowspan', sets.length)
              .append(new Date(ds.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')));

            for (let group of sets.keys()) {
              row.append($('<td>').attr('align','left').append(group));
              var cell = ''
              sets.get(group).forEach( (value, key, map) => {
                //translated = descriptions.get(group).get(key);
                cell = cell + key + ' = ' + value + "\n";
              })
              table.append(row.append($('<td>').attr('align','left').append(cell)));
              row = $('<tr>').addClass('border_bottom');
            }
          }
        }
      }

    }
  });
  $('lotussettings-report').html(table);
};
