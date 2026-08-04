'use strict';

var consts = require('../constants');

var glucosedistribution = {
  name: 'glucosedistribution'
  , label: 'Distribution'
  , pluginType: 'report'
};

function init () {
  return glucosedistribution;
}

module.exports = init;

glucosedistribution.html = function html (client) {
  var translate = client.translate;
  var ret =
    '<b>' + translate('To see this report, press SHOW while in this view') + '</b><br>' +
    translate('Ranges') + ':' +
    '<input type="radio" name="rp_ranges" id="rp_customrange">' +
    '<label for="rp_customrange" class="translate">Custom</label>' +
    '&nbsp;' +
    '<input type="radio" name="rp_ranges" id="rp_nogravid" checked>' +
    '<label for="rp_nogravid" class="translate">Standards (clean)</label>' +
    '&nbsp;' +
    '<input type="radio" name="rp_ranges" id="rp_standardrange">' +
    '<label for="rp_standardrange" class="translate">Standards (detail)</label>' +
    '&nbsp;' +
    '<input type="radio" name="rp_ranges" id="rp_extrarange">' +
    '<label for="rp_extrarange" class="translate">Standards + extra column</label>' +
    '<h2>' +
    translate('Glucose distribution') +
    ' (' +
    '<span id="glucosedistribution-days"></span>' +
    ')' +
    '  </h2>' +
    '<table><tr>' +
    '<td style="valign:middle;" rowspan="2"><div id="glucosedistribution-overviewchart"></div></td>' +
    '<td><div id="glucosedistribution-report"></div></td>' +
    '</tr>' +
    '<tr><td align="center"><div id="glucosedistribution-preds"></div></td></tr>' +
    '<tr><td></td><td><div id="glucosedistribution-stability"></div></td></tr>' +
    '</table>' +
    '<br/>' +
    '<br/>' +
    '<br/><div id="explanation">' +
    '* ' + translate('This is only a rough estimation that can be very inaccurate and does not replace actual blood testing. The formula used is taken from:') +
    'Nathan, David M., et al. "Translating the A1C assay into estimated average glucose values." <i>Diabetes care</i> 31.8 (2008): 1473-1478.' + '<br/><br/>' +
    '** ' + translate('GMI is a different estimate of A1c, described in') +
    ' <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6196826/">"' +
    translate('Glucose Manage Indicator (GMI): A New Term for Estimating A1C from Continuous Glucose Monitoring') + '"</a>' + '<br/><br/>' +
    translate('A1c &amp; GMI calculations have been done with a weighted average BG based on a 106-day haemoglobin life.') + '<br/><br/>' +
    translate('Time in fluctuation and Time in rapid fluctuation measure the % of time during the examined period, during which the blood glucose has been changing relatively fast or rapidly. Lower values are better.') + '<br/><br/>' +
    translate('Mean Total Daily Change is a sum of the absolute value of all glucose excursions for the examined period, divided by the number of days. Lower is better.') + '<br/><br/>' +
    translate('Mean Hourly Change is a sum of the absolute value of all glucose excursions for the examined period, divided by the number of hours in the period. Lower is better.') + '<br/><br/>' +
    translate('Out of Range RMS is calculated by squaring the distance out of range for all glucose readings for the examined period, summing them, dividing by the count and taking the square root. This metric is similar to in-range percentage but weights readings far out of range higher. Lower values are better.') + '<br/><br/>' +
    translate('Glycemic Variability Index (GVI) is a measure developed by Dexcom, detailed ') +
    '<a href="https://web.archive.org/web/20160523152519/http://www.healthline.com/diabetesmine/a-new-view-of-glycemic-variability-how-long-is-your-line">' +
    translate('here') +
    '</a>.<br/><br/>' +
    translate('Glycaemia Risk Index (GRI)') +
    translate(' consolidates hypo and hyper exposure, and is outlined ') +
    '<a href="https://pubmed.ncbi.nlm.nih.gov/35348391/">' +
    translate('here') +
    '</a>' +
    ' and <a href="https://journals.sagepub.com/doi/10.1177/19322968221085273">)' + translate('here') + '</a>' +
    '.<br/><br/>' +
    translate('Symmetric Risk Profile (low and high) indices.') + '<br/>' +
    translate('SRP0 is original formula, based around TIR. SRP2 is based around TITR.') +
    '</div><br/><br/>' +
    translate('Filter by hours') + ':' +
    '<br/>' +
    '0<input type="checkbox" id="glucosedistribution-0" checked>' +
    '1<input type="checkbox" id="glucosedistribution-1" checked>' +
    '2<input type="checkbox" id="glucosedistribution-2" checked>' +
    '3<input type="checkbox" id="glucosedistribution-3" checked>' +
    '4<input type="checkbox" id="glucosedistribution-4" checked>' +
    '5<input type="checkbox" id="glucosedistribution-5" checked>' +
    '6<input type="checkbox" id="glucosedistribution-6" checked>' +
    '7<input type="checkbox" id="glucosedistribution-7" checked>' +
    '8<input type="checkbox" id="glucosedistribution-8" checked>' +
    '9<input type="checkbox" id="glucosedistribution-9" checked>' +
    '10<input type="checkbox" id="glucosedistribution-10" checked>' +
    '11<input type="checkbox" id="glucosedistribution-11" checked>' +
    '12<input type="checkbox" id="glucosedistribution-12" checked>' +
    '13<input type="checkbox" id="glucosedistribution-13" checked>' +
    '14<input type="checkbox" id="glucosedistribution-14" checked>' +
    '15<input type="checkbox" id="glucosedistribution-15" checked>' +
    '16<input type="checkbox" id="glucosedistribution-16" checked>' +
    '17<input type="checkbox" id="glucosedistribution-17" checked>' +
    '18<input type="checkbox" id="glucosedistribution-18" checked>' +
    '19<input type="checkbox" id="glucosedistribution-19" checked>' +
    '20<input type="checkbox" id="glucosedistribution-20" checked>' +
    '21<input type="checkbox" id="glucosedistribution-21" checked>' +
    '22<input type="checkbox" id="glucosedistribution-22" checked>' +
    '23<input type="checkbox" id="glucosedistribution-23" checked>';
  return ret;
};

