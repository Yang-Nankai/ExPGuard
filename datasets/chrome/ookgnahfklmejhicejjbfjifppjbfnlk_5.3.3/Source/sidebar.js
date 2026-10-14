;(function () {
  if (window.__adsmeta_sb_loaded) return
  window.__adsmeta_sb_loaded = true

  const isBillingPage = /\/billing_hub\/|\/billing_hub/.test(location.pathname)
  // Panel chỉ được phép hiện ở: Ads Manager (campaigns/adsets/ads) và billing_hub (accounts/details + payment_settings).
  // FB là SPA (đổi URL không reload) nên phải kiểm tra runtime để ẩn khi rời sang trang khác (vd ad_account_settings).
  function amsbAllowed() {
    const p = location.pathname
    return /\/adsmanager\/manage\/(campaigns|adsets|ads)(\/|$)/.test(p)
        || /\/billing_hub\/(accounts\/details|payment_settings)(\/|$)/.test(p)
  }

  /* ─── Currency ─── */
  const NO_DEC = ['CLP','COP','CRC','HUF','ISK','IDR','JPY','KRW','PYG','TWD','VND','BILL']
  function cvt(num, curr) {
    const n = Number(num) || 0
    if (!curr || curr === 'round') return Math.round(n)
    return NO_DEC.includes(curr) ? Math.round(n) : Math.round(n / 100)
  }
  const LOCALES = { VI:'vi-VN', EN:'en-US', ZH:'zh-CN', JA:'ja-JP', KO:'ko-KR', TH:'th-TH', ID:'id-ID', MS:'ms-MY', AR:'ar-SA' }
  // Ký hiệu tiền tệ (đồng bộ overlay.js) — nhóm "$" có tiền tố phân biệt (MX$, A$, NT$…) tránh trùng USD.
  const CUR_SYMBOL = {
    USD:'$', EUR:'€', GBP:'£', JPY:'¥', CNY:'¥', CHF:'CHF',
    VND:'₫', THB:'฿', KRW:'₩', INR:'₹', PHP:'₱', IDR:'Rp', MYR:'RM',
    TWD:'NT$', HKD:'HK$', SGD:'S$', AUD:'A$', CAD:'C$', NZD:'NZ$',
    BRL:'R$', MXN:'MX$', ARS:'AR$', COP:'COL$', CLP:'CLP$',
    TRY:'₺', RUB:'₽', ILS:'₪', UAH:'₴', NGN:'₦', ZAR:'R',
    PLN:'zł', SEK:'kr', NOK:'kr', DKK:'kr', ISK:'kr', CZK:'Kč',
    HUF:'Ft', RON:'lei', BGN:'лв', PEN:'S/', CRC:'₡', PYG:'₲',
    AED:'AED', SAR:'SAR', EGP:'E£', BDT:'৳', LKR:'Rs',
  }
  const curSym = c => c === 'BILL' ? '₫' : (CUR_SYMBOL[c] || c)
  function fmt(n, curr) {
    const locale = LOCALES[S?.lang] || 'vi-VN'
    const abs = Math.abs(n)
    // Giá trị < 1 (vd 0,51 USD): giữ 2 số thập phân để không bị làm tròn thành 1.
    // Tiền không lẻ (VND, JPY…) luôn nguyên.
    if (abs > 0 && abs < 1 && !NO_DEC.includes(curr)) {
      return n.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + curSym(curr || 'VND')
    }
    // Còn lại làm tròn số nguyên — bỏ phần thập phân ",00". Ký hiệu LIỀN số như web (69.000đ, không cách).
    return Math.round(n).toLocaleString(locale) + curSym(curr || 'VND')
  }
  const clock = () => new Date().toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit', second:'2-digit' })
  const clockFull = () => { const d = new Date(); return d.toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) + ' ' + d.toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' }) }
  function fmtDate(iso) {
    if (!iso) return '—'
    return String(iso).slice(0, 10)
  }
  function daysLeft(dateStr) {
    if (!dateStr) return ''
    const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000)
    return diff >= 0 ? diff : 0
  }

  /* ─── Languages ─── */
  function svgFlag(body) {
    return 'data:image/svg+xml,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 13">${body}</svg>`
    )
  }
  const FLAGS = {
    VI: svgFlag('<rect width="20" height="13" fill="#DA251D"/><polygon fill="#FFFF00" points="10,2.5 10.94,5.21 13.8,5.26 11.52,6.99 12.35,9.74 10,8.1 7.65,9.74 8.48,6.99 6.2,5.26 9.06,5.21"/>'),
    EN: svgFlag('<rect width="20" height="13" fill="#B22234"/><rect y="1" width="20" height="1" fill="#fff"/><rect y="3" width="20" height="1" fill="#fff"/><rect y="5" width="20" height="1" fill="#fff"/><rect y="7" width="20" height="1" fill="#fff"/><rect y="9" width="20" height="1" fill="#fff"/><rect y="11" width="20" height="1" fill="#fff"/><rect width="9" height="7" fill="#3C3B6E"/>'),
    ZH: svgFlag('<rect width="20" height="13" fill="#DE2910"/><polygon fill="#FFDE00" points="4,1.5 4.8,4 7.3,4 5.3,5.5 6.1,8 4,6.5 1.9,8 2.7,5.5 0.7,4 3.2,4"/><circle fill="#FFDE00" cx="8" cy="1.8" r="0.8"/><circle fill="#FFDE00" cx="9.5" cy="3.2" r="0.8"/><circle fill="#FFDE00" cx="9.5" cy="5.2" r="0.8"/><circle fill="#FFDE00" cx="8" cy="6.6" r="0.8"/>'),
    JA: svgFlag('<rect width="20" height="13" fill="#fff"/><circle cx="10" cy="6.5" r="3.8" fill="#BC002D"/>'),
    KO: svgFlag('<rect width="20" height="13" fill="#fff"/><circle cx="10" cy="6.5" r="3.5" fill="#003478"/><path d="M10 3 A3.5 3.5 0 0 1 10 10 A1.75 1.75 0 0 1 10 6.5 A1.75 1.75 0 0 0 10 3" fill="#C60C30"/>'),
    TH: svgFlag('<rect width="20" height="13" fill="#A51931"/><rect y="2.6" width="20" height="2.6" fill="#F4F5F8"/><rect y="5.2" width="20" height="2.6" fill="#2D2A4A"/><rect y="7.8" width="20" height="2.6" fill="#F4F5F8"/>'),
    ID: svgFlag('<rect width="20" height="6.5" fill="#CE1126"/><rect y="6.5" width="20" height="6.5" fill="#fff"/>'),
    MS: svgFlag('<rect width="20" height="13" fill="#CC0001"/><rect y="0.93" width="20" height="0.93" fill="#fff"/><rect y="2.79" width="20" height="0.93" fill="#fff"/><rect y="4.65" width="20" height="0.93" fill="#fff"/><rect y="6.51" width="20" height="0.93" fill="#fff"/><rect y="8.37" width="20" height="0.93" fill="#fff"/><rect y="10.23" width="20" height="0.93" fill="#fff"/><rect width="10" height="7" fill="#010066"/><circle cx="4" cy="3.5" r="2.2" fill="#FC0"/><circle cx="5.3" cy="3.5" r="1.7" fill="#010066"/><polygon fill="#FC0" points="8,2.5 8.3,3.4 9.2,3.4 8.5,3.9 8.8,4.8 8,4.3 7.2,4.8 7.5,3.9 6.8,3.4 7.7,3.4"/>'),
    AR: svgFlag('<rect width="20" height="13" fill="#006C35"/><rect x="2" y="4" width="16" height="0.8" fill="#fff" rx="0.3"/><rect x="3.5" y="5.5" width="13" height="0.8" fill="#fff" rx="0.3"/><rect x="2" y="7.8" width="12.5" height="0.7" fill="#fff"/><polygon fill="#fff" points="14.5,7.8 17,8.15 14.5,8.5"/>'),
  }
  const CURR_FLAGS = {
    default: null,
    VND: FLAGS.VI,
    USD: FLAGS.EN,
    EUR: svgFlag('<rect width="20" height="13" fill="#003399"/><circle cx="10" cy="2.5" r=".7" fill="#FC0"/><circle cx="12" cy="3" r=".7" fill="#FC0"/><circle cx="13.5" cy="4.5" r=".7" fill="#FC0"/><circle cx="14" cy="6.5" r=".7" fill="#FC0"/><circle cx="13.5" cy="8.5" r=".7" fill="#FC0"/><circle cx="12" cy="10" r=".7" fill="#FC0"/><circle cx="10" cy="10.5" r=".7" fill="#FC0"/><circle cx="8" cy="10" r=".7" fill="#FC0"/><circle cx="6.5" cy="8.5" r=".7" fill="#FC0"/><circle cx="6" cy="6.5" r=".7" fill="#FC0"/><circle cx="6.5" cy="4.5" r=".7" fill="#FC0"/><circle cx="8" cy="3" r=".7" fill="#FC0"/>'),
    GBP: svgFlag('<rect width="20" height="13" fill="#012169"/><line x1="0" y1="0" x2="20" y2="13" stroke="#fff" stroke-width="4"/><line x1="20" y1="0" x2="0" y2="13" stroke="#fff" stroke-width="4"/><line x1="0" y1="0" x2="20" y2="13" stroke="#C8102E" stroke-width="2"/><line x1="20" y1="0" x2="0" y2="13" stroke="#C8102E" stroke-width="2"/><line x1="10" y1="0" x2="10" y2="13" stroke="#fff" stroke-width="5"/><line x1="0" y1="6.5" x2="20" y2="6.5" stroke="#fff" stroke-width="5"/><line x1="10" y1="0" x2="10" y2="13" stroke="#C8102E" stroke-width="3"/><line x1="0" y1="6.5" x2="20" y2="6.5" stroke="#C8102E" stroke-width="3"/>'),
    JPY: FLAGS.JA,
    KRW: FLAGS.KO,
    THB: FLAGS.TH,
    IDR: FLAGS.ID,
    MYR: FLAGS.MS,
    PHP: svgFlag('<rect width="20" height="6.5" fill="#0038A8"/><rect y="6.5" width="20" height="6.5" fill="#CE1126"/><polygon points="0,0 0,13 8.5,6.5" fill="#FCD116"/><circle cx="3.8" cy="6.5" r="1" fill="#FCD116"/>'),
    SGD: svgFlag('<rect width="20" height="6.5" fill="#EF3340"/><rect y="6.5" width="20" height="6.5" fill="#fff"/><circle cx="4.5" cy="3.25" r="2.1" fill="#fff"/><circle cx="5.8" cy="3.25" r="1.6" fill="#EF3340"/><circle cx="7.5" cy="1.8" r=".5" fill="#fff"/><circle cx="8.8" cy="3.25" r=".5" fill="#fff"/><circle cx="8" cy="4.8" r=".5" fill="#fff"/><circle cx="6.5" cy="5.2" r=".5" fill="#fff"/><circle cx="6.2" cy="1.8" r=".5" fill="#fff"/>'),
    TWD: svgFlag('<rect width="20" height="13" fill="#FE0000"/><rect width="8" height="6.5" fill="#000095"/><circle cx="4" cy="3.25" r="2.2" fill="#fff"/><circle cx="4" cy="3.25" r="1.1" fill="#000095"/>'),
    HKD: svgFlag('<rect width="20" height="13" fill="#DE2010"/><ellipse cx="10" cy="6.5" rx="1" ry="3" fill="#fff"/><ellipse cx="10" cy="6.5" rx="1" ry="3" fill="#fff" transform="rotate(72 10 6.5)"/><ellipse cx="10" cy="6.5" rx="1" ry="3" fill="#fff" transform="rotate(144 10 6.5)"/><ellipse cx="10" cy="6.5" rx="1" ry="3" fill="#fff" transform="rotate(216 10 6.5)"/><ellipse cx="10" cy="6.5" rx="1" ry="3" fill="#fff" transform="rotate(288 10 6.5)"/><circle cx="10" cy="6.5" r="1.3" fill="#DE2010"/>'),
    CNY: FLAGS.ZH,
    AUD: svgFlag('<rect width="20" height="13" fill="#00008B"/><rect width="8" height="6.5" fill="#012169"/><line x1="0" y1="0" x2="8" y2="6.5" stroke="#fff" stroke-width="2.5"/><line x1="8" y1="0" x2="0" y2="6.5" stroke="#fff" stroke-width="2.5"/><line x1="0" y1="0" x2="8" y2="6.5" stroke="#C8102E" stroke-width="1.3"/><line x1="8" y1="0" x2="0" y2="6.5" stroke="#C8102E" stroke-width="1.3"/><line x1="4" y1="0" x2="4" y2="6.5" stroke="#fff" stroke-width="3"/><line x1="0" y1="3.25" x2="8" y2="3.25" stroke="#fff" stroke-width="3"/><line x1="4" y1="0" x2="4" y2="6.5" stroke="#C8102E" stroke-width="1.5"/><line x1="0" y1="3.25" x2="8" y2="3.25" stroke="#C8102E" stroke-width="1.5"/><circle cx="15" cy="9.5" r=".8" fill="#fff"/><circle cx="17" cy="7" r=".7" fill="#fff"/><circle cx="16" cy="4" r=".6" fill="#fff"/><circle cx="13" cy="6" r=".7" fill="#fff"/>'),
    CAD: svgFlag('<rect width="4" height="13" fill="#FF0000"/><rect x="16" width="4" height="13" fill="#FF0000"/><rect x="4" width="12" height="13" fill="#fff"/><polygon fill="#FF0000" points="10,2 11,5.5 14.5,5.5 11.8,7.5 12.8,11 10,9 7.2,11 8.2,7.5 5.5,5.5 9,5.5"/>'),
    BRL: svgFlag('<rect width="20" height="13" fill="#009C3B"/><polygon fill="#FEDF00" points="10,1 19,6.5 10,12 1,6.5"/><circle cx="10" cy="6.5" r="2.8" fill="#002776"/><path d="M7.2,5.5 A2.8,2.8 0 0,1 12.8,5.5" stroke="#fff" stroke-width=".7" fill="none"/>'),
    INR: svgFlag('<rect width="20" height="4.33" fill="#FF9933"/><rect y="4.33" width="20" height="4.34" fill="#fff"/><rect y="8.67" width="20" height="4.33" fill="#138808"/><circle cx="10" cy="6.5" r="1.5" fill="none" stroke="#000080" stroke-width=".5"/>'),
    MXN: svgFlag('<rect width="6.67" height="13" fill="#006847"/><rect x="6.67" width="6.66" height="13" fill="#fff"/><rect x="13.33" width="6.67" height="13" fill="#CE1126"/>'),
    SAR: FLAGS.AR,
    AED: svgFlag('<rect width="20" height="13" fill="#fff"/><rect width="20" height="4.33" fill="#00732F"/><rect y="8.67" width="20" height="4.33" fill="#000"/><rect width="5" height="13" fill="#FF0000"/>'),
    EGP: svgFlag('<rect width="20" height="4.33" fill="#CE1126"/><rect y="4.33" width="20" height="4.34" fill="#fff"/><rect y="8.67" width="20" height="4.33" fill="#000"/><rect x="8" y="4" width="4" height="5" fill="#C09300" opacity=".7"/>'),
    NGN: svgFlag('<rect width="6.67" height="13" fill="#008751"/><rect x="6.67" width="6.66" height="13" fill="#fff"/><rect x="13.33" width="6.67" height="13" fill="#008751"/>'),
    PKR: svgFlag('<rect width="4" height="13" fill="#fff"/><rect x="4" width="16" height="13" fill="#01411C"/><circle cx="11.5" cy="6.5" r="2.2" fill="#fff"/><circle cx="12.8" cy="6.5" r="1.7" fill="#01411C"/>'),
    CLP: svgFlag('<rect y="6.5" width="20" height="6.5" fill="#D52B1E"/><rect width="20" height="6.5" fill="#fff"/><rect width="7" height="6.5" fill="#002D62"/><polygon fill="#fff" points="3.5,1.2 4.3,3.6 6.8,3.6 4.8,5 5.6,7.4 3.5,5.9 1.4,7.4 2.2,5 0.2,3.6 2.7,3.6"/>'),
    COP: svgFlag('<rect width="20" height="6.5" fill="#FCD116"/><rect y="6.5" width="20" height="3.25" fill="#003893"/><rect y="9.75" width="20" height="3.25" fill="#CE1126"/>'),
  }
  const LANGS = [
    { code:'VI', flag: FLAGS.VI, name:'Tiếng Việt' },
    { code:'EN', flag: FLAGS.EN, name:'English' },
    { code:'ZH', flag: FLAGS.ZH, name:'中文' },
    { code:'JA', flag: FLAGS.JA, name:'日本語' },
    { code:'KO', flag: FLAGS.KO, name:'한국어' },
    { code:'TH', flag: FLAGS.TH, name:'ภาษาไทย' },
    { code:'ID', flag: FLAGS.ID, name:'Bahasa ID' },
    { code:'MS', flag: FLAGS.MS, name:'Bahasa MY' },
    { code:'AR', flag: FLAGS.AR, name:'العربية' },
  ]
  const LBL = {
    VI: { cc:'Màu tiền tệ', rt:'Cập nhật realtime', curr:'Quy đổi tiền tệ', info:'Thông tin', tracking:'Tracking', role:'Quyền hạn', name:'Tên TK', bal:'Dư nợ', thr:'Ngưỡng', limitDay:'Limit ngày', limit:'Limit', spent:'Chi tiêu', today:'Hôm nay', cur:'Tiền tệ', card:'Thẻ', admin:'Admin', myRole:'Quyền', type:'Loại TK', bm:'TK trong BM', biz:'Doanh Nghiệp', personal:'Cá Nhân', timezone:'Múi giờ', createdAt:'Ngày tạo', nextBill:'Ngày HĐ', daysLeft:'còn', loading:'Đang tải...', noAct:'Mở một TKQC để xem thông tin', noTok:'Không lấy được FB token.\nHãy đăng nhập Facebook.', upTitle:'Nâng cấp Premium', upDesc:'Mở khóa tất cả tính năng', upBtn:'Upgrade', updated:'Cập nhật:', visTitle:'Hiển thị chỉ số' },
    EN: { cc:'Currency color', rt:'Realtime update', curr:'Currency display', info:'Information', tracking:'Tracking', role:'Role info', name:'Account', bal:'Balance', thr:'Threshold', limitDay:'Daily limit', limit:'Limit', spent:'Spent', today:'Today', cur:'Currency', card:'Card', admin:'Admin', myRole:'Role', type:'Type', bm:'Accts in BM', biz:'Business', personal:'Personal', timezone:'Timezone', createdAt:'Created', nextBill:'Next Bill', daysLeft:'left', loading:'Loading...', noAct:'Open an ad account to see info', noTok:'Could not get FB token.\nPlease log in to Facebook.', upTitle:'Upgrade Premium', upDesc:'Unlock all features', upBtn:'Upgrade', updated:'Updated:', visTitle:'Show metrics' },
    ZH: { cc:'货币颜色', rt:'实时更新', curr:'货币显示', info:'账户信息', tracking:'数据追踪', role:'权限信息', name:'账户名', bal:'余额', thr:'阈值', limitDay:'每日限额', limit:'额度', spent:'消耗', today:'今日', cur:'货币', card:'银行卡', admin:'管理员数', myRole:'我的权限', type:'账户类型', bm:'BM', biz:'企业', personal:'个人', timezone:'时区', createdAt:'创建日期', nextBill:'账单日期', daysLeft:'剩余', loading:'加载中...', noAct:'请打开广告账户查看', noTok:'无法获取FB令牌。\n请登录Facebook。', upTitle:'升级高级版', upDesc:'解锁全部功能', upBtn:'升级', updated:'更新:', visTitle:'显示指标' },
    JA: { cc:'通貨の色', rt:'リアルタイム更新', curr:'通貨表示', info:'アカウント情報', tracking:'トラッキング', role:'権限情報', name:'アカウント名', bal:'残高', thr:'しきい値', limitDay:'日次上限', limit:'上限', spent:'支出', today:'今日', cur:'通貨', card:'カード', admin:'管理者数', myRole:'権限', type:'タイプ', bm:'BM', biz:'ビジネス', personal:'個人', timezone:'タイムゾーン', createdAt:'作成日', nextBill:'請求日', daysLeft:'日後', loading:'読み込み中...', noAct:'広告アカウントを開いてください', noTok:'FBトークンを取得できません。\nFacebookにログインしてください。', upTitle:'プレミアムへアップグレード', upDesc:'全機能を解放', upBtn:'アップグレード', updated:'更新:', visTitle:'表示する指標' },
    KO: { cc:'통화 색상', rt:'실시간 업데이트', curr:'통화 표시', info:'계정 정보', tracking:'추적', role:'역할 정보', name:'계정명', bal:'잔액', thr:'임계값', limitDay:'일일 한도', limit:'한도', spent:'지출', today:'오늘', cur:'통화', card:'카드', admin:'관리자수', myRole:'역할', type:'유형', bm:'BM', biz:'비즈니스', personal:'개인', timezone:'시간대', createdAt:'생성일', nextBill:'청구일', daysLeft:'일 남음', loading:'로딩 중...', noAct:'광고 계정을 열어 확인하세요', noTok:'FB 토큰을 가져올 수 없습니다.\nFacebook에 로그인해 주세요.', upTitle:'프리미엄 업그레이드', upDesc:'모든 기능 잠금 해제', upBtn:'업그레이드', updated:'업데이트:', visTitle:'표시할 지표' },
    TH: { cc:'สีสกุลเงิน', rt:'อัปเดตแบบเรียลไทม์', curr:'แสดงสกุลเงิน', info:'ข้อมูลบัญชี', tracking:'ติดตาม', role:'ข้อมูลบทบาท', name:'ชื่อบัญชี', bal:'ยอดเงิน', thr:'เกณฑ์', limitDay:'วงเงินต่อวัน', limit:'วงเงิน', spent:'ใช้จ่าย', today:'วันนี้', cur:'สกุลเงิน', card:'บัตร', admin:'ผู้ดูแล', myRole:'สิทธิ์', type:'ประเภท', bm:'BM', biz:'ธุรกิจ', personal:'บุคคล', timezone:'เขตเวลา', createdAt:'วันที่สร้าง', nextBill:'วันชำระ', daysLeft:'วันที่เหลือ', loading:'กำลังโหลด...', noAct:'เปิดบัญชีโฆษณาเพื่อดูข้อมูล', noTok:'ไม่สามารถรับโทเค็น FB\nโปรดเข้าสู่ระบบ Facebook', upTitle:'อัปเกรดพรีเมียม', upDesc:'ปลดล็อคฟีเจอร์ทั้งหมด', upBtn:'อัปเกรด', updated:'อัปเดต:', visTitle:'แสดงตัวชี้วัด' },
    ID: { cc:'Warna mata uang', rt:'Pembaruan realtime', curr:'Tampilan mata uang', info:'Informasi akun', tracking:'Pelacakan', role:'Info peran', name:'Nama akun', bal:'Saldo', thr:'Ambang batas', limitDay:'Batas harian', limit:'Batas', spent:'Pengeluaran', today:'Hari ini', cur:'Mata uang', card:'Kartu', admin:'Jml admin', myRole:'Peran', type:'Jenis', bm:'BM', biz:'Bisnis', personal:'Pribadi', timezone:'Zona waktu', createdAt:'Tgl dibuat', nextBill:'Tgl tagihan', daysLeft:'hari lagi', loading:'Memuat...', noAct:'Buka akun iklan untuk melihat info', noTok:'Tidak dapat mengambil token FB.\nSilakan login ke Facebook.', upTitle:'Upgrade Premium', upDesc:'Buka semua fitur', upBtn:'Upgrade', updated:'Diperbarui:', visTitle:'Tampilkan metrik' },
    MS: { cc:'Warna mata wang', rt:'Kemaskini masa nyata', curr:'Paparan mata wang', info:'Maklumat akaun', tracking:'Penjejakan', role:'Maklumat peranan', name:'Nama akaun', bal:'Baki', thr:'Ambang', limitDay:'Had harian', limit:'Had', spent:'Perbelanjaan', today:'Hari ini', cur:'Mata wang', card:'Kad', admin:'Jml pentadbir', myRole:'Peranan', type:'Jenis', bm:'BM', biz:'Perniagaan', personal:'Peribadi', timezone:'Zon masa', createdAt:'Tgl dicipta', nextBill:'Tgl bil', daysLeft:'hari lagi', loading:'Memuatkan...', noAct:'Buka akaun iklan untuk maklumat', noTok:'Tidak dapat mengambil token FB.\nSila log masuk ke Facebook.', upTitle:'Naik taraf Premium', upDesc:'Buka kunci semua ciri', upBtn:'Naik taraf', updated:'Dikemaskini:', visTitle:'Papar metrik' },
    AR: { cc:'لون العملة', rt:'تحديث فوري', curr:'عرض العملة', info:'معلومات الحساب', tracking:'التتبع', role:'معلومات الدور', name:'اسم الحساب', bal:'الرصيد', thr:'الحد', limitDay:'الحد اليومي', limit:'الحد المعتمد', spent:'الإنفاق', today:'اليوم', cur:'العملة', card:'البطاقة', admin:'عدد المسؤولين', myRole:'الدور', type:'النوع', bm:'BM', biz:'تجاري', personal:'شخصي', timezone:'المنطقة الزمنية', createdAt:'تاريخ الإنشاء', nextBill:'تاريخ الفاتورة', daysLeft:'يوم متبقي', loading:'جارٍ التحميل...', noAct:'افتح حساب إعلاني لرؤية المعلومات', noTok:'تعذّر الحصول على رمز FB.\nيرجى تسجيل الدخول إلى Facebook.', upTitle:'ترقية Premium', upDesc:'فتح جميع الميزات', upBtn:'ترقية', updated:'تحديث:', visTitle:'عرض المقاييس' },
  }

  /* ─── Currencies ─── */
  const CURRENCIES = [
    { v:'default', l:'Default' },
    { v:'VND', l:'VND – Việt Nam đồng' }, { v:'BILL', l:'VND*' }, { v:'USD', l:'USD – US Dollar' },
    { v:'EUR', l:'EUR – Euro' }, { v:'GBP', l:'GBP – British Pound' },
    { v:'JPY', l:'JPY – Japanese Yen' }, { v:'KRW', l:'KRW – Korean Won' },
    { v:'THB', l:'THB – Thai Baht' }, { v:'IDR', l:'IDR – Indonesian Rupiah' },
    { v:'MYR', l:'MYR – Malaysian Ringgit' }, { v:'PHP', l:'PHP – Philippine Peso' },
    { v:'SGD', l:'SGD – Singapore Dollar' }, { v:'TWD', l:'TWD – Taiwan Dollar' },
    { v:'HKD', l:'HKD – Hong Kong Dollar' }, { v:'CNY', l:'CNY – Chinese Yuan' },
    { v:'AUD', l:'AUD – Australian Dollar' }, { v:'CAD', l:'CAD – Canadian Dollar' },
    { v:'BRL', l:'BRL – Brazilian Real' }, { v:'INR', l:'INR – Indian Rupee' },
    { v:'MXN', l:'MXN – Mexican Peso' }, { v:'SAR', l:'SAR – Saudi Riyal' },
    { v:'AED', l:'AED – UAE Dirham' }, { v:'EGP', l:'EGP – Egyptian Pound' },
    { v:'NGN', l:'NGN – Nigerian Naira' }, { v:'PKR', l:'PKR – Pakistani Rupee' },
    { v:'CLP', l:'CLP – Chilean Peso' }, { v:'COP', l:'COP – Colombian Peso' },
  ]

  const ROW_KEYS = ['name','bal','thr','adtrust','adtrustNew','spent','today','cur','card','admin','myRole','type','bm','timezone','createdAt','nextBill']

  /* ─── State ─── */
  let S = {
    open: localStorage.getItem('_adsmeta_col') !== '1',
    plan: null, planExpiry: null,
    spotlight: [], spotIdx: 0, _spotTimer: null,  // Spotlight remote-config (Đợt 2) — xoay vòng tin nổi bật
    promoBucket: null, refundDaysLeft: 0, isTeamMember: false, _spotSeen: null, _spotCurId: null,  // nhắm đối tượng (free/vepro/pro/allbought)
    actId: null, info: null, myId: null, bmAcct: null,
    realtime: localStorage.getItem('_adsmeta_rt') === '1',  // MẶC ĐỊNH TẮT — chỉ bật khi user chủ động (chống bắn FB ngầm)
    rtTimer: null,
    lang: localStorage.getItem('_adsmeta_lang') || 'VI',
    displayCurr: localStorage.getItem('_adsmeta_curr') || 'default',
    currColor: localStorage.getItem('_adsmeta_curr_color') !== '0',  // tô màu badge giá trị quy đổi
    theme: localStorage.getItem('_adsmeta_theme') || 'auto',
    loading: false,
    settingsOpen: false,
    langOpen: false,
    currOpen: false,
    usdRates: null, usdRatesTime: 0,
    bill: null,  // tỷ giá BÁN + %biên (báo khách) — bridge amsbridge.js đẩy vào chrome.storage
    newLimit: null,  // { actId, raw } — "Limit" (formatted_dsl) fetched via billing GraphQL
    tab: 'info',
    uidResults: [],
    visRows: (() => { const DEF = { name:false, nextBill:false }; try { const v = JSON.parse(localStorage.getItem('_amsb_vis') || 'null'); return v || DEF } catch { return { name:false, nextBill:false } } })()
      || ROW_KEYS.reduce((o, k) => ({ ...o, [k]: true }), {}),
    ratingStars: parseInt(localStorage.getItem('_amsb_rating_stars') || '0') || 0,
    ratingSubmitting: false,
    ratingDone: false,
    ratingExisting: null,
    cwsOpened: false,
    cwsClickedAt: 0,
    cwsCountdown: 0,
    cwsTimer: null,
  }

  const lbl = () => LBL[S.lang] || LBL.VI
  const curLangObj = () => LANGS.find(l => l.code === S.lang) || LANGS[0]

  // Báo khách (VND*): nạp tỷ giá bán/biên từ chrome.storage (bridge adsmeta.io) + cập nhật live khi user đổi
  function _loadBill() {
    try { chrome.storage.local.get(['_ams_bill'], r => { if (r && r._ams_bill) { S.bill = r._ams_bill; try { if (S.info) renderBody() } catch (e) {} } }) } catch (e) {}
  }
  try { chrome.storage.onChanged.addListener((ch, area) => { if (area === 'local' && ch._ams_bill) { S.bill = ch._ams_bill.newValue || null; try { if (S.info) renderBody() } catch (e) {} } }) } catch (e) {}
  _loadBill()
  const effectiveCurr = (infoCurr) => S.displayCurr !== 'default' ? S.displayCurr : (infoCurr || 'VND')
  const vis = (k) => S.visRows[k] !== false

  function actFromUrl() {
    const p = new URLSearchParams(location.search)
    // billing_hub pages use payment_account_id or asset_id
    const id = p.get('act') || p.get('asset_id') || p.get('payment_account_id')
    if (id) return id.replace(/^act_/, '')
    const m = location.href.match(/act[=_](\d+)/)
    return m ? m[1] : null
  }

  /* ─── Token ─── */
  function tokenFromPageHtml() {
    // Primary: EAA token in page outerHTML (fresh, works for Graph API with credentials)
    const m = document.documentElement.outerHTML.match(/"(EAA[A-Za-z0-9_-]{20,})"/)
    if (m?.[1]) return m[1]
    // Fallback: window.__accessToken in inline script tags
    for (const sc of document.scripts) {
      if (sc.src) continue
      const m2 = sc.textContent.match(/window\.__accessToken\s*=\s*"([^"]+)"/)
      if (m2?.[1]) return m2[1]
    }
    return null
  }

  function getToken() {
    return new Promise(res => {
      // Priority 1: token stored by inject.js (reads window.__accessToken — real user token)
      chrome.storage.local.get(['fb_token','fb_token_time'], items => {
        // Hạn 12h — ĐỒNG BỘ với SW (GET_FB_TOKEN/SW_GET_FB_TOKEN) + dashboard, để billing tái dùng
        // đúng token app/Ads Manager đã cache (trước 2h → token 2–12h tuổi bị bỏ → billing trắng token).
        if (items.fb_token && items.fb_token_time && Date.now() - items.fb_token_time < 43200000)
          return res(items.fb_token)
        // Priority 2: fallback to EAA regex on outerHTML
        const fresh = tokenFromPageHtml()
        if (fresh) {
          chrome.storage.local.set({ fb_token: fresh, fb_token_time: Date.now() })
          return res(fresh)
        }
        // Priority 3: ask the background SW. It can fetch adsmanager cross-origin (no CORS)
        // and returns a token cached up to 12h — works on pages like billing_hub where
        // window.__accessToken isn't exposed and the DOM has no EAA token.
        chrome.runtime.sendMessage({ type: 'SW_GET_FB_TOKEN' }, r => {
          if (chrome.runtime.lastError) return res(null)
          res(r && r.token ? r.token : null)
        })
      })
    })
  }

  // FB CSRF token (fb_dtsg) for GraphQL billing calls — stored by content.js, fallback to page HTML
  function getFbdt() {
    return new Promise(res => {
      chrome.storage.local.get(['fb_fbdt'], items => {
        if (items.fb_fbdt) return res(items.fb_fbdt)
        try {
          // Key ĐÚNG của FB là "DTSGInitialData" (trước ghi "DTSGInitData" thiếu "ial" → không khớp →
          // getFbdt trả null → dòng "Limit" kẹt spinner). Thêm fallback name="fb_dtsg".
          const html = document.documentElement.outerHTML
          let m = html.match(/"DTSGInitialData",\[\],\{"token":"([^"]+)"/)
          if (!m) m = html.match(/name="fb_dtsg"\s+value="([^"]+)"/)
          res(m ? m[1] : null)
        } catch { res(null) }
      })
    })
  }

  // "Limit" (formatted_dsl) — only exposed via internal billing GraphQL, not Graph API.
  // Mirrors the old getBillingExtra: digits-only parse, then toNative handles minor→major units.
  async function fetchNewLimit(actId, attempt = 0) {
    // Chỉ bỏ qua khi đã có KẾT QUẢ CHẮC CHẮN (done): giá trị, hoặc response hợp lệ xác nhận CHƯA đặt limit.
    // Lỗi tạm (mạng/token/rate-limit) KHÔNG cache '—' vĩnh viễn nữa → có retry (trước đây: fail 1 lần là kẹt '—').
    if (S.newLimit && S.newLimit.actId === actId && S.newLimit.done) return
    const finalize = raw => { S.newLimit = { actId, raw, done: true }; if (S.open && S.info && S.actId === actId) renderBody() }
    const retry = () => { if (attempt < 3) setTimeout(() => { if (S.actId === actId) fetchNewLimit(actId, attempt + 1) }, 1200 * (attempt + 1)); else finalize(null) }
    try {
      const fbdt = await getFbdt()
      if (!fbdt) return retry()   // chưa lấy được fb_dtsg → thử lại (giữ spinner), đừng vội '—'
      const fd = new FormData()
      fd.append('fb_dtsg', fbdt)
      fd.append('doc_id', '6401661393282937')
      fd.append('variables', `{"assetID":${actId}}`)
      const res = await fetch(`${window.location.origin}/api/graphql`, {
        method: 'POST', credentials: 'include', body: fd,
      })
      if (!res.ok) return retry()   // HTTP lỗi (rate-limit…) → thử lại
      const text = await res.text()
      if (!text.includes('"formatted_dsl"')) return finalize(null)   // response OK nhưng TK CHƯA đặt limit → '—' (đúng, không retry)
      const formatted = (text.split('"formatted_dsl":"')[1] || '').split('",')[0]
      const digits = formatted.replace(/\\u[\dA-Fa-f]{4}/g, '').replace(/[^\d]/g, '')
      finalize(digits === '' ? null : Number(digits))
    } catch {
      retry()   // lỗi mạng → thử lại
    }
  }

  // "Chi tiêu" = tổng chi tiêu thực qua Insights date_preset(maximum) (~37 tháng gần nhất, khớp Reports).
  // Khác amount_spent (bị reset theo spend cap). spend trả về ở đơn vị tiền chính (major), dùng useRound.
  async function fetchSpendMax(actId, token) {
    if (S.spendMax && S.spendMax.actId === actId) return  // cache theo account
    try {
      const GRAPH = 'https://graph.facebook.com/v19.0'
      const r = await directFetch(`${GRAPH}/act_${actId}/insights?date_preset=maximum&fields=spend&access_token=${token}`)
      const spend = r?.data?.[0]?.spend
      S.spendMax = { actId, raw: spend == null ? null : Number(spend) }
      if (S.open && S.info && S.actId === actId) renderBody()
    } catch {
      S.spendMax = { actId, raw: null }
    }
  }

  // "BM" = SỐ TKQC mà BM sở hữu account này đang quản lý (owned_ad_accounts của owner_business).
  // Trước đây đếm nhầm /me/businesses (số BM của user) rồi gắn nhãn "TK" → sai. Nay đếm đúng + summary.
  async function fetchBmAcctCount(actId, ownerBizId, token) {
    if (S.bmAcct && S.bmAcct.actId === actId) return  // cache theo account
    try {
      const GRAPH = 'https://graph.facebook.com/v19.0'
      const r = await directFetch(`${GRAPH}/${ownerBizId}/owned_ad_accounts?fields=id&limit=1&summary=true&access_token=${token}`)
      const total = r?.summary?.total_count
      S.bmAcct = { actId, raw: total == null ? null : Number(total) }
      if (S.open && S.info && S.actId === actId) renderBody()
    } catch {
      S.bmAcct = { actId, raw: null }
    }
  }

  // Direct fetch from content script — carries FB session cookies to graph.facebook.com
  function directFetch(url) {
    return fetch(url, {
      credentials: 'include',
      headers: { 'Referer': 'https://business.facebook.com/adsmanager/manage/accounts' },
    }).then(r => r.json())
  }

  // Background fetch — for non-FB URLs (fx-rates, etc.)
  function bgFetch(url) {
    return new Promise((res, rej) => {
      chrome.runtime.sendMessage({ type:'FETCH', url }, r => {
        if (chrome.runtime.lastError) return rej(chrome.runtime.lastError)
        if (!r?.ok) return rej(new Error(r?.error || 'fetch failed'))
        try { res(JSON.parse(r.data)) } catch(e) { rej(e) }
      })
    })
  }

  async function fetchUsdRates() {
    if (S.usdRates && Date.now() - S.usdRatesTime < 3600000) return S.usdRates
    try {
      // Backend /api/fx-rates returns { VND:1, USD:25490, EUR:27600, ... } — 1 unit = X VND
      // Convert to extension format: { USD:1, VND:25490, EUR:0.924, ... } — 1 USD = X other
      const r = await bgFetch('https://adsmeta.io/api/fx-rates')
      if (r && r.USD) {
        const usdVnd = r.USD
        const usdRates = { USD: 1, VND: usdVnd }
        for (const [cur, vndPer] of Object.entries(r)) {
          if (cur !== 'VND' && cur !== 'USD' && vndPer > 0) usdRates[cur] = usdVnd / vndPer
        }
        S.usdRates = usdRates
        S.usdRatesTime = Date.now()
        if (S.open && S.info) renderBody()
      }
    } catch {}
    return S.usdRates
  }

  /* ─── UID Lookup ─── */
  async function lookupUids(inputs, token) {
    const GAPI = 'https://graph.facebook.com/v19.0'
    const results = []
    for (const raw of inputs) {
      const inp = raw.trim()
      if (!inp) continue
      const profMatch = inp.match(/profile\.php[?&]id=(\d+)/)
      if (profMatch) {
        try {
          const d = await directFetch(`${GAPI}/${profMatch[1]}?fields=id,name&access_token=${token}`)
          results.push({ input: inp, uid: d.id || profMatch[1], name: d.name || '', type: 'Profile' })
        } catch { results.push({ input: inp, uid: profMatch[1], name: '', type: 'Profile' }) }
        continue
      }
      const isGroup = /facebook\.com\/groups\//i.test(inp)
      let slug = inp.replace(/https?:\/\/[^/]*facebook\.com\//i, '').replace(/\/$/, '').split(/[?&#]/)[0]
      slug = slug.replace(/^(?:groups|pages)\/[^/]+\//, '').replace(/^(?:groups|pages)\//, '')
      if (!slug || slug === 'home' || slug === 'feed') { results.push({ input: inp, uid: '—', name: 'URL không hợp lệ', type: '—', error: true }); continue }
      try {
        const d = await directFetch(`${GAPI}/${encodeURIComponent(slug)}?fields=id,name,fan_count,category&access_token=${token}`)
        if (d.id) {
          const type = isGroup ? 'Group' : (d.fan_count !== undefined || d.category) ? 'Page' : 'Profile'
          results.push({ input: inp, uid: d.id, name: d.name || '', type })
        } else {
          results.push({ input: inp, uid: '—', name: 'Không tìm thấy', type: '—', error: true })
        }
      } catch (e) {
        const msg = (e?.message || 'Lỗi').slice(0, 50)
        results.push({ input: inp, uid: '—', name: msg, type: '—', error: true })
      }
    }
    return results
  }

  function renderUidPanel() {
    if (!bodyEl) return
    const dark = resolveTheme() === 'dark'
    const txt = (s) => dark ? '#e2e8f0' : '#1a0a3e'
    const sub = dark ? '#9ca3af' : '#6b7280'
    const border = dark ? '#1e3a5f' : '#e8f0fe'
    const bg2 = dark ? '#1e1b2e' : '#f8faff'

    bodyEl.innerHTML = `
      <div style="padding:10px 11px;display:flex;flex-direction:column;gap:8px">
        <div style="font-size:12px;font-weight:700;color:${dark?'#a78bfa':'#1a0a3e'}">🔍 Tra cứu UID Facebook</div>
        <textarea id="__amsb-uid-input" class="__amsb-uid-input" placeholder="Nhập URL, username hoặc ID\n(mỗi dòng 1 mục)"></textarea>
        <button id="__amsb-uid-go" class="__amsb-uid-go">Tra cứu</button>
        <div id="__amsb-uid-out"></div>
      </div>
    `
    const inp = document.getElementById('__amsb-uid-input')
    const btn = document.getElementById('__amsb-uid-go')
    const out = document.getElementById('__amsb-uid-out')

    if (S.uidResults?.length) renderUidResults(S.uidResults, out, dark)

    btn.addEventListener('click', async () => {
      const lines = inp.value.split('\n').map(s => s.trim()).filter(Boolean)
      if (!lines.length) return
      btn.disabled = true
      btn.innerHTML = '<span style="display:inline-block;width:11px;height:11px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:_amsb_sp .7s linear infinite;vertical-align:middle;margin-right:5px"></span>Đang tra...'
      out.innerHTML = ''
      const token = await getToken()
      if (!token) {
        out.innerHTML = `<div style="color:#ef4444;font-size:11px;padding:4px 0">⚠ Không lấy được token FB.</div>`
        btn.disabled = false; btn.textContent = 'Tra cứu'; return
      }
      const results = await lookupUids(lines, token)
      S.uidResults = results
      renderUidResults(results, out, dark)
      btn.disabled = false; btn.textContent = 'Tra cứu'
    })
  }

  function renderUidResults(results, out, dark) {
    if (!results.length) return
    const allUids = results.filter(r => !r.error).map(r => r.uid).join('\n')
    const rows = results.map(r => `
      <div class="__amsb-uid-row">
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;color:${dark?'#6b7280':'#9ca3af'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escH(r.input.length > 35 ? '…' + r.input.slice(-32) : r.input)}</div>
          ${r.error
            ? `<div style="font-size:11px;color:#ef4444;margin-top:2px">${escH(r.name)}</div>`
            : `<div style="display:flex;align-items:center;gap:4px;margin-top:2px;flex-wrap:wrap">
                <span style="font-size:12px;font-weight:700;color:${dark?'#60a5fa':'#1877F2'};font-family:monospace">${escH(r.uid)}</span>
                <span style="font-size:9px;background:${dark?'#1e3a5f':'#eff6ff'};color:${dark?'#93c5fd':'#1877F2'};padding:1px 5px;border-radius:4px">${escH(r.type)}</span>
                ${r.name ? `<span style="font-size:9px;color:${dark?'#9ca3af':'#6b7280'}">${escH(r.name.length > 20 ? r.name.slice(0,20)+'…' : r.name)}</span>` : ''}
              </div>`
          }
        </div>
        ${!r.error ? `<button class="__amsb-uid-copy-btn" data-uid="${escH(r.uid)}">Copy</button>` : ''}
      </div>
    `).join('')

    out.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-size:10px;color:${dark?'#9ca3af':'#6b7280'}">${results.length} kết quả</span>
        ${allUids ? `<button id="__amsb-uid-copy-all" style="font-size:10px;font-weight:600;padding:2px 8px;background:${dark?'#1e3a5f':'#eff6ff'};color:${dark?'#93c5fd':'#1877F2'};border:1px solid ${dark?'#2563eb':'#bfdbfe'};border-radius:5px;cursor:pointer">Copy tất cả</button>` : ''}
      </div>
      ${rows}
    `
    out.querySelectorAll('.__amsb-uid-copy-btn').forEach(b => {
      b.addEventListener('click', () => {
        navigator.clipboard.writeText(b.dataset.uid).catch(() => {})
        const orig = b.textContent; b.textContent = '✓'; setTimeout(() => { b.textContent = orig }, 1200)
      })
    })
    document.getElementById('__amsb-uid-copy-all')?.addEventListener('click', () => {
      navigator.clipboard.writeText(allUids).catch(() => {})
      const el = document.getElementById('__amsb-uid-copy-all')
      if (el) { el.textContent = '✓ Đã copy'; setTimeout(() => { el.textContent = 'Copy tất cả' }, 1200) }
    })
  }

  /* ─── Font: ARIAL (y hệt SMIT) — font có sẵn 100% máy, không tải nên KHÔNG dính CSP billing, đồng nhất mọi trang ─── */
  const FB_FONT = "Arial,Helvetica,sans-serif"

  /* ─── CSS ─── */
  const cssEl = document.createElement('style')
  cssEl.textContent = `
    #__amsb {
      position: fixed; bottom: 20px; right: 20px; z-index: 2147483647;
      font-family: ${FB_FONT};
      font-size: 13px; line-height: 1.4; display: flex; flex-direction: column;
      align-items: flex-end; pointer-events: none;
    }
    #__amsb * { box-sizing: border-box; }

    #__amsb-mini {
      pointer-events: all; cursor: pointer; user-select: none;
    }
    .__amsb-mini-hdr {
      display: flex; align-items: center; gap: 8px; padding: 8px 12px;
      background: linear-gradient(90deg,#1a4dd4 0%,#1877F2 100%); color: #fff; width: 100%;
    }
    #__amsb-mini .ico {
      width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
      background: rgba(255,255,255,.22); display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 900;
    }
    .__amsb-mini-title { flex: 1; font-size: 11px; color: rgba(255,255,255,.8); font-weight: 600; }
    .__amsb-mini-body { padding: 10px 16px 12px; width: 100%; }

    #__amsb-card {
      pointer-events: all; width: 342px; max-height: calc(100vh - 90px);
      background: #fff; border-radius: 16px;
      border: 1px solid rgba(24,119,242,.3);   /* viền khung mảnh */
      box-shadow: 0 14px 44px rgba(24,77,212,.2), 0 3px 10px rgba(0,0,0,.1);   /* bóng lớn brand → panel NỔI */
      display: flex; flex-direction: column; overflow: hidden;
      margin-bottom: 10px; animation: _amsb_in .18s ease;
    }
    @keyframes _amsb_in { from { opacity:0; transform:translateY(12px) scale(.97) } to { opacity:1; transform:none } }

    .__amsb-hdr {
      display: flex; align-items: center; gap: 5px; padding: 5px 10px;
      background: linear-gradient(90deg,#1a4dd4 0%,#1877F2 100%); flex-shrink: 0;
    }
    .__amsb-logo {
      display: flex; align-items: center; flex-shrink: 0;
    }
    .__amsb-hdr-name { flex: 1; color: #fff; font-weight: 700; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .__amsb-hdr-name { display: none !important; }
    .__amsb-logo { margin-right: auto !important; }
    .__amsb-hdr-upd { margin-left: auto; align-self: flex-end; font-size: 11px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; }
    .__amsb-hbtn {
      background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3);
      color: rgba(255,255,255,.9); cursor: pointer; padding: 4px 7px; border-radius: 9px;
      font-size: 13px; line-height: 1; transition: all .14s; flex-shrink: 0; font-weight: 700;
      box-shadow: 0 1px 2px rgba(0,0,0,.1);
    }
    .__amsb-hbtn:hover { background: rgba(255,255,255,.28); border-color: rgba(255,255,255,.55); color: #fff; transform: translateY(-1px); box-shadow: 0 3px 9px rgba(0,0,0,.2); }
    .__amsb-hbtn:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,.15); }
    #__amsb-flag { padding: 4px 7px !important; background: rgba(255,255,255,.15) !important; border: 1px solid rgba(255,255,255,.3) !important; }
    #__amsb-flag img { width: 22px; height: 15px; border-radius: 2px; display: block; object-fit: cover; }

    /* Language dropdown (fixed position to escape overflow:hidden) */
    #__amsb-lang-drop {
      position: fixed; z-index: 2147483648;
      background: #fff; border-radius: 10px; padding: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,.2); border: 1px solid #ede9ff;
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; width: 210px;
    }
    .__amsb-lang-item {
      display: flex; align-items: center; gap: 6px; padding: 6px 8px;
      border-radius: 7px; cursor: pointer; border: none; background: none;
      font-size: 12px; color: #333; transition: background .12s; text-align: left;
      white-space: nowrap; overflow: hidden;
    }
    .__amsb-lang-item:hover { background: #dbeafe; }
    .__amsb-lang-item.active { background: #1877F2; color: #fff; font-weight: 700; }
    .__amsb-lang-code {
      font-family: 'Noto Color Emoji','Apple Color Emoji','Twemoji Mozilla','Segoe UI Emoji',sans-serif !important;
      font-size: 16px; line-height: 1; flex-shrink: 0;
    }

    .__amsb-stp {
      position: fixed; z-index: 2147483648;
      background: #fff; border: 1px solid #ede9ff; border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,.2);
      padding: 10px 11px; width: 240px; max-height: 62vh; overflow-y: auto;
    }
    .__amsb-stp-title { font-size: 10px; font-weight: 700; color: #1877F2; text-transform: uppercase; letter-spacing: .4px; margin: 0 0 7px; }
    .__amsb-vis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
    .__amsb-vis-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #444; cursor: pointer; user-select: none; }
    .__amsb-vis-item input { accent-color: #1877F2; cursor: pointer; }

    .__amsb-toolbar {
      padding: 7px 11px; background: #faf8ff; flex-shrink: 0; box-sizing: border-box;
      display: flex; flex-direction: column; gap: 5px; border-bottom: 1px solid #ede9ff;
      border-left: 2px solid #1877F2; border-right: 2px solid #1877F2;
    }
    .__amsb-trow { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .__amsb-trow-split { gap: 10px; }
    .__amsb-thalf { display: flex; align-items: center; justify-content: space-between; gap: 6px; flex: 1 1 0; min-width: 0; }
    .__amsb-thalf .__amsb-tlabel { font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .__amsb-tlabel { font-size: 11px; color: #3d3d4e; font-weight: 700 !important; }
    .__amsb-toggle-wrap { position: relative; width: 34px; height: 16px; flex-shrink: 0; }
    .__amsb-toggle-wrap input { opacity: 0; width: 0; height: 0; }
    .__amsb-slider { position: absolute; inset: 0; background: #ddd; border-radius: 16px; cursor: pointer; transition: background .2s; }
    .__amsb-slider:before { content:''; position: absolute; width: 12px; height: 12px; left: 2px; top: 2px; background: #fff; border-radius: 50%; transition: transform .2s; box-shadow: 0 1px 3px rgba(0,0,0,.25); }
    .__amsb-toggle-wrap input:checked + .__amsb-slider { background: #1877F2; }
    .__amsb-toggle-wrap input:checked + .__amsb-slider:before { transform: translateX(18px); }
    .__amsb-select {
      border: 1px solid #d8d3f0; border-radius: 5px; font-size: 11px;
      padding: 2px 5px; background: #fff; cursor: pointer; color: #333; outline: none; max-width: 145px;
    }
    .__amsb-curr-btn {
      display: flex; align-items: center; gap: 5px;
      border: 1px solid #e2e0f5; border-radius: 9px;
      font-size: 11px; padding: 4px 9px 4px 8px; font-weight: 600;
      background: #fff; cursor: pointer; color: #333;
      max-width: 145px; white-space: nowrap; overflow: hidden; font-family: inherit;
      box-shadow: 0 1px 2px rgba(24,77,212,.08); transition: all .14s;
    }
    .__amsb-curr-btn:hover { border-color: #1877F2; box-shadow: 0 3px 9px rgba(24,119,242,.2); transform: translateY(-1px); }
    .__amsb-curr-btn:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(24,77,212,.12); }
    .__amsb-curr-btn-txt { overflow: hidden; text-overflow: ellipsis; max-width: 108px; }
    #__amsb-curr-drop {
      position: fixed; z-index: 2147483647;
      background: #fff; border-radius: 8px; padding: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,.2); border: 1px solid #ede9ff;
      max-height: 220px; overflow-y: auto; width: 210px;
    }
    .__amsb-curr-item {
      display: flex; align-items: center; gap: 6px;
      padding: 5px 8px; border-radius: 5px; cursor: pointer;
      border: none; background: none; font-size: 11px; color: #333;
      width: 100%; text-align: left; transition: background .12s; white-space: nowrap; font-family: inherit;
    }
    .__amsb-curr-item:hover { background: #dbeafe; }
    .__amsb-curr-item.active { background: #1877F2; color: #fff; font-weight: 700; }

    .__amsb-idrow {
      display: flex; align-items: center; gap: 6px; padding: 5px 11px;
      background: #faf8ff; border-bottom: 1px solid #ede9ff;
      font-family: monospace; font-size: 11px; color: #1a0a3e; font-weight: 700 !important;
    }
    .__amsb-idrow .idtxt { flex: 1; }
    .__amsb-copy {
      background: none; border: 1px solid #d8d3f0; border-radius: 4px;
      font-size: 10px; padding: 1px 6px; cursor: pointer; color: #888;
      font-family: inherit; transition: all .12s;
    }
    .__amsb-copy:hover { border-color: #1877F2; color: #1877F2; }
    .__amsb-live { font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 10px; color: #fff; white-space: nowrap; }

    .__amsb-body { flex: 1; overflow-y: auto; background: #fff; padding: 0; position: relative; border-left: 2px solid #1877F2; border-right: 2px solid #1877F2; box-sizing: border-box; }
    .__amsb-body::after { content:''; position:absolute; right:5px; bottom:4px; width:118px; height:32px; background:url('${chrome.runtime.getURL('icons/logo-full.svg')}') no-repeat right bottom/contain; opacity:.05; pointer-events:none; z-index:0; }
    /* Chấm LIVE nhấp nháy cạnh logo */
    .__amsb-livedot { width:7px; height:7px; border-radius:50%; background:#34d399; margin-left:7px; flex-shrink:0; box-shadow:0 0 0 0 rgba(52,211,153,.7); animation:__amsb_live 1.8s ease-out infinite; }
    @keyframes __amsb_live { 0%{box-shadow:0 0 0 0 rgba(52,211,153,.65)} 70%{box-shadow:0 0 0 7px rgba(52,211,153,0)} 100%{box-shadow:0 0 0 0 rgba(52,211,153,0)} }
    .__amsb-livedot.off { background:#cbd5e1; box-shadow:none; animation:none; }
    /* Loading: logo AdsMeta NẢY 3D (squash-stretch + bóng đất pulse → cảm giác nảy thật) */
    .__amsb-loadwrap { display:flex; flex-direction:column; align-items:center; gap:5px; }
    .__amsb-bounce { animation:__amsb_bounce .6s cubic-bezier(.5,.05,.5,.95) infinite; transform-origin:bottom center; will-change:transform; filter:drop-shadow(0 5px 7px rgba(24,77,212,.4)); }
    @keyframes __amsb_bounce { 0%,100%{transform:translateY(0) scaleY(.88) scaleX(1.1)} 14%{transform:translateY(0) scaleY(1) scaleX(1)} 50%{transform:translateY(-16px) scaleY(1.07) scaleX(.95)} }
    .__amsb-loadshadow { width:22px; height:5px; border-radius:50%; background:rgba(24,77,212,.32); animation:__amsb_shadow .6s cubic-bezier(.5,.05,.5,.95) infinite; }
    @keyframes __amsb_shadow { 0%,100%{transform:scale(1);opacity:.38} 50%{transform:scale(.5);opacity:.1} }
    /* FLASH số khi đổi (xanh=tăng, đỏ=giảm) */
    .__amsb-flash-up   { animation:__amsb_flashup   .85s ease-out; }
    .__amsb-flash-down { animation:__amsb_flashdown .85s ease-out; }
    @keyframes __amsb_flashup   { 0%,22%{background:#86efac;transform:scale(1.07)} 100%{transform:scale(1)} }
    @keyframes __amsb_flashdown { 0%,22%{background:#fca5a5;transform:scale(1.07)} 100%{transform:scale(1)} }
    /* SKELETON shimmer khi load */
    .__amsb-skel { padding:8px 12px; }
    .__amsb-skel-r { display:flex; align-items:center; gap:8px; padding:7px 0; }
    .__amsb-skel-ic, .__amsb-skel-lb, .__amsb-skel-vl, .__amsb-skel-sec { background:linear-gradient(90deg,#e8edf7 25%,#f5f8fd 37%,#e8edf7 63%); background-size:400% 100%; animation:__amsb_shimmer 1.3s ease-in-out infinite; }
    .__amsb-skel-ic { width:15px; height:15px; border-radius:50%; flex-shrink:0; }
    .__amsb-skel-lb { height:9px; width:70px; border-radius:5px; }
    .__amsb-skel-vl { height:12px; width:74px; border-radius:6px; margin-left:auto; }
    .__amsb-skel-sec { height:8px; width:78px; border-radius:5px; margin:10px 0 3px; }
    @keyframes __amsb_shimmer { 0%{background-position:100% 0} 100%{background-position:0 0} }
    /* Rows FULL-WIDTH sát 2 mép như v1 (bỏ vệt rail + card inset); độ nổi giữ ở panel ngoài */
    .__amsb-secgroup { display: contents; }
    .__amsb-secgroup .__amsb-row:last-child { border-bottom: none; }
    #__amsb[data-theme="dark"] .__amsb-body, #__amsb-card[data-theme="dark"] .__amsb-body { background: #1a1825 !important; }

    .__amsb-sec {
      font-size: 10px; font-weight: 700; color: #1877F2; letter-spacing: .6px; text-transform: uppercase;
      padding: 3px 11px 3px 12px;
      background: transparent;
    }

    .__amsb-row {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 13px; border-bottom: 1px solid #dbeafe;
      transition: background .1s; cursor: default;
    }
    .__amsb-row:hover { background: #dbeafe; }
    .__amsb-row svg { flex-shrink: 0; color: #4a76dd; }   /* icon tông brand nhẹ */
    .__amsb-rlabel { flex: 1; font-size: 13px; font-weight: 700 !important; color: #444 !important; white-space: nowrap; }
    .__amsb-rval { font-size: 14px !important; font-weight: 500 !important; color: #1a0a3e !important; text-align: right; max-width: 220px; white-space: nowrap; flex-shrink: 0; }

    /* Chi tiêu badge */
    .__amsb-spent-badge {
      background: linear-gradient(90deg,#0d5fd4,#1877F2);
      color: #fff; border-radius: 5px; padding: 2px 10px; font-weight: 700; font-size: 13px;
    }

    /* Days left chip */
    .__amsb-days {
      font-size: 10px; color: #1877F2; font-weight: 600;
      background: #dbeafe; border-radius: 4px; padding: 0 5px; margin-left: 4px; white-space: nowrap;
    }
    .__amsb-days.urgent { color: #dc2626; background: #fee2e2; }

    /* Upgrade — seamless full-width */
    .__amsb-upgrade {
      background: linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%) !important;
      padding: 10px 14px; display: flex; align-items: center; gap: 10px;
      flex-shrink: 0; text-decoration: none !important; transition: filter .15s;
      border-radius: 0 0 15px 15px;   /* bo góc đáy khớp thẻ (16px - 1px viền) → hết "lẹm góc" khi banner tràn nền */
    }
    .__amsb-upgrade:hover { filter: brightness(1.08); }
    .__amsb-upgrade-text { flex: 1; }
    .__amsb-upgrade-text p { color: #fff; font-size: 16px; font-weight: 800; margin: 0 0 2px; }
    .__amsb-upgrade-text span { color: rgba(255,255,255,.78); font-size: 10px; }
    .__amsb-upgrade-btn {
      background: rgba(255,255,255,.22); color: #fff;
      border: 1px solid rgba(255,255,255,.45); border-radius: 8px;
      padding: 6px 14px; font-size: 12px; font-weight: 800; white-space: nowrap; flex-shrink: 0;
      box-shadow: 0 4px 0 rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.35);
      text-shadow: 0 1px 2px rgba(0,0,0,.2);
      transition: transform .1s, box-shadow .1s; transform: translateY(0);
    }
    .__amsb-upgrade:hover .__amsb-upgrade-btn {
      transform: translateY(3px);
      box-shadow: 0 1px 0 rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.35);
    }
    .__amsb-promo-x {
      position: absolute; top: 6px; right: 8px;
      background: transparent; border: none; color: rgba(255,255,255,.75);
      font-size: 13px; line-height: 1; cursor: pointer; padding: 2px 4px;
      border-radius: 4px; transition: color .15s;
    }
    .__amsb-promo-x:hover { color: #fff; }
    /* Nút CTA promo — nhịp đập nhẹ + vầng sáng lan để gây chú ý (nút trắng trên nền màu) */
    .__amsb-cta { animation: __amsb_ctabeat 1.7s ease-in-out infinite; transform-origin: center right; will-change: transform, box-shadow; }
    .__amsb-cta:hover { animation-play-state: paused; }
    @keyframes __amsb_ctabeat {
      0%, 100% { transform: scale(1);     box-shadow: 0 0 0 0 rgba(255,255,255,.5); }
      50%      { transform: scale(1.035); box-shadow: 0 0 0 4px rgba(255,255,255,.14); }
    }

    /* Footer */
    .__amsb-footer {
      display: flex; align-items: center;
      background: linear-gradient(90deg,#1a4dd4 0%,#1877F2 100%);
      flex-shrink: 0; padding: 5px 8px; gap: 4px;
    }
    .__amsb-tab {
      padding: 4px 12px; font-size: 13px; font-weight: 700;
      color: rgba(255,255,255,.9); cursor: pointer; transition: all .15s; border-radius: 10px;
      background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3);
      box-shadow: 0 1px 2px rgba(0,0,0,.12);
    }
    .__amsb-tab:hover { color: #fff; background: rgba(255,255,255,.28); border-color: rgba(255,255,255,.55); transform: translateY(-1px); box-shadow: 0 3px 9px rgba(0,0,0,.22); }
    .__amsb-tab:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,.15); }
    .__amsb-reload {
      padding: 4px 8px; font-size: 13px; color: rgba(255,255,255,.9);
      cursor: pointer; transition: all .15s; line-height: 1; border-radius: 9px;
      background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3);
      box-shadow: 0 1px 2px rgba(0,0,0,.12);
    }
    .__amsb-reload:hover { color: #fff; background: rgba(255,255,255,.28); border-color: rgba(255,255,255,.55); transform: translateY(-1px); box-shadow: 0 3px 9px rgba(0,0,0,.22); }
    .__amsb-reload:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,.15); }
    .__amsb-ftime { flex: 1; text-align: right; font-size: 10px; color: #fff; padding-right: 6px; }

    /* Mini card — header timestamp row */
    #__amsb-mini-rt { flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 5px; }
    .__amsb-mts-lbl { font-size: 10px; color: rgba(255,255,255,.8); white-space: nowrap; }
    .__amsb-mts { font-size: 10px; color: #fde68a; white-space: nowrap; font-weight: 600; }
    .__amsb-mrefresh { background: none; border: none; color: #fde68a; cursor: pointer; font-size: 14px; line-height: 1; padding: 0 2px; flex-shrink: 0; transition: transform .3s; }
    .__amsb-mrefresh:hover { transform: rotate(180deg); color: #fff; }
    /* Mini card — stats body */
    .__amsb-mstats { display: flex; align-items: stretch; }
    .__amsb-mstat { display: flex; flex-direction: column; align-items: center; flex: 1; padding: 6px 0; }
    .__amsb-mstat-l { font-size: 12px; font-weight: 600; color: #444; margin-bottom: 6px; }
    .__amsb-mstat-v { font-size: 14px; font-weight: 700; color: #1a0a3e; }
    .__amsb-msep { width: 1px; background: #f0f0f0; align-self: stretch; margin: 4px 0; }
    .__amsb-mrefresh:hover { background: rgba(255,255,255,.35); color: #fff; }

    .__amsb-msg { text-align: center; color: #aaa; font-size: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 230px; padding: 40px 12px 24px; }
    .__amsb-spin {
      display: inline-block; width: 18px; height: 18px;
      border: 2px solid #bfdbfe; border-top-color: #1877F2;
      border-radius: 50%; animation: _amsb_sp .7s linear infinite; margin-bottom: 8px;
    }
    .__amsb-ispin {
      display: inline-block; width: 13px; height: 13px;
      border: 2px solid #bfdbfe; border-top-color: #1877F2;
      border-radius: 50%; animation: _amsb_sp .7s linear infinite; vertical-align: middle;
    }
    @keyframes _amsb_sp { to { transform: rotate(360deg) } }

    /* ── Active tab indicator ── */
    .__amsb-tab.active { color: #fff; background: rgba(255,255,255,.18); border: 1.5px solid rgba(255,255,255,.35); }

    /* ── Campaign rows ── */
    .__amsb-camp-row { display: flex; flex-direction: column; padding: 7px 11px; border-bottom: 1px solid #dbeafe; gap: 2px; cursor: default; transition: background .1s; }
    .__amsb-camp-row:hover { background: #f8f5ff; }
    .__amsb-camp-top { display: flex; align-items: center; gap: 5px; overflow: hidden; }
    .__amsb-camp-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .__amsb-camp-name { font-size: 11.5px; font-weight: 600; color: #1a0a3e; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .__amsb-camp-badge { font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 4px; flex-shrink: 0; }
    .__amsb-camp-stats { display: flex; align-items: center; gap: 6px; padding-left: 12px; flex-wrap: wrap; }
    .__amsb-camp-spend { font-size: 11px; font-weight: 700; color: #0d5fd4; }
    .__amsb-camp-meta { font-size: 10px; color: #9ca3af; }
    .__amsb-load-more { width: 100%; padding: 9px; border: 1px dashed #93c5fd; border-radius: 0; background: none; color: #1877F2; font-size: 11px; font-weight: 600; cursor: pointer; transition: background .1s; }
    .__amsb-load-more:hover { background: #f5f0ff; }
    .__amsb-camp-empty { text-align: center; padding: 28px 12px; color: #aaa; font-size: 12px; }

    #__amsb-toggle-tab {
      position: fixed; right: 0; bottom: 80px; z-index: 2147483646;
      width: 22px; height: 52px;
      background: linear-gradient(180deg,#1a4dd4,#1877F2);
      border: none; border-radius: 8px 0 0 8px;
      color: rgba(255,255,255,.85); font-size: 13px;
      cursor: pointer; pointer-events: all;
      box-shadow: -3px 2px 14px rgba(13,95,212,.4);
      display: flex; align-items: center; justify-content: center;
      transition: width .15s, background .15s, color .15s;
      padding: 0; line-height: 1; font-family: inherit;
    }
    #__amsb-toggle-tab:hover { width: 28px; background: linear-gradient(180deg,#1877F2,#1a4dd4); color: #fff; }

    /* ── Dark theme overrides ── */
    #__amsb[data-theme="dark"] #__amsb-card { background: #1a1825; box-shadow: 0 8px 40px rgba(0,0,0,.5); }
    #__amsb[data-theme="dark"] #__amsb-mini { background: #1a1825; box-shadow: 0 4px 20px rgba(0,0,0,.4); }
    #__amsb[data-theme="dark"] .__amsb-stp, #__amsb-stp[data-theme="dark"] { background: #1a1825; border-color: #1e3a5f; }
    #__amsb[data-theme="dark"] .__amsb-stp-title, #__amsb-stp[data-theme="dark"] .__amsb-stp-title { color: #a78bfa; }
    #__amsb-stp[data-theme="dark"] .__amsb-vis-item { color: #c4b5fd; }
    #__amsb[data-theme="dark"] .__amsb-vis-item { color: #c4b5fd; }
    #__amsb[data-theme="dark"] .__amsb-toolbar { background: #211f2e; border-color: #1e3a5f; }
    #__amsb[data-theme="dark"] .__amsb-tlabel { color: #c4b5fd !important; }
    #__amsb[data-theme="dark"] .__amsb-slider { background: #4a4270; }
    #__amsb[data-theme="dark"] .__amsb-curr-btn { background: #2a2739; border-color: #4a4270; color: #e2e8f0; }
    #__amsb[data-theme="dark"] .__amsb-curr-btn:hover { border-color: #a78bfa; }
    #__amsb[data-theme="dark"] .__amsb-idrow { background: #211f2e; border-color: #1e3a5f; color: #a78bfa !important; }
    #__amsb[data-theme="dark"] .__amsb-copy { border-color: #4a4270; color: #6b7280; }
    #__amsb[data-theme="dark"] .__amsb-copy:hover { border-color: #a78bfa; color: #a78bfa; }
    #__amsb[data-theme="dark"] .__amsb-row { border-color: #2d2848; }
    #__amsb[data-theme="dark"] .__amsb-row:hover { background: #2d2848; }
    #__amsb[data-theme="dark"] .__amsb-row svg { color: #6b7280; }
    #__amsb[data-theme="dark"] .__amsb-rlabel { color: #9ca3af !important; }
    #__amsb[data-theme="dark"] .__amsb-rval { color: #e2e8f0 !important; }
    #__amsb[data-theme="dark"] .__amsb-mstat-l { color: #9ca3af !important; }
    #__amsb[data-theme="dark"] .__amsb-mstat-v { color: #e2e8f0 !important; }
    #__amsb[data-theme="dark"] .__amsb-days { color: #a78bfa; background: #2d2848; }
    #__amsb[data-theme="dark"] .__amsb-days.urgent { color: #f87171; background: #3d1a1a; }
    #__amsb[data-theme="dark"] .__amsb-msg { color: #6b7280; }
    #__amsb[data-theme="dark"] .__amsb-spin { border-color: #1e3a5f; border-top-color: #1877F2; }
    #__amsb[data-theme="dark"] .__amsb-ispin { border-color: #1e3a5f; border-top-color: #1877F2; }
    #__amsb[data-theme="dark"] .__amsb-camp-row { border-color: #2d2848; }
    #__amsb[data-theme="dark"] .__amsb-camp-row:hover { background: #2d2848; }
    #__amsb[data-theme="dark"] .__amsb-camp-name { color: #e2e8f0; }
    #__amsb[data-theme="dark"] .__amsb-camp-spend { color: #a78bfa; }
    #__amsb[data-theme="dark"] .__amsb-camp-meta { color: #6b7280; }
    #__amsb[data-theme="dark"] .__amsb-load-more { border-color: #4a4270; color: #a78bfa; }
    #__amsb[data-theme="dark"] .__amsb-load-more:hover { background: #2d2848; }
    /* Billing mode: card lives outside #__amsb so dark theme applied via card[data-theme] */
    #__amsb-card[data-theme="dark"] { background: #1a1825; box-shadow: 0 2px 12px rgba(0,0,0,.5); }
    #__amsb-card[data-theme="dark"] .__amsb-row { border-color: #2d2848; }
    #__amsb-card[data-theme="dark"] .__amsb-row:hover { background: #2d2848; }
    #__amsb-card[data-theme="dark"] .__amsb-row svg { color: #6b7280; }
    #__amsb-card[data-theme="dark"] .__amsb-rlabel { color: #9ca3af !important; }
    #__amsb-card[data-theme="dark"] .__amsb-rval { color: #e2e8f0 !important; }
    #__amsb-card[data-theme="dark"] .__amsb-days { color: #a78bfa; background: #2d2848; }
    #__amsb-card[data-theme="dark"] .__amsb-msg { color: #6b7280; }
    #__amsb-card[data-theme="dark"] .__amsb-spin { border-color: #1e3a5f; border-top-color: #1877F2; }
    #__amsb[data-theme="dark"] .__amsb-camp-empty { color: #6b7280; }
    #__amsb[data-theme="dark"] .__amsb-msep { background: #1e3a5f; }
    #__amsb-lang-drop[data-theme="dark"] { background: #1a1825; border-color: #1e3a5f; box-shadow: 0 8px 32px rgba(0,0,0,.5); }
    #__amsb-lang-drop[data-theme="dark"] .__amsb-lang-item { color: #c4b5fd; }
    #__amsb-lang-drop[data-theme="dark"] .__amsb-lang-item:hover { background: #2d2848; }
    #__amsb-curr-drop[data-theme="dark"] { background: #1a1825; border-color: #1e3a5f; box-shadow: 0 8px 32px rgba(0,0,0,.5); }
    #__amsb-curr-drop[data-theme="dark"] .__amsb-curr-item { color: #c4b5fd; }
    #__amsb-curr-drop[data-theme="dark"] .__amsb-curr-item:hover { background: #2d2848; }

    /* ── UID lookup panel ── */
    .__amsb-uid-row { display:flex;align-items:start;gap:6px;padding:5px 0;border-bottom:1px solid #e8f0fe; }
    #__amsb[data-theme="dark"] .__amsb-uid-row { border-color:#1e3a5f; }
    .__amsb-uid-input { width:100%;box-sizing:border-box;height:75px;resize:none;padding:7px 9px;font-size:11px;border-radius:7px;border:1.5px solid #dbeafe;background:#f8faff;color:#1a0a3e;outline:none;font-family:monospace; }
    #__amsb[data-theme="dark"] .__amsb-uid-input { border-color:#1e3a5f;background:#1e1b2e;color:#e2e8f0; }
    .__amsb-uid-go { width:100%;padding:6px;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(90deg,#1a4dd4,#1877F2);border:none;border-radius:7px;cursor:pointer; }
    .__amsb-uid-copy-btn { flex-shrink:0;padding:2px 7px;font-size:10px;font-weight:600;color:#1877F2;background:#eff6ff;border:1px solid #bfdbfe;border-radius:5px;cursor:pointer; }
    #__amsb[data-theme="dark"] .__amsb-uid-copy-btn { color:#93c5fd;background:#1e3a5f;border-color:#1e3a5f; }

    /* ── Billing panel mode ── */
    #__amsb.billing-mode #__amsb-mini { display: none !important; }
    #__amsb.billing-mode .__amsb-toolbar { display: none !important; }
    #__amsb.billing-mode .__amsb-idrow { display: none !important; }
    #__amsb.billing-mode .__amsb-footer { display: none !important; }
    #__amsb.billing-mode #__amsb-settings { display: none !important; }
    #__amsb.billing-mode #__amsb-theme { display: none !important; }
    #__amsb.billing-mode #__amsb-close { display: none !important; }
    #__amsb.billing-mode #__amsb-reload-hdr { display: none !important; }
    #__amsb.billing-mode #__amsb-flag { display: none !important; }
    /* Billing footer — visible only in billing mode */
    #__amsb-billing-footer { display: none !important; }
    #__amsb.billing-mode #__amsb-billing-footer {
      display: flex !important; align-items: center; gap: 4px;
      background: linear-gradient(90deg,#1a4dd4 0%,#1877F2 100%);
      flex-shrink: 0; padding: 5px 8px;
    }
    #__amsb.billing-mode .__amsb-body { flex: 1 !important; max-height: none !important; overflow-y: auto !important; }
    #__amsb.billing-mode #__amsb-card { border-left: 2px solid rgba(24,119,242,.15) !important; }
    #__amsb.billing-mode .__amsb-billing-bar { display: flex !important; }
    .__amsb-billing-bar {
      display: none; align-items: center; justify-content: space-between;
      padding: 5px 13px; background: rgba(24,119,242,.06);
      border-bottom: 1px solid rgba(24,119,242,.12);
      font-size: 12px; flex-shrink: 0;
    }
    .__amsb-billing-bar-time { color: #888; }
    .__amsb-billing-bar-live { font-weight: 700; font-size: 12px; padding: 2px 9px; border-radius: 10px; color: #fff; white-space: nowrap; }
    .__amsb-sec-hidden { display: none !important; }
  `
  document.head.appendChild(cssEl)

  /* ─── SVG icons ─── */
  const ic = {
    person:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    wallet:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,
    bar:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    dollar:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    sun:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    globe:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    card:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    users:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    shield:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    building: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    network:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="4" cy="19" r="3"/><circle cx="20" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="12" y1="14" x2="4" y2="17"/><line x1="12" y1="14" x2="20" y2="17"/></svg>`,
    clock:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    calendar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    bill:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    gauge:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M3.5 12a8.5 8.5 0 1 1 17 0"/><path d="M13.4 11.6 18 7"/></svg>`,
    target:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    crown:    `<svg width="17" height="14" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;vertical-align:middle"><path d="M6 30L3 11l10 8L22 2l9 17 10-8L38 30H6z" fill="#FCD34D" stroke="#F59E0B" stroke-width="1.5" stroke-linejoin="round"/><rect x="5" y="27" width="34" height="5" rx="2.5" fill="#F59E0B"/><circle cx="3" cy="11" r="3.5" fill="#fff" stroke="#FCD34D" stroke-width="1"/><circle cx="22" cy="2" r="3.5" fill="#fff" stroke="#FCD34D" stroke-width="1"/><circle cx="41" cy="11" r="3.5" fill="#fff" stroke="#FCD34D" stroke-width="1"/><circle cx="3" cy="11" r="1.5" fill="#F472B6"/><circle cx="22" cy="2" r="1.5" fill="#A78BFA"/><circle cx="41" cy="11" r="1.5" fill="#F472B6"/></svg>`,
  }

  /* ─── Language dropdown (outside card to avoid clip) ─── */
  const langDrop = document.createElement('div')
  langDrop.id = '__amsb-lang-drop'
  langDrop.style.display = 'none'
  langDrop.innerHTML = LANGS.map(l => `
    <button class="__amsb-lang-item${l.code === S.lang ? ' active' : ''}" data-code="${l.code}">
      <img src="${l.flag}" width="20" height="13" style="border-radius:2px;flex-shrink:0">
      <span>${l.name}</span>
    </button>
  `).join('')
  document.body.appendChild(langDrop)

  /* ─── Skeleton shimmer (loading) ─── */
  const _skRow = '<div class="__amsb-skel-r"><span class="__amsb-skel-ic"></span><span class="__amsb-skel-lb"></span><span class="__amsb-skel-vl"></span></div>'
  const SKEL = `<div class="__amsb-skel">${_skRow.repeat(3)}<div class="__amsb-skel-sec"></div>${_skRow.repeat(4)}</div>`

  /* ─── DOM ─── */
  const root = document.createElement('div')
  root.id = '__amsb'
  // [FIX VỠ LAYOUT] Nhồi style layout tối quan trọng INLINE — trang billing_hub có CSP nghiêm, thẻ <style>
  // inject dễ bị chặn/áp trễ (React re-render) → card mất CSS → giãn full-width + chặn click. Inline luôn áp
  // ngay & thắng mọi CSS, đảm bảo: container fixed góc phải + XUYÊN CLICK (pointer-events:none) ở vùng trống.
  // !important trên inline THẮNG cả rule !important của FB (trừ 'display' — để JS toggle mở/đóng được).
  root.style.cssText = 'position:fixed !important;bottom:20px !important;right:20px !important;z-index:2147483647 !important;display:flex;flex-direction:column;align-items:flex-end;pointer-events:none !important;width:auto !important;max-width:360px !important;'
  if (isBillingPage) root.classList.add('billing-mode')
  root.innerHTML = `
    <div id="__amsb-card" style="display:none;width:342px !important;max-width:342px !important;flex:0 0 auto !important;box-sizing:border-box;pointer-events:auto !important">
      <div class="__amsb-hdr">
        <div class="__amsb-logo" id="__amsb-logo" style="display:flex;align-items:center"><a href="https://adsmeta.io" target="_blank" rel="noopener" title="Mở trang chủ AdsMeta.io" style="display:flex;align-items:center;text-decoration:none;cursor:pointer"><img src="${chrome.runtime.getURL('icons/logo-full.svg')}" height="22" style="width:auto;display:block;pointer-events:none"></a></div>
        <span class="__amsb-hdr-name" id="__amsb-acname">AdsMeta</span>
        <span class="__amsb-hdr-upd" id="__amsb-billing-upd" style="display:none">—</span>
        <button class="__amsb-hbtn" id="__amsb-reload-hdr" title="Làm mới số liệu" style="font-weight:700">↻</button>
        <button class="__amsb-hbtn" id="__amsb-settings" title="Cài đặt chỉ số">⚙</button>
        <button class="__amsb-hbtn" id="__amsb-close" title="Thu nhỏ">✕</button>
      </div>

      <div class="__amsb-stp" id="__amsb-stp" style="display:none">
        <p class="__amsb-stp-title" id="__amsb-stp-title">Hiển thị chỉ số</p>
        <div class="__amsb-vis-grid" id="__amsb-vis-grid"></div>
      </div>

      <div class="__amsb-toolbar">
        <div class="__amsb-trow __amsb-trow-split">
          <div class="__amsb-thalf">
            <span class="__amsb-tlabel" id="__amsb-rt-lbl">Cập nhật realtime</span>
            <span class="__amsb-livedot${S.realtime ? '' : ' off'}" id="__amsb-livedot" title="Trạng thái cập nhật realtime"></span>
            <label class="__amsb-toggle-wrap">
              <input type="checkbox" id="__amsb-rt-chk" ${S.realtime ? 'checked' : ''}>
              <span class="__amsb-slider"></span>
            </label>
          </div>
          <div class="__amsb-thalf" style="justify-content:flex-end">
            <button id="__amsb-rename-btn" class="__amsb-curr-btn" style="max-width:none;font-size:11px;padding:3px 8px;cursor:pointer">✏️ Đổi tên TK</button>
          </div>
        </div>
        <div class="__amsb-trow">
          <span class="__amsb-tlabel" id="__amsb-curr-lbl">Quy đổi tiền tệ</span>
          <button class="__amsb-curr-btn" id="__amsb-curr-btn">
            <img id="__amsb-curr-flag" width="16" height="11" style="border-radius:2px;flex-shrink:0">
            <span class="__amsb-curr-btn-txt" id="__amsb-curr-txt">Default</span>
          </button>
        </div>
        <div class="__amsb-trow" id="__amsb-rename-bar" style="display:none;gap:6px">
          <input id="__amsb-rename-input" type="text" placeholder="Tên TK mới…" style="flex:1;min-width:0;padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;font-size:12px;outline:none">
          <button id="__amsb-rename-ok" class="__amsb-curr-btn" style="max-width:none;padding:4px 10px;background:#10b981;border-color:#10b981;color:#fff;cursor:pointer">Lưu</button>
          <button id="__amsb-rename-cancel" class="__amsb-curr-btn" style="max-width:none;padding:4px 8px;cursor:pointer">Hủy</button>
        </div>
        <div id="__amsb-rename-msg" style="display:none;font-size:10px;padding:0 2px 3px"></div>
      </div>

      <div class="__amsb-idrow" style="display:none">
        <span class="idtxt" id="__amsb-actid">—</span>
        <button class="__amsb-copy" id="__amsb-cpid">copy</button>
        <span class="__amsb-live" id="__amsb-live" style="background:#10b981">● Live</span>
      </div>

      <div class="__amsb-body" id="__amsb-body">
        ${SKEL}
      </div>

      <div class="__amsb-footer">
        <button class="__amsb-tab" id="__amsb-tab-bill">Bill</button>
        <button class="__amsb-reload" id="__amsb-rating-btn" title="Đánh giá sMeta & nhận 25.000đ" style="position:relative;display:none">⭐<span id="__amsb-rating-dot" style="display:none;position:absolute;top:2px;right:2px;width:7px;height:7px;border-radius:50%;background:#ef4444"></span></button>
        <button class="__amsb-hbtn" id="__amsb-flag" title="Language"><img src="${curLangObj().flag}" width="20" height="13" style="border-radius:2px;display:block"></button>
        <button class="__amsb-hbtn" id="__amsb-theme" title="Giao diện" style="font-size:13px">☀</button>
        <span class="__amsb-ftime"><span id="__amsb-upd-lbl">Cập nhật:</span> <span id="__amsb-time">—</span></span>
      </div>

      <div id="__amsb-billing-footer">
        <button class="__amsb-tab" id="__amsb-bill-tab-ads">Ads</button>
        <button class="__amsb-reload" id="__amsb-bill-reload" title="Làm mới số liệu" style="font-weight:700">↻</button>
        <button class="__amsb-reload" id="__amsb-bill-settings" title="Tuỳ chỉnh chỉ số">⚙</button>
        <button class="__amsb-reload" id="__amsb-bill-theme" title="Giao diện">☀</button>
      </div>
    </div>

    <div id="__amsb-mini" style="pointer-events:all;cursor:pointer;user-select:none;width:44px;height:44px;flex-shrink:0;border-radius:50%;background:transparent;box-shadow:0 2px 14px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;transition:transform .15s,box-shadow .2s;overflow:hidden">
      <img src="${chrome.runtime.getURL('icons/icon128.png')}" style="width:44px;height:44px;display:block;border-radius:50%">
    </div>
  `
  document.body.appendChild(root)

  const card    = document.getElementById('__amsb-card')
  const mini    = document.getElementById('__amsb-mini')
  const bodyEl  = document.getElementById('__amsb-body')
  const timeEl    = document.getElementById('__amsb-time')
  const acnEl   = document.getElementById('__amsb-acname')
  const actidEl = document.getElementById('__amsb-actid')
  const liveEl  = document.getElementById('__amsb-live')
  const logoEl  = document.getElementById('__amsb-logo')
  const stPanel = document.getElementById('__amsb-stp')
  const visGrid = document.getElementById('__amsb-vis-grid')

  // Đặt sẵn chiều cao body theo SỐ DÒNG đang custom hiện → vừa khít, KHÔNG scroll, không giật khi tải.
  // Không cố định height card; chỉ reserve min-height (hơi thấp hơn thực tế để không bị dư khoảng trống).
  const INFO_ROW_KEYS = ['bal','thr','adtrust','adtrustNew','spent','today','card','admin','myRole','type','bm','timezone','createdAt','nextBill']
  function applyBodyMinHeight() {
    if (isBillingPage) { bodyEl.style.minHeight = ''; return }
    const visCount = INFO_ROW_KEYS.filter(k => S.visRows[k] !== false).length
    const ROW_H = 25, SEC_H = 18       // 1 hàng ~25px, 1 tiêu đề mục ~18px (padding đã giảm)
    const rows = visCount + 1          // +1 hàng Trạng Thái (luôn hiện)
    bodyEl.style.minHeight = (rows * ROW_H + 2 * SEC_H) + 'px'  // 2 mục: TRACKING + QUYỀN HẠN
  }
  applyBodyMinHeight()

  /* ─── Promo slot: dismiss + log click/dismiss — 1 listener duy nhất trên bodyEl ─── */
  bodyEl.addEventListener('click', e => {
    const x = e.target.closest('.__amsb-promo-x')
    if (x) {
      logSpot('dismiss', S._spotCurId, S.promoBucket)
      if (S._spotTimer) { clearInterval(S._spotTimer); S._spotTimer = null }   // dừng xoay vòng khi đã ẩn
      const today = new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10)
      try { localStorage.setItem('_amsb_promo_dismiss', today) } catch {}
      renderBody()
      return
    }
    const cta = e.target.closest('.__amsb-cta')
    if (cta) { logSpot('click', S._spotCurId, S.promoBucket) }   // để link tự mở tab mới
  })

  /* ─── Open / close ─── */
  let _cardManual = false  // true khi user tự kéo header đặt card → không auto đặt lại vị trí nữa
  // Giữ panel luôn nằm trong màn hình (sau khi kéo ở màn rộng rồi thu nhỏ cửa sổ → tránh ẩn mất)
  function clampRoot() {
    if (!root.style.left || root.style.left === 'auto') return // đang neo góc, không cần
    const w = root.offsetWidth, h = root.offsetHeight
    let l = parseFloat(root.style.left) || 0
    let t = parseFloat(root.style.top) || 0
    l = Math.max(8, Math.min(l, window.innerWidth  - w - 8))
    t = Math.max(8, Math.min(t, window.innerHeight - h - 8))
    root.style.left = l + 'px'; root.style.top = t + 'px'
  }

  // Tự tính vị trí CARD cạnh mini: ưu tiên trên nếu đủ chỗ, không thì dưới; canh mép phải theo mini.
  // Card dùng position:fixed (tách khỏi flex) → mini KHÔNG xê dịch khi mở/đóng card.
  function placeCard() {
    const m = mini.getBoundingClientRect()
    const vw = window.innerWidth, vh = window.innerHeight
    const GAP = 8, MG = 8
    const cw = card.offsetWidth  || 320
    const ch = card.offsetHeight || 420
    const above = m.top - MG
    const below = vh - m.bottom - MG
    let top
    if (ch + GAP <= above) top = m.top - GAP - ch        // đủ chỗ trên → đặt TRÊN mini
    else if (ch + GAP <= below) top = m.bottom + GAP      // đủ chỗ dưới → đặt DƯỚI mini
    else top = (above >= below) ? MG : vh - ch - MG        // chật cả 2 → bên rộng hơn, ép sát mép
    let left = m.right - cw                                // canh mép phải card = mép phải mini
    if (left < MG) left = m.left                           // tràn trái → canh mép trái mini
    left = Math.max(MG, Math.min(left, vw - cw - MG))
    top  = Math.max(MG, Math.min(top,  vh - ch - MG))
    card.style.left = Math.round(left) + 'px'
    card.style.top  = Math.round(top)  + 'px'
  }

  // BULLETPROOF billing layout: FB billing_hub (CSP + layout riêng) hay NUỐT CSS <style> của extension
  // → panel mất position/width → dàn full-width. Ép layout bằng JS CSSOM (JS style KHÔNG bị CSP chặn) + !important
  // → panel LUÔN là thẻ nổi 344px góc phải-trên, không bao giờ dàn full-width dù FB chặn CSS hay re-render.
  function forceBillingLayout() {
    root.style.setProperty('position', 'fixed', 'important')
    root.style.setProperty('top', '70px', 'important')
    root.style.setProperty('right', '16px', 'important')
    root.style.setProperty('bottom', 'auto', 'important')
    root.style.setProperty('left', 'auto', 'important')
    root.style.setProperty('width', '344px', 'important')
    root.style.setProperty('max-width', '344px', 'important')
    root.style.setProperty('max-height', 'calc(100vh - 86px)', 'important')
    root.style.setProperty('z-index', '2147483647', 'important')
    card.style.setProperty('position', 'static', 'important')
    card.style.setProperty('width', '100%', 'important')
    card.style.setProperty('max-width', '100%', 'important')
    card.style.setProperty('display', 'flex', 'important')
    card.style.setProperty('flex-direction', 'column', 'important')
    card.style.setProperty('box-sizing', 'border-box', 'important')
  }
  function setOpen(open) {
    if (isBillingPage) {
      forceBillingLayout()
      mini.style.display = 'none'
      return
    }
    S.open = open
    localStorage.setItem('_adsmeta_col', open ? '0' : '1')
    card.style.flexDirection = 'column'
    card.style.display = open ? 'flex' : 'none'
    // Mini là NEO cố định: card position:fixed (tách khỏi flex) nên mở/đóng KHÔNG làm mini xê dịch.
    // Mở → tự tính vị trí card cạnh mini. Đóng → mini ở nguyên chỗ.
    if (open) { _cardManual = false; card.style.position = 'fixed'; card.style.zIndex = '2147483647'; placeCard() }
    // Mini bubble LUÔN hiện — bấm để mở/đóng card.
    mini.style.display = 'flex'
    if (!S.info) {
      mini.style.alignItems = 'center'
      mini.style.justifyContent = 'center'
    }
  }
  setOpen(S.open)
  // Billing: ép lại layout vài lần + canh FB re-render (chỉ chỉnh CSS LOCAL, KHÔNG gọi FB → an toàn checkpoint).
  if (isBillingPage) {
    [120, 500, 1200, 2500].forEach(ms => setTimeout(forceBillingLayout, ms))
    try {
      // disconnect→force→reconnect: tránh vòng lặp tự-kích (force sửa style → observer lại chạy)
      const _mo = new MutationObserver(() => { _mo.disconnect(); forceBillingLayout(); _mo.observe(root, { attributes: true, attributeFilter: ['style', 'class'] }) })
      _mo.observe(root, { attributes: true, attributeFilter: ['style', 'class'] })
    } catch { /* ignore */ }
  }

  /* ─── Drag ─── */
  // Kéo MINI = di chuyển NEO (mini); card bám theo (placeCard). Vị trí chỉ giữ trong phiên — reload là về mặc định.
  let _drag = false, _ox = 0, _oy = 0
  function beginDrag(clientX, clientY) {
    _drag = true
    const r = root.getBoundingClientRect()
    root.style.bottom = 'auto'; root.style.right = 'auto'
    root.style.left = r.left + 'px'; root.style.top = r.top + 'px'
    _ox = clientX - r.left; _oy = clientY - r.top
    document.body.style.userSelect = 'none'
  }
  document.addEventListener('mousemove', e => {
    if (!_drag) return
    root.style.left = Math.max(0, Math.min(e.clientX - _ox, window.innerWidth  - root.offsetWidth))  + 'px'
    root.style.top  = Math.max(0, Math.min(e.clientY - _oy, window.innerHeight - root.offsetHeight)) + 'px'
    if (S.open) placeCard()   // card bám theo mini khi kéo
  })
  document.addEventListener('mouseup', () => {
    if (!_drag) return
    _drag = false; document.body.style.userSelect = ''
    // KHÔNG lưu localStorage → reload trang là mini về vị trí mặc định
  })
  // Kéo HEADER = di chuyển riêng CARD (mini đứng yên)
  let _cdrag = false, _cox = 0, _coy = 0
  const hdr = card.querySelector('.__amsb-hdr')
  if (hdr) {
    hdr.style.cursor = 'grab'
    hdr.addEventListener('mousedown', e => {
      if (isBillingPage) return   // billing: card NEO trong cột FB → KHÔNG cho kéo (kéo = reposition = vỡ)
      if (e.target.closest('button, a, input, select')) return
      e.preventDefault(); hdr.style.cursor = 'grabbing'
      _cardManual = true   // user tự đặt vị trí card → ngừng auto đặt lại
      const r = card.getBoundingClientRect()
      card.style.position = 'fixed'; card.style.left = r.left + 'px'; card.style.top = r.top + 'px'
      _cdrag = true; _cox = e.clientX - r.left; _coy = e.clientY - r.top
      document.body.style.userSelect = 'none'
    })
  }
  document.addEventListener('mousemove', e => {
    if (!_cdrag) return
    card.style.left = Math.max(8, Math.min(e.clientX - _cox, window.innerWidth  - card.offsetWidth  - 8)) + 'px'
    card.style.top  = Math.max(8, Math.min(e.clientY - _coy, window.innerHeight - card.offsetHeight - 8)) + 'px'
  })
  document.addEventListener('mouseup', () => {
    if (!_cdrag) return
    _cdrag = false; document.body.style.userSelect = ''; if (hdr) hdr.style.cursor = 'grab'
  })
  // Billing: logo KHÔNG mở tab trang chủ (tránh bấm nhầm khi thao tác trên panel neo) — con trỏ thường
  if (isBillingPage && logoEl) {
    logoEl.style.cursor = 'default'
    logoEl.addEventListener('click', e => { e.preventDefault(); e.stopPropagation() }, true)
  }
  mini.addEventListener('mousedown', e => {
    let moved = false
    const sx = e.clientX, sy = e.clientY
    function onMove(me) {
      if (!moved && (Math.abs(me.clientX - sx) > 5 || Math.abs(me.clientY - sy) > 5)) {
        moved = true; beginDrag(sx, sy)
      }
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      if (!moved) {
        if (S.open) setOpen(false)           // đang show → bấm mini = tắt
        else { setOpen(true); loadData(false) } // đang ẩn → bấm mini = show
      }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    e.preventDefault()
  })
  mini.addEventListener('mouseenter', () => { mini.style.transform = 'scale(1.1)'; mini.style.boxShadow = '0 4px 20px rgba(24,119,242,.65)' })
  mini.addEventListener('mouseleave', () => { mini.style.transform = 'scale(1)';   mini.style.boxShadow = '0 2px 14px rgba(24,119,242,.5)' })
  document.getElementById('__amsb-close').addEventListener('click', () => { setOpen(false); closeLangDrop(); closeCurrDrop() })
  document.getElementById('__amsb-reload-hdr')?.addEventListener('click', () => loadData(true))   // nút 🔄 header (Ads) — làm mới số liệu

  // Cửa sổ thu nhỏ khi panel đang mở (vị trí đã kéo) → kéo lại vào trong màn
  window.addEventListener('resize', () => { clampRoot(); if (S.open) placeCard() })

  /* ─── Theme ─── */
  const THEME_ICONS = { light: '☀', dark: '🌙', auto: '⚡' }
  const THEME_CYCLE = ['auto', 'light', 'dark']
  function resolveTheme() {
    if (S.theme === 'auto') return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return S.theme
  }
  function applyTheme() {
    const resolved = resolveTheme()
    root.setAttribute('data-theme', resolved)
    // In billing mode the card lives outside #__amsb — apply theme directly to card too
    if (isBillingPage) card.setAttribute('data-theme', resolved)
    document.getElementById('__amsb-lang-drop')?.setAttribute('data-theme', resolved)
    document.getElementById('__amsb-curr-drop')?.setAttribute('data-theme', resolved)
    document.getElementById('__amsb-stp')?.setAttribute('data-theme', resolved)
    const icon = THEME_ICONS[S.theme] || '☀'
    const btn = document.getElementById('__amsb-theme')
    if (btn) { btn.textContent = icon; btn.title = S.theme === 'auto' ? 'Tự động' : S.theme === 'dark' ? 'Tối' : 'Sáng' }
    const billBtn = document.getElementById('__amsb-bill-theme')
    if (billBtn) billBtn.textContent = icon
    window.dispatchEvent(new CustomEvent('_adsmeta_theme_change', { detail: resolved }))
  }
  document.getElementById('__amsb-theme').addEventListener('click', () => {
    S.theme = THEME_CYCLE[(THEME_CYCLE.indexOf(S.theme) + 1) % 3]
    localStorage.setItem('_adsmeta_theme', S.theme)
    applyTheme()
  })
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (S.theme === 'auto') applyTheme()
  })
  applyTheme()


  // Toggle tab removed — mini bubble is the only toggle

  /* ─── Language dropdown ─── */
  function closeLangDrop() {
    S.langOpen = false
    langDrop.style.display = 'none'
  }

  document.getElementById('__amsb-flag').addEventListener('click', (e) => {
    e.stopPropagation()
    if (S.langOpen) { closeLangDrop(); return }
    S.langOpen = true
    const btn = document.getElementById('__amsb-flag')
    const rect = btn.getBoundingClientRect()
    document.body.appendChild(langDrop)  // move to end of body — ensures it appears above card
    langDrop.style.top  = ''
    langDrop.style.bottom = (window.innerHeight - rect.top + 6) + 'px'
    langDrop.style.right = (window.innerWidth - rect.right - 10) + 'px'
    langDrop.style.display = 'grid'
    // Update active state
    langDrop.querySelectorAll('.__amsb-lang-item').forEach(b => {
      b.classList.toggle('active', b.dataset.code === S.lang)
    })
  })

  langDrop.addEventListener('click', e => {
    const btn = e.target.closest('[data-code]')
    if (!btn) return
    S.lang = btn.dataset.code
    localStorage.setItem('_adsmeta_lang', S.lang)
    document.getElementById('__amsb-flag').innerHTML = `<img src="${curLangObj().flag}" width="20" height="13" style="border-radius:2px;display:block">`
    closeLangDrop()
    updateStaticLabels()
    if (S.settingsOpen) renderSettingsPanel()
    renderBody()
    updateMiniPill()
    window.dispatchEvent(new CustomEvent('_adsmeta_lang_change', { detail: S.lang }))
  })

  document.addEventListener('click', (e) => {
    if (S.langOpen) closeLangDrop()
    if (S.currOpen) closeCurrDrop()
    if (S.settingsOpen && !stPanel.contains(e.target) && !(e.target.closest && e.target.closest('#__amsb-settings,#__amsb-bill-settings'))) {
      S.settingsOpen = false; stPanel.style.display = 'none'
    }
  })

  /* ─── Currency dropdown ─── */
  const currDrop = document.createElement('div')
  currDrop.id = '__amsb-curr-drop'
  currDrop.style.display = 'none'
  document.body.appendChild(currDrop)
  applyTheme() // re-apply now that currDrop exists

  function closeCurrDrop() {
    S.currOpen = false
    currDrop.style.display = 'none'
  }

  function buildCurrDrop() {
    currDrop.innerHTML = CURRENCIES.map(c => {
      const flag = CURR_FLAGS[c.v]
      const flagHtml = flag
        ? `<img src="${flag}" width="16" height="11" style="border-radius:2px;flex-shrink:0">`
        : `<span style="width:16px;display:inline-block;flex-shrink:0"></span>`
      return `<button class="__amsb-curr-item${S.displayCurr === c.v ? ' active' : ''}" data-val="${escH(c.v)}">${flagHtml}<span>${escH(c.l)}</span></button>`
    }).join('')
  }

  function updateCurrBtn() {
    const c = CURRENCIES.find(x => x.v === S.displayCurr) || CURRENCIES[0]
    const flagImg = document.getElementById('__amsb-curr-flag')
    const txt = document.getElementById('__amsb-curr-txt')
    const flag = CURR_FLAGS[S.displayCurr]
    if (flagImg) {
      if (flag) { flagImg.src = flag; flagImg.style.display = '' }
      else flagImg.style.display = 'none'
    }
    if (txt) txt.textContent = c.l
  }
  updateCurrBtn()

  document.getElementById('__amsb-curr-btn').addEventListener('click', e => {
    e.stopPropagation()
    if (S.currOpen) { closeCurrDrop(); return }
    if (S.langOpen) closeLangDrop()
    S.currOpen = true
    buildCurrDrop()
    const btn = document.getElementById('__amsb-curr-btn')
    const rect = btn.getBoundingClientRect()
    document.body.appendChild(currDrop)  // move to end of body — appears above card
    currDrop.style.top   = (rect.bottom + 4) + 'px'
    currDrop.style.right = (window.innerWidth - rect.right) + 'px'
    currDrop.style.display = 'block'
  })

  currDrop.addEventListener('click', e => {
    const item = e.target.closest('[data-val]')
    if (!item) return
    S.displayCurr = item.dataset.val
    try { localStorage.setItem('_adsmeta_curr', S.displayCurr) } catch {}
    window.dispatchEvent(new CustomEvent('_adsmeta_cur_change'))
    updateCurrBtn()
    closeCurrDrop()
    if (S.info) renderBody()
  })

  /* ─── Settings panel (⚙) ─── */
  function openSettingsPopup(btnId) {
    const btn = document.getElementById(btnId)
    if (!btn) return
    renderSettingsPanel()
    const rect = btn.getBoundingClientRect()
    document.body.appendChild(stPanel)
    stPanel.setAttribute('data-theme', root.getAttribute('data-theme') || 'light')
    // Show first to measure, then place above the button if there isn't room below
    stPanel.style.left = 'auto'
    stPanel.style.right = Math.max(8, window.innerWidth - rect.right - 2) + 'px'
    stPanel.style.top = '-9999px'
    stPanel.style.display = 'block'
    const panelH = stPanel.offsetHeight
    const spaceBelow = window.innerHeight - rect.bottom
    let top = spaceBelow >= panelH + 12 ? rect.bottom + 6 : rect.top - 6 - panelH
    top = Math.max(8, Math.min(top, window.innerHeight - panelH - 8))
    stPanel.style.top = top + 'px'
  }
  document.getElementById('__amsb-settings').addEventListener('click', (e) => {
    e.stopPropagation()
    S.settingsOpen = !S.settingsOpen
    if (S.settingsOpen) openSettingsPopup('__amsb-settings')
    else stPanel.style.display = 'none'
  })

  function renderSettingsPanel() {
    const L = lbl()
    document.getElementById('__amsb-stp-title').textContent = L.visTitle
    const defs = [
      { k:'name', l:L.name }, { k:'bal', l:L.bal }, { k:'thr', l:L.thr },
      { k:'adtrust', l:L.limitDay }, { k:'adtrustNew', l:L.limit },
      { k:'spent', l:L.spent }, { k:'today', l:L.today },
      { k:'card', l:L.card }, { k:'admin', l:L.admin }, { k:'myRole', l:L.myRole },
      { k:'type', l:L.type }, { k:'bm', l:L.bm },
      { k:'timezone', l:L.timezone }, { k:'createdAt', l:L.createdAt }, { k:'nextBill', l:L.nextBill },
    ]
    visGrid.innerHTML = defs.map(d => `
      <label class="__amsb-vis-item">
        <input type="checkbox" data-k="${d.k}" ${S.visRows[d.k] !== false ? 'checked' : ''}>
        ${escH(d.l)}
      </label>
    `).join('')
    visGrid.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('change', () => {
        S.visRows[inp.dataset.k] = inp.checked
        try { localStorage.setItem('_amsb_vis', JSON.stringify(S.visRows)) } catch {}
        applyBodyMinHeight()
        renderBody()
      })
    })
  }

  function updateStaticLabels() {
    const L = lbl()
    const el = (id) => document.getElementById(id)
    if (el('__amsb-rt-lbl'))   el('__amsb-rt-lbl').textContent   = L.rt
    if (el('__amsb-curr-lbl')) el('__amsb-curr-lbl').textContent = L.curr
    if (el('__amsb-upd-lbl'))  el('__amsb-upd-lbl').textContent  = L.updated
  }
  updateStaticLabels()

  /* ─── Realtime toggle — triggers immediate fetch on ON ─── */
  document.getElementById('__amsb-rt-chk').addEventListener('change', e => {
    S.realtime = e.target.checked
    localStorage.setItem('_adsmeta_rt', S.realtime ? '1' : '0')
    { const ld = document.getElementById('__amsb-livedot'); if (ld) ld.classList.toggle('off', !S.realtime) }
    window.dispatchEvent(new CustomEvent('_adsmeta_rt_change', { detail: S.realtime }))
    clearInterval(S.rtTimer)
    if (S.realtime) {
      loadData(true)
    }
  })

  updateMiniPill()

  /* ─── Rename ad account (Việc 2) — ô nhập INLINE trong panel; chỉ POST FB khi user bấm Lưu/Enter ─── */
  const renameBar   = document.getElementById('__amsb-rename-bar')
  const renameInput = document.getElementById('__amsb-rename-input')
  const renameMsg   = document.getElementById('__amsb-rename-msg')
  function showRenameMsg(text, ok) {
    if (!renameMsg) return
    renameMsg.textContent = text || ''
    renameMsg.style.color = ok ? '#10b981' : '#ef4444'
    renameMsg.style.display = text ? 'block' : 'none'
  }
  function curName() { return (S.info && S.info.name) ? S.info.name : (acnEl.textContent || '') }
  function openRename() {
    if (!renameBar) return
    renameInput.value = curName(); showRenameMsg('', true)
    renameBar.style.display = 'flex'; renameInput.focus(); renameInput.select()
  }
  function closeRename() { if (renameBar) renameBar.style.display = 'none'; showRenameMsg('', true) }
  async function doRename() {
    const trimmedName = (renameInput.value || '').trim()
    if (!trimmedName || trimmedName === curName()) { closeRename(); return }
    const token = await getToken()
    if (!token)   { showRenameMsg('Không lấy được token FB — hãy đăng nhập Facebook.', false); return }
    if (!S.actId) { showRenameMsg('Chưa nhận diện TKQC — mở Ads Manager rồi thử lại.', false); return }
    showRenameMsg('Đang đổi tên…', true)
    try {
      // POST THẬT lên v21.0 + body form (GIỐNG web app renameAdAccount) — qua BACKGROUND né CSRF.
      // FB đã BỎ GET+method=post tunneling (trả giả thành công / no response) → PHẢI POST thật, body STRING form.
      // Chỉ chạy khi user bấm Lưu (1 request, không nền/timer).
      const bare = String(S.actId).replace(/^act_/i, '')
      if (!/^\d+$/.test(bare)) { showRenameMsg('Chưa nhận diện đúng TKQC — mở Ads Manager rồi thử lại.', false); return }   // chặn actId lạ (an toàn URL)
      const body = 'name=' + encodeURIComponent(trimmedName) + '&access_token=' + encodeURIComponent(token)
      // Có timeout + bắt lastError → KHÔNG treo "Đang đổi tên…" nếu background/port chết.
      const raw = await new Promise((resolve) => {
        let done = false
        const to = setTimeout(() => { if (!done) { done = true; resolve(null) } }, 15000)
        try {
          chrome.runtime.sendMessage({ type: 'FB_FETCH', method: 'POST', url: `https://graph.facebook.com/v21.0/act_${bare}`, body }, (r) => {
            if (done) return; done = true; clearTimeout(to)
            resolve(chrome.runtime.lastError ? null : r)
          })
        } catch { if (!done) { done = true; clearTimeout(to); resolve(null) } }
      })
      let json = {}
      try { json = JSON.parse(raw || '{}') } catch { json = {} }
      const ok = json.success === true || Boolean(json.id)
      if (ok) {
        if (S.info) S.info.name = trimmedName
        acnEl.textContent = trimmedName
        showRenameMsg('✓ Đã đổi tên', true)
        setTimeout(() => { closeRename(); renderBody() }, 900)
      } else if (!raw) {
        showRenameMsg('Không nhận được phản hồi — mở lại facebook.com rồi thử lại.', false)
      } else {
        // FB chặn đổi tên qua API với TK CÁ NHÂN (Invalid parameter) & một số TK agency/BM — dù giao diện FB cho chủ đổi.
        // → Đưa nút mở đúng chỗ đổi tên trên Facebook.
        const err = json.error || {}
        const bizId = S.info?.owner_business?.id
        const fbUrl = bizId
          ? `https://business.facebook.com/settings/ad-accounts/${bare}?business_id=${bizId}`
          : `https://www.facebook.com/adsmanager/manage/campaigns?act=${bare}`
        const why = bizId
          ? 'FB hạn chế đổi tên TK này qua công cụ'
          : 'TK cá nhân — FB chỉ cho đổi tên trực tiếp trên Facebook'
        renameMsg.innerHTML = `${why}. <a href="${escH(fbUrl)}" target="_blank" rel="noreferrer" style="color:#1877F2;font-weight:800;text-decoration:underline">Đổi trên Facebook →</a>`
        renameMsg.style.color = '#b45309'; renameMsg.style.display = 'block'
      }
    } catch (e) { showRenameMsg('Lỗi kết nối: ' + (e.message || e), false) }
  }
  document.getElementById('__amsb-rename-btn').addEventListener('click', () => {
    if (renameBar && renameBar.style.display === 'flex') closeRename(); else openRename()
  })
  if (renameInput) renameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); doRename() }
    else if (e.key === 'Escape') closeRename()
  })
  document.getElementById('__amsb-rename-ok')?.addEventListener('click', doRename)
  document.getElementById('__amsb-rename-cancel')?.addEventListener('click', closeRename)

  // Fetch AdsMeta plan status
  chrome.runtime.sendMessage({ type: 'SMETA_GET_PLAN' }, r => {
    if (r?.ok) { S.plan = r.plan; S.planExpiry = r.planExpiry; if (S.info && S.open) renderBody() }
  })
  // Fetch Spotlight remote-config (Đợt 2) — server MÌNH (adsmeta.io) qua background, KHÔNG gọi FB
  try {
    chrome.runtime.sendMessage({ type: 'GET_EXT_CONFIG' }, r => {
      if (chrome.runtime.lastError) return
      if (r && Array.isArray(r.spotlight)) { S.spotlight = r.spotlight; if (S.open) renderPromo() }
    })
  } catch (e) {}
  // Fetch bucket nhắm đối tượng (free/vepro/pro/allbought) + số ngày còn hoàn 69k
  try {
    chrome.runtime.sendMessage({ type: 'SMETA_GET_PROMO' }, r => {
      if (chrome.runtime.lastError) return
      if (r && r.ok) { S.promoBucket = r.bucket; S.refundDaysLeft = r.refundDaysLeft || 0; S.isTeamMember = !!r.isTeamMember; if (S.open) renderPromo() }
    })
  } catch (e) {}
  // Notify overlay.js of initial RT state
  window.dispatchEvent(new CustomEvent('_adsmeta_rt_change', { detail: S.realtime }))

  /* ─── Show rating btn — mặc định hiện, ẩn sau khi server xác nhận rewarded ─── */
  document.getElementById('__amsb-rating-btn').style.display = ''
  // Kiểm tra server để ẩn nếu đã nhận thưởng thật
  chrome.runtime.sendMessage({ type: 'SMETA_GET_RATING' }, r => {
    if (r?.ok && r.rating?.rewarded === true) {
      const btn = document.getElementById('__amsb-rating-btn')
      if (btn) btn.style.display = 'none'
      S.ratingDone = true
      S.ratingExisting = r.rating
      S.ratingStars = r.rating.stars
      localStorage.setItem('_amsb_rating_stars', String(r.rating.stars))
    }
  })

  /* ─── Tabs ─── */
  document.getElementById('__amsb-tab-bill').addEventListener('click', () => {
    if (S.actId) {
      const bmId = S.info?.owner_business?.id || ''
      const params = new URLSearchParams({ asset_id: S.actId, payment_account_id: S.actId, placement: 'BILLING_HUB' })
      if (bmId) params.set('business_id', bmId)
      window.open(`https://business.facebook.com/latest/billing_hub/accounts/details/?${params}`, '_blank')
    }
  })
  const ALL_TAB_BTNS = ['__amsb-uid-btn','__amsb-rating-btn']
  function clearTabActive() { ALL_TAB_BTNS.forEach(id => document.getElementById(id)?.classList.remove('active')) }

  const uidBtn = document.getElementById('__amsb-uid-btn')
  if (uidBtn) uidBtn.addEventListener('click', () => {
    const entering = S.tab !== 'uid'
    S.tab = entering ? 'uid' : 'info'
    clearTabActive()
    if (entering && uidBtn) uidBtn.classList.add('active')
    renderCurrent()
  })
  const ratingBtn = document.getElementById('__amsb-rating-btn')
  if (ratingBtn) ratingBtn.addEventListener('click', () => {
    const entering = S.tab !== 'rating'
    S.tab = entering ? 'rating' : 'info'
    clearTabActive()
    if (entering) document.getElementById('__amsb-rating-btn').classList.add('active')
    document.getElementById('__amsb-rating-dot').style.display = 'none'
    if (entering) {
      renderCurrent() // render ngay với data đang có (stars từ localStorage)
      chrome.runtime.sendMessage({ type: 'SMETA_GET_RATING' }, r => {
        if (r?.ok && r.rating) {
          S.ratingExisting = r.rating
          S.ratingStars = r.rating.stars
          localStorage.setItem('_amsb_rating_stars', String(r.rating.stars))
          renderCurrent() // re-render với data mới nhất từ server
        }
      })
    } else renderCurrent()
  })
  const supportBtn = document.getElementById('__amsb-support')
  if (supportBtn) supportBtn.addEventListener('click', () => window.open('https://t.me/smetasupport/4068', '_blank'))

  /* ─── Billing footer buttons ─── */
  document.getElementById('__amsb-bill-tab-ads').addEventListener('click', () => {
    if (S.actId) window.open(`https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${S.actId}`, '_blank')
  })
  const billReloadBtn = document.getElementById('__amsb-bill-reload')
  if (billReloadBtn) billReloadBtn.addEventListener('click', () => loadData(true))
  const billSupportBtn = document.getElementById('__amsb-bill-support')
  if (billSupportBtn) billSupportBtn.addEventListener('click', () => window.open('https://t.me/smetasupport/4068', '_blank'))
  document.getElementById('__amsb-bill-settings').addEventListener('click', (e) => {
    e.stopPropagation()
    S.settingsOpen = !S.settingsOpen
    if (S.settingsOpen) openSettingsPopup('__amsb-bill-settings')
    else stPanel.style.display = 'none'
  })
  document.getElementById('__amsb-bill-theme').addEventListener('click', () => {
    S.theme = THEME_CYCLE[(THEME_CYCLE.indexOf(S.theme) + 1) % 3]
    localStorage.setItem('_adsmeta_theme', S.theme)
    applyTheme()
  })

  /* ─── Copy ID ─── */
  document.getElementById('__amsb-cpid').addEventListener('click', () => {
    navigator.clipboard.writeText(actidEl.textContent || '').catch(() => {})
    const b = document.getElementById('__amsb-cpid')
    b.textContent = '✓'; setTimeout(() => { b.textContent = 'copy' }, 1200)
  })

  function renderCurrent() {
    if (S.tab === 'uid') renderUidPanel()
    else if (S.tab === 'rating') renderRatingPanel()
    else renderBody()
  }

  /* ─── Rating panel ─── */
  const CWS_URL = `https://chromewebstore.google.com/detail/${chrome.runtime.id}/reviews`

  function renderRatingPanel() {
    const existing = S.ratingExisting
    const stars = S.ratingStars || (existing?.stars || 0)
    const alreadyRewarded = existing?.rewarded === true
    const alreadyRated = !!existing

    const starHtml = [1,2,3,4,5].map(n => `
      <span id="__amsb-star-${n}" data-v="${n}" style="font-size:30px;cursor:pointer;user-select:none;transition:transform .1s;display:inline-block;padding:0 2px;color:${n <= stars ? '#f59e0b' : 'var(--amsb-muted)'}">${n <= stars ? '★' : '☆'}</span>
    `).join('')

    bodyEl.innerHTML = `
      <div style="padding:12px;display:flex;flex-direction:column;gap:10px">

        <div style="display:flex;justify-content:flex-end;margin:-4px -4px -2px 0">
          <button id="__amsb-rating-back" title="Đóng" style="background:none;border:none;color:var(--amsb-muted);font-size:12px;cursor:pointer;padding:2px 6px;border-radius:6px">✕ Đóng</button>
        </div>

        ${!alreadyRewarded ? `
          <div style="background:linear-gradient(135deg,#16a34a,#15803d);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px">
            <div style="font-size:24px;line-height:1">🎁</div>
            <div>
              <div style="font-size:12px;font-weight:700;color:#fff">Nhận 25.000đ vào tài khoản</div>
              <div style="font-size:10px;color:rgba(255,255,255,.8);margin-top:2px">Đánh giá sMeta để nhận thưởng ngay</div>
            </div>
          </div>
        ` : `
          <div style="background:var(--amsb-bg2);border-radius:10px;padding:8px 12px;display:flex;align-items:center;gap:8px;border:1px solid var(--amsb-border)">
            <span style="font-size:16px">✅</span>
            <div style="font-size:11px;color:var(--amsb-muted)">Đã nhận thưởng 25.000đ — bấm sao để cập nhật đánh giá</div>
          </div>
        `}

        <div style="font-size:12px;color:var(--amsb-muted);text-align:center">Bạn cảm thấy sMeta thế nào?</div>

        <div id="__amsb-stars-row" style="display:flex;align-items:center;justify-content:center;gap:0;margin:0">${starHtml}</div>

        ${stars > 0 && stars < 4 ? `
          <textarea id="__amsb-rating-comment" placeholder="Bạn muốn chúng tôi cải thiện điều gì?" rows="3"
            style="width:100%;box-sizing:border-box;padding:7px 9px;font-size:11px;border-radius:7px;
                   border:1px solid var(--amsb-border);background:var(--amsb-bg2);color:var(--amsb-text);
                   resize:none;outline:none;font-family:inherit"
          >${existing?.comment || ''}</textarea>
          <button id="__amsb-rating-submit" style="padding:8px;border-radius:8px;border:none;cursor:pointer;
            background:#3b82f6;color:#fff;font-size:12px;font-weight:600;font-family:inherit;
            ${S.ratingSubmitting ? 'opacity:.6;pointer-events:none' : ''}">
            ${S.ratingSubmitting ? 'Đang gửi...' : !alreadyRewarded ? 'Gửi & nhận 25.000đ' : (alreadyRated ? 'Cập nhật đánh giá' : 'Gửi phản hồi')}
          </button>
        ` : ''}

        ${stars >= 4 ? `
          ${!alreadyRewarded && !S.cwsOpened ? `
            <div style="font-size:11px;color:var(--amsb-muted);text-align:center;line-height:1.6">
              Đánh giá trên Chrome Web Store<br>rồi quay lại nhận <b style="color:#16a34a">25.000đ</b> nhé!
            </div>
            <a id="__amsb-cws-link" href="${CWS_URL}" target="_blank" rel="noreferrer"
              style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:8px;
                     background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:12px;font-weight:700;
                     text-decoration:none;cursor:pointer">
              ⭐ Đánh giá trên Chrome Web Store
            </a>
          ` : `
            ${!alreadyRewarded ? (() => {
              const secsElapsed = S.cwsClickedAt ? Math.floor((Date.now() - S.cwsClickedAt) / 1000) : 0
              const remaining = Math.max(0, 60 - secsElapsed)
              const ready = remaining === 0
              return `
              <div id="__amsb-cws-countdown" style="font-size:11px;text-align:center;line-height:1.6;padding:8px 10px;
                border-radius:8px;background:${ready ? 'rgba(22,163,74,.1)' : 'var(--amsb-bg2)'};
                color:${ready ? '#16a34a' : 'var(--amsb-muted)'}">
                ${ready ? 'Đã đủ thời gian, bấm xác nhận để nhận thưởng 🎁' : `Đánh giá xong quay lại xác nhận — còn ${remaining}s`}
              </div>
              <button id="__amsb-rating-submit" style="padding:10px;border-radius:8px;border:none;cursor:pointer;
                background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;font-size:12px;font-weight:700;font-family:inherit;
                opacity:${ready && !S.ratingSubmitting ? '1' : '0.4'};pointer-events:${ready && !S.ratingSubmitting ? 'auto' : 'none'}">
                ${S.ratingSubmitting ? 'Đang xử lý...' : '🎁 Xác nhận & nhận 25.000đ'}
              </button>
              <a href="${CWS_URL}" target="_blank" rel="noreferrer"
                style="display:flex;align-items:center;justify-content:center;gap:4px;padding:6px;border-radius:8px;
                       border:1px solid var(--amsb-border);color:var(--amsb-muted);font-size:10px;text-decoration:none;cursor:pointer">
                ↗ Mở lại trang đánh giá
              </a>`
            })() : `
              <a href="${CWS_URL}" target="_blank" rel="noreferrer"
                style="display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;border-radius:8px;
                       background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:11px;font-weight:600;
                       text-decoration:none;cursor:pointer">
                ⭐ Đánh giá thêm trên Chrome Web Store
              </a>
            `}
          `}
        ` : ''}

      </div>
    `

    // Quay lại màn tài khoản (dùng cho nút "✕ Đóng" của panel + nút "Xong" sau khi đánh giá)
    const backToInfo = () => {
      if (S.ratingAutoClose) { clearTimeout(S.ratingAutoClose); S.ratingAutoClose = null }
      S.tab = 'info'; clearTabActive(); renderCurrent()
    }
    document.getElementById('__amsb-rating-back')?.addEventListener('click', backToInfo)

    // Star hover + click
    for (let n = 1; n <= 5; n++) {
      const el = document.getElementById(`__amsb-star-${n}`)
      if (!el) continue
      el.addEventListener('mouseenter', () => {
        for (let i = 1; i <= 5; i++) {
          const s = document.getElementById(`__amsb-star-${i}`)
          if (s) { s.textContent = i <= n ? '★' : '☆'; s.style.color = i <= n ? '#f59e0b' : 'var(--amsb-muted)' }
        }
      })
      el.addEventListener('mouseleave', () => {
        const cur = S.ratingStars || (S.ratingExisting?.stars || 0)
        for (let i = 1; i <= 5; i++) {
          const s = document.getElementById(`__amsb-star-${i}`)
          if (s) { s.textContent = i <= cur ? '★' : '☆'; s.style.color = i <= cur ? '#f59e0b' : 'var(--amsb-muted)' }
        }
      })
      el.addEventListener('click', () => {
        if (n < 4) S.cwsOpened = false
        S.ratingStars = n
        renderRatingPanel()
      })
    }

    // CWS link — record click, start 60s countdown
    const cwsLink = document.getElementById('__amsb-cws-link')
    if (cwsLink) {
      cwsLink.addEventListener('click', () => {
        S.cwsOpened = true
        S.cwsClickedAt = Date.now()
        S.cwsCountdown = 60
        chrome.runtime.sendMessage({ type: 'SMETA_CWS_CLICK' })
        if (S.cwsTimer) clearInterval(S.cwsTimer)
        S.cwsTimer = setInterval(() => {
          S.cwsCountdown = Math.max(0, 60 - Math.floor((Date.now() - S.cwsClickedAt) / 1000))
          const el = document.getElementById('__amsb-cws-countdown')
          const btn = document.getElementById('__amsb-rating-submit')
          if (el) el.textContent = S.cwsCountdown > 0 ? `Đánh giá xong quay lại xác nhận — còn ${S.cwsCountdown}s` : 'Đã đủ thời gian, bấm xác nhận để nhận thưởng 🎁'
          if (btn) {
            const ready = S.cwsCountdown === 0
            btn.style.opacity = ready ? '1' : '0.4'
            btn.style.pointerEvents = ready ? 'auto' : 'none'
            if (ready) { clearInterval(S.cwsTimer); S.cwsTimer = null }
          }
        }, 1000)
        setTimeout(() => renderRatingPanel(), 300)
      })
    }

    // Submit button
    const submitBtn = document.getElementById('__amsb-rating-submit')
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const comment = document.getElementById('__amsb-rating-comment')?.value?.trim() || ''
        S.ratingSubmitting = true
        renderRatingPanel()
        chrome.runtime.sendMessage({ type: 'SMETA_SUBMIT_RATING', stars: S.ratingStars, comment }, r => {
          S.ratingSubmitting = false
          localStorage.setItem('_amsb_rated', '1')
          S.ratingDone = true
          if (r?.ok) {
            S.ratingExisting = { stars: S.ratingStars, comment, rewarded: true }
            localStorage.setItem('_amsb_rating_stars', String(S.ratingStars))
            localStorage.setItem('_amsb_rated', '1')
            S.ratingDone = true
            // Ẩn nút ⭐ vĩnh viễn sau khi nhận thưởng
            const ratingBtn = document.getElementById('__amsb-rating-btn')
            if (ratingBtn) ratingBtn.style.display = 'none'
            const gotReward = r.data?.rewarded || r.data?.rewardAmount > 0
            bodyEl.innerHTML = `
              <div style="padding:20px 12px;text-align:center;color:var(--amsb-text);display:flex;flex-direction:column;gap:10px;align-items:center">
                <div style="font-size:36px">${gotReward ? '🎉' : '🙏'}</div>
                <div style="font-size:13px;font-weight:700">${gotReward ? 'Đã cộng 25.000đ vào tài khoản!' : 'Cảm ơn phản hồi của bạn!'}</div>
                ${gotReward ? `<div style="font-size:11px;color:var(--amsb-muted)">Số dư của bạn đã được cộng thêm 25.000đ.<br>Kiểm tra tại adsmeta.io/account</div>` : ''}
                ${S.ratingStars >= 4 ? `
                  <a href="${CWS_URL}" target="_blank" rel="noreferrer"
                    style="margin-top:4px;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 14px;border-radius:8px;
                           background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-size:11px;font-weight:600;
                           text-decoration:none;cursor:pointer;width:100%;box-sizing:border-box">
                    ⭐ Đánh giá thêm trên CWS
                  </a>
                ` : ''}
                <button id="__amsb-rating-done" style="margin-top:4px;padding:8px 16px;border-radius:8px;border:1px solid var(--amsb-border);background:var(--amsb-bg2);color:var(--amsb-text);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;width:100%;box-sizing:border-box">Xong</button>
                <div style="font-size:10px;color:var(--amsb-muted)">Tự đóng sau vài giây…</div>
              </div>`
            document.getElementById('__amsb-rating-done')?.addEventListener('click', backToInfo)
            if (S.ratingAutoClose) clearTimeout(S.ratingAutoClose)
            S.ratingAutoClose = setTimeout(backToInfo, 4000)   // tự quay lại màn tài khoản sau 4s
          } else {
            renderRatingPanel()
          }
        })
      })
    }
  }

  /* ─── Auto-prompt rating after 3 days ─── */
  ;(function checkRatingPrompt() {
    if (S.ratingDone) return
    const firstUse = localStorage.getItem('_amsb_first_use')
    if (!firstUse) { localStorage.setItem('_amsb_first_use', Date.now().toString()); return }
    const daysSince = (Date.now() - parseInt(firstUse)) / 86400000
    if (daysSince >= 3) {
      const dot = document.getElementById('__amsb-rating-dot')
      if (dot) dot.style.display = 'block'
    }
  })()

  /* ─── Render body ─── */
  function renderBody() {
    const L = lbl()
    if (!S.info) {
      bodyEl.innerHTML = SKEL
      return
    }

    const info     = S.info
    const infoCurr = info.currency || 'VND'
    const cur      = effectiveCurr(infoCurr)
    const ratio    = Number(info.account_currency_ratio_to_usd) || 1
    const needConv = cur !== infoCurr && ratio > 0
    const rates    = S.usdRates  // { EUR: 0.92, VND: 25490, ... } — 1 USD = X currency
    // VND* (báo khách): quy đơn vị CHÍNH của infoCurr → VND. VND ×(1+%biên); ngoại tệ ×tỷ giá bán (fallback tỷ giá live).
    const billOf = (native, nativeCur) => {
      const b = S.bill || {}
      if (nativeCur === 'VND') return Math.round(native * (1 + (Number(b.vndMarkup) || 0) / 100))
      let sell = nativeCur === 'USD' ? Number(b.customUsdRate) : Number(b.sellRates && b.sellRates[nativeCur])
      if (!sell && rates && rates.VND) sell = nativeCur === 'USD' ? rates.VND : (rates[nativeCur] ? rates.VND / rates[nativeCur] : 0)  // tiền KHÔNG có tỷ giá → 0, không coi như USD
      if (!sell) return null
      return Math.round(native * sell)
    }
    const dualValHtml = (nativeAmt, nBg = '#10b981', cBg = '#3b82f6', noBill) => {
      const nativeStr = escH(fmt(nativeAmt, infoCurr))
      // Pill màu. Cột số TỰ CO theo số DÀI NHẤT + thẳng hàng: pill để width tự nhiên, SAU render đo & cân bằng cả cột (alignMoneyCols).
      // Class đánh dấu cột: __amsb-vnat (VND) / __amsb-vsec (€/$). text-align:right → khi cột nới rộng, số dồn phải thẳng đuôi.
      const TINT = { '#10b981': ['#e7f7f0', '#047857'], '#3b82f6': ['#e8f0fe', '#1d4ed8'], '#f59e0b': ['#fdf0dc', '#b45309'], '#ea580c': ['#fdeadf', '#c2410c'] }
      const numW = isBillingPage ? 500 : 700   // bill: nhẹ (giữ nguyên) · campaigns: đậm 700 theo ý chủ
      const pill = (text, bg, cls) => { const t = TINT[bg] || [bg + '22', bg]; return `<span class="${cls}" style="display:inline-block;box-sizing:border-box;background:${t[0]};color:${t[1]};font-size:14px;font-weight:${numW};padding:2px 8px;border-radius:6px;white-space:nowrap;text-align:right">${text}</span>` }
      const gap  = `<span style="display:inline-block;width:7px"></span>`
      const dual = (natTxt, secTxt, cBg2) => pill(natTxt, nBg, '__amsb-vnat') + gap + pill(secTxt, cBg2, '__amsb-vsec')
      if (ratio <= 0) return pill(nativeStr, nBg, '__amsb-vnat')
      if (noBill && cur === 'BILL') return pill(nativeStr, nBg, '__amsb-vnat')  // Ngưỡng: VND* hiện NATIVE, không cộng biên
      if (cur === 'BILL') { const bv = billOf(nativeAmt, infoCurr); return bv == null ? pill(nativeStr, nBg, '__amsb-vnat') : dual(nativeStr, escH(fmt(bv, 'BILL')), cBg) }
      const usdV = nativeAmt / ratio  // native → USD (TK USD: ratio=1 → usdV = nativeAmt)
      let dispV, dispC
      if (cur === infoCurr || cur === 'USD') {
        dispV = Math.round(usdV * 100) / 100; dispC = 'USD'
      } else if (rates?.[cur]) {
        const v = usdV * rates[cur]
        dispV = NO_DEC.includes(cur) ? Math.round(v) : Math.round(v * 100) / 100; dispC = cur
      } else {
        dispV = Math.round(usdV * 100) / 100; dispC = 'USD'
      }
      // Quy đổi trùng đơn vị gốc (vd TK USD + target USD/Default) → 1 badge, khỏi lặp.
      // TK USD + target khác (VND…) sẽ rơi xuống đây với dispC≠infoCurr → hiện 2 badge.
      if (dispC === infoCurr) return pill(nativeStr, nBg, '__amsb-vnat')
      return dual(nativeStr, escH(fmt(dispV, dispC)), cBg)
    }
    const cycle    = info.adspaymentcycle?.data?.[0]
    const isLive   = info.account_status === 1

    // Get native major-unit value in infoCurr
    function toNative(apiVal, useRound = false) {
      const n = Number(apiVal) || 0
      if (useRound) return Math.round(n)
      return NO_DEC.includes(infoCurr) ? Math.round(n) : Math.round(n / 100)
    }

    // Convert to display currency
    // Chain: native infoCurr → USD (÷ ratio) → target (× rates[cur])
    function toDisplay(apiVal, useRound = false) {
      const native = toNative(apiVal, useRound)
      if (!needConv) return native
      if (cur === 'BILL') { const bv = billOf(native, infoCurr); return bv == null ? native : bv }
      const usdVal = native / ratio  // native → USD
      if (cur === 'USD') return Math.round(usdVal * 100) / 100
      if (rates?.[cur]) {
        const converted = usdVal * rates[cur]
        return NO_DEC.includes(cur) ? Math.round(converted) : Math.round(converted * 100) / 100
      }
      return native  // fallback: show native if rates not loaded yet
    }

    const balance  = toDisplay(info.balance)
    const spent    = toDisplay(info.amount_spent)
    const todayRaw    = info.insights?.data?.[0]?.spend
    const todayNoData = todayRaw == null  // undefined = field missing, vs "0" = genuine zero

    // Ngưỡng = threshold_amount của billing cycle. Không có cycle → "—" (giống tham chiếu),
    // KHÔNG đổ về adtrust_dsl (sẽ trùng y hệt "Limit ngày", gây nhầm).
    const thresholdHtml = cycle ? dualValHtml(toNative(cycle.threshold_amount), undefined, undefined, true) : '—'

    // Limit ngày (adtrust_dsl) — daily spend limit from Graph API
    let limitDayHtml
    if (!info.adtrust_dsl || info.adtrust_dsl === -1 || info.adtrust_dsl === '-1') limitDayHtml = 'No limit'
    else limitDayHtml = dualValHtml(toNative(info.adtrust_dsl, true))

    // Limit (formatted_dsl) — account spend limit via billing GraphQL (async, fire-and-forget)
    let limitHtml
    if (!S.newLimit || S.newLimit.actId !== S.actId) limitHtml = '<span class="__amsb-ispin"></span>'
    else if (S.newLimit.raw == null) limitHtml = '—'
    else limitHtml = dualValHtml(toNative(S.newLimit.raw), '#f59e0b', '#ea580c')  // tông cam — highlight dòng Limit

    // Chi tiêu = tổng chi tiêu thực (Insights maximum, async). spend ở đơn vị major → toNative useRound
    let spentHtml
    if (!S.spendMax || S.spendMax.actId !== S.actId) spentHtml = '<span class="__amsb-ispin"></span>'
    else if (S.spendMax.raw == null) spentHtml = '—'
    else spentHtml = dualValHtml(toNative(S.spendMax.raw, true))

    let cardStr = '—'
    const pmData = info.all_payment_methods?.pm_credit_card?.data
    if (info.is_prepay_account) cardStr = 'Trả Trước'
    else if (pmData?.length) {
      const pm = pmData[0]
      cardStr = `${pm.display_string} ${pm.exp_month}/${String(pm.exp_year).slice(-2)}`
    }

    const perms      = info.userpermissions?.data || []
    const adminTotal = perms.length                              // tổng quyền (cả admin ẩn FB che danh tính)
    const adminVis   = perms.filter(p => p.user?.id).length      // admin đọc được user.id
    const adminHidden = adminTotal - adminVis                    // admin ẩn (không trả user.id)
    const adminStr   = adminHidden > 0 ? `${adminTotal}(${adminHidden})` : String(adminTotal)
    let myRole = '—'
    for (const p of perms) {
      if (p.user?.id && S.myId && p.user.id === S.myId) { myRole = p.role; break }
    }
    if (myRole === '—' && perms.length) myRole = perms[0].role || '—'
    // Map enum quyền FB → nhãn dễ hiểu (GENERAL_USER = Nhà quảng cáo, giữa Admin và chỉ-xem)
    const ROLE_LBL = { ADMIN: 'Quản trị viên', GENERAL_USER: 'Nhà quảng cáo', ADVERTISER: 'Nhà quảng cáo', REPORTS_ONLY: 'Chỉ xem báo cáo', EMPLOYEE: 'Nhân viên', FINANCE_EDITOR: 'Quản lý tài chính', FINANCE_ANALYST: 'Xem tài chính' }
    if (myRole && myRole !== '—') myRole = ROLE_LBL[myRole] || myRole.replace(/_/g, ' ')

    const acType  = info.owner_business ? L.biz : L.personal
    // "TK trong BM" = số TKQC mà BM sở hữu account này đang quản lý (async). TK cá nhân → "—" (không thuộc BM).
    let bmHtml
    if (!info.owner_business) bmHtml = '—'
    else if (!S.bmAcct || S.bmAcct.actId !== S.actId) bmHtml = '<span class="__amsb-ispin"></span>'
    else if (S.bmAcct.raw == null) bmHtml = escH(info.owner_business.name || '—')  // lấy count lỗi → hiện tên BM
    else bmHtml = `${S.bmAcct.raw} TK`

    // New fields
    const _tzOff  = info.timezone_offset_hours_utc
    const _tzName = info.timezone_name || ''
    const tz      = _tzName
      ? (_tzOff != null && _tzOff !== '' ? (_tzOff >= 0 ? '+' + _tzOff : '' + _tzOff) + ' | ' : '') + _tzName
      : '—'
    const created = fmtDate(info.created_time)
    const nbDate  = fmtDate(info.next_bill_date)
    const nbDays  = info.next_bill_date ? daysLeft(info.next_bill_date) : null

    liveEl.textContent = isLive ? '● Live' : '● Off'
    liveEl.style.background = isLive ? '#10b981' : '#ef4444'

    if (isBillingPage) {
      const updEl = document.getElementById('__amsb-billing-upd')
      if (updEl) updEl.textContent = 'Cập nhật ' + new Date().toLocaleString('vi-VN', {hour:'2-digit',minute:'2-digit',second:'2-digit',day:'2-digit',month:'2-digit',year:'numeric'})
    }

    const balHtml = S.loading
      ? '<span class="__amsb-ispin"></span>'
      : dualValHtml(toNative(info.balance))

    const daysChip = (days) => {
      if (days === null) return ''
      const urgent = days <= 3
      return `<span class="__amsb-days${urgent ? ' urgent' : ''}">${days} ${escH(L.daysLeft)}</span>`
    }

    const statusLabel = ({1:'Hoạt động',2:'Vô hiệu',3:'Chưa thanh toán',7:'Đang xét duyệt',9:'Gia hạn'})[info.account_status] || `Status ${info.account_status}`
    const statusColor = info.account_status === 1 ? '#10b981' : '#ef4444'

    const currFlagHtml = (() => {
      const flagSrc = CURR_FLAGS[infoCurr]
      const flagImg = flagSrc ? `<img src="${flagSrc}" width="20" height="14" style="border-radius:2px;vertical-align:middle;margin-left:5px;display:inline-block">` : ''
      // Gạch ngăn cách badge Trạng thái ↔ tiền gốc TK (currentColor để hợp cả sáng/tối)
      const divider = `<span style="display:inline-block;width:1px;height:12px;background:currentColor;opacity:.28;margin:0 4px 0 8px;vertical-align:middle"></span>`
      return `${divider}<span style="font-size:14px;font-weight:500;vertical-align:middle">${escH(infoCurr)}</span>${flagImg}`
    })()

    bodyEl.innerHTML = `
      ${isBillingPage ? `<div class="__amsb-sec">${escH(L.tracking)}</div>` : ''}
      ${isBillingPage ? `<div class="__amsb-row">${ic.shield}<span class="__amsb-rlabel">Trạng Thái</span><span class="__amsb-rval" style="display:flex;align-items:center;justify-content:flex-end"><span style="background:${statusColor};color:#fff;border-radius:5px;padding:1px 8px;font-size:11px;font-weight:700">${escH(statusLabel)}</span>${currFlagHtml}</span></div>` : ''}
      ${isBillingPage ? row(ic.person, 'ID', info.id || S.actId || '—') : ''}
      ${isBillingPage && vis('name') ? row(ic.person,  L.name,  info.name || '—') : ''}
      ${!isBillingPage ? `<div class="__amsb-sec">${escH(L.tracking)}</div>` : ''}
      ${!isBillingPage ? `<div class="__amsb-row">${ic.shield}<span class="__amsb-rlabel">Trạng Thái</span><span class="__amsb-rval" style="display:flex;align-items:center;justify-content:flex-end"><span style="background:${statusColor};color:#fff;border-radius:5px;padding:1px 8px;font-size:11px;font-weight:700">${escH(statusLabel)}</span>${currFlagHtml}</span></div>` : ''}
      ${vis('bal')    ? `<div class="__amsb-row" id="__amsb-bal-row">${ic.wallet}<span class="__amsb-rlabel">${escH(L.bal)}</span><span class="__amsb-rval" id="__amsb-bal-val">${balHtml}</span></div>` : ''}
      ${vis('thr')    ? rowHtml(ic.bar,    L.thr,    thresholdHtml, 'Ngưỡng billing cycle — hạn mức chi tiêu mỗi chu kỳ thanh toán') : ''}
      ${vis('adtrust')    ? rowHtml(ic.gauge,  L.limitDay, limitDayHtml, 'Limit ngày — giới hạn chi tiêu mỗi ngày (adtrust_dsl)') : ''}
      ${vis('adtrustNew') ? rowHtml(ic.target, L.limit,    limitHtml,    'Limit — hạn mức chi tiêu tài khoản (formatted_dsl)') : ''}
      ${vis('spent')  ? rowHtml(ic.dollar, L.spent, spentHtml, 'Tổng chi tiêu thực qua Insights (date_preset=maximum, ~37 tháng gần nhất, khớp Ads Reporting)') : ''}
      ${vis('today')  ? rowHtml(ic.sun,    L.today,  todayNoData ? '—' : dualValHtml(toNative(todayRaw, true))) : ''}

      <div class="__amsb-sec">${escH(L.role)}</div>
      ${vis('card')     ? row(ic.card,     L.card,   cardStr) : ''}
      ${vis('admin')    ? row(ic.users,    L.admin,  adminStr) : ''}
      ${vis('myRole')   ? row(ic.shield,   L.myRole, myRole) : ''}
      ${vis('type')     ? row(ic.building, L.type,   acType) : ''}
      ${vis('bm')       ? rowHtml(ic.network,  L.bm,     bmHtml, 'Số TKQC trong BM sở hữu tài khoản này') : ''}
      ${vis('timezone') ? row(ic.clock,    L.timezone,  tz) : ''}
      ${vis('createdAt')? row(ic.calendar, L.createdAt, created) : ''}
      ${vis('nextBill') ? `<div class="__amsb-row">${ic.bill}<span class="__amsb-rlabel">${escH(L.nextBill)}</span><span class="__amsb-rval" style="display:flex;align-items:center;gap:4px;justify-content:flex-end">${escH(nbDate)}${daysChip(nbDays)}</span></div>` : ''}

      <div id="__amsb-promo-slot"></div>
    `
    // Branded Depth: gộp TẤT CẢ section (TRACKING + QUYỀN HẠN) vào 1 CARD nổi
    ;(function groupSections() {
      const promoSlot = document.getElementById('__amsb-promo-slot')
      const kids = [...bodyEl.children].filter(el => el !== promoSlot)
      if (!kids.length) return
      const group = document.createElement('div'); group.className = '__amsb-secgroup'
      bodyEl.insertBefore(group, promoSlot)
      kids.forEach(el => group.appendChild(el))
    })()
    // Cột số TỰ CO theo số dài nhất + thẳng hàng: đo bề rộng thật từng cột rồi cho mọi pill trong cột = bề rộng lớn nhất
    ;['__amsb-vnat', '__amsb-vsec'].forEach(cls => {
      const els = bodyEl.querySelectorAll('.' + cls); if (!els.length) return
      let mx = 0
      els.forEach(e => { const w = Math.ceil(e.getBoundingClientRect().width); if (w > mx) mx = w })
      if (mx > 0) els.forEach(e => { e.style.minWidth = mx + 'px' })
    })
    // SỐ nhảy ODOMETER (cuộn from→to) + FLASH xanh(tăng)/đỏ(giảm) khi giá trị ĐỔI so lần render trước.
    // Đổi TIỀN TỆ / TÀI KHOẢN → reset (tránh cuộn ngang đơn vị vô nghĩa).
    if (S._prevCur !== cur || S._prevAct !== S.actId) { S._prevVals = {}; S._prevCur = cur; S._prevAct = S.actId }
    if (!S._prevVals) S._prevVals = {}
    const rollNum = (el) => {
      const full = el.textContent
      const m = full.match(/^(\D*?)([\d.,]+)(\D*)$/); if (!m) return
      const pre = m[1], tok = m[2], suf = m[3], hasDec = tok.includes(',')
      const target = parseFloat(tok.replace(/\./g, '').replace(',', '.')); if (!isFinite(target)) return
      const row = el.closest('.__amsb-row')
      const key = (row ? (row.querySelector('.__amsb-rlabel')?.textContent || '') : '') + '|' + (el.classList.contains('__amsb-vnat') ? 'n' : 's')
      const prev = S._prevVals[key]; S._prevVals[key] = target
      const first = prev === undefined, from = first ? 0 : prev
      if (!first && Math.abs(target - from) < 0.005) return   // không đổi → bỏ qua
      if (first && target < 1000) return                      // lần đầu số nhỏ khỏi đếm
      if (!first) {   // FLASH màu theo hướng (không flash lần đầu)
        const cls = target > from ? '__amsb-flash-up' : '__amsb-flash-down'
        el.classList.remove('__amsb-flash-up', '__amsb-flash-down'); void el.offsetWidth
        el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 900)
      }
      const dur = first ? 700 : 520, t0 = performance.now()
      const fmt = (v) => hasDec ? v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Math.round(v).toLocaleString('de-DE')
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3)   // easeOutCubic
        el.textContent = pre + fmt(from + (target - from) * e) + suf
        if (p < 1) requestAnimationFrame(step); else el.textContent = full
      }
      requestAnimationFrame(step)
    }
    bodyEl.querySelectorAll('.__amsb-vnat, .__amsb-vsec').forEach(rollNum)
    renderPromo()   // đổ nội dung slot khuyến mãi (spotlight remote-config hoặc fallback)
    // Nội dung đã chốt chiều cao → đặt lại vị trí card cho khớp (trừ khi user tự kéo header)
    if (S.open && !isBillingPage && !_cardManual) placeCard()
  }

  // Slot khuyến mãi (Đợt 2) — ưu tiên Spotlight remote-config (admin điều khiển), fallback bản cứng.
  // Xoay vòng khi >1 item. CHỈ đổi nội dung DOM local, KHÔNG gọi Facebook.
  function renderPromo() {
    const slot = document.getElementById('__amsb-promo-slot')
    if (!slot) return
    if (!S.open || S.plan == null) { slot.innerHTML = ''; return }
    const today = new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10)
    if (localStorage.getItem('_amsb_promo_dismiss') === today) { slot.innerHTML = ''; return }
    const paid = !!(S.plan && S.plan !== 'BASIC' && (!S.planExpiry || new Date(S.planExpiry) > new Date()))
    const gift = (c) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;flex-shrink:0"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>`
    const COLORS = { green: ['linear-gradient(135deg,#16a34a,#15803d)', '#15803d'], purple: ['linear-gradient(135deg,#7c3aed,#a21caf)', '#7c3aed'], blue: ['linear-gradient(135deg,#1a4dd4,#1877F2)', '#1a4dd4'] }
    const card = (grad, btnColor, titleIcon, title, desc, ctaText, ctaUrl, videoUrl, btnIcon) => `
      <div style="position:relative;background:${grad};padding:11px 14px;flex-shrink:0;margin:5px 6px 6px;border-radius:8px;box-shadow:0 2px 9px rgba(0,0,0,.15)">
        <button class="__amsb-promo-x" title="Ẩn hôm nay">✕</button>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;min-width:0">
            <div style="color:#fff;font-size:13px;font-weight:700;margin-bottom:2px;display:flex;align-items:center;gap:5px">${titleIcon || ''}<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escH(title)}</span></div>
            <div style="color:rgba(255,255,255,.85);font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escH(desc)}</div>
          </div>
          ${videoUrl ? `<a href="${escH(videoUrl)}" target="_blank" rel="noreferrer" title="Xem video" style="color:#fff;text-decoration:none;font-size:15px;flex-shrink:0">▶</a>` : ''}
          <a href="${escH(ctaUrl)}" target="_blank" rel="noreferrer" class="__amsb-cta" style="background:#fff;color:${btnColor};border:none;border-radius:8px;display:inline-flex;align-items:center;gap:5px;padding:6px 12px;font-size:12px;font-weight:700;white-space:nowrap;text-decoration:none;flex-shrink:0">${btnIcon || ''}${escH(ctaText || 'Xem ngay')}</a>
        </div>
      </div>`
    // Nhóm khách (bucket): server tính (free/vepro/pro/allbought); team member → hiện tính năng (không bán); fallback theo paid
    const bucket = S.isTeamMember ? 'allbought' : (S.promoBucket || (paid ? 'pro' : 'free'))
    const days = S.refundDaysLeft || 0
    const fill = (s) => String(s == null ? '' : s).replace(/\{days\}/g, days)   // thay {days} = số ngày còn hoàn 69k
    const audMatch = (aud) => {
      if (!aud) return true
      const arr = Array.isArray(aud) ? aud : (aud === 'paid' ? ['pro', 'allbought'] : [String(aud)])   // tương thích string cũ
      return arr.includes('all') || arr.includes(bucket)
    }
    // 1) Spotlight remote-config (admin) khớp nhóm; 2) fallback bản cứng theo nhóm
    let items = (S.spotlight || []).filter(s => s && s.active !== false && s.title && s.ctaUrl && audMatch(s.audience))
      .map(s => ({ id: s.id || ('sp_' + String(s.title).slice(0, 16)), color: s.color, title: s.title, desc: s.desc || '', ctaText: s.ctaText, ctaUrl: s.ctaUrl, videoUrl: s.videoUrl }))
    if (!items.length) items = fallbackItems(bucket, days)
    if (!items.length) { slot.innerHTML = ''; return }
    const it = items[(S.spotIdx || 0) % items.length]
    S._spotCurId = it.id
    const [grad, btnColor] = COLORS[it.color] || COLORS.blue
    const url = it.ctaUrl + (it.ctaUrl.includes('?') ? '&' : '?') + 'utm_source=extension&utm_medium=panel'
    const gi = it.color === 'green' ? gift('#fff') : ''
    const bi = it.color === 'green' ? gift(btnColor) : ''
    slot.innerHTML = card(grad, btnColor, gi, fill(it.title), fill(it.desc), it.ctaText, url, it.videoUrl, bi)
    logSpot('impression', it.id, bucket)
    if (items.length > 1 && !S._spotTimer) {
      S._spotTimer = setInterval(() => { S.spotIdx = (S.spotIdx || 0) + 1; renderPromo() }, 8000)
    }
  }

  // Bản cứng theo nhóm khi admin CHƯA cấu hình spotlight cho nhóm đó (đảm bảo panel luôn có nội dung đúng đối tượng)
  function fallbackItems(bucket, days) {
    const U = (c) => 'https://adsmeta.io/account/upgrade?utm_source=extension&utm_medium=panel&utm_campaign=' + c
    if (bucket === 'vepro') return [{ id: 'fb_vepro', color: 'green', title: 'Nâng gói · hoàn 69k', desc: days > 0 ? ('Còn ' + days + ' ngày để được hoàn 69.000đ vào ví') : 'Nâng gói tháng — hoàn 69.000đ vào ví', ctaText: 'Nâng gói', ctaUrl: U('vepro_refund') }]
    if (bucket === 'pro') return [
      { id: 'fb_pro_group',   color: 'purple', title: 'Gói Đăng Nhóm',         desc: 'Đăng hàng trăm nhóm + lên lịch — an toàn.', ctaText: 'Xem ngay', ctaUrl: U('groupmkt') },
      { id: 'fb_feat_clone',  color: 'blue',   title: 'Nhân bản chiến dịch',    desc: 'Clone sang nhiều TK chỉ vài giây.',          ctaText: 'Khám phá', ctaUrl: 'https://adsmeta.io/app?utm_source=extension&utm_medium=panel&utm_campaign=feat_clone' },
      { id: 'fb_feat_report', color: 'blue',   title: 'Báo cáo & chia sẻ khách', desc: 'Gộp số liệu, gửi khách 1 link.',            ctaText: 'Khám phá', ctaUrl: 'https://adsmeta.io/app?utm_source=extension&utm_medium=panel&utm_campaign=feat_report' },
    ]
    if (bucket === 'allbought') return [
      { id: 'fb_feat_clone',  color: 'blue', title: 'Nhân bản chiến dịch',    desc: 'Clone sang nhiều TK chỉ vài giây.',   ctaText: 'Khám phá', ctaUrl: 'https://adsmeta.io/app?utm_source=extension&utm_medium=panel&utm_campaign=feat_clone' },
      { id: 'fb_feat_group',  color: 'blue', title: 'Đăng bài nhóm tự động',  desc: 'Phủ hàng trăm nhóm, an toàn.',          ctaText: 'Khám phá', ctaUrl: 'https://adsmeta.io/app/create-post?utm_source=extension&utm_medium=panel&utm_campaign=feat_group' },
      { id: 'fb_feat_report', color: 'blue', title: 'Báo cáo & chia sẻ khách', desc: 'Gộp số liệu, gửi khách 1 link.',        ctaText: 'Khám phá', ctaUrl: 'https://adsmeta.io/app?utm_source=extension&utm_medium=panel&utm_campaign=feat_report' },
    ]
    // free → xoay vòng 3
    return [
      { id: 'fb_69k',   color: 'green',  title: 'Vé Pro 7 ngày · 69k', desc: 'Mở khóa mọi tính năng',              ctaText: 'Dùng thử', ctaUrl: U('vepro69k') },
      { id: 'fb_month', color: 'blue',   title: 'Nâng gói tháng Pro',  desc: 'Bỏ mọi giới hạn Free — không giới hạn.', ctaText: 'Xem gói', ctaUrl: U('monthly') },
      { id: 'fb_group', color: 'purple', title: 'Gói Đăng Nhóm',       desc: 'Đăng hàng trăm nhóm + lên lịch.',      ctaText: 'Xem ngay', ctaUrl: U('groupmkt') },
    ]
  }

  // Log hành vi spotlight (impression 1 lần/phiên/tin, click, dismiss) → server MÌNH qua background, KHÔNG FB
  function logSpot(type, id, bucket) {
    if (!id) return
    // Dedupe impression + click theo phiên (mỗi tin tối đa 1 impression + 1 click/phiên) → CTR ≤ 100%, không phồng số
    if (type === 'impression' || type === 'click') {
      if (!S._spotSeen) S._spotSeen = new Set()
      const k = type + '|' + id + '|' + bucket
      if (S._spotSeen.has(k)) return
      S._spotSeen.add(k)
    }
    try { chrome.runtime.sendMessage({ type: 'SMETA_SPOTLIGHT_EVENT', event: { itemId: id, type, bucket: bucket || null } }) } catch (e) {}
  }

  function updateMiniPill() { /* nút tròn logo — không thay đổi */ }

  function row(icon, label, val) {
    return `<div class="__amsb-row">${icon}<span class="__amsb-rlabel">${escH(String(label))}</span><span class="__amsb-rval">${escH(String(val))}</span></div>`
  }
  function rowHtml(icon, label, valHtml, title = '') {
    const tip = title ? ` title="${escH(title)}"` : ''
    return `<div class="__amsb-row">${icon}<span class="__amsb-rlabel"${tip}>${escH(String(label))}</span><span class="__amsb-rval">${valHtml}</span></div>`
  }
  function rowSpent(icon, label, val) {
    return `<div class="__amsb-row">${icon}<span class="__amsb-rlabel">${escH(String(label))}</span><span class="__amsb-spent-badge">${escH(String(val))}</span></div>`
  }
  function rowSpentHtml(icon, label, valHtml) {
    return `<div class="__amsb-row">${icon}<span class="__amsb-rlabel">${escH(String(label))}</span><span class="__amsb-spent-badge">${valHtml}</span></div>`
  }
  function escH(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
  }

  /* ─── Load data ─── */
  async function loadData(force = false) {
    const actId = actFromUrl()
    if (!actId) {
      S.info = null
      S.actId = null
      if (S.open) bodyEl.innerHTML = `<div class="__amsb-msg">${escH(lbl().noAct)}</div>`
      return
    }

    if (!force && S.actId === actId && S.info) { renderBody(); return }

    if (S.actId !== actId || force) { S.newLimit = null; S.spendMax = null; S.bmAcct = null }  // đổi TK HOẶC bấm 🔄 làm mới → bỏ cache Limit/Chi-tiêu-max/BM để tải lại HẾT
    S.actId = actId
    actidEl.textContent = actId

    if (force && S.info && S.open) {
      // Inline spinner only on Dư nợ
      S.loading = true
      const balVal = document.getElementById('__amsb-bal-val')
      if (balVal) balVal.innerHTML = '<span class="__amsb-ispin"></span>'
    } else {
      S.info = null
      S.loading = false
      if (S.open) bodyEl.innerHTML = `<div class="__amsb-msg"><div class="__amsb-spin"></div><br>${escH(lbl().loading)}</div>`
    }

    try {
      const token = await getToken()
      if (!token) {
        S.loading = false
        if (S.open) bodyEl.innerHTML = `<div class="__amsb-msg">${escH(lbl().noTok)}</div>`
        return
      }

      const GRAPH  = 'https://graph.facebook.com/v19.0'
      const fields = [
        'name','account_status','currency','balance','amount_spent',
        'account_currency_ratio_to_usd',
        'adtrust_dsl','adspaymentcycle{threshold_amount}',
        'next_bill_date','is_prepay_account',
        'timezone_name','timezone_offset_hours_utc','created_time',
        'owner_business{id,name}',
        'all_payment_methods{pm_credit_card{display_string,exp_month,exp_year}}',
        'insights.date_preset(today){spend}',
        'userpermissions{user{id,name},role}',
      ].join(',')

      const promises = [
        directFetch(`${GRAPH}/act_${actId}?fields=${encodeURIComponent(fields)}&access_token=${token}`),
      ]
      if (!S.myId)          promises.push(directFetch(`${GRAPH}/me?fields=id&access_token=${token}`))

      // Fetch exchange rates for cross-currency display (fire and forget — re-renders when ready)
      fetchUsdRates()
      // Fetch "Limit" (formatted_dsl) via billing GraphQL (fire and forget — re-renders when ready)
      fetchNewLimit(actId)
      // Fetch "Chi tiêu" = tổng chi tiêu thực (Insights maximum) — fire and forget
      fetchSpendMax(actId, token)

      const results = await Promise.allSettled(promises)
      const info    = results[0].status === 'fulfilled' ? results[0].value : null
      S.loading     = false

      if (!info || info.error) {
        const msg = info?.error?.message || 'API error'
        if (S.open) bodyEl.innerHTML = `<div class="__amsb-msg">Lỗi: ${escH(msg)}</div>`
        return
      }

      S.info = info
      if (!S.myId && results[1]?.status === 'fulfilled') S.myId = results[1].value?.id || null
      // BM row: đếm số TKQC trong BM sở hữu account này (fire-and-forget, re-render khi xong)
      if (info.owner_business?.id) fetchBmAcctCount(actId, info.owner_business.id, token)

      acnEl.textContent = info.name || ('act_' + actId)
      // logo is always the AdsMeta SVG mark, not user initial
      if (timeEl) timeEl.textContent = clock()
      const billTimeEl = document.getElementById('__amsb-bill-time')
      if (billTimeEl) billTimeEl.textContent = clock()

      updateMiniPill()
      if (S.open) renderBody()

    } catch (e) {
      S.loading = false
      if (S.open) bodyEl.innerHTML = `<div class="__amsb-msg">Lỗi: ${escH(e.message)}</div>`
    }
  }

  /* ─── Billing panel: inject as sibling below "Trung tâm trợ giúp" section ─── */
  const HELP_TEXTS = ['Trung tâm trợ giúp', 'Help Center', 'Help center', 'Trung Tâm Trợ Giúp']
  let billingPositioned = false
  let _billGuard = null   // interval canh FB re-render hất card ra → chèn lại (local, KHÔNG gọi FB)

  function findHelpSection() {
    // Find the Help Center heading in the right column
    let headingEl = null
    for (const el of document.querySelectorAll('h2,h3,h4,h5,span,div')) {
      if (el.childElementCount !== 0) continue
      if (!HELP_TEXTS.includes(el.textContent.trim())) continue
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.left < window.innerWidth * 0.5) continue
      headingEl = el
      break
    }
    if (!headingEl) return null
    // Walk up to find the container with links, then keep walking to find its outer box
    let result = null
    let node = headingEl.parentElement
    for (let i = 0; i < 20; i++) {
      if (!node || node === document.body) break
      const nr = node.getBoundingClientRect()
      if (nr.left < window.innerWidth * 0.45) break
      if (node.querySelectorAll('a').length >= 2) {
        result = node
        // Walk up further while still in sidebar — take the outermost sidebar-level box
        node = node.parentElement
        continue
      }
      if (result) break  // already found inner section, parent has no links → this is the outer box
      node = node.parentElement
    }
    return result
  }

  // Mốc chèn: ưu tiên "Lịch sử thanh toán" (chèn TRÊN nó), fallback "Trung tâm trợ giúp". Trả về BOX ngoài (cột phải).
  const ANCHOR_TEXTS = ['Lịch sử thanh toán', 'Payment history', 'Payment History', 'Trung tâm trợ giúp', 'Help Center', 'Help center', 'Trung Tâm Trợ Giúp']
  function findBillingAnchor() {
    let headingEl = null
    for (const target of ANCHOR_TEXTS) {
      for (const el of document.querySelectorAll('h2,h3,h4,span,div')) {
        if (el.childElementCount !== 0) continue
        if (el.textContent.trim() !== target) continue
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        if (r.left < window.innerWidth * 0.5) continue   // chỉ nhận ở CỘT PHẢI
        headingEl = el; break
      }
      if (headingEl) break
    }
    if (!headingEl) return null
    // Đi lên tìm BOX ngoài cùng của mục (vẫn còn ở cột phải) → chèn TRÊN cả box
    let node = headingEl.parentElement, box = headingEl
    for (let i = 0; i < 12; i++) {
      if (!node || node === document.body) break
      if (node.getBoundingClientRect().left < window.innerWidth * 0.45) break   // ra khỏi cột phải → dừng
      box = node; node = node.parentElement
    }
    return box
  }
  // Chỉ CAP style card (không đụng root) — dùng ngay để không full-width trong lúc tìm chỗ chèn
  function applyBillingCardOnly() {
    card.style.cssText = 'display:flex!important;flex-direction:column!important;margin:0 0 12px!important;' +
      'border-radius:12px!important;overflow:hidden!important;width:100%!important;max-width:360px!important;box-sizing:border-box!important;max-height:none!important;' +
      'box-shadow:0 4px 16px rgba(24,77,212,.14)!important;position:static!important;'
  }

  function applyBillingCardStyles() {
    // width:100% để lấp cột phải, NHƯNG max-width:360px là CHỐT CỨNG: dù FB đổi/tìm nhầm khối full-width,
    // card KHÔNG BAO GIỜ vượt 360px → hết dàn ngang. box-sizing để 360px đã gồm padding.
    card.style.cssText = 'display:flex!important;flex-direction:column!important;margin:0 0 12px!important;' +
      'border-radius:12px!important;overflow:hidden!important;width:100%!important;max-width:360px!important;box-sizing:border-box!important;max-height:none!important;' +
      'box-shadow:0 4px 16px rgba(24,77,212,.14)!important;position:static!important;'
    root.style.cssText = 'position:fixed!important;right:-9999px!important;top:0!important;pointer-events:none!important;'
    const hideEl = id  => { const e = document.getElementById(id);  if (e) e.style.setProperty('display','none','important') }
    const hideQ  = sel => { const e = card.querySelector(sel);       if (e) e.style.setProperty('display','none','important') }
    hideQ('.__amsb-toolbar'); hideQ('.__amsb-idrow'); hideQ('.__amsb-footer')
    hideEl('__amsb-settings'); hideEl('__amsb-theme'); hideEl('__amsb-close'); hideEl('__amsb-flag'); hideEl('__amsb-reload-hdr')
    const billingFooter = document.getElementById('__amsb-billing-footer')
    if (billingFooter) billingFooter.style.cssText = 'display:flex!important;align-items:center;gap:4px;background:linear-gradient(90deg,#1a4dd4 0%,#1877F2 100%);flex-shrink:0;padding:5px 8px;border-radius:0 0 12px 12px;'
    const updSpan = document.getElementById('__amsb-billing-upd')
    if (updSpan) updSpan.style.setProperty('display','inline','important')
    const body = document.getElementById('__amsb-body')
    if (body) { body.style.setProperty('flex','1','important'); body.style.setProperty('max-height','none','important'); body.style.setProperty('overflow-y','visible','important') }
  }

  async function injectBillingPanel() {
    if (card.parentElement !== root) { root.appendChild(card); billingPositioned = false }
    // CAP WIDTH NGAY (không removeAttribute → không full-width trong lúc tìm chỗ chèn / re-render)
    applyBillingCardOnly()

    for (let tries = 0; tries < 40; tries++) {
      // Ưu tiên mốc "Lịch sử thanh toán" → chèn TRÊN nó (đúng ý). Fallback "Trung tâm trợ giúp".
      const anchor = findBillingAnchor()
      if (anchor) {
        anchor.insertAdjacentElement('beforebegin', card)   // chèn NGAY TRÊN mốc
        applyBillingCardStyles()
        billingPositioned = true
        return true
      }
      await new Promise(r => setTimeout(r, 250))
    }
    return false
  }

  async function initBillingMode() {
    S.open = true
    // Chèn card VÀO cột phải FB, TRÊN "Lịch sử thanh toán" (như SMIT). max-width:360px (applyBillingCardStyles)
    // là chốt cứng → không bao giờ dàn ngang dù FB tìm nhầm khối.
    const ok = await injectBillingPanel()
    if (!ok) {
      // Fallback khi không tìm được cột phải: thẻ NỔI cố định 344px (vẫn cap width, không full)
      root.setAttribute('style', 'position:fixed!important;top:80px!important;right:16px!important;left:auto!important;bottom:auto!important;width:344px!important;max-width:344px!important;max-height:calc(100vh - 96px)!important;display:flex!important;flex-direction:column!important;pointer-events:all!important;z-index:2147483647!important;')
      card.setAttribute('style', 'display:flex!important;flex-direction:column!important;flex:1!important;width:100%!important;max-width:344px!important;overflow:hidden!important;border-radius:12px!important;box-shadow:0 4px 20px rgba(0,0,0,.15)!important;position:static!important;')
      mini.style.display = 'none'
    }
    loadData(false)
    // Canh FB re-render (click) hất card ra khỏi cột → chèn lại. Chỉ đọc/ghi DOM LOCAL, KHÔNG gọi FB → an toàn checkpoint.
    if (!_billGuard) _billGuard = setInterval(() => {
      if (!document.body.contains(card) || card.parentElement === root) { billingPositioned = false; injectBillingPanel() }
    }, 1500)
  }

  /* ─── SPA navigation watcher ─── */
  let _url = location.href
  new MutationObserver(() => {
    if (location.href !== _url) {
      _url = location.href
      // SPA rời khỏi 2 màn cho phép → ẩn panel; quay lại → hiện lại
      if (!amsbAllowed()) { root.style.display = 'none'; return }
      root.style.display = ''
      S.info = null
      billingPositioned = false
      if (isBillingPage) setTimeout(() => initBillingMode(), 900)
      else if (S.open) setTimeout(() => loadData(false), 900)
    }
  }).observe(document, { subtree: true, childList: true })

  if (!amsbAllowed()) root.style.display = 'none'
  if (isBillingPage) initBillingMode()
  else setTimeout(() => { if (S.open) loadData(false) }, 1500)
})()
