const main = document.getElementById('main-content');

const sections = {
  '/': {
    title: 'Home',
    html: `
      <section class="hero card">
        <p class="eyebrow">App Version</p>
        <h1>Welcome to your Living Resume App</h1>
        <p>Now your site runs as an app-style experience with client-side navigation and reusable page templates.</p>
        <div class="action-row">
          <a class="button" href="/work/job-1" data-route>Start with Work History</a>
          <a class="button button-secondary" href="/projects/coding-projects" data-route>View Projects</a>
        </div>
      </section>
      <section class="card">
        <h2>What to update next</h2>
        <ul>
          <li>Add your real job/company details to Career 1-6 pages.</li>
          <li>Add school information to each education page.</li>
          <li>Add links/media on project pages.</li>
        </ul>
      </section>
    `,
  },
};

for (let i = 1; i <= 6; i += 1) {
  sections[`/work/job-${i}`] = {
    title: `Career ${i}`,
    html: `
      <section class="hero card">
        <p class="eyebrow">Work Experience</p>
        <h1>Career ${i}</h1>
        <p class="muted">Replace with your company, title, and timeframe.</p>
      </section>
      <section class="card"><h2>Role Snapshot</h2><p>Add role summary and scope.</p></section>
      <section class="card"><h2>Impact Highlights</h2><p>Add measurable achievements here.</p></section>
    `,
  };
}

[
  ['/education/high-school', 'Gotham High School'],
  ['/education/university', 'University'],
  ['/education/community-college', 'Community College'],
].forEach(([path, title]) => {
  sections[path] = {
    title,
    html: `
      <section class="hero card">
        <p class="eyebrow">Educational Experience</p>
        <h1>${title}</h1>
        <p class="muted">Add institution name, dates, and major highlights.</p>
      </section>
      <section class="card"><h2>Program Overview</h2><p>Add program details and key milestones.</p></section>
    `,
  };
});

[
  ['/projects/coding-projects', 'Coding Projects'],
  ['/projects/graphics-portfolio', 'Graphics Portfolio'],
  ['/projects/writing-samples', 'Writing Samples'],
].forEach(([path, title]) => {
  sections[path] = {
    title,
    html: `
      <section class="hero card">
        <p class="eyebrow">Personal Projects</p>
        <h1>${title}</h1>
        <p class="muted">Add your best examples and links.</p>
      </section>
      <section class="card"><h2>Featured Work</h2><p>Add entries with short descriptions and URLs.</p></section>
    `,
  };
});

function render(path) {
  const page = sections[path] || {
    title: 'Not Found',
    html: '<section class="card"><h1>Page not found</h1><p>Use the navigation to continue.</p></section>',
  };

  document.title = `${page.title} | My Living Resume App`;
  main.innerHTML = page.html;
}

function onRouteClick(event) {
  const link = event.target.closest('a[data-route]');
  if (!link) return;
  event.preventDefault();
  const href = link.getAttribute('href');
  history.pushState({}, '', href);
  render(href);
}

window.addEventListener('popstate', () => render(window.location.pathname));
document.addEventListener('click', onRouteClick);
render(window.location.pathname);
