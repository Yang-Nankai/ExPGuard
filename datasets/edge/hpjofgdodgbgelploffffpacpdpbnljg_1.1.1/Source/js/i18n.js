// Internationalization support for IPTV Player
const translations = {
  'en': {
    'appTitle': 'IPTV Player',
    'rateUs': 'Rate Us',
    'enterStreamUrl': 'Enter stream URL:',
    'streamUrlExample': 'https://example.com/live/channel.m3u8',
    'playStream': 'Play Stream',
    'recentStreams': 'Recent Streams',
    'poweredBy': 'Powered by',
    'bufferSize': 'Buffer Size:',
    'prebuffer': 'Pre-buffer:',
    'reloadStream': 'Reload Stream',
    'basic': 'Basic',
    'standard': 'Standard',
    'enhanced': 'Enhanced',
    'maximum': 'Maximum',
    'seconds': 'seconds',
    // CORS Error Modal translations
    'playbackError': 'Playback Error',
    'corsErrorMessage': 'This stream cannot be played directly in the extension due to a [CORS_POLICY] set by the stream provider.',
    'corsPolicy': 'CORS policy',
    'corsAlternative': 'You might be able to play this stream on our website:',
    'playOnWebsite': 'Play on IPTVPlayer.stream',
    'tryDifferentStream': 'You can try a different stream URL in the extension.',
    'genericErrorPrefix': 'This stream cannot be played: ',
    'manifestLoadError': 'Failed to load stream manifest'
  },
  'de': {
    'appTitle': 'IPTV Player',
    'rateUs': 'Bewerten Sie uns',
    'enterStreamUrl': 'Stream-URL eingeben:',
    'streamUrlExample': 'https://beispiel.de/live/sender.m3u8',
    'playStream': 'Stream abspielen',
    'recentStreams': 'Kürzliche Streams',
    'poweredBy': 'Unterstützt von',
    'bufferSize': 'Puffergröße:',
    'prebuffer': 'Vorab-Puffer:',
    'reloadStream': 'Stream neu laden',
    'basic': 'Einfach',
    'standard': 'Standard',
    'enhanced': 'Erweitert',
    'maximum': 'Maximum',
    'seconds': 'Sekunden',
    // CORS Error Modal translations
    'playbackError': 'Wiedergabefehler',
    'corsErrorMessage': 'Dieser Stream kann aufgrund einer [CORS_POLICY] des Stream-Anbieters nicht direkt in der Erweiterung abgespielt werden.',
    'corsPolicy': 'CORS-Richtlinie',
    'corsAlternative': 'Sie können diesen Stream möglicherweise auf unserer Website abspielen:',
    'playOnWebsite': 'Auf IPTVPlayer.stream abspielen',
    'tryDifferentStream': 'Sie können eine andere Stream-URL in der Erweiterung versuchen.',
    'genericErrorPrefix': 'Dieser Stream kann nicht abgespielt werden: ',
    'manifestLoadError': 'Fehler beim Laden des Stream-Manifests'
  },
  'fr': {
    'appTitle': 'Lecteur IPTV',
    'rateUs': 'Évaluez-nous',
    'enterStreamUrl': 'Entrez l\'URL du flux:',
    'streamUrlExample': 'https://exemple.fr/flux/chaine.m3u8',
    'playStream': 'Lire le flux',
    'recentStreams': 'Flux récents',
    'poweredBy': 'Propulsé par',
    'bufferSize': 'Taille du tampon:',
    'prebuffer': 'Pré-tampon:',
    'reloadStream': 'Recharger le flux',
    'basic': 'Basique',
    'standard': 'Standard',
    'enhanced': 'Amélioré',
    'maximum': 'Maximum',
    'seconds': 'secondes',
    // CORS Error Modal translations
    'playbackError': 'Erreur de Lecture',
    'corsErrorMessage': 'Ce flux ne peut pas être lu directement dans l\'extension en raison d\'une [CORS_POLICY] définie par le fournisseur du flux.',
    'corsPolicy': 'politique CORS',
    'corsAlternative': 'Vous pourriez être en mesure de lire ce flux sur notre site web:',
    'playOnWebsite': 'Lire sur IPTVPlayer.stream',
    'tryDifferentStream': 'Vous pouvez essayer une URL de flux différente dans l\'extension.',
    'genericErrorPrefix': 'Ce flux ne peut pas être lu: ',
    'manifestLoadError': 'Échec du chargement du manifeste de flux'
  },
  'es': {
    'appTitle': 'Reproductor IPTV',
    'rateUs': 'Califícanos',
    'enterStreamUrl': 'Introducir URL del stream:',
    'streamUrlExample': 'https://ejemplo.es/directo/canal.m3u8',
    'playStream': 'Reproducir stream',
    'recentStreams': 'Streams recientes',
    'poweredBy': 'Desarrollado por',
    'bufferSize': 'Tamaño del búfer:',
    'prebuffer': 'Pre-búfer:',
    'reloadStream': 'Recargar stream',
    'basic': 'Básico',
    'standard': 'Estándar',
    'enhanced': 'Mejorado',
    'maximum': 'Máximo',
    'seconds': 'segundos',
    // CORS Error Modal translations
    'playbackError': 'Error de Reproducción',
    'corsErrorMessage': 'Este stream no puede reproducirse directamente en la extensión debido a una [CORS_POLICY] establecida por el proveedor del stream.',
    'corsPolicy': 'política CORS',
    'corsAlternative': 'Es posible que puedas reproducir este stream en nuestro sitio web:',
    'playOnWebsite': 'Reproducir en IPTVPlayer.stream',
    'tryDifferentStream': 'Puedes probar una URL de stream diferente en la extensión.',
    'genericErrorPrefix': 'Este stream no puede reproducirse: ',
    'manifestLoadError': 'Error al cargar el manifiesto del stream'
  },
  'pt': {
    'appTitle': 'Reprodutor IPTV',
    'rateUs': 'Avalie-nos',
    'enterStreamUrl': 'Insira URL do stream:',
    'streamUrlExample': 'https://exemplo.pt/ao-vivo/canal.m3u8',
    'playStream': 'Reproduzir stream',
    'recentStreams': 'Streams recentes',
    'poweredBy': 'Desenvolvido por',
    'bufferSize': 'Tamanho do buffer:',
    'prebuffer': 'Pré-buffer:',
    'reloadStream': 'Recarregar stream',
    'basic': 'Básico',
    'standard': 'Padrão',
    'enhanced': 'Aprimorado',
    'maximum': 'Máximo',
    'seconds': 'segundos',
    // CORS Error Modal translations
    'playbackError': 'Erro de Reprodução',
    'corsErrorMessage': 'Este stream não pode ser reproduzido diretamente na extensão devido a uma [CORS_POLICY] definida pelo provedor do stream.',
    'corsPolicy': 'política CORS',
    'corsAlternative': 'Você pode ser capaz de reproduzir este stream em nosso site:',
    'playOnWebsite': 'Reproduzir no IPTVPlayer.stream',
    'tryDifferentStream': 'Você pode tentar uma URL de stream diferente na extensão.',
    'genericErrorPrefix': 'Este stream não pode ser reproduzido: ',
    'manifestLoadError': 'Falha ao carregar o manifesto do stream'
  },
  'ko': {
    'appTitle': 'IPTV 플레이어',
    'rateUs': '평가하기',
    'enterStreamUrl': '스트림 URL 입력:',
    'streamUrlExample': 'https://example.kr/live/channel.m3u8',
    'playStream': '스트림 재생',
    'recentStreams': '최근 스트림',
    'poweredBy': '제공:',
    'bufferSize': '버퍼 크기:',
    'prebuffer': '사전 버퍼:',
    'reloadStream': '스트림 새로고침',
    'basic': '기본',
    'standard': '표준',
    'enhanced': '향상됨',
    'maximum': '최대',
    'seconds': '초',
    // CORS Error Modal translations
    'playbackError': '재생 오류',
    'corsErrorMessage': '스트림 제공자가 설정한 [CORS_POLICY]으로 인해 이 스트림을 확장 프로그램에서 직접 재생할 수 없습니다.',
    'corsPolicy': 'CORS 정책',
    'corsAlternative': '저희 웹사이트에서 이 스트림을 재생할 수 있습니다:',
    'playOnWebsite': 'IPTVPlayer.stream에서 재생',
    'tryDifferentStream': '확장 프로그램에서 다른 스트림 URL을 시도할 수 있습니다.',
    'genericErrorPrefix': '이 스트림을 재생할 수 없습니다: ',
    'manifestLoadError': '스트림 매니페스트 로드 실패'
  },
  'ja': {
    'appTitle': 'IPTV プレーヤー',
    'rateUs': '評価する',
    'enterStreamUrl': 'ストリームURLを入力:',
    'streamUrlExample': 'https://example.jp/live/channel.m3u8',
    'playStream': 'ストリームを再生',
    'recentStreams': '最近のストリーム',
    'poweredBy': '提供:',
    'bufferSize': 'バッファサイズ:',
    'prebuffer': 'プリバッファ:',
    'reloadStream': 'ストリームを再読み込み',
    'basic': '基本',
    'standard': '標準',
    'enhanced': '拡張',
    'maximum': '最大',
    'seconds': '秒',
    // CORS Error Modal translations
    'playbackError': '再生エラー',
    'corsErrorMessage': 'このストリームは、ストリームプロバイダーによって設定された[CORS_POLICY]のため、拡張機能で直接再生できません。',
    'corsPolicy': 'CORSポリシー',
    'corsAlternative': '当社のウェブサイトでこのストリームを再生できる可能性があります:',
    'playOnWebsite': 'IPTVPlayer.streamで再生',
    'tryDifferentStream': '拡張機能で別のストリームURLを試すことができます。',
    'genericErrorPrefix': 'このストリームを再生できません: ',
    'manifestLoadError': 'ストリームマニフェストの読み込みに失敗しました'
  }
};

