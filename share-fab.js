/* FarmPlus – nút chia sẻ nổi (Facebook, Zalo, Messenger, sao chép link) */
(function () {
  var BASE = 'https://juliolayme.github.io/farmplus-ux-preview/';
  function ls(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function shareUrl() {
    var file = (location.pathname.split('/').pop() || 'index.html');
    if (file === 'thuc-an-chi-tiet.html' && ls('fp-feed')) return BASE + 'thuc-an-' + ls('fp-feed').toLowerCase() + '.html';
    if (file === 'tin-tuc-chi-tiet.html' && ls('fp-article')) return BASE + 'tin-' + ls('fp-article') + '.html';
    if (file === 'tuyen-dung-chi-tiet.html' && ls('fp-job')) return BASE + 'viec-' + ls('fp-job') + '.html';
    if (file === 'san-pham-chi-tiet.html' && ls('fp-product')) return BASE + 'san-pham-chi-tiet.html?id=' + encodeURIComponent(ls('fp-product'));
    var c = document.querySelector('link[rel=canonical]');
    return c ? c.href : location.href.split('#')[0];
  }
  function shareTitle() {
    var h = document.querySelector('main h1');
    return (h && h.textContent.replace(/\s+/g, ' ').trim()) || document.title;
  }
  var css = '' +
    '.fps-btn{position:fixed;left:16px;bottom:24px;z-index:71;width:56px;height:56px;border-radius:999px;border:0;background:#fff;color:#17703A;display:grid;place-items:center;box-shadow:0 10px 24px -8px rgba(0,0,0,.4),0 0 0 1px rgba(23,112,58,.15);cursor:pointer;transition:transform .25s,bottom .25s}' +
    '.fps-btn:hover{transform:translateY(-3px)}.fps-btn svg{width:24px;height:24px}' +
    '.fps-btn span{position:absolute;left:64px;background:#13261A;color:#fff;font:600 13px/1 "Be Vietnam Pro",system-ui,sans-serif;padding:8px 12px;border-radius:8px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .25s}' +
    '.fps-btn:hover span{opacity:1}' +
    '.fps-ov{position:fixed;inset:0;z-index:200;background:rgba(10,30,18,.45);opacity:0;pointer-events:none;transition:opacity .25s}' +
    '.fps-ov.on{opacity:1;pointer-events:auto}' +
    '.fps-sheet{position:fixed;left:0;right:0;bottom:0;z-index:201;background:#fff;border-radius:22px 22px 0 0;padding:10px 20px calc(22px + env(safe-area-inset-bottom));transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);font-family:"Be Vietnam Pro",system-ui,sans-serif;color:#13261A;max-width:560px;margin:0 auto;box-shadow:0 -10px 40px rgba(0,0,0,.18)}' +
    '.fps-sheet.on{transform:none}' +
    '.fps-grab{width:44px;height:5px;border-radius:9px;background:#D5DED6;margin:0 auto 14px}' +
    '.fps-h{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px}.fps-h b{font-size:18px;font-weight:800;color:#0F4F2A}' +
    '.fps-x{border:0;background:#F2F6F1;width:36px;height:36px;border-radius:99px;font-size:20px;line-height:1;cursor:pointer;color:#3C4F42}' +
    '.fps-t{font-size:14px;color:#55665A;margin:0 0 16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}' +
    '.fps-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}' +
    '.fps-g a,.fps-g button{display:flex;flex-direction:column;align-items:center;gap:8px;border:0;background:none;padding:6px 0;font:600 13px "Be Vietnam Pro",system-ui,sans-serif;color:#13261A;text-decoration:none;cursor:pointer}' +
    '.fps-i{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;color:#fff}.fps-i svg{width:28px;height:28px}' +
    '.fps-link{display:flex;gap:8px;align-items:center;margin-top:16px;background:#F4F8F2;border-radius:12px;padding:10px 12px;font-size:13px;color:#3C4F42}.fps-link code{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:inherit}' +
    '.fps-toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%) translateY(10px);background:#13261A;color:#fff;font:600 14px "Be Vietnam Pro",system-ui,sans-serif;padding:10px 16px;border-radius:10px;z-index:210;opacity:0;pointer-events:none;transition:.25s;max-width:calc(100% - 32px);text-align:center}' +
    '.fps-toast.on{opacity:1;transform:translateX(-50%)}';
  var ICON_SHARE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';
  var ICON_FB = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14 2c-3.3 0-4 2.4-4 4v2.5H8V12h2v10h4V12h2.7l.4-3.5H14Z"/></svg>';
  var ICON_MS = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.2 7.1V22l2.9-1.6c1.2.3 2.5.5 3.9.5 5.6 0 10-4.1 10-9.6S17.6 2 12 2Zm1 12.9-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8Z"/></svg>';
  var ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';
  function init() {
    if (document.querySelector('.fps-btn')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'fps-btn'; btn.setAttribute('aria-label', 'Chia sẻ trang này');
    btn.innerHTML = ICON_SHARE + '<span aria-hidden="true">Chia sẻ</span>';
    var ov = document.createElement('div'); ov.className = 'fps-ov';
    var sh = document.createElement('div'); sh.className = 'fps-sheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true'); sh.setAttribute('aria-label', 'Chia sẻ');
    var toast = document.createElement('div'); toast.className = 'fps-toast'; toast.setAttribute('role', 'status');
    document.body.appendChild(btn); document.body.appendChild(ov); document.body.appendChild(sh); document.body.appendChild(toast);
    var tt;
    function say(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, 2600); }
    function copy(url, msg) {
      function fallback() { var i = document.createElement('textarea'); i.value = url; i.style.position = 'fixed'; i.style.opacity = '0'; document.body.appendChild(i); i.select(); try { document.execCommand('copy'); } catch (e) {} i.remove(); say(msg); }
      try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(url).then(function () { say(msg); }, fallback); return; } } catch (e) {}
      fallback();
    }
    function close() { sh.classList.remove('on'); ov.classList.remove('on'); }
    function open() {
      var url = shareUrl(), title = shareTitle(), u = encodeURIComponent(url);
      var mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      sh.innerHTML = '<div class="fps-grab"></div><div class="fps-h"><b>Chia sẻ trang này</b><button type="button" class="fps-x" aria-label="Đóng">×</button></div>' +
        '<p class="fps-t"></p><div class="fps-g">' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + u + '" target="_blank" rel="noopener" data-k="fb"><span class="fps-i" style="background:#1877F2">' + ICON_FB + '</span>Facebook</a>' +
        '<button type="button" data-k="zalo"><span class="fps-i" style="background:#0068FF;font-weight:800;font-size:15px">Zalo</span>Zalo</button>' +
        '<a href="fb-messenger://share/?link=' + u + '" data-k="ms"><span class="fps-i" style="background:linear-gradient(135deg,#0A7CFF,#A033FF)">' + ICON_MS + '</span>Messenger</a>' +
        '<button type="button" data-k="copy"><span class="fps-i" style="background:#17703A">' + ICON_LINK + '</span>Sao chép</button>' +
        '</div><div class="fps-link"><code></code></div>';
      sh.querySelector('.fps-t').textContent = title;
      sh.querySelector('code').textContent = url.replace(/^https:\/\//, '');
      sh.querySelector('.fps-x').onclick = close;
      sh.querySelector('[data-k=copy]').onclick = function () { copy(url, 'Đã sao chép liên kết'); };
      sh.querySelector('[data-k=zalo]').onclick = function () {
        if (navigator.share && mobile) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
        copy(url, 'Đã sao chép – mở Zalo và dán để gửi');
      };
      sh.querySelector('[data-k=ms]').onclick = function (e) { if (!mobile) { e.preventDefault(); copy(url, 'Đã sao chép – mở Messenger và dán để gửi'); } };
      sh.querySelector('[data-k=fb]').onclick = function (e) {
        if (!mobile) { e.preventDefault(); window.open(this.href, 'fbshare', 'width=620,height=560'); }
      };
      ov.classList.add('on'); sh.classList.add('on');
    }
    btn.onclick = open; ov.onclick = close;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    function place() {
      var bar = document.querySelector('.sh-bar');
      var up = bar && getComputedStyle(bar).display !== 'none' && bar.getBoundingClientRect().height > 0;
      btn.style.bottom = up ? '88px' : '24px';
    }
    setInterval(place, 800); place();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
