var HangarExt = HangarExt || {};

HangarExt._searchTerm = HangarExt._searchTerm || '';
HangarExt._suggestion = HangarExt._suggestion || '';

HangarExt.Search = function(list, term)
{
  //HangarExt._searchTerm = term;
  term = $.trim(term || '');
  if (term.length < 2 || list.length === 0) {
    HangarExt._suggestion = '';
    return list;
  }

  var isRestore = HangarExt._searchTerm === term;
  var lowerTerm = term.toLowerCase();
  var result = [];

  HangarExt._searchTerm = term;

  $.each(list, function(_, item) {
    var sortName = item.sortName || '';
    var searchItems = item.searchItems || [];

    if (sortName.toLowerCase().indexOf(lowerTerm) !== -1) {
      result.push(item);
      return;
    }

    for (var i = 0; i < searchItems.length; i++) {
      if ((searchItems[i] || '').toLowerCase().indexOf(lowerTerm) !== -1) {
        result.push(item);
        return;
      }
    }
  });
  if (result.length && !isRestore) {
    HangarExt.SaveLocalSetting('filterSearch', term);
    HangarExt._cachedSearchTerm = !!term.length;
  }
  return result;
};

HangarExt.SearchSuggestion = function(list, term)
{
  if (term && term.length >= 2) {

    var lowerTerm = term.toLowerCase();
    var matches = [];

    for (var i = 0; i < list.length; i++) {
      var item = list[i];

      var values = [item.sortName || ''];
      var searchItems = item.searchItems || [];

      values = values.concat(searchItems);

      for (var j = 0; j < values.length; j++) {
        var match = HangarExt.MatchSuggestion(values[j], lowerTerm, term);
        if (match) {
          matches.push(match);
        }
      }
    }

    if (matches.length > 0) {
      matches.sort(function(a, b) {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }

        return a.text.length - b.text.length;
      });

      HangarExt._suggestion = matches[0].text;
      return matches[0].text;
    }
  }

  HangarExt._suggestion = '';
  return term;
};

HangarExt.MatchSuggestion = function(value, lowerTerm, term)
{
  if (!value) {
    return null;
  }

  var lowerValue = value.toLowerCase();
  var index = lowerValue.indexOf(lowerTerm);

  if (index === -1) {
    return null;
  }

  var end = index + term.length;

  while (end < value.length && value.charAt(end) !== ' ') {
    end++;
  }

  var suggestion = term + value.substring(index + term.length, end);

  var priority = 2;

  if (index === 0) {
    priority = 0;
  }
  else if (/[\s\-_/]/.test(value.charAt(index - 1))) {
    priority = 1;
  }

  return {
    text: suggestion,
    priority: priority
  };
};