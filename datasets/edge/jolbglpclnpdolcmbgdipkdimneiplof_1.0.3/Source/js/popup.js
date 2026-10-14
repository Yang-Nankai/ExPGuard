document.addEventListener('DOMContentLoaded', () => {
    const languages = {
        de: {
            website: "Offizielle Website",
            account: "Konto",
            password: "Passwort",
            login: "Anmelden",
            register: "Registrieren",
            member: "Zum Backend",
            switch: "Konto wechseln",
            loading: "Lade Kontoinformationen...",
            account_length_error: "Das Konto muss mindestens 3 Zeichen lang sein",
            password_length_error: "Das Passwort muss mindestens 6 Zeichen lang sein",
            login_success: "Anmeldung erfolgreich - ",
            login_failure: "Anmeldung fehlgeschlagen - ",
            register_success: "Registrierung und Anmeldung erfolgreich - ",
            communication_failure: "Kommunikation mit dem Backend fehlgeschlagen",
            floatingball: "Floating-Ball ausblenden",
            customer_service: "Kundendienst",
            order: "Bestellung",
            withdraw: "Abheben",
            settings: "Einstellungen"
        },
        en: {
            website: "Official Website",
            account: "Account",
            password: "Password",
            login: "Login",
            register: "Register",
            member: "Enter Backstage",
            switch: "Switch Account",
            loading: "Getting account information...",
            account_length_error: "Account must be at least 3 characters long",
            password_length_error: "Password must be at least 6 characters long",
            login_success: "Login successful - ",
            login_failure: "Login failed - ",
            register_success: "Registration and login successful - ",
            communication_failure: "Communication with backend failed",
            floatingball: "Hide floating ball",
            customer_service: "Customer Service",
            order: "Order",
            withdraw: "Withdraw",
            settings: "Settings"
        },
        es: {
            website: "Sitio web oficial",
            account: "Cuenta",
            password: "Contraseña",
            login: "Iniciar sesión",
            register: "Registrarse",
            member: "Acceder al Backend",
            switch: "Cambiar de cuenta",
            loading: "Obteniendo información de la cuenta...",
            account_length_error: "La cuenta debe tener al menos 3 caracteres",
            password_length_error: "La contraseña debe tener al menos 6 caracteres",
            login_success: "Inicio de sesión exitoso - ",
            login_failure: "Inicio de sesión fallido - ",
            register_success: "Registro e inicio de sesión exitosos - ",
            communication_failure: "Comunicación con el backend fallida",
            floatingball: "Ocultar la bola flotante",
            customer_service: "Servicio al Cliente",
            order: "Pedido",
            withdraw: "Retirar",
            settings: "Configuración"
        },
        fr: {
            website: "Site officiel",
            account: "Compte",
            password: "Mot de passe",
            login: "Se connecter",
            register: "S'inscrire",
            member: "Accéder au back - office",
            switch: "Changer de compte",
            loading: "Récupération des informations de compte...",
            account_length_error: "Le compte doit comporter au moins 3 caractères",
            password_length_error: "Le mot de passe doit comporter au moins 6 caractères",
            login_success: "Connexion réussie - ",
            login_failure: "Échec de la connexion - ",
            register_success: "Inscription et connexion réussies - ",
            communication_failure: "Échec de la communication avec le backend",
            floatingball: "Masquer la bille flottante",
            customer_service: "Service Client",
            order: "Commande",
            withdraw: "Retirer",
            settings: "Paramètres"
        },
        hi: {
            website: "आधिकारिक वेबसाइट",
            account: "खाता",
            password: "पासवर्ड",
            login: "लॉगिन करें",
            register: "रजिस्टर करें",
            member: "बैकस्टेज में प्रवेश करें",
            switch: "खाता बदलें",
            loading: "खाता जानकारी प्राप्त कर रहा है...",
            account_length_error: "खाते की लंबाई कम से कम 3 अक्षरों की होनी चाहिए",
            password_length_error: "पासवर्ड की लंबाई कम से कम 6 अक्षरों की होनी चाहिए",
            login_success: "लॉगिन सफल - ",
            login_failure: "लॉगिन असफल - ",
            register_success: "रजिस्ट्रेशन और लॉगिन सफल - ",
            communication_failure: "बैकएंड के साथ संचार विफल",
            floatingball: "फ्लोटिंग बॉल छिपाएं",
            customer_service: "ग्राहक सेवा",
            order: "ऑर्डर",
            withdraw: "निकासी",
            settings: "सेटिंग्स"
        },
        ja: {
            website: "公式ウェブサイト",
            account: "アカウント",
            password: "パスワード",
            login: "ログイン",
            register: "登録",
            member: "バックステージに入る",
            switch: "アカウントを切り替える",
            loading: "アカウント情報を取得中...",
            account_length_error: "アカウントは少なくとも3文字以上である必要があります",
            password_length_error: "パスワードは少なくとも6文字以上である必要があります",
            login_success: "ログイン成功 - ",
            login_failure: "ログイン失敗 - ",
            register_success: "登録とログイン成功 - ",
            communication_failure: "バックエンドとの通信に失敗しました",
            floatingball: "浮動ボールを隠す",
            customer_service: "カスタマーサービス",
            order: "注文",
            withdraw: "出金",
            settings: "設定"
        },
        ko: {
            website: "공식 웹사이트",
            account: "계정",
            password: "비밀번호",
            login: "로그인",
            register: "등록",
            member: "관리자 페이지로 이동",
            switch: "계정 전환",
            loading: "계정 정보를 가져오는 중...",
            account_length_error: "계정은 최소 3자 이상이어야 합니다",
            password_length_error: "비밀번호는 최소 6자 이상이어야 합니다",
            login_success: "로그인 성공 - ",
            login_failure: "로그인 실패 - ",
            register_success: "등록 및 로그인 성공 - ",
            communication_failure: "백엔드와의 통신 실패",
            floatingball: "부유 공을 숨기기",
            customer_service: "고객센터",
            order: "주문",
            withdraw: "인출",
            settings: "설정"
        },
        ru: {
            website: "Официальный сайт",
            account: "Аккаунт",
            password: "Пароль",
            login: "Войти",
            register: "Зарегистрироваться",
            member: "Войти в панель управления",
            switch: "Сменить аккаунт",
            loading: "Получение информации об аккаунте...",
            account_length_error: "Аккаунт должен содержать не менее 3 символов",
            password_length_error: "Пароль должен содержать не менее 6 символов",
            login_success: "Вход выполнен успешно - ",
            login_failure: "Вход не выполнен - ",
            register_success: "Регистрация и вход выполнены успешно - ",
            communication_failure: "Ошибка связи с сервером",
            floatingball: "Скрыть плавающий шар",
            customer_service: "Служба поддержки",
            order: "Заказ",
            withdraw: "Вывести",
            settings: "Настройки"
        },
        th: {
            website: "เว็บไซต์เป็นทางการ",
            account: "บัญชี",
            password: "รหัสผ่าน",
            login: "เข้าสู่ระบบ",
            register: "ลงทะเบียน",
            member: "เข้าสู่พื้นที่หลังบ้าน",
            switch: "สลับบัญชี",
            loading: "กำลังดึงข้อมูลบัญชี...",
            account_length_error: "บัญชีต้องมีความยาวอย่างน้อย 3 อักขระ",
            password_length_error: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 อักขระ",
            login_success: "เข้าสู่ระบบสำเร็จ - ",
            login_failure: "เข้าสู่ระบบล้มเหลว - ",
            register_success: "ลงทะเบียนและเข้าสู่ระบบสำเร็จ - ",
            communication_failure: "การสื่อสารกับเซิร์ฟเวอร์ล้มเหลว",
            floatingball: "ซ่อนบอลลอย",
            customer_service: "บริการลูกค้า",
            order: "คำสั่งซื้อ",
            withdraw: "ถอนเงิน",
            settings: "การตั้งค่า"
        },
        vi: {
            website: "Trang web chính thức",
            account: "Tài khoản",
            password: "Mật khẩu",
            login: "Đăng nhập",
            register: "Đăng ký",
            member: "Đăng nhập vào phần quản trị",
            switch: "Chuyển tài khoản",
            loading: "Đang lấy thông tin tài khoản...",
            account_length_error: "Tài khoản phải có ít nhất 3 ký tự",
            password_length_error: "Mật khẩu phải có ít nhất 6 ký tự",
            login_success: "Đăng nhập thành công - ",
            login_failure: "Đăng nhập thất bại - ",
            register_success: "Đăng ký và đăng nhập thành công - ",
            communication_failure: "Giao tiếp với máy chủ thất bại",
            floatingball: "Ẩn quả bóng nổi",
            customer_service: "Dịch vụ khách hàng",
            order: "Đơn hàng",
            withdraw: "Rút tiền",
            settings: "Cài đặt"
        },
        zh_CN: {
            website: "官网",
            account: "账号",
            password: "密码",
            login: "登录",
            register: "注册",
            member: "会员中心",
            switch: "退出账号",
            loading: "正在获取帐号信息",
            account_length_error: "账号最少需要 3 个字符",
            password_length_error: "密码最少需要 6 个字符",
            login_success: "登录成功 - ",
            login_failure: "登录失败 - ",
            register_success: "注册并登录成功 - ",
            communication_failure: "网络故障联系客服",
            floatingball: "隐藏浮球",
            customer_service: "联系客服",
            order: "订单",
            withdraw: "提现",
            settings: "设置"
        },
        zh_HK: {
            website: "官方網站",
            account: "賬號",
            password: "密碼",
            login: "登入",
            register: "註冊",
            member: "進入後台",
            switch: "切換賬號",
            loading: "正在獲取賬號資訊",
            account_length_error: "賬號最少需要 3 個字符",
            password_length_error: "密碼最少需要 6 個字符",
            login_success: "登入成功 - ",
            login_failure: "登入失敗 - ",
            register_success: "註冊並登入成功 - ",
            communication_failure: "與後台通訊失敗",
            floatingball: "隱藏浮球",
            customer_service: "聯繫客服",
            order: "訂單",
            withdraw: "提現",
            settings: "設置"
        },
        zh_TW: {
            website: "官方網站",
            account: "帳號",
            password: "密碼",
            login: "登入",
            register: "註冊",
            member: "進入後台",
            switch: "切換帳號",
            loading: "正在獲取帳號資訊",
            account_length_error: "帳號最少需要 3 個字符",
            password_length_error: "密碼最少需要 6 個字符",
            login_success: "登入成功 - ",
            login_failure: "登入失敗 - ",
            register_success: "註冊並登入成功 - ",
            communication_failure: "與後台通訊失敗",
            floatingball: "隱藏浮球",
            customer_service: "聯繫客服",
            order: "訂單",
            withdraw: "提現",
            settings: "設置"
        },
        it: {
            website: "Sito ufficiale",
            account: "Account",
            password: "Password",
            login: "Accedi",
            register: "Registrati",
            member: "Accedi alla gestione",
            switch: "Cambia account",
            loading: "Recupero informazioni account...",
            account_length_error: "L'account deve essere lungo almeno 3 caratteri",
            password_length_error: "La password deve essere lunga almeno 6 caratteri",
            login_success: "Accesso riuscito - ",
            login_failure: "Accesso fallito - ",
            register_success: "Registrazione e accesso riusciti - ",
            communication_failure: "Comunicazione con il backend fallita",
            floatingball: "Nascondi la pallina galleggiante",
            customer_service: "Servizio clienti",
            order: "Ordine",
            withdraw: "Prelievo",
            settings: "Impostazioni"
        }
    };

    const userLanguage = navigator.language.replace('-', '_');
    const languageData = languages[userLanguage] || languages.en;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (languageData[key]) {
            element.textContent = languageData[key];
        }
    });

    const inputElements = document.querySelectorAll('input[data-i18n-placeholder]');
    inputElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (languageData[key]) {
            element.placeholder = languageData[key];
        }
    });

    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (languageData[key]) {
            element.title = languageData[key];
        }
    });

    function translateMessage(key) {
        return languageData[key] || key;
    }

    $(function () {
        Load();
    });

    async function Load() {
        UserInfo = await GetStorage('UserInfo');
        CpsOption = await GetStorage('CpsOption');
        if (!CpsOption) {
            CpsOption = { autocps: '', ratehide: '' };
            await SetStorage('CpsOption', CpsOption);
        }
        $(".checking").hide();
        if (UserInfo) {
            $(".login_box").hide();
            $("#login_container").hide();
            $(".memberId span").text(UserInfo.memberId);
            $("#logout").show();
            $(".userinfo_box").show();
            $("#logout").show();
            if (CpsOption.autocps === '1') {
                $('.autocps').attr('checked', true);
            } else {
                $('.autocps').attr('checked', false);
            }
            if (CpsOption.ratehide === '1') {
                $('.ratehide').attr('checked', true);
            } else {
                $('.ratehide').attr('checked', false);
            }
        } else {
            $(".login_box").show();
            $("#login_container").show();
            $(".userinfo_box").hide();
        }
    }

    async function logout() {
        await SetStorage('UserInfo', null);
        Load();
    }

    async function login() {
        let username = $("input[name=\"username\"]").val();
        let password = $("input[name=\"password\"]").val();
        if (username.length < 3) {
            layer.msg(translateMessage('account_length_error'));
            return;
        }
        if (password.length < 6) {
            layer.msg(translateMessage('password_length_error'));
            return;
        }
        let res = await FetchRequest(Qingei + '/user/crx', { userName: username, userPass: password, source: 'login' }, 'POSTDATA');
        if (res.state) {
            if (res.data.s === 1) {
                UserInfo = res.data;
                layer.msg(translateMessage('login_success') + res.data.memberId);
                await SetStorage('UserInfo', UserInfo);
                Load();
            } else {
                layer.msg(translateMessage('login_failure') + res.data.message);
            }
        } else {
            layer.msg(translateMessage('communication_failure'));
        }
    }

    async function register() {
        let username = $("input[name=\"username\"]").val();
        let password = $("input[name=\"password\"]").val();
        if (username.length < 3) {
            layer.msg(translateMessage('account_length_error'));
            return;
        }
        if (password.length < 6) {
            layer.msg(translateMessage('password_length_error'));
            return;
        }
        let res = await FetchRequest(Qingei + '/user/crx', { userName: username, userPass: password, source: 'register' }, 'POSTDATA');
        if (res.state) {
            if (res.data.s === 1) {
                UserInfo = res.data;
                layer.msg(translateMessage('register_success') + res.data.memberId);
                await SetStorage('UserInfo', UserInfo);
                Load();
            } else {
                layer.msg(translateMessage('login_failure') + res.data.message);
            }
        } else {
            layer.msg(translateMessage('communication_failure'));
        }
    }

    $(document).on('click', '#Login', function (e) {
        login();
    });

    $(document).on('click', '#logout', function (e) {
        e.preventDefault();
        logout();
    });

    $(document).on("click", "#Register", function () {
        register();
    });

    $(document).on("click", ".autocps", function () {
        if (!CpsOption) {
            CpsOption = { autocps: '', ratehide: '' };
        }
        let autocps = '';
        if ($(this).is(':checked')) {
            autocps = "1";
        }
        CpsOption.autocps = autocps;
        SetStorage('CpsOption', CpsOption);
    });

    $(document).on("click", ".ratehide", function () {
        if (!CpsOption) {
            CpsOption = { autocps: '', ratehide: '' };
        }
        let ratehide = '';
        if ($(this).is(':checked')) {
            ratehide = "1";
        }
        CpsOption.ratehide = ratehide;
        SetStorage('CpsOption', CpsOption);
    });

    $(document).on("click", "#Backend", function () {
        let url = `${Qingei}/user/crx?token=${UserInfo.token}&s=plugin`;
        window.open(url);
    });

    $(document).on('click', '#customer_href', function (e) {
        let url = `https://chatbot.weixin.qq.com/webapp/auth/zEkfp6HLzqxQHCdYMFGVNCCoM9L4Xg?openid=${UserInfo.memberId}&nickname=${UserInfo.memberId}&robotName=亲给客服-customer service`;
        window.open(url);
    });
});    