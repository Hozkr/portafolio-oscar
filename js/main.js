(function () {
    const body = document.body;
    const accToggle = document.getElementById('accessibilityToggle');
    const accMenu = document.getElementById('accessibilityMenu');

    if (!accToggle || !accMenu) return;

    let voiceEnabled = localStorage.getItem('voice') === 'true';

    /* =========================
       OPEN / CLOSE MENU
       ========================= */

    function openMenu() {
        accMenu.hidden = false;
        requestAnimationFrame(() => accMenu.classList.add('is-open'));
        accToggle.setAttribute('aria-expanded', 'true');
        trapFocus(accMenu);
        accMenu.querySelector('button')?.focus();
    }

    function closeMenu() {
        accMenu.classList.remove('is-open');
        accToggle.setAttribute('aria-expanded', 'false');

        accMenu.addEventListener(
            'transitionend',
            function handler() {
                accMenu.hidden = true;
                accMenu.removeEventListener('transitionend', handler);
            },
            { once: true }
        );
    }

    accToggle.addEventListener('click', () => {
        const isOpen = accToggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    });

    /* =========================
       CLOSE ON OUTSIDE CLICK
       ========================= */

    document.addEventListener('click', (e) => {
        if (
            accToggle.getAttribute('aria-expanded') === 'true' &&
            !accMenu.contains(e.target) &&
            !accToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    /* =========================
       KEYBOARD SHORTCUTS
       ========================= */

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && accToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            accToggle.focus();
        }

        if (e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            const isOpen = accToggle.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMenu() : openMenu();
        }
    });

    /* =========================
       MENU ACTIONS
       ========================= */

    accMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const action = btn.dataset.action;

        switch (action) {
            case 'increase-font':
                body.classList.remove('font-small');
                body.classList.add('font-large');
                localStorage.setItem('fontSize', 'large');
                setExclusiveActive(btn);
                break;

            case 'decrease-font':
                body.classList.remove('font-large');
                body.classList.add('font-small');
                localStorage.setItem('fontSize', 'small');
                setExclusiveActive(btn);
                break;

            case 'toggle-dyslexia': {
                body.classList.toggle('font-dyslexia');
                const active = body.classList.contains('font-dyslexia');
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-pressed', active);
                localStorage.setItem('dyslexia', active);
                break;
            }

            case 'toggle-voice': {
                voiceEnabled = !voiceEnabled;
                localStorage.setItem('voice', voiceEnabled);
                btn.classList.toggle('is-active', voiceEnabled);
                btn.setAttribute('aria-pressed', voiceEnabled);

                if (voiceEnabled) {
                    speak(
                        document.documentElement.lang === 'es'
                            ? 'Lectura de voz activada, presione tab para navegar'
                            : 'Voice reading enabled, press tab to navigate'
                    );
                } else {
                    speechSynthesis.cancel();
                }
                break;
            }

            case 'restablecer':
                resetAccessibility();
                break;
        }
    });

    /* =========================
       RESET TOTAL (DEFAULT)
       ========================= */

    function resetAccessibility() {
        /* BODY */
        body.classList.remove(
            'font-large',
            'font-small',
            'font-dyslexia'
        );

        /* STATE */
        voiceEnabled = false;

        /* STORAGE */
        localStorage.removeItem('fontSize');
        localStorage.removeItem('dyslexia');
        localStorage.removeItem('voice');

        /* UI */
        accMenu.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('is-active');
            btn.removeAttribute('aria-pressed');
        });

        /* VOICE */
        speechSynthesis.cancel();

        /* FEEDBACK */
        speak(
            document.documentElement.lang === 'es'
                ? 'Ajustes de accesibilidad restablecidos'
                : 'Accessibility settings reset'
        );
    }

    /* =========================
       FOCUS TRAP
       ========================= */

    function trapFocus(container) {
        const focusable = container.querySelectorAll(
            'button, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        container.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    /* =========================
       ACTIVE HELPERS
       ========================= */

    function setExclusiveActive(activeBtn) {
        accMenu
            .querySelectorAll('[data-action="increase-font"], [data-action="decrease-font"]')
            .forEach(btn => {
                btn.classList.remove('is-active');
                btn.removeAttribute('aria-pressed');
            });

        activeBtn.classList.add('is-active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }

    /* =========================
       PERSISTENCE
       ========================= */

    const savedFont = localStorage.getItem('fontSize');
    if (savedFont === 'large') {
        body.classList.add('font-large');
        accMenu.querySelector('[data-action="increase-font"]')?.classList.add('is-active');
    }

    if (savedFont === 'small') {
        body.classList.add('font-small');
        accMenu.querySelector('[data-action="decrease-font"]')?.classList.add('is-active');
    }

    if (localStorage.getItem('dyslexia') === 'true') {
        body.classList.add('font-dyslexia');
        accMenu.querySelector('[data-action="toggle-dyslexia"]')?.classList.add('is-active');
    }

    if (voiceEnabled) {
        accMenu.querySelector('[data-action="toggle-voice"]')?.classList.add('is-active');
    }

    /* =========================
       VOICE — TABINDEX="0" ONLY
       ========================= */

    document.addEventListener('focusin', () => {
        if (!voiceEnabled) return;

        const el = document.activeElement;
        if (!el || el.getAttribute('tabindex') !== '0') return;

        const text = el.getAttribute('aria-label') || el.innerText?.trim();
        if (!text) return;

        speak(text);
    });

    function speak(text) {
        if (!('speechSynthesis' in window)) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.documentElement.lang || 'es';

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }
})();