// Get browser language or use English as fallback
function getBrowserLanguage() {
  const lang = navigator.language.split('-')[0].toLowerCase();
  return translations[lang] ? lang : 'en';
}

// Get current language from storage or use browser language
function getCurrentLanguage(callback) {
  chrome.storage.local.get('language', function(result) {
    const language = result.language || getBrowserLanguage();
    callback(language);
  });
}

// Set current language
function setCurrentLanguage(language, callback) {
  chrome.storage.local.set({ language: language }, callback);
}

// Get translation for a key in the current language
function getTranslation(key, language) {
  if (!language || !translations[language]) {
    language = 'en'; // Default to English if language is not supported
  }
  
  return translations[language][key] || translations['en'][key] || key;
}

// Apply translations to the page
function applyTranslations() {
  getCurrentLanguage(function(language) {
    // Apply translations to elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      
      if (key) {
        if (element.tagName === 'INPUT' && element.type === 'text') {
          element.placeholder = getTranslation(key, language);
        } else {
          element.textContent = getTranslation(key, language);
        }
      }
    });
    
    // Apply translations to elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      
      if (key && element.hasAttribute('placeholder')) {
        element.placeholder = getTranslation(key, language);
      }
    });
    
    // Also translate option labels for buffer size and prebuffer time
    updateSelectOptions(language);
  });
}

// Update select options with translated text
function updateSelectOptions(language) {
  // Buffer size options
  const bufferSizeSelect = document.getElementById('buffer-size');
  if (bufferSizeSelect) {
    const options = bufferSizeSelect.options;
    if (options.length >= 4) {
      options[0].text = `2 MB (${getTranslation('basic', language)})`;
      options[1].text = `4 MB (${getTranslation('standard', language)})`;
      options[2].text = `8 MB (${getTranslation('enhanced', language)})`;
      options[3].text = `16 MB (${getTranslation('maximum', language)})`;
    }
  }
  
  // Prebuffer time options
  const prebufferTimeSelect = document.getElementById('prebuffer-time');
  if (prebufferTimeSelect) {
    const options = prebufferTimeSelect.options;
    const seconds = getTranslation('seconds', language);
    if (options.length >= 4) {
      options[0].text = `3 ${seconds}`;
      options[1].text = `5 ${seconds}`;
      options[2].text = `10 ${seconds}`;
      options[3].text = `15 ${seconds}`;
    }
  }
}

// Get all supported languages
function getSupportedLanguages() {
  return Object.keys(translations);
} 