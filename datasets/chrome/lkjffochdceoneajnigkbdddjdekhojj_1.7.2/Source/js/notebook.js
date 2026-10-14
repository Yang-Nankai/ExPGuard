// Thanh action theo từng từ (lưu sổ tay + audio) + logic lưu vào sổ tay Mazii.
// Port từ MaziiSafariExtension/Resources/js/common.js, thích ứng auth Chrome:
// - Auth dùng window.maziiTokenId (đã decode từ cookie token-id) thay cho inforUser.tokenId.
// - Lưu sổ tay gọi API trực tiếp (KHÔNG qua background 'addHist' — đó là lịch sử local của Chrome).

var BASE_URL_NOTE = 'https://api.mazii.net/api/';
var URL_GET_CATEGORY = BASE_URL_NOTE + 'get-category/0/100';
var URL_ADD_CATEGORY = BASE_URL_NOTE + 'add-category';
var URL_ADD_NOTE = BASE_URL_NOTE + 'add-note';

var catetoryIdSave;   // id category "Mazii-extension" để lưu từ
var maziiUserId;      // userId (lấy từ response get-category khi cần tạo category)

// Icon lấy đúng asset iOS (ic_add / ic_voice / check), fill=currentColor để theo màu token + theme.
var SVG_PLUS = '<svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M8.4375 15V3C8.4375 2.68934 8.68934 2.4375 9 2.4375C9.31066 2.4375 9.5625 2.68934 9.5625 3V15C9.5625 15.3107 9.31066 15.5625 9 15.5625C8.68934 15.5625 8.4375 15.3107 8.4375 15Z"/><path d="M15 8.4375C15.3107 8.4375 15.5625 8.68934 15.5625 9C15.5625 9.31066 15.3107 9.5625 15 9.5625H3C2.68934 9.5625 2.4375 9.31066 2.4375 9C2.4375 8.68934 2.68934 8.4375 3 8.4375H15Z"/></svg>';
var SVG_VOICE = '<svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M9.93751 6.88988C9.93751 5.692 9.9363 4.85501 9.85621 4.2766C9.77257 3.67266 9.63326 3.59538 9.58668 3.57568C9.54572 3.5584 9.40283 3.50906 8.92896 3.87304C8.4732 4.22312 7.89348 4.81264 7.06348 5.66015C6.62219 6.11074 6.22612 6.43879 5.74439 6.63793C5.26408 6.83643 4.75317 6.88403 4.1294 6.88403C3.59123 6.88403 3.23065 6.8848 2.95606 6.91332C2.69158 6.94081 2.57006 6.98947 2.48951 7.04443C2.27172 7.19311 2.15528 7.41754 2.10059 7.76366C2.04131 8.13904 2.0691 8.52939 2.0691 8.99999C2.0691 9.4706 2.04131 9.86094 2.10059 10.2363C2.15528 10.5824 2.27172 10.8069 2.48951 10.9556C2.57006 11.0105 2.69158 11.0592 2.95606 11.0867C3.23065 11.1152 3.59123 11.116 4.1294 11.116C4.75317 11.116 5.26408 11.1636 5.74439 11.3621C6.22612 11.5612 6.62219 11.8892 7.06348 12.3398C7.89348 13.1873 8.4732 13.7769 8.92896 14.1269C9.40283 14.4909 9.54572 14.4416 9.58668 14.4243C9.63326 14.4046 9.77257 14.3273 9.85621 13.7234C9.9363 13.145 9.93751 12.308 9.93751 11.1101V6.88988ZM11.0625 11.1101C11.0625 12.2711 11.0636 13.2035 10.9702 13.8779C10.8804 14.5267 10.6725 15.1861 10.0254 15.46C9.37197 15.7363 8.75856 15.4154 8.24342 15.0198C7.70895 14.6092 7.06344 13.9476 6.26002 13.1272C5.85559 12.7142 5.58702 12.5145 5.31519 12.4021C5.04188 12.2891 4.70911 12.241 4.1294 12.241C3.61529 12.241 3.18646 12.2417 2.84034 12.2058C2.48413 12.1688 2.15274 12.088 1.85523 11.885C1.2886 11.4983 1.07169 10.9318 0.989511 10.4114C0.911964 9.92004 0.944101 9.36782 0.944101 8.99999C0.944101 8.63216 0.911964 8.07995 0.989511 7.58862C1.07169 7.06823 1.2886 6.50173 1.85523 6.11498C2.15274 5.912 2.48413 5.83118 2.84034 5.79418C3.18646 5.75826 3.61529 5.75903 4.1294 5.75903C4.70911 5.75903 5.04188 5.71088 5.31519 5.59789C5.58702 5.48545 5.85559 5.28575 6.26002 4.8728C7.06344 4.05242 7.70895 3.39074 8.24342 2.98022C8.75856 2.58455 9.37197 2.26366 10.0254 2.54003C10.6725 2.8139 10.8804 3.47333 10.9702 4.12206C11.0636 4.79649 11.0625 5.72892 11.0625 6.88988V11.1101Z"/><path d="M12.9375 8.99999C12.9375 8.27229 12.6976 7.60917 12.3025 7.0913C12.1141 6.84432 12.1617 6.4909 12.4087 6.30248C12.6557 6.11412 13.0091 6.16173 13.1975 6.40868C13.7405 7.12032 14.0625 8.0229 14.0625 8.99999C14.0625 9.97709 13.7405 10.8797 13.1975 11.5913C13.0091 11.8383 12.6557 11.8859 12.4087 11.6975C12.1617 11.5091 12.1141 11.1557 12.3025 10.9087C12.6976 10.3908 12.9375 9.72769 12.9375 8.99999Z"/><path d="M15.9375 8.99999C15.9375 7.73315 15.4377 6.56103 14.5855 5.63012C14.3758 5.40109 14.391 5.04526 14.6199 4.83544C14.8489 4.62575 15.2047 4.64103 15.4146 4.86987C16.4384 5.98809 17.0625 7.42558 17.0625 8.99999C17.0625 10.5744 16.4384 12.0119 15.4146 13.1301C15.2047 13.359 14.8489 13.3742 14.6199 13.1645C14.391 12.9547 14.3758 12.5989 14.5855 12.3699C15.4377 11.439 15.9375 10.2668 15.9375 8.99999Z"/></svg>';
var SVG_CHECK = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.75 9.5 7.5 13 14.25 5.5"/></svg>';

