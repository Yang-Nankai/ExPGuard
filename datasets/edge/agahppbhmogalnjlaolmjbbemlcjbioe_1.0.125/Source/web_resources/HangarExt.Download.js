var HangarExt = HangarExt || {};

HangarExt._callbacks = HangarExt._callbacks || {};
HangarExt.$download = null;

HangarExt.GetShipList = function()
{
  var ships = [];
  for (var i = 0; i < HangarExt._exportShipList.length; i++) {
    var entry = HangarExt._exportShipList[i];
    var ship = {
      manufacturer: {
        code: entry.manufacturer.code,
        name: entry.manufacturer.name,
        shortName: entry.manufacturer.shortName
      },
      code: (entry.manufacturer.code + '_' + entry.name.replace(' w/C8X', '')).replace(/[^a-z0-9]/gi, '_').replace(/__+/gi, '_'),
      matrix: entry.name,
      focus: entry.focus,
      status: entry.status,
      name: entry.export || entry.name
    };
    if (entry.childs) {
      ship.includedShips = entry.childs.slice();
    }
    else if (entry.parent) {
      ship.includedWith = entry.parent;
    }
    ships.push(ship);
  }
  return ships.sort(function(a, b) {
    if (a.manufacturer_code == b.manufacturer_code) {
      return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
    }
    return a.manufacturer_code < b.manufacturer_code ? -1 : 1;
  });
}

HangarExt.GetHangarCSV = function()
{
  var buffer = "Pledge ID,Pledge Date,Pledge Cost,Meltable,Giftable,Pledge Name,Pledge Content,Content Type\n";
  var csvValue = function(value) {
    if (value === undefined || value === null) {
      value = '';
    }
    value = String(value)
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/"/g, "'");

    return '"' + value + '"';
  };
  var csvLine = function(pledgeId, pledgeDate, pledgeCost, meltable, giftable, pledgeName, pledgeContent, pledgeType) {
    return [
      pledgeId,
      pledgeDate,
      pledgeCost,
      meltable,
      giftable,
      pledgeName,
      pledgeContent,
      pledgeType
    ].join(',') + '\n';
  };
  $.each(HangarExt._inventory, function(_, item) {
    var pledgeId = csvValue(item.pledge_id);
    var pledgeDate = csvValue($('.date-col:first', item).text().replace(/created:\s+/gi, ''));
    var pledgeCost = csvValue(item.pledge_cost);
    var pledgeName = (item.filters.is_upgrade || item.filters.is_coupon) ? csvValue(item.displayName) : csvValue(item.pledgeName);
    var meltable = item.filters.is_meltable ? '"yes"' : '"no"';
    var giftable = item.filters.is_giftable ? '"yes"' : '"no"';
    if (item.couponCode) {
      buffer += csvLine(pledgeId, pledgeDate, pledgeCost, meltable, giftable, pledgeName, csvValue('Coupon Code: ' + item.couponCode), '"Coupon"');
      return;
    }
    $('.with-images > .item', item).each(function () {
      var title = $.trim($(this).children('.text').children('.title').text()).replace(/\s+/g, ' ');
      if (!title) {
        return;
      }
      var kind = $.trim($(this).children('.text').children('.kind').text()).replace(/\s*\(.*$/, '');
      buffer += csvLine(pledgeId, pledgeDate, pledgeCost, meltable, giftable, pledgeName, csvValue(title), csvValue(kind));
      $(this).children('.item.included-ship').each(function () {
        var includedTitle = $.trim($(this).children('.text').children('.title').text()).replace(/\s+/g, ' ');
        if (!includedTitle) {
          return;
        }
        var includedKind = $.trim($(this).children('.text').children('.kind').text()).replace(/\s*\(.*$/, '');
        buffer += csvLine(pledgeId, pledgeDate, pledgeCost, meltable, giftable, pledgeName, csvValue(includedTitle), csvValue(includedKind));
      });
    });
    $('.without-images > .item', item).each(function () {
      var title = $.trim($(this).find('.title').text()).replace(/\s+/g, ' ');
      if (!title) {
        return;
      }
      buffer += csvLine(pledgeId, pledgeDate, pledgeCost, meltable, giftable, pledgeName, csvValue(title), '""');
    });
  });
  return buffer;
}

HangarExt.GetDownloadElement = function()
{
  if (!HangarExt.$download) {
    HangarExt.$download = $('<a />')
      .hide()
      .appendTo(document.body);
  }
  return HangarExt.$download;
}

HangarExt.GetTimestamp = function()
{
  var now = new Date();
  var timestamp =
    now.getFullYear() + '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
    ('0' + now.getDate()).slice(-2) + '-' +
    ('0' + now.getHours()).slice(-2) +
    ('0' + now.getMinutes()).slice(-2) +
    ('0' + now.getSeconds()).slice(-2);

  return timestamp;
}

HangarExt._callbacks.DownloadJSON = function(e)
{
  e.preventDefault();
  var timestamp = HangarExt.GetTimestamp();
  var buffer = HangarExt.GetShipList();
  var $download = HangarExt.GetDownloadElement();
  $download.attr('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(buffer, null, 2)));
  $download.attr('download', 'my-fleet-' + timestamp + '.json');
  $download.attr('type', 'text/json');
  $download[0].click();
}

HangarExt._callbacks.DownloadCSV = function(e)
{
  e.preventDefault();
  var timestamp = HangarExt.GetTimestamp();
  var buffer = HangarExt.GetHangarCSV();
  var $download = HangarExt.GetDownloadElement();
  $download.attr('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(buffer));
  $download.attr('download', 'my-hangar-' + timestamp + '.csv');
  $download.attr('type', 'text/csv');
  $download[0].click();
}