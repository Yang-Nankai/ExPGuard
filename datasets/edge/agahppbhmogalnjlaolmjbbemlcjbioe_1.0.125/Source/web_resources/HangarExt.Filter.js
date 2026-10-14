var HangarExt = HangarExt || {};

HangarExt.Filter = function (list, filter) {
  switch (filter) {
    case "HasLTI":
      list = $.grep(list, function (item) { return item.filters.is_lti });
      break;
    case "!HasLTI":
      list = $.grep(list, function (item) { return !item.filters.is_lti });
      break;
    case "IsGiftable":
      list = $.grep(list, function (item) { return item.filters.is_giftable });
      break;
    case "!IsGiftable":
      list = $.grep(list, function (item) { return !item.filters.is_giftable });
      break;
    case "IsGifted":
      list = $.grep(list, function (item) { return item.filters.is_gifted });
      break;
    case "!IsGifted":
      list = $.grep(list, function (item) { return !item.filters.is_gifted });
      break;
    case "IsShip":
      list = $.grep(list, function (item) { return item.filters.is_ship });
      break;
    case "HasShip":
      list = $.grep(list, function (item) { return item.filters.has_ship });
      break;
    case "IsNameable":
      list = $.grep(list, function (item) { return item.filters.is_nameable });
      break;
    case "IsPackage":
      list = $.grep(list, function (item) { return item.filters.is_package });
      break;
    case "IsReferral":
      list = $.grep(list, function (item) { return item.filters.is_referral });
      break;
    case "IsReward":
      list = $.grep(list, function (item) { return item.filters.is_vip_reward });
      break;
    case "IsCoupon":
      list = $.grep(list, function (item) { return item.filters.is_coupon });
      break;
    case "IsCombo":
      list = $.grep(list, function (item) { return item.filters.is_combo });
      break;
    case "IsUpgraded":
      list = $.grep(list, function (item) { return item.filters.is_upgraded });
      break;
    case "!IsUpgraded":
      list = $.grep(list, function (item) { return !item.filters.is_upgraded && ( item.filters.is_ship || item.filters.has_ship ) });
      break;
    case "IsUpgrade":
      list = $.grep(list, function (item) { return item.filters.is_upgrade });
      break;
    case "HasValue":
      list = $.grep(list, function (item) { return item.filters.has_value });
      break;
    case "!HasValue":
      list = $.grep(list, function (item) { return !item.filters.has_value });
      break;
    case "IsMeltable":
      list = $.grep(list, function (item) { return item.filters.is_meltable });
      break;
    case "!IsMeltable":
      list = $.grep(list, function (item) { return !item.filters.is_meltable });
      break;
    case "IsSelected":
      list = $.grep(list, function (item) { return item.filters.is_selected });
      break;
    case "!IsSelected":
      list = $.grep(list, function (item) { return !item.filters.is_selected });
      break;
    case "IsFlightReady":
      list = $.grep(list, function (item) { return item.filters.is_flight_ready });
      break;
    case "IsInConcept":
      list = $.grep(list, function (item) { return item.filters.is_in_concept });
      break;
    case "HasComponent":
      list = $.grep(list, function (item) { return item.filters.has_component });
      break;
    case "HasDecoration":
      list = $.grep(list, function (item) { return item.filters.has_decoration });
      break;
    case "HasPaint":
      list = $.grep(list, function (item) { return item.filters.has_skin });
      break;
    case "HasEquipment":
      list = $.grep(list, function (item) { return item.filters.has_equipment });
      break;
  }
  return list;
}