// Tạo HTML thanh action [ + | 🔊 ] cho 1 từ. audioUrl rỗng → chỉ hiện nút lưu.
function renderWordActions(audioUrl, saveWord, saveMean, saveId) {
    var html = '<span class="word-actions">';
    html += '<span class="word-action save-word-button"'
          + ' data-save-word="' + encodeURIComponent(saveWord || '') + '"'
          + ' data-save-mean="' + encodeURIComponent(saveMean || '') + '"'
          + ' data-save-id="' + (saveId != null ? saveId : -1) + '">' + SVG_PLUS + '</span>';
    if (audioUrl) {
        html += '<span class="word-action pronoun-button" data-audio="' + audioUrl + '">' + SVG_VOICE + '</span>';
    }
    html += '</span>';
    return html;
}

// Header Authorization dùng token đã có sẵn của Chrome.
function noteAuthToken() {
    return (typeof window !== 'undefined' && window.maziiTokenId) ? window.maziiTokenId : null;
}

// GET danh sách category của user.
function getCategory(successCallback) {
    var tokenId = noteAuthToken();
    if (!tokenId) { if (successCallback) successCallback(null); return; }
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', URL_GET_CATEGORY, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', tokenId);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.responseText && successCallback) {
                try { successCallback(JSON.parse(xhr.responseText)); } catch (e) { successCallback(null); }
            }
        };
        xhr.send(null);
    } catch (e) { if (successCallback) successCallback(null); }
}

// POST tạo category "Mazii-extension" (cần userId lấy từ get-category).
function addCategory(successCallback) {
    var tokenId = noteAuthToken();
    if (!tokenId || !maziiUserId) { if (successCallback) successCallback(null); return; }
    var dataSend = JSON.stringify({
        userId: maziiUserId,
        date: new Date(),
        categoryName: 'Mazii-extension'
    });
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('POST', URL_ADD_CATEGORY, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', tokenId);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.responseText && successCallback) {
                try { successCallback(JSON.parse(xhr.responseText)); } catch (e) { successCallback(null); }
            }
        };
        xhr.onerror = function () {};
        xhr.send(dataSend);
    } catch (e) { if (successCallback) successCallback(null); }
}

