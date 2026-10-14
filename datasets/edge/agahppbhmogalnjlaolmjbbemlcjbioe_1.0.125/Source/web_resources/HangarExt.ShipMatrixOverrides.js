var HangarExt = HangarExt || {};

HangarExt._shipMatrixOverrides = {
  'ATLS': {
    displayName: 'ATLS',
    name: 'A.T.L.S.',
    export: 'ATLS'
  },
  'X1': {
    displayName: 'X1 Base',
    name: 'X1'
  },
  'X1 Force': {
    displayName: 'X1 Force',
    name: 'X1 - FORCE',
    export: 'X1 Force'
  },
  'X1 Velocity': {
    displayName: 'X1 Velocity',
    name: 'X1 - Velocity',
    export: 'X1 Velocity'
  },
  'A2 Hercules': {
    displayName: 'A2 Hercules',
    name: 'Hercules Starlifter A2'
  },
  'C2 Hercules': {
    displayName: 'C2 Hercules',
    name: 'Hercules Starlifter C2'
  },
  'M2 Hercules': {
    displayName: 'M2 Hercules',
    name: 'Hercules Starlifter M2'
  },
  'Genesis': {
    name: 'Genesis Starliner',
    export: 'Genesis'
  },
  'Mercury': {
    name: 'Mercury Star Runner',
    export: 'Mercury'
  },
  'Idris-M': {
    childs: [ 'MPUV Personnel' ]
  },
  'Idris-P': {
    childs: [ 'MPUV Personnel' ]
  },
  '890 Jump': {
    childs: [ '85X' ]
  },
  'Constellation Andromeda': {
    childs: [ 'P-52 Merlin' ]
  },
  'Constellation Aquila': {
    childs: [ 'Ursa','P-52 Merlin' ]
  },
  'Constellation Phoenix': {
    childs: [ 'Lynx','P-72 Archimedes' ]
  },
  'Constellation Phoenix Emerald': {
    childs: [ 'Lynx','P-72 Archimedes' ]
  },
  'Carrack': {
    childs: [ 'Ursa','C8 Pisces' ]
  },
  'Carrack Expedition': {
    childs: [ 'Ursa','C8 Pisces' ]
  },
  'Carrack w/C8X': {
    displayName: 'Carrack w/C8X',
    name: 'Carrack with Pisces Expedition',
    childs: [ 'Ursa','C8X Pisces Expedition' ],
    export: 'Carrack'
  },
  'Carrack Expedition w/C8X': {
    displayName: 'Carrack Expedition w/C8X',
    name: 'Carrack Expedition with Pisces Expedition',
    childs: [ 'Ursa','C8X Pisces Expedition' ],
    export: 'Carrack Expedition'
  },
  '600i Touring': {
    displayName: '600i Touring',
    name: '600i Touring Module',
    export: '600i Touring'
  },
  '600i Explorer': {
    displayName: '600i Explorer',
    name: '600i Exploration Module',
    childs: [ 'G12' ],
    export: '600i'
  },
  '600i Executive Edition': {
    name: '600i Executive Edition',
    childs: [ 'G12' ],
    status: 'Flight-Ready',
    focus: 'Expedition',
    //url: '/pledge/ships/600i/600i-Explorer',
    manufacturer: {
      code: 'ORIG',
      name: 'Origin Jumpworks',
      shortName: 'Origin'
    }
  },
  'Dragonfly Star Kitten': {
    name: 'Dragonfly Star Kitten',
    status: 'Flight-Ready',
    focus: 'Racing',
    //url: 'pledge/ships/drake-dragonfly/Dragonfly-Black',
    manufacturer: {
      code: 'DRAK',
      name: 'Drake Interplanetary',
      shortName: 'Drake'
    }
  },
  'Caterpillar Pirate Edition': {
    name: 'Caterpillar Pirate Edition',
    status: 'Flight-Ready',
    focus: 'Heavy Freight',
    //url: 'pledge/ships/drake-caterpillar/Caterpillar',
    manufacturer: {
      code: 'DRAK',
      name: 'Drake Interplanetary',
      shortName: 'Drake'
    }
  },
  'F7C Hornet Wildfire Mk I': {
    export: 'F7C Hornet Wildfire'
  },
  'F7A Hornet Mk I': {
    export: 'F7A Hornet'
  },
  'F7C-S Hornet Ghost Mk I': {
    export: 'F7C-S Hornet Ghost'
  },
  'F7C-R Hornet Tracker Mk I': {
    export: 'F7C-R Hornet Tracker'
  },
  'F7C-M Super Hornet Mk I': {
    export: 'F7C-M Super Hornet'
  },
  'F7C-M Super Hornet Heartseeker Mk I': {
    export: 'F7C-M Super Hornet Heartseeker'
  },
  'L-21 Wolf': {
    export: 'L-21-Wolf'
  },
  'L-22 Alpha Wolf': {
    export: 'L22-AlphaWolf'
  },
  'Aurora Mk I LX': {
    export: 'Aurora LX'
  },
  'Aurora Mk I MR': {
    export: 'Aurora MR'
  },
  'Aurora Mk I CL': {
    export: 'Aurora CL'
  },
  'Aurora Mk I LN': {
    export: 'Aurora LN'
  },
  'Aurora Mk I SE': {
    export: 'Aurora SE'
  }
};