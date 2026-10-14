var HangarExt = HangarExt || {};

HangarExt.Sort = function(list, sort)
{
  switch (sort)
  {
    case 'Purchased':
      return list.sort(function(a, b) {
        if (a.pledge_id == b.pledge_id) {
          return 0;
        }
        return a.pledge_id > b.pledge_id ? -1 : 1;
      });

    case 'Value':
      return list.sort(function(a, b) {
        if (a.melt_value == b.melt_value) {
          return 0;
        }
        return a.melt_value > b.melt_value ? -1 : 1;
      });

    case 'Name':
      return list.sort(function(a, b) {
        if (a.displayName == b.displayName) {
          return 0;
        }
        return a.displayName < b.displayName ? -1 : 1;
      });
  }

  return list;
}