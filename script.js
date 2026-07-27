'use strict';

// ============ Constants ============
const STORAGE_KEY_LANG = 'docker-book-lang';
const STORAGE_KEY_THEME = 'docker-book-theme';
const STORAGE_KEY_LAST_CHAPTER = 'docker-book-last-chapter';
const DEFAULT_LANG = 'fa';

// ============ State ============
let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || DEFAULT_LANG;
let currentTheme = localStorage.getItem(STORAGE_KEY_THEME)
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// ============ Init ============
document.addEventListener('DOMContentLoaded', () => {
    setTheme(currentTheme);
    initThemeToggle();
    setLanguage(currentLang);
    initTOC();
    initSearch();
    initLangButtons();
    initChapterLinks();
    initHistoryNavigation();
    restoreLastChapter();
});

// ============ Theme Switch ============
function setTheme(theme) {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY_THEME, currentTheme);
    document.documentElement.dataset.theme = currentTheme;

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const isDark = currentTheme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'فعال‌کردن تم روشن' : 'فعال‌کردن تم تاریک');
    toggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    // toggle.querySelector('.theme-label').textContent = isDark ? 'تم روشن' : 'تم تاریک';
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// ============ Language Switch ============
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY_LANG, lang);

    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';

    // Update all elements with data-fa / data-en
    document.querySelectorAll('[data-fa][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update placeholder-only elements (e.g. search box)
    document.querySelectorAll(`[data-placeholder-${lang}]`).forEach(el => {
        el.setAttribute('placeholder', el.getAttribute(`data-placeholder-${lang}`));
    });

    // Update active lang button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Show/hide language-specific blocks inside chapter content (if any)
    document.querySelectorAll('.lang-fa, .lang-en').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = '';
    });
}

function initLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
}

// ============ Sidebar TOC Accordion ============
function initTOC() {
    document.querySelectorAll('.part-title').forEach(title => {
        title.addEventListener('click', () => {
            const partItem = title.closest('.toc-part');
            togglePart(partItem);
        });
    });

    // Open the first part by default
    const firstPart = document.querySelector('.toc-part');
    if (firstPart) firstPart.classList.add('open');
}

function togglePart(partItem, forceOpen = null) {
    if (!partItem) return;
    const isOpen = partItem.classList.contains('open');
    const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;
    partItem.classList.toggle('open', shouldOpen);
}

// ============ Chapter Navigation ============
function initChapterLinks() {
    document.querySelectorAll('.chapter-list a[data-target]').forEach(link => {
        // لینک‌های فعلی در HTML دارای onclick هستند؛ از ثبت رویداد تکراری جلوگیری می‌کنیم.
        if (link.hasAttribute('onclick')) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            showChapter(targetId, link);
        });
    });
}

async function showChapter(targetId, event, updateUrl = true) {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    const activeLink = event?.target?.closest?.('a')
        || event?.closest?.('a')
        || document.querySelector(`.chapter-list a[data-target="${targetId}"]`);

    let target = document.getElementById(targetId);

    // اگر محتوا هنوز در DOM نیست، از فایل جدا بگیر
    if (!target) {
        try {
            const response = await fetch(`chapters/${targetId}.html`);
            if (!response.ok) throw new Error('Chapter not found');
            const html = await response.text();

            // ساخت div جدید و درج محتوای دریافتی
            const wrapper = document.createElement('div');
            wrapper.id = targetId;
            wrapper.className = 'chapter-content';
            wrapper.innerHTML = html;

            // درج در کنار placeholder / داخل کانتینر محتوا
            const contentContainer = document.getElementById('content'); // یا هر id مربوط به کانتینر اصلی
            contentContainer.appendChild(wrapper);

            target = wrapper;

            // اعمال زبان فعلی روی محتوای تازه لود شده
            if (typeof applyLanguage === 'function') {
                applyLanguage();
            }
        } catch (err) {
            console.error('خطا در بارگذاری فصل:', err);
            return;
        }
    }

    // مخفی کردن همه‌ی بخش‌ها
    document.querySelectorAll('.chapter-content').forEach(el => el.classList.remove('active'));

    target.classList.add('active');
    target.scrollIntoView({ behavior: 'instant', block: 'start' });

    // آپدیت لینک فعال در سایدبار
    document.querySelectorAll('.chapter-list a').forEach(link => link.classList.remove('active-link'));
    activeLink?.classList.add('active-link');
    activeLink?.closest('.toc-part')?.classList.add('open');

    localStorage.setItem(STORAGE_KEY_LAST_CHAPTER, targetId);

    if (updateUrl) {
        setChapterUrl(targetId);
    }

    // بستن سایدبار در موبایل
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar')?.classList.remove('open');
    }
}

function setChapterUrl(targetId) {
    const chapterHash = `#${targetId}`;
    if (window.location.hash === chapterHash) return;

    history.pushState(
        { chapter: targetId },
        '',
        `${window.location.pathname}${window.location.search}${chapterHash}`
    );
}

function getChapterIdFromUrl() {
    return decodeURIComponent(window.location.hash.slice(1));
}

function initHistoryNavigation() {
    window.addEventListener('popstate', () => {
        const chapterId = getChapterIdFromUrl();
        if (!chapterId) return;

        const link = document.querySelector(`.chapter-list a[data-target="${chapterId}"]`);
        showChapter(chapterId, link, false);
    });
}


// ============ Search / Filter TOC ============
function initSearch() {
    const searchBox = document.getElementById('search-box');
    if (!searchBox) return;

    searchBox.addEventListener('input', (e) => {
        filterTOC(e.target.value.trim().toLowerCase());
    });
}

function filterTOC(query) {
    const parts = document.querySelectorAll('.toc-part');

    if (!query) {
        // Reset: show everything, collapse all except first
        parts.forEach((part, index) => {
            part.style.display = '';
            part.querySelectorAll('.chapter-list li').forEach(li => {
                li.style.display = '';
            });
            part.classList.toggle('open', index === 0);
        });
        return;
    }

    parts.forEach(part => {
        let partHasMatch = false;
        const partTitleText = part.querySelector('.part-title').textContent.toLowerCase();
        const partMatches = partTitleText.includes(query);

        part.querySelectorAll('.chapter-list li').forEach(li => {
            const text = li.textContent.toLowerCase();
            const match = text.includes(query) || partMatches;
            li.style.display = match ? '' : 'none';
            if (match) partHasMatch = true;
        });

        part.style.display = partHasMatch ? '' : 'none';
        part.classList.toggle('open', partHasMatch);
    });
}

// ============ Utility: Restore last chapter on reload ============
async function restoreLastChapter() {
    const chapterIdFromUrl = getChapterIdFromUrl();
    const lastId = chapterIdFromUrl || localStorage.getItem(STORAGE_KEY_LAST_CHAPTER);
    if (!lastId) return;

    const link = document.querySelector(`.chapter-list a[data-target="${lastId}"]`);
    await showChapter(lastId, link, !chapterIdFromUrl);
}