// POST thêm từ vào sổ tay.
function addNote(note, successCallback) {
    var tokenId = noteAuthToken();
    if (!tokenId) { if (successCallback) successCallback({ status: 401 }); return; }
    var dataSend = JSON.stringify({
        noteName: note.noteName,
        noteMean: note.noteMean,
        categoryId: note.categoryId,
        type: 'word',
        date: new Date(),
        idx: (note.idx != null) ? note.idx : -1
    });
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('POST', URL_ADD_NOTE, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', tokenId);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.responseText && successCallback) {
                try { successCallback(JSON.parse(xhr.responseText)); } catch (e) { successCallback(null); }
            }
        };
        xhr.onerror = function () {};
        xhr.send(dataSend);
    } catch (e) { if (successCallback) successCallback(null); }
}

// Chuẩn hoá response get-category về mảng category (API có thể trả mảng trực tiếp hoặc {result|data:[...]}).
function normalizeCategoryList(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.result)) return data.result;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
}

// Lấy (hoặc tạo) category "Mazii-extension" rồi set catetoryIdSave. callback(cateId).
function getListCategory(callback) {
    getCategory(function (data) {
        var list = normalizeCategoryList(data);
        var idCate;
        var checkExist = 0;
        if (list.length > 0 && list[0].userId != null) {
            maziiUserId = list[0].userId; // dùng cho add-category nếu cần tạo mới
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i].categoryName == 'Mazii-extension') {
                idCate = list[i].categoryId;
                checkExist = 1;
                break;
            }
        }
        if (checkExist == 0) {
            addCategory(function (result) {
                if (result && result.status == 200) {
                    var cateIdSave = result.cateId;
                    if (cateIdSave) {
                        catetoryIdSave = cateIdSave;
                        try { localStorage.setItem('cateId-save', JSON.stringify({ idCate: cateIdSave, date: (new Date()).getDate() })); } catch (e) {}
                    }
                }
                if (callback) callback(catetoryIdSave);
            });
        } else {
            catetoryIdSave = idCate;
            try { localStorage.setItem('cateId-save', JSON.stringify({ idCate: idCate, date: (new Date()).getDate() })); } catch (e) {}
            if (callback) callback(catetoryIdSave);
        }
    });
}

// Lưu 1 từ vào sổ tay: đảm bảo có category rồi add-note. callback(res).
function saveWordToNote(word, mean, id, callback) {
    var doSave = function (cid) {
        if (!cid) { if (callback) callback({ status: 401 }); return; }
        addNote({ noteName: word, noteMean: mean, categoryId: cid, idx: (id != null ? id : -1) }, callback);
    };
    if (catetoryIdSave) {
        doSave(catetoryIdSave);
    } else {
        getListCategory(function (cid) { doSave(cid); });
    }
}

// Gắn click cho TỪNG nút lưu (.save-word-button): lưu đúng từ đó vào sổ tay.
function bindSaveButtons() {
    var btns = document.getElementsByClassName('save-word-button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            var self = this;
            if (self.classList.contains('saved')) return; // đã lưu rồi
            if (!noteAuthToken()) {
                // Chưa đăng nhập → mở trang đăng nhập Mazii.
                window.open('https://mazii.net/user/login', '_blank');
                return;
            }
            var w = decodeURIComponent(self.getAttribute('data-save-word') || '');
            var m = decodeURIComponent(self.getAttribute('data-save-mean') || '');
            var id = self.getAttribute('data-save-id') || -1;
            saveWordToNote(w, m, id, function (res) {
                if (res && res.status == 200) {
                    self.classList.add('saved');   // đổi sang dấu ✓ xanh báo đã lưu
                    self.innerHTML = SVG_CHECK;
                } else {
                    // Lưu lỗi: flash đỏ tạm để không "im lặng"; vẫn cho thử lại.
                    self.classList.add('save-error');
                    setTimeout(function () { self.classList.remove('save-error'); }, 1200);
                }
            });
        };
    }
}