glucosedistribution.css =
  '#glucosedistribution-overviewchart {' +
  '  width: 2.4in;' +
  '  height: 2.4in;' +
  '}' +
  '#glucosedistribution-placeholder .tdborder {' +
  '  width:80px;' +
  '  border: 1px #ccc solid;' +
  '  margin: 0;' +
  '  padding: 1px;' +
  '    text-align: center;' +
  '}' +
  '#glucosedistribution-placeholder .tdborderl {' +
  '  width:80px;' +
  '  border: 1px #ccc solid;' +
  '  margin: 0;' +
  '  padding: 1px;' +
  '    text-align: left;' +
  '}';

glucosedistribution.report = function report_glucosedistribution (datastorage, sorteddaystoshow, options) {
  var Nightscout = window.Nightscout;
  var client = Nightscout.client;
  var translate = client.translate;
  var displayUnits = Nightscout.client.settings.units;

  var haveAbove = 1;
  var haveBelow = 1;

  var ss = require('simple-statistics');

  var colors = ['#ff5454', '#f2957d', '#dfffb2', '#54c954', '#7df27d', '#76dd98', '#54dddd', '#54ffff'];
  var tablecolors = {
    SuperLow: '#ff5454'
    , Low: '#f2957d'
    , Lowish: '#dfffb2'
    , Normal: '#54c954'
    , Up: '#7df27d'
    , Elevated: '#76dd98'
    , High: '#54dddd'
    , SuperHigh: '#54ffff'
  };

  var enabledHours = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];

  var report = $('#glucosedistribution-report');
  report.empty();

  var preds = $('#glucosedistribution-preds');
  preds.empty();

  var stability = $('#glucosedistribution-stability');
  stability.empty();

  var result = {};

  var custom = 0;
  var noGravid = 0;
  var normalcols = 2;
  if ($('#rp_customrange').is(':checked', true)) {
    custom = 1;
    result['SuperLow']   = { ignore: 1 }
    result['Low']        = { ignore: 0, nextbottom: options.superLow }
    if (options.superLow < options.targetLow) {
      haveBelow = 1;
      result['Lowish']   = { ignore: 0, bottom: options.superLow, nextbottom: options.targetLow }
    } else {
      haveBelow = 0;
      result['Lowish']   = { ignore: 1 }
    }
    result['Normal']     = { ignore: 0, bottom: options.targetLow, top: options.targetHigh }
    result['Up']         = { ignore: 1 }
    if (options.superHigh > options.targetHigh) {
      result['Elevated'] = { ignore: 0, top: options.superHigh, nexttop: options.targetHigh }
      haveAbove = 1;
    } else {
      result['Elevated'] = { ignore: 1 }
      haveAbove = 0;
    }
    result['High']       = { ignore: 0, nexttop: options.superHigh }
    result['SuperHigh']  = { ignore: 1 }
    if (haveAbove + haveBelow == 0) {
      normalcols = 1;
    }
  } else {
    if ($('#rp_nogravid').is(':checked', true)) {
      noGravid = 1;
      if (displayUnits === 'mmol') {
	result['SuperLow']  = { ignore: 0, nextbottom: client.utils.scaleMgdl(54) }
	result['Low']       = { ignore: 0, bottom: client.utils.scaleMgdl(54), nextbottom: client.utils.scaleMgdl(63) }
	result['Lowish']    = { ignore: 0, bottom: client.utils.scaleMgdl(63), nextbottom: client.utils.scaleMgdl(70) }
	result['Normal']    = { ignore: 0, bottom: client.utils.scaleMgdl(70), top: client.utils.scaleMgdl(140) }
        result['Up']        = { ignore: 1 }
	result['Elevated']  = { ignore: 0, top: client.utils.scaleMgdl(180), nexttop: client.utils.scaleMgdl(140) }
	result['High']      = { ignore: 0, top: client.utils.scaleMgdl(250), nexttop: client.utils.scaleMgdl(180) }
	result['SuperHigh'] = { ignore: 0, nexttop: client.utils.scaleMgdl(250) }
      } else {
	result['SuperLow']  = { ignore: 0, nextbottom: 54 }
	result['Low']       = { ignore: 0, bottom: 54, nextbottom: 63 }
	result['Lowish']    = { ignore: 0, bottom: 63, nextbottom: 70 }
	result['Normal']    = { ignore: 0, bottom: 70, top: 140 }
        result['Up']        = { ignore: 1 }
	result['Elevated']  = { ignore: 0, top: 180, nexttop: 140 }
	result['High']      = { ignore: 0, top: 250, nexttop: 180 }
	result['SuperHigh'] = { ignore: 0, nexttop: 250 }
      }
    } else {
      normalcols = 1;
      if (displayUnits === 'mmol') {
	result['SuperLow']  = { ignore: 0, nextbottom: client.utils.scaleMgdl(54) }
	result['Low']       = { ignore: 0, bottom: client.utils.scaleMgdl(54), nextbottom: client.utils.scaleMgdl(63) }
	result['Lowish']    = { ignore: 0, bottom: client.utils.scaleMgdl(63), nextbottom: client.utils.scaleMgdl(70) }
	result['Normal']    = { ignore: 0, bottom: client.utils.scaleMgdl(70), top: client.utils.scaleMgdl(120) }
	result['Up']        = { ignore: 0, top: client.utils.scaleMgdl(140), nexttop: client.utils.scaleMgdl(120) }
	result['Elevated']  = { ignore: 0, top: client.utils.scaleMgdl(180), nexttop: client.utils.scaleMgdl(140) }
	result['High']      = { ignore: 0, top: client.utils.scaleMgdl(250), nexttop: client.utils.scaleMgdl(180) }
	result['SuperHigh'] = { ignore: 0, nexttop: client.utils.scaleMgdl(250) }
      } else {
	result['SuperLow']  = { ignore: 0, nextbottom: 54 }
	result['Low']       = { ignore: 0, bottom: 54, nextbottom: 63 }
	result['Lowish']    = { ignore: 0, bottom: 63, nextbottom: 70 }
	result['Normal']    = { ignore: 0, bottom: 70, top: 120 }
	result['Up']        = { ignore: 0, top: 140, nexttop: 120 }
	result['Elevated']  = { ignore: 0, top: 180, nexttop: 140 }
	result['High']      = { ignore: 0, top: 250, nexttop: 180 }
	result['SuperHigh'] = { ignore: 0, nexttop: 250 }
      }
    }
  }

  var normalRange = 0;
  if (displayUnits === 'mmol') {
    if (result['Normal'].bottom == client.utils.scaleMgdl(70)) {
      if (result['Normal'].top == client.utils.scaleMgdl(120)) {
      	normalRange = 1;	// TISR
      } else if (result['Normal'].top == client.utils.scaleMgdl(140)) {
      	normalRange = 2;	// TITR
      } else if (result['Normal'].top == client.utils.scaleMgdl(180)) {
      	normalRange = 3;	// TIR
      }
    }
  } else {
    if (result['Normal'].bottom == 70) {
      if (result['Normal'].top == 120) {
      	normalRange = 1;	// TISR
      } else if (result['Normal'].top == 140) {
      	normalRange = 2;	// TITR
      } else if (result['Normal'].top == 180) {
      	normalRange = 3;	// TIR
      }
    }
  }
  var upRange = 0;
  if (displayUnits === 'mmol') {
    if (result['Normal'].bottom == client.utils.scaleMgdl(70)) {
      if (result['Up'].top == client.utils.scaleMgdl(140)) {
      	upRange = 2;	// TITR
      } else if (result['Up'].top == client.utils.scaleMgdl(180)) {
      	upRange = 3;	// TIR
      }
    }
  } else {
    if (result['Normal'].bottom == 70) {
      if (result['Up'].top == 140) {
      	upRange = 2;	// TITR
      } else if (result['Up'].top == 180) {
      	upRange = 3;	// TIR
      }
    }
  }
  var elevRange = 0;
  if (displayUnits === 'mmol') {
    if (result['Normal'].bottom == client.utils.scaleMgdl(70)) {
      if (result['Elevated'].top == client.utils.scaleMgdl(140)) {
      	elevRange = 2;	// TITR
      } else if (result['Elevated'].top == client.utils.scaleMgdl(180)) {
      	elevRange = 3;	// TIR
      }
    }
  } else {
    if (result['Normal'].bottom == 70) {
      if (result['Elevated'].top == 140) {
      	elevRange = 2;	// TITR
      } else if (result['Elevated'].top == 180) {
      	elevRange = 3;	// TIR
      }
    }
  }
  var rangecols = 4;
  var extra = 0;
  if ($('#rp_extrarange').is(':checked', true)) {
    extra = 1;
    rangecols = 5;
  }
  if (!!noGravid) {
    rangecols = 3;
  }
  if (!!custom) {
    if (!!haveAbove) {
      rangecols = 3
    } else if (!!haveBelow) {
      rangecols = 2
    } else {
      rangecols = 1
    }
  }

  var stats = [];
  var table = $('<table class="centeraligned">');
  var thead = $('<tr/>');
  $('<th>' + translate('Range') + '</th>').appendTo(thead);
  $('<th colspan="' + rangecols + '">' + translate('% of Readings') + '</th>').appendTo(thead);
  $('<th>' + translate('# of Readings') + '</th>').appendTo(thead);
  $('<th>' + translate('Average') + '</th>').appendTo(thead);
  if (!noGravid) {
    $('<th>' + translate('Median') + '</th>').appendTo(thead);
  }
  $('<th>' + translate('Standard Deviation') + ' (' + translate('CV') + ')</th>').appendTo(thead);
  thead.appendTo(table);

  var predtable = $('<table class="centeraligned">');
  thead = $('<tr/>');
  $('<th></th>').appendTo(thead);
  $('<th align="left">' + translate('eHbA1c') + '*</th>').appendTo(thead);
  $('<th align="left">' + translate('GMI') + '**</th>').appendTo(thead);
  thead.appendTo(predtable);

  var data = datastorage.allstatsrecords;
  var days = datastorage.alldays;

  var reportPlugins = Nightscout.report_plugins;
  var firstDay = reportPlugins.utils.localeDate(sorteddaystoshow[sorteddaystoshow.length - 1]);
  var lastDay = reportPlugins.utils.localeDate(sorteddaystoshow[0]);

  $('#glucosedistribution-days').text(days + ' ' + translate('days total') + ', ' + firstDay + ' - ' + lastDay);

  for (var i = 0; i < 24; i++) {
    $('#glucosedistribution-' + i).unbind('click').click(onClick);
    enabledHours[i] = $('#glucosedistribution-' + i).is(':checked');
  }

  // Filter data for noise
  // data cleaning pass 0 - remove duplicates and non-sgv entries, sort
  var seen = [];
  data = data.filter(function(item) {
    if (!item.sgv || !item.bgValue || !item.displayTime || item.bgValue < 39) {
      console.log(item);
      return false;
    }
    return seen.includes(item.displayTime) ? false : (seen[item.displayTime] = true);
  });

  data.sort(function(a, b) {
    return a.displayTime.getTime() - b.displayTime.getTime();
  });

  if (data.length === 0) {
    $('#glucosedistribution-days').text(translate('Result is empty'));
    return;
  }

  var glucose_data = []; // [data[0]];

  // data cleaning pass 1 - add interpolated missing points
  for (i = 0; i <= data.length - 2; i++) {
    var entry = data[i];
    var nextEntry = data[i + 1];

    var timeDelta = nextEntry.displayTime.getTime() - entry.displayTime.getTime();

    if (timeDelta < 9 * 60 * 1000 || timeDelta > 25 * 60 * 1000) {
      glucose_data.push(entry);
      continue;
    }

    var missingRecords = Math.floor(timeDelta / (5 * 60 * 1000/*990*/)) - 1;

    var timePatch = Math.floor(timeDelta / (missingRecords + 1));
    var bgDelta = (nextEntry.bgValue - entry.bgValue) / (missingRecords + 1);

    glucose_data.push(entry);

    for (var j = 1; j <= missingRecords; j++) {
      var bg = Math.floor(entry.bgValue + bgDelta * j);
      var t = new Date(entry.displayTime.getTime() + j * timePatch);
      var newEntry = {
        sgv: displayUnits === 'mmol' ? bg / consts.MMOL_TO_MGDL : bg
        , bgValue: bg
        , displayTime: t
      };
      glucose_data.push(newEntry);
    }
  }
  // Need to add the last record, after interpolating between points
  glucose_data.push(data[data.length - 1]);

  // data cleaning pass 2 - replace single jumpy measures with interpolated values
  var glucose_data2 = [glucose_data[0]];
  var prevEntry = glucose_data[0];

  const maxGap = (5 * 60 * 1000) + 10000;

  for (i = 1; i <= glucose_data.length - 2; i++) {
    let entry = glucose_data[i];
    let nextEntry = glucose_data[i + 1];

    let timeDelta = nextEntry.displayTime.getTime() - entry.displayTime.getTime();
    let timeDelta2 = entry.displayTime.getTime() - prevEntry.displayTime.getTime();

    if (timeDelta > maxGap || timeDelta2 > maxGap) {
      glucose_data2.push(entry);
      prevEntry = entry;
      continue;
    }

    var delta1 = entry.bgValue - prevEntry.bgValue;
    var delta2 = nextEntry.bgValue - entry.bgValue;

    if (delta1 <= 8 && delta2 <= 8) {
      glucose_data2.push(entry);
      prevEntry = entry;
      continue;
    }

    if ((delta1 > 0 && delta2 < 0) || (delta1 < 0 && delta2 > 0)) {
      const d = (nextEntry.bgValue - prevEntry.bgValue) / 2;
      const interpolatedValue = prevEntry.bgValue + d;

      let newEntry = {
        sgv: displayUnits === 'mmol' ? interpolatedValue / consts.MMOL_TO_MGDL : interpolatedValue
        , bgValue: interpolatedValue
        , displayTime: entry.displayTime
      };
      glucose_data2.push(newEntry);
      prevEntry = newEntry;
      continue;
    }

    glucose_data2.push(entry);
    prevEntry = entry;
  }
  // Need to add the last record, after interpolating between points
  glucose_data2.push(glucose_data[glucose_data.length - 1]);

  glucose_data = data = glucose_data2.filter(function(r) {
    return enabledHours[new Date(r.displayTime).getHours()]
  });

  glucose_data.sort(function(a, b) {
    return a.displayTime.getTime() - b.displayTime.getTime();
  });

  var timeTotal = 0;
  var mtotal = 0;
  var mdivisor = 0.0000001;
  var wtotal = 0;
  var wdivisor = 0.0001;
  let log106 = Math.log(106);
  var lastEntryTime = glucose_data[glucose_data.length - 1].displayTime.getTime();
  for (i = 1; i <= glucose_data.length - 2; i++) {
    let entry = glucose_data[i];
    let nextEntry = glucose_data[i + 1];
    let timeDelta = nextEntry.displayTime.getTime() - entry.displayTime.getTime();
    if (timeDelta < maxGap) {
      timeTotal += timeDelta;
    }

    let days = (lastEntryTime - entry.displayTime.getTime()) / (1000.0 * 60 * 60 * 24);

    // 1.0 for most recent. 0.0 for 106 days ago.

    // Flat
    //let w = 1.0;

    // Linear
    // let w = 1.0 - days/106.0;

    // Log
    let w = 1.0;
    if (days > 0) {
      w = 1.0 - Math.log(days)/log106;
    }

    if (w > 0) {
      wtotal += w * entry.bgValue;
      wdivisor += w;
    }

    var mg = entry.bgValue;
    if (settings.units === 'mmol') {
	    mg = units.mmolToMgdl(mg);
    }

    let m = 2.0 / (1 + mg/123.0);
    mtotal += m * mg;
    mdivisor += m;
  }
  var weighted = wtotal / wdivisor;
  let mf = mtotal / mdivisor;
  var scaled = mf / (2 - mf / 123.0);
  if (displayUnits === 'mmol') {
  	scaled = units.mgdlToMMOL(scaled);
  }

  var daysTotal = timeTotal / (1000 * 60 * 60 * 24);

  ['SuperLow', 'Low', 'Lowish', 'Normal', 'Up', 'Elevated', 'High', 'SuperHigh'].forEach(function(range) {
    var r = result[range];
    r.rangeRecords = glucose_data.filter(function(q) {
      if (!!r.ignore) {
        return 0;
      }

      if (q.sgv <= 0) {
        return 0;
      }

      if (typeof r.nexttop != 'undefined') {
	var aboveNext = q.sgv > r.nexttop;
        if (typeof r.top != 'undefined') {
          return aboveNext && q.sgv <= r.top;			// elevated
        } else {
          return aboveNext;					// extreme high
	}
      }

      if (typeof r.nextbottom != 'undefined') {
	var belowNext = q.sgv < r.nextbottom;
        if (typeof r.bottom != 'undefined') {
          return belowNext && q.sgv >= r.bottom;		// lowish
	} else {
          return belowNext;					// extreme low
	}
      }

      if (typeof r.top != 'undefined' && typeof r.bottom != 'undefined') {
        return q.sgv >= r.bottom && q.sgv <= r.top;		// middle range
      }

      return 0;
    });
    stats.push(r.rangeRecords.length);
    r.rangeRecords.sort(function(a, b) {
      return a.sgv - b.sgv;
    });
    r.localBgs = r.rangeRecords.map(function(r) {
      return r.sgv;
    }).filter(function(bg) {
      return !!bg;
    });
    r.midpoint = Math.floor(r.rangeRecords.length / 2);
    r.readingspct = Number((100 * r.rangeRecords.length / data.length).toFixed(1));
    if (r.rangeRecords.length > 0) {
      r.mean = Math.floor(10 * ss.mean(r.localBgs)) / 10;
      r.median = r.rangeRecords[r.midpoint].sgv;
      r.stddev = Math.floor(ss.standard_deviation(r.localBgs) * 10) / 10;
    }
  });

  // make sure we have total 100%
  result.Normal.readingspct = (100 - result.Low.readingspct - result.Lowish.readingspct - result.Up.readingspct - result.Elevated.readingspct - result.High.readingspct - result.SuperLow.readingspct - result.SuperHigh.readingspct);

  var tar2 = result.SuperHigh.readingspct + result.High.readingspct;
  var tar2count = !result.SuperHigh.ignore + !result.High.ignore;

  var tar3 = result.Elevated.readingspct + tar2;
  var tar3count = !result.Elevated.ignore + tar2count;
  var preg3 = result.High.readingspct + result.Elevated.readingspct;
  var preg3count = !noGravid * (!result.Elevated.ignore + !result.High.ignore);

  var tar4 = result.Up.readingspct + tar3;
  var tar4count = !result.Up.ignore + tar3count;

  var preg1 = result.Normal.readingspct + result.Lowish.readingspct;
  var preg2 = result.Up.readingspct + preg1;

  var titr = result.Normal.readingspct + result.Up.readingspct;
  var titrcount = !result.Normal.ignore + !result.Up.ignore;
  var tir = titr + result.Elevated.readingspct;
  var tircount = titrcount + !result.Elevated.ignore;

  var tbr1 = result.Low.readingspct + result.SuperLow.readingspct;
  var tbr1count = !result.Low.ignore + !result.SuperLow.ignore;

  var tbr2 = tbr1 + result.Lowish.readingspct;
  var tbr2count = !result.Lowish.ignore + tbr1count;

  var tbr3 = result.Low.readingspct + result.Lowish.readingspct;
  var tbr3count = !result.Lowish.ignore + !result.Low.ignore;

  var hypoComponent = result.SuperLow.readingspct + 0.8 * (result.Low.readingspct + result.Lowish.readingspct);
  var hyperComponent = result.SuperHigh.readingspct + 0.5 * result.High.readingspct;
  var gri = 3.0 * hypoComponent + 1.6 * hyperComponent;
  if (gri > 100.0) {
    gri = 100.0;
  }

  var topline = 1;

  ['SuperHigh', 'High', 'Elevated', 'Up', 'Normal', 'Lowish', 'Low', 'SuperLow'].forEach(function(range) {
    var tr = $('<tr>');
    var r = result[range];

    var first = '&nbsp;';
    if (typeof r.top != 'undefined') {
      first = r.top;
    }
    var second = '&nbsp;';
    if (typeof r.bottom != 'undefined') {
      second = r.bottom;
    }
    var rangelabel = '';
    if (!!topline) {
      rangelabel = '</font><br/><strong>' + translate('High') + '</strong><font size="-1">';
    }
    if (range == 'Normal') {
      if (!!custom) {
        rangelabel = '</font><br/><strong>' + translate('In Range') + '</strong><font size="-1">';
      } else {
        rangelabel = '<br/>';
      }
    }
    if (range == 'SuperLow' || (range == 'Low' && !!result['SuperLow'].ignore)) {
      rangelabel = '</font><br/><strong>' + translate('Low') + '</strong><font size="-1">';
    }
    $('<td class="tdborder" style="background-color:' + tablecolors[range] + '"><font size="-1">' + first + rangelabel + '<br/>' + second + '</font></td>').appendTo(tr);

    if (range == 'SuperHigh' || range == 'High') {
      $('<td class="tdborder">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
    }

    if (!!topline) {
      if (tar3count > 1) {
        $('<td class="tdborder" rowspan="' + tar3count + '" colspan="' + (1-custom) + '"><br/>' + tar3.toFixed(1) + '%</td>').appendTo(tr);
      } else if (!!haveBelow && !noGravid && normalcols == 1) {
        $('<td></td>').appendTo(tr);
      }
      if (tar2count > 1) {
        $('<td class="tdborder" rowspan="' + tar2count + '"><br/>' + tar2.toFixed(1) + '%</td>').appendTo(tr);
      } else if (!custom) {
        $('<td></td>').appendTo(tr);
      }
      if ((!!haveAbove || !!haveBelow) && !noGravid) {
        $('<td></td>').appendTo(tr);
      }
      if (!!extra) {
        if (tar4count > 1) {
          $('<td class="tdborder" rowspan="' + tar4count + '">' + tar4.toFixed(1) + '%</td>').appendTo(tr);
        } else {
          $('<td></td>').appendTo(tr);
        }
      }
    }

    if (range == 'High' && !custom && !noGravid && preg3count > 0) {
      $('<td class="tdborder" rowspan="' + preg3count + '">' + preg3.toFixed(1) + '%</td>').appendTo(tr);
    }

    if (range == 'Elevated') {
      $('<td class="tdborder">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
      if (tircount > 1) {
	if (elevRange == 2) {
	  $('<td class="tdborder" style="background-color:' + tablecolors['Elevated'] + '" rowspan="' + tircount + '">' + translate('TITR') + '<br/><strong>' + tir.toFixed(1) + '%</strong></td>').appendTo(tr);
	} else if (elevRange == 3) {
	  $('<td class="tdborder" style="background-color:' + tablecolors['Elevated'] + '" rowspan="' + tircount + '">' + translate('TIR') + '<br/><strong>' + tir.toFixed(1) + '%</strong></td>').appendTo(tr);
	} else {
	  $('<td class="tdborder" rowspan="' + tircount + '">' + tir.toFixed(1) + '%</td>').appendTo(tr);
	}
      } else {
        $('<td></td>').appendTo(tr);
      }
    } 

    if (range == 'Up') {
      $('<td class="tdborder">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
      if (titrcount > 1) {
	if (upRange == 2) {
	  $('<td class="tdborder" style="background-color:' + tablecolors['Up'] + '" rowspan="' + titrcount + '">' + translate('TITR') + '<br/><strong>' + titr.toFixed(1) + '%</strong></td>').appendTo(tr);
	} else if (upRange == 3) {
	  $('<td class="tdborder" style="background-color:' + tablecolors['Up'] + '" rowspan="' + titrcount + '">' + translate('TIR') + '<br/><strong>' + titr.toFixed(1) + '%</strong></td>').appendTo(tr);
	} else {
	  $('<td class="tdborder" rowspan="' + titrcount + '">' + titr.toFixed(1) + '%</td>').appendTo(tr);
      	}
      } else {
        $('<td></td>').appendTo(tr);
      }
      $('<td class="tdborder" style="background-color:' + tablecolors['Lowish'] + '" rowspan="3">' + translate('TING') + '<br/><strong>' + preg2.toFixed(1) + '%</strong></td>').appendTo(tr);
    } 

    if (range == 'Normal') {
      if (titrcount > 1) {
        $('<td class="tdborder" colspan="' + normalcols + '">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
      } else if (normalRange == 2) {
        $('<td class="tdborder" style="background-color:' + tablecolors['Normal'] + '" colspan="' + normalcols + '">' + translate('TITR') + '<br/><strong>' + r.readingspct.toFixed(1) + '%</strong></td>').appendTo(tr);
      } else if (normalRange == 3) {
        $('<td class="tdborder" style="background-color:' + tablecolors['Normal'] + '" colspan="' + normalcols + '">' + translate('TIR') + '<br/><strong>' + r.readingspct.toFixed(1) + '%</strong></td>').appendTo(tr);
      } else {
        $('<td class="tdborder" colspan="' + normalcols + '"><strong>' + r.readingspct.toFixed(1) + '%</strong></td>').appendTo(tr);
      }
      if (!!extra) {
        $('<td class="tdborder" rowspan="2">' + preg1.toFixed(1) + '%</td>').appendTo(tr);
      }
      if (!!custom) {
        if ((!!haveAbove || !!haveBelow) && normalcols == 1) {
          $('<td></td>').appendTo(tr);
        }
      } else {
	if (!!noGravid && normalcols == 1) {
	  $('<td></td>').appendTo(tr);
	}
      }
    }

    if (range == 'Lowish') {
      $('<td class="tdborder">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
      if (tbr2count > 1) {
        $('<td class="tdborder" rowspan="' + tbr2count + '"><br/><strong>' + tbr2.toFixed(1) + '%</strong></td>').appendTo(tr);
      } else if (!!haveAbove) {
        $('<td></td>').appendTo(tr);
      }
      if (!custom && tbr3count > 1) {
	if (!noGravid) {
          $('<td class="tdborder" rowspan="' + tbr3count + '">' + tbr3.toFixed(1) + '%</td>').appendTo(tr);
	} else {
          $('<td></td>').appendTo(tr);
	}
      } else if (!!haveAbove || !!noGravid) {
        $('<td></td>').appendTo(tr);
      }
    }

    if (range == 'Low') {
      $('<td class="tdborder">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
      if (tbr1count > 1) {
        $('<td class="tdborder" colspan="' + (1+extra) + '" rowspan="' + tbr1count + '"><br/><strong>' + tbr1.toFixed(1) + '%</strong></td>').appendTo(tr);
      } else if (!!haveAbove) {
        $('<td colspan="' + (2*haveAbove-haveBelow) + '"></td>').appendTo(tr);
      }
      //if (!extra && !custom) {
        //$('<td rowspan="2"></td>').appendTo(tr);
      //}
    }
    if (range == 'SuperLow') {
      $('<td class="tdborder">' + r.readingspct.toFixed(1) + '%</td>').appendTo(tr);
      if (!custom && !noGravid) {
        $('<td></td>').appendTo(tr);
      } 
    } 

    $('<td class="tdborder">' + r.rangeRecords.length + '</td>').appendTo(tr);
    if (r.rangeRecords.length > 0) {
      $('<td class="tdborder">' + (Math.round(10 * r.mean) / 10).toFixed(1) + '</td>').appendTo(tr);
      if (!noGravid) {
	$('<td class="tdborder">' + (Math.round(10 * r.median) / 10).toFixed(1) + '</td>').appendTo(tr);
      }
      $('<td class="tdborder">' + (Math.round(10 * r.stddev) / 10).toFixed(1) + '</td>').appendTo(tr);
    } else {
      $('<td class="tdborder">n/a</td>').appendTo(tr);
      if (!noGravid) {
	$('<td class="tdborder">n/a</td>').appendTo(tr);
      }
      $('<td class="tdborder">n/a</td>').appendTo(tr);
    }

    if (!!r.ignore) {
      ; // Hide these as they're obviously not wanted.
    } else {
      table.append(tr);
      topline = 0;
    }
  });

  var localBgs = glucose_data.map(function(r) {
    return r.sgv;
  }).filter(function(bg) {
    return !!bg;
  });
  var mgDlBgs = glucose_data.map(function(r) {
    return r.bgValue;
  }).filter(function(bg) {
    return !!bg;
  });

  var tr = $('<tr>');
  $('<td class="tdborder"><strong>' + translate('Overall') + ': </strong></td>').appendTo(tr);
  $('<td colspan="' + rangecols + '"> </td>').appendTo(tr);
  var per_day = (glucose_data.length * 1.0 / days).toFixed(0);
  $('<td class="tdborder">' + glucose_data.length + ' (' + per_day + translate('/day') + ')</td>').appendTo(tr);

  if (glucose_data.length > 0) {
    $('<td class="tdborder">' + (Math.round(10 * ss.mean(localBgs)) / 10).toFixed(1) + '</td>').appendTo(tr);
    if (!noGravid) {
      $('<td class="tdborder">' + (Math.round(10 * ss.quantile(localBgs, 0.5)) / 10).toFixed(1) + '</td>').appendTo(tr);
    }
    $('<td class="tdborder">' + (Math.round(ss.standard_deviation(localBgs) * 10) / 10).toFixed(1) + '<br/>(<strong>' + (Math.round(100*(ss.standard_deviation(localBgs)/ss.mean(localBgs)))).toFixed(0) + '%</strong>)</td>').appendTo(tr);
  } else {
    $('<td class="tdborder">n/a</td>').appendTo(tr);
    if (!noGravid) {
      $('<td class="tdborder">n/a</td>').appendTo(tr);
    }
    $('<td class="tdborder">n/a</td>').appendTo(tr);
  }
  table.append(tr);
  report.append(table);

  if (glucose_data.length > 0) {
    let a1c_weighted = (weighted + 46.7) / 28.7;
    var a1cwd = (Math.round(10 * a1c_weighted) / 10).toFixed(1);
    if (extra) {
	    a1cwd = (Math.round(100 * a1c_weighted) / 100).toFixed(2);
    }
    let a1cwi = Math.round((a1c_weighted - 2.15) * 10.929);
    let gmiwf = weighted * 0.02392 + 3.31;
    let gmiw = (Math.round(10*gmiwf)/10).toFixed(1);
    let gmiwi = Math.round((gmiwf * 10.929) - 23.5);

    let a1c_mean = (ss.mean(mgDlBgs) + 46.7) / 28.7;
    var a1cmd = (Math.round(10 * a1c_mean) / 10).toFixed(1);
    if (extra) {
	    a1cmd = (Math.round(100 * a1c_mean) / 100).toFixed(2);
    }
    let a1cmi = Math.round((a1c_mean - 2.15) * 10.929);
    let gmimf = ss.mean(mgDlBgs) * 0.02392 + 3.31;
    let gmim = (Math.round(10*gmimf)/10).toFixed(1);
    let gmimi = Math.round((gmimf * 10.929) - 23.5);

    if (!extra || (a1cmd === a1cwd && a1cmi === a1cwi && gmim == gmiw)) {
      var predtr = $('<tr>');
      $('<td></td>').appendTo(predtr);
      $('<td class="tdborderl"> <strong>' + a1cmd + '<sub>&nbsp;%</sub> ' + a1cmi + '<sub>&nbsp;mmol/mol</sub></strong></td>').appendTo(predtr);
      $('<td class="tdborderl"> ' + gmim + '<sub>&nbsp;%</sub> ' + gmimi + '<sub>&nbsp;mmol/mol</sub></td>').appendTo(predtr);
      predtable.append(predtr);
      var predtr = $('<tr>');
      $('<td></td>').appendTo(predtr);
      $('<td class="tdborderl">Scaled&nbsp;glucose:</td>').appendTo(predtr);
      $('<td class="tdborderl"> ' + scaled + '</td>').appendTo(predtr);
      predtable.append(predtr);
      preds.append(predtable);
    } else {
      var predtr = $('<tr>');
      $('<td>' + translate('Mean') + '</td>').appendTo(predtr);
      $('<td class="tdborderl"> ' + a1cmd + '<sub>&nbsp;%</sub> ' + a1cmi + '<sub>&nbsp;mmol/mol</sub></td>').appendTo(predtr);
      $('<td class="tdborderl"> ' + gmim + '<sub>&nbsp;%</sub> ' + gmimi + '<sub>&nbsp;mmol/mol</sub></td>').appendTo(predtr);
      predtable.append(predtr);
      //preds.append(predtable);
  
      predtr = $('<tr>');
      $('<td>' + translate('Weighted') + '</td>').appendTo(predtr);
      $('<td class="tdborderl"><strong>' + a1cwd + '<sub>&nbsp;%</sub> ' + a1cwi + '<sub>&nbsp;mmol/mol</sub></strong></td>').appendTo(predtr);
      $('<td class="tdborderl">' + gmiw + '<sub>&nbsp;%</sub> ' + gmiwi + '<sub>&nbsp;mmol/mol</sub></td>').appendTo(predtr);
      predtable.append(predtr);
      var predtr = $('<tr>');
      $('<td></td>').appendTo(predtr);
      $('<td class="tdborderl">Scaled&nbsp;glucose:</td>').appendTo(predtr);
      $('<td class="tdborderl"> ' + scaled + '</td>').appendTo(predtr);
      predtable.append(predtr);
      preds.append(predtable);
    }
  } else {
    $('<td></td>').appendTo(predtr);
    $('<td class="tdborder">n/a</td>').appendTo(predtr);
    $('<td class="tdborder">n/a</td>').appendTo(predtr);
    predtable.append(predtr);
      var predtr = $('<tr>');
      $('<td></td>').appendTo(predtr);
      $('<td class="tdborderl">Scaled&nbsp;glucose:</td>').appendTo(predtr);
      $('<td class="tdborderl"> ' + scaled + '</td>').appendTo(predtr);
      predtable.append(predtr);
    preds.append(predtable);
  }

  // Stability
  var t1 = 6;
  var t2 = 11;
  var t1count = 0;
  var t2count = 0;

  var events = 0;

  var GVITotal = 0;
  var GVIIdeal = 0;
  var GVIIdeal_Time = 0;

  var RMSTotal = 0;

  var usedRecords = 0;
  var glucoseTotal = 0;
  var deltaTotal = 0;
  var srp0_hgbi_total = 0;
  var srp0_lgbi_total = 0;
  var srp2_hgbi_total = 0;
  var srp2_lgbi_total = 0;

  for (i = 0; i <= glucose_data.length - 2; i++) {
    const entry = glucose_data[i];
    const nextEntry = glucose_data[i + 1];
    const timeDelta = nextEntry.displayTime.getTime() - entry.displayTime.getTime();

    // Use maxGap constant
    if (timeDelta == 0 || timeDelta > maxGap) { // 6 * 60 * 1000) {
      // console.log("Record skipped");
      continue;
    }

    usedRecords += 1;
    events += 1;

    var delta = Math.abs(nextEntry.bgValue - entry.bgValue);
    deltaTotal += delta;

    // constants for mmol/L
    var f = ((Math.log(entry.bgValue/consts.MMOL_TO_MGDL) ** 1.032910197) - 1.870756707) * 1.77402733;
    var r = 10 * (f ** 2);
    if (f > 0) {
    	srp0_hgbi_total += r;
    }
    if (f < 0) {
    	srp0_lgbi_total += r;
    }

    // constants for mmol/L
    f = ((Math.log(entry.bgValue/consts.MMOL_TO_MGDL) ** 0.912224) - 1.628614724) * 2.092195673;
    r = 10 * (f ** 2);
    if (f > 0) {
    	srp2_hgbi_total += r;
    }
    if (f < 0) {
    	srp2_lgbi_total += r;
    }

    if (delta > 0) { // avoid divide by 0 error
      // Are we rising at faster than 5mg/DL/5minutes
      if ((delta / timeDelta) >= (t1 / (1000 * 60 * 5))) {
        t1count += 1;
      }
      // Are we rising at faster than 10mg/DL/5minutes
      if ((delta / timeDelta) >= (t2 / (1000 * 60 * 5))) {
        t2count += 1;
      }
    }

    // Calculate the distance travelled for this time step
    GVITotal += Math.sqrt(Math.pow(timeDelta / (1000 * 60), 2) + Math.pow(delta, 2));

    // Keep track of the number of minutes in this timestep
    GVIIdeal_Time += timeDelta / (1000 * 60);
    glucoseTotal += entry.bgValue;

    if (entry.bgValue < result['Normal'].bottom) {
      RMSTotal += Math.pow(result['Normal'].bottom - entry.bgValue, 2);
    }
    if (entry.bgValue > result['Normal'].top) {
      RMSTotal += Math.pow(entry.bgValue - result['Normal'].top, 2);
    }
  }


  // Difference between first and last reading
  var GVIDelta = Math.floor(glucose_data[0].bgValue - glucose_data[glucose_data.length - 1].bgValue);

  // Delta for total time considered against total period rise
  GVIIdeal = Math.sqrt(Math.pow(GVIIdeal_Time, 2) + Math.pow(GVIDelta, 2));

  var GVI = Math.round(GVITotal / GVIIdeal * 100) / 100;
  console.log('GVI', GVI, 'GVIIdeal', GVIIdeal, 'GVITotal', GVITotal, 'GVIIdeal_Time', GVIIdeal_Time);

  var glucoseMean = Math.floor(glucoseTotal / usedRecords);
  var tirMultiplier = result.Normal.readingspct / 100.0;
  var PGS = Math.round(GVI * glucoseMean * (1 - tirMultiplier) * 100) / 100;
  console.log('glucoseMean', glucoseMean, 'tirMultiplier', tirMultiplier, 'PGS', PGS);

  var TDC = deltaTotal / daysTotal;
  var TDCHourly = TDC / 24.0;

  var RMS = Math.sqrt(RMSTotal / events);

  //  console.log('TADC',TDC,'days',days);

  var timeInT1 = Math.round(100 * t1count / events).toFixed(1);
  var timeInT2 = Math.round(100 * t2count / events).toFixed(1);

  var unitString = ' mg/dL';
  if (displayUnits == 'mmol') {
    TDC = TDC / consts.MMOL_TO_MGDL;
    TDCHourly = TDCHourly / consts.MMOL_TO_MGDL;
    unitString = ' mmol/L';

    RMS = Math.sqrt(RMSTotal / events) / consts.MMOL_TO_MGDL;
  }

  TDC = Math.round(TDC * 100) / 100;
  TDCHourly = Math.round(TDCHourly * 100) / 100;

  var stabilitytable = $('<table style="width: 100%;">');

  var t1exp = '>5 mg/dL/5m';
  var t2exp = '>10 mg/dL/5m';
  if (displayUnits == 'mmol') {
    t1exp = '>0.27 mmol/L/5m';
    t2exp = '>0.55 mmol/L/5m';
  }

  if (!noGravid) {
    $('<tr><th>' + translate('Mean Total Daily Change') + '</th><th>' + translate('Time in fluctuation') + '<br>(' + t1exp + ')</th><th>' + translate('Time in rapid fluctuation') + '<br>(' + t2exp + ')</th></tr>').appendTo(stabilitytable);
    $('<tr><td class="tdborder">' + TDC + unitString + '</td><td class="tdborder">' + timeInT1 + '%</td><td class="tdborder">' + timeInT2 + '%</td></tr>').appendTo(stabilitytable);

    $('<tr><th>' + translate('Mean Hourly Change') + '</th><th>' + translate('Out of Range RMS') + '</th><th>' + translate('GVI') + '</th></tr>').appendTo(stabilitytable);
    $('<tr><td class="tdborder">' + TDCHourly + unitString + '</td><td class="tdborder">' + Math.round(RMS * 100) / 100 + unitString + '</td><td class="tdborder">' + GVI + '</td></tr>').appendTo(stabilitytable);
  }

  if (!custom) {
    $('<tr><th>' + translate('Glycaemia Risk Index (GRI)') + '</th><th>' + translate('Hypo Component') + '</th><th>' + translate('Hyper Component') + '</th></tr>').appendTo(stabilitytable);
    $('<tr><td class="tdborder">' + Math.round(gri) + '</td><td class="tdborder">' + (Math.round(10 * hypoComponent) / 10).toFixed(1) + '%</td><td class="tdborder">' + (Math.round(10*hyperComponent)/10).toFixed(1) + '%</td></tr>').appendTo(stabilitytable);

  }
  if (extra) {
    var hgbi = srp0_hgbi_total / events;
    var lgbi = srp0_lgbi_total / events;
    $('<tr><th>' + translate('SRP0 LGBI') + '</th><th>' + translate('SRP0 HGBI') + '</th><th>' + '</th></tr>').appendTo(stabilitytable);
    $('<tr><td class="tdborder">' + (Math.round(100 * lgbi) / 100).toFixed(1) + '</td><td class="tdborder">' + (Math.round(100 * hgbi) / 100).toFixed(1) + '</td><td>' + '</td></tr>').appendTo(stabilitytable);

    hgbi = srp2_hgbi_total / events;
    lgbi = srp2_lgbi_total / events;
    $('<tr><th>' + translate('SRP2 LGBI') + '</th><th>' + translate('SRP2 HGBI') + '</th><th>' + '</th></tr>').appendTo(stabilitytable);
    $('<tr><td class="tdborder">' + (Math.round(100 * lgbi) / 100).toFixed(1) + '</td><td class="tdborder">' + (Math.round(100 * hgbi) / 100).toFixed(1) + '</td><td>' + '</td></tr>').appendTo(stabilitytable);
  }

  stabilitytable.appendTo(stability);

  setTimeout(function() {
    $.plot(
      '#glucosedistribution-overviewchart'
      , stats, {
        series: {
          pie: {
            show: true
          }
        }
        , colors: colors
      }
    );
  });

  function onClick () {
    report_glucosedistribution(datastorage, sorteddaystoshow, options);
  }
};
