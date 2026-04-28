(function renderSharedSiteChrome() {
  // ==================================================
  // Global constants
  // ==================================================
  const CHATKIT_CONFIG = {
    // Keep chat disabled by default so production pages do not auto-initialize it.
    defaultEnabled: false,
    queryParam: 'enableChat',
    rootId: 'chatkit-root',
    fallbackId: 'chatkit-fallback',
    expectedOwner: 'your-user-id',
  };

  // ==================================================
  // Path helpers
  // Detect whether current page is nested so links resolve.
  // ==================================================
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const isNestedPage = ['work', 'education', 'projects'].includes(pathParts[pathParts.length - 2]);
  const prefix = isNestedPage ? '../' : '';

  // ==================================================
  // Navigation and footer link map
  // ==================================================
  const links = {
    home: `${prefix}index.html`,
    work1: `${prefix}work/job-1.html`,
    work2: `${prefix}work/job-2.html`,
    work3: `${prefix}work/job-3.html`,
    work4: `${prefix}work/job-4.html`,
    work5: `${prefix}work/job-5.html`,
    work6: `${prefix}work/job-6.html`,
    highSchool: `${prefix}education/high-school.html`,
    university: `${prefix}education/university.html`,
    communityCollege: `${prefix}education/community-college.html`,
    coding: `${prefix}projects/coding-projects.html`,
    graphics: `${prefix}projects/graphics-portfolio.html`,
    writing: `${prefix}projects/writing-samples.html`,
  };

  // ==================================================
  // Shared contact data
  // ==================================================
  const contact = {
    email: 'you@example.com',
    phone: '(555) 123-4567',
    linkedin: 'https://www.linkedin.com/in/your-profile',
  };

  // ==================================================
  // Header renderer
  // ==================================================
  const renderHeader = () => {
    const mount = document.getElementById('site-header');

    if (!mount) {
      return;
    }

    mount.innerHTML = `
      <header class="site-header">
        <a class="skip-link" href="#main-content">Skip to content</a>

        <div class="nav-ribbon">
          <a class="brand" href="${links.home}">My Living Resume</a>

          <nav aria-label="Primary navigation">
            <ul class="nav-list">
              <li><a href="${links.home}">Home</a></li>

              <li class="nav-group">
                <button class="group-label" type="button" aria-haspopup="true">Education</button>
                <div class="dropdown-panel" role="menu" aria-label="Education pages">
                  <a href="${links.highSchool}" role="menuitem">Gotham High School</a>
                  <a href="${links.university}" role="menuitem">University of Iowa</a>
                  <a href="${links.communityCollege}" role="menuitem">Community College</a>
                </div>
              </li>

              <li class="nav-group">
                <button class="group-label" type="button" aria-haspopup="true">Work Roles</button>
                <div class="dropdown-panel" role="menu" aria-label="Work role pages">
                  <a href="${links.work1}" role="menuitem">Career 1</a>
                  <a href="${links.work2}" role="menuitem">Career 2</a>
                  <a href="${links.work3}" role="menuitem">Career 3</a>
                  <a href="${links.work4}" role="menuitem">Career 4</a>
                  <a href="${links.work5}" role="menuitem">Career 5</a>
                  <a href="${links.work6}" role="menuitem">Career 6</a>
                </div>
              </li>

              <li class="nav-group">
                <button class="group-label" type="button" aria-haspopup="true">Personal Projects</button>
                <div class="dropdown-panel" role="menu" aria-label="Project pages">
                  <a href="${links.coding}" role="menuitem">Coding Projects</a>
                  <a href="${links.graphics}" role="menuitem">Graphics Portfolio</a>
                  <a href="${links.writing}" role="menuitem">Writing Samples</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  };

  // ==================================================
  // Footer renderer
  // ==================================================
  const renderFooter = () => {
    const mount = document.querySelector('.footer') || document.getElementById('site-footer');

    if (!mount) {
      return;
    }

    mount.className = 'footer site-footer';
    mount.innerHTML = `
      <div class="site-footer__contact" aria-label="Contact details">
        <strong>Contact:</strong>
        <a href="mailto:${contact.email}">${contact.email}</a>
        <span>|</span>
        <a href="tel:+15551234567">${contact.phone}</a>
        <span>|</span>
        <a href="${contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>

      <nav class="site-footer__grid" aria-label="Footer links">
        <section>
          <h2>Home</h2>
          <a href="${links.home}">Homepage</a>
        </section>

        <section>
          <h2>Education</h2>
          <a href="${links.highSchool}">Gotham High School</a>
          <a href="${links.university}">University of Iowa</a>
          <a href="${links.communityCollege}">Community College</a>
        </section>

        <section>
          <h2>Work Roles</h2>
          <a href="${links.work1}">Career 1</a>
          <a href="${links.work2}">Career 2</a>
          <a href="${links.work3}">Career 3</a>
          <a href="${links.work4}">Career 4</a>
          <a href="${links.work5}">Career 5</a>
          <a href="${links.work6}">Career 6</a>
        </section>

        <section>
          <h2>Personal Projects</h2>
          <a href="${links.coding}">Coding Projects</a>
          <a href="${links.graphics}">Graphics Portfolio</a>
          <a href="${links.writing}">Writing Samples</a>
        </section>
      </nav>

      <p class="site-footer__copyright">Copyright 2026 My Living Resume.</p>
    `;
  };

  // ==================================================
  // ChatKit setup helpers
  // ==================================================
  const getChatConfig = () => {
    const script = document.currentScript || document.querySelector('script[src$="shared-header.js"]');
    const params = new URLSearchParams(window.location.search);

    const parseBoolean = (value) => {
      if (typeof value !== 'string') {
        return null;
      }

      const normalized = value.trim().toLowerCase();

      if (['1', 'true', 'yes', 'on'].includes(normalized)) {
        return true;
      }

      if (['0', 'false', 'no', 'off'].includes(normalized)) {
        return false;
      }

      return null;
    };

    const queryEnabled = parseBoolean(params.get(CHATKIT_CONFIG.queryParam));
    const dataEnabled = parseBoolean(script?.dataset.enableChat);

    return {
      enabled: queryEnabled ?? dataEnabled ?? CHATKIT_CONFIG.defaultEnabled,
      domainKey: script?.dataset.chatkitDomainKey || '',
      owner: script?.dataset.chatOwner || '',
    };
  };

  const ensureChatKitArea = () => {
    let root = document.getElementById(CHATKIT_CONFIG.rootId);

    if (!root) {
      root = document.createElement('section');
      root.id = CHATKIT_CONFIG.rootId;
      root.setAttribute('aria-live', 'polite');
      root.setAttribute('aria-label', 'Chat assistant area');
      document.body.appendChild(root);
    }

    let fallback = document.getElementById(CHATKIT_CONFIG.fallbackId);

    if (!fallback) {
      fallback = document.createElement('p');
      fallback.id = CHATKIT_CONFIG.fallbackId;
      fallback.textContent = 'Chat is currently unavailable. Please use the contact links in the footer.';
      root.appendChild(fallback);
    }

    return { root, fallback };
  };

  const hideFallback = (fallback) => {
    fallback.hidden = true;
  };

  const showFallback = (fallback, message) => {
    fallback.hidden = false;
    if (message) {
      fallback.textContent = message;
    }
  };

  const loadChatKitScript = () =>
    new Promise((resolve, reject) => {
      if (window.ChatKit) {
        resolve(window.ChatKit);
        return;
      }

      const existing = document.querySelector('script[data-chatkit-script="true"]');

      if (existing) {
        existing.addEventListener('load', () => resolve(window.ChatKit));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js';
      script.async = true;
      script.dataset.chatkitScript = 'true';
      script.addEventListener('load', () => resolve(window.ChatKit));
      script.addEventListener('error', reject);
      document.head.appendChild(script);
    });

  const initChatKit = async () => {
    const chatConfig = getChatConfig();

    if (!chatConfig.enabled) {
      return;
    }

    const { fallback } = ensureChatKitArea();

    if (!chatConfig.domainKey) {
      showFallback(fallback, 'Chat is enabled, but no domain key is configured.');
      return;
    }

    if (!chatConfig.owner || chatConfig.owner !== CHATKIT_CONFIG.expectedOwner) {
      showFallback(fallback, 'Chat is disabled because this page is not configured for an approved owner.');
      return;
    }

    try {
      const chatkit = await loadChatKitScript();

      if (!chatkit || typeof chatkit.create !== 'function') {
        showFallback(fallback);
        return;
      }

      hideFallback(fallback);
      chatkit.create({
        mount: `#${CHATKIT_CONFIG.rootId}`,
        api: {
          domainKey: chatConfig.domainKey,
        },
      });
    } catch (error) {
      showFallback(fallback);
      console.error('ChatKit failed to load:', error);
    }
  };

  // ==================================================
  // App initialization
  // ==================================================
  renderHeader();
  renderFooter();
  initChatKit();
})();
