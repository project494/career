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
  const isNestedPage = ['work', 'education', 'projects', 'certifications'].includes(pathParts[pathParts.length - 2]);
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
    certifications: `${prefix}certifications/index.html`,
    pmp: `${prefix}certifications/pmp.html`,
    lifeguard: `${prefix}certifications/lifeguard.html`,
  };

  const getAriaCurrent = (href) => {
    try {
      const hrefPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '');
      const currentPath = window.location.pathname.replace(/\/$/, '');
      return hrefPath === currentPath ? ' aria-current="page"' : '';
    } catch (error) {
      return '';
    }
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
              <li>
                <a href="${links.home}"${getAriaCurrent(links.home)}>Home</a>
              </li>

              <!-- Education -->
              <li class="nav-group">
                <button
                  class="group-label"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="nav-panel-education"
                >
                  Education
                </button>
                <div
                  id="nav-panel-education"
                  class="dropdown-panel"
                  role="menu"
                  aria-label="Education pages"
                >
                  <a href="${links.highSchool}" role="menuitem"${getAriaCurrent(links.highSchool)}>Gotham High School</a>
                  <a href="${links.university}" role="menuitem"${getAriaCurrent(links.university)}>University of Iowa</a>
                  <a href="${links.communityCollege}" role="menuitem"${getAriaCurrent(links.communityCollege)}>Community College</a>
                </div>
              </li>

              <!-- Work Roles -->
              <li class="nav-group">
                <button
                  class="group-label"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="nav-panel-work"
                >
                  Work Roles
                </button>
                <div
                  id="nav-panel-work"
                  class="dropdown-panel"
                  role="menu"
                  aria-label="Work role pages"
                >
                  <a href="${links.work1}" role="menuitem"${getAriaCurrent(links.work1)}>Career 1</a>
                  <a href="${links.work2}" role="menuitem"${getAriaCurrent(links.work2)}>Career 2</a>
                  <a href="${links.work3}" role="menuitem"${getAriaCurrent(links.work3)}>Career 3</a>
                  <a href="${links.work4}" role="menuitem"${getAriaCurrent(links.work4)}>Career 4</a>
                  <a href="${links.work5}" role="menuitem"${getAriaCurrent(links.work5)}>Career 5</a>
                  <a href="${links.work6}" role="menuitem"${getAriaCurrent(links.work6)}>Career 6</a>
                </div>
              </li>

              <!-- Personal Projects -->
              <li class="nav-group">
                <button
                  class="group-label"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="nav-panel-projects"
                >
                  Personal Projects
                </button>
                <div
                  id="nav-panel-projects"
                  class="dropdown-panel"
                  role="menu"
                  aria-label="Project pages"
                >
                  <a href="${links.coding}" role="menuitem"${getAriaCurrent(links.coding)}>Coding Projects</a>
                  <a href="${links.graphics}" role="menuitem"${getAriaCurrent(links.graphics)}>Graphics Portfolio</a>
                  <a href="${links.writing}" role="menuitem"${getAriaCurrent(links.writing)}>Writing Samples</a>
                </div>
              </li>

              <!-- Certifications -->
              <li class="nav-group">
                <button
                  class="group-label"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-controls="nav-panel-certifications"
                >
                  Certifications
                </button>
                <div
                  id="nav-panel-certifications"
                  class="dropdown-panel"
                  role="menu"
                  aria-label="Certification pages"
                >
                  <a href="${links.certifications}" role="menuitem"${getAriaCurrent(links.certifications)}>All Certifications</a>
                  <a href="${links.pmp}" role="menuitem"${getAriaCurrent(links.pmp)}>PMP</a>
                  <a href="${links.lifeguard}" role="menuitem"${getAriaCurrent(links.lifeguard)}>Lifeguard</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  };

  // ==================================================
  // Navigation dropdown interactions
  // ==================================================
  const initNavDropdowns = () => {
    const navGroups = document.querySelectorAll('.nav-group');

    if (!navGroups.length) {
      return;
    }

    const closeAllPanels = () => {
      navGroups.forEach((group) => {
        group.classList.remove('is-open');
        const button = group.querySelector('.group-label');

        if (button) {
          button.setAttribute('aria-expanded', 'false');
        }
      });
    };

    navGroups.forEach((group) => {
      const button = group.querySelector('.group-label');

      if (!button) {
        return;
      }

      const toggleGroup = () => {
        const isOpen = group.classList.contains('is-open');

        closeAllPanels();

        if (!isOpen) {
          group.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      };

      button.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleGroup();
      });

      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleGroup();
        }
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav-group')) {
        closeAllPanels();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAllPanels();
      }
    });
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
    mount.setAttribute('aria-label', 'Site footer');
    mount.innerHTML = `
      <div class="site-footer__contact" aria-label="Contact details">
        <strong>Contact:</strong>
        <a href="mailto:${contact.email}">${contact.email}</a>
        <span>|</span>
        <a href="tel:+15551234567">${contact.phone}</a>
        <span>|</span>
        <a href="${contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>

      <nav class="site-footer__grid" aria-label="Footer site links">
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

        <section>
          <h2>Certifications</h2>
          <a href="${links.certifications}">All Certifications</a>
          <a href="${links.pmp}">PMP</a>
          <a href="${links.lifeguard}">Lifeguard</a>
        </section>
      </nav>

      <p class="site-footer__copyright">Copyright 2026 My Living Resume.</p>
    `;
  };

  // ==================================================
  // App initialization
  // ==================================================
  renderHeader();
  initNavDropdowns();
  renderFooter();
  initChatKit();
})();