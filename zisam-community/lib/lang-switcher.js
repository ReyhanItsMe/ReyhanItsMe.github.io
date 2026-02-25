const LangManager = {
    currentLang: localStorage.getItem('zisam_lang') || 'id',
    dictionary: {},
    isTranslating: false, // Guard untuk mencegah loop

    async loadDictionary(lang) {
        try {
            const response = await fetch(`/zisam-community/lang/${lang}.json`);
            this.dictionary = await response.json();
            this.currentLang = lang;
            localStorage.setItem('zisam_lang', lang);
            this.translatePage();
        } catch (error) {
            console.error("Lang file missing");
        }
    },

    translatePage() {
        if (this.isTranslating) return;
        this.isTranslating = true;

        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (this.dictionary[key] && el.innerText !== this.dictionary[key]) {
                el.innerText = this.dictionary[key];
            }
        });

        setTimeout(() => { this.isTranslating = false; }, 100);
    },

    init() {
        this.loadDictionary(this.currentLang);
        
        // Memantau perubahan DOM tanpa bikin hang
        const observer = new MutationObserver(() => {
            if (!this.isTranslating) this.translatePage();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    },

    switchLang(lang) {
        this.loadDictionary(lang);
    }
};

window.LangManager = LangManager;
LangManager.init();
