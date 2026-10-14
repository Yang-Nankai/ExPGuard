'use strict';

const loadOptionsA = async () => {
  let def = {
    updateInterval: 5,
    alertSound: true,
    customSound: false,
    soundUrl: "",
    showNotification: true,
    host: {},
    acc: {}
  }

  const items = await extApi.storage.sync.get(def);
  /*
  for(let i in def){
    if(!(i in items))items[i]=def[i];
  }
  for(let i in items){
    if(!(i in def))delete items[i];
  }
  */
  return items;
}