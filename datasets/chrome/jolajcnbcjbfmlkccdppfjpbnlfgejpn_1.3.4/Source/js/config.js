const CONFIG = {
    WALL_ID: "676",
	STYLES_PATH: "",
    CSS_FILES: [
        'css/theme.css'
    ],
	PRESETS: {
		dark: { 
			backgroundColor: '#101010',
			textColor: '#ffffff',
			brightness: 85,
			contrast: 140,
			sepia: 0,
			grayscale: 0,
			hueRotate: 180,
			invert: 1
		},
		vintage: { 
			backgroundColor: '#DDC7A0',
			textColor: '#3a3a3a',
			brightness: 87,
			contrast: 90,
			sepia: 70,
			grayscale: 0,
			hueRotate: 0,
			invert: 0
		},
		gray: { 
			backgroundColor: '#1B1B1B',
			textColor: '#ffffff',
			brightness: 80,
			contrast: 120,
			sepia: 0,
			grayscale: 0,
			hueRotate: 180,
			invert: 1
		}
	},
    DEFAULT_SETTINGS: {
        enabled: false,
		mainColor: '#D2B75E',
        backgroundColor: '#101010',
        textColor: '#ffffff',
        brightness: 85,
		contrast: 140,
		sepia: 0,
		grayscale: 0,
		hueRotate: 180,
		invert: 1,
		gridFilter: ''
    },
    GOLD_HEX: '#D2B75E',
    GOLD_FILTER: "brightness(0) saturate(100%) invert(82%) sepia(34%) saturate(765%) hue-rotate(345deg) brightness(91%) contrast(87%)"
};