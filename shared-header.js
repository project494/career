(function renderSiteHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  mount.innerHTML = `
    <header class="site-header">
      <a class="skip-link" href="#main-content">Skip to content</a>
      <div class="nav-ribbon">
        <a class="brand" href="/index.html">My Living Resume</a>
        <nav aria-label="Primary navigation">
          <ul class="nav-list">
            <li><a href="/index.html">Home</a></li>
            <li class="nav-group">
              <button class="group-label" type="button">Work Experience</button>
              <div class="dropdown-panel">
                <a href="/work/job-1.html">Career 1</a>
                <a href="/work/job-2.html">Career 2</a>
                <a href="/work/job-3.html">Career 3</a>
                <a href="/work/job-4.html">Career 4</a>
                <a href="/work/job-5.html">Career 5</a>
                <a href="/work/job-6.html">Career 6</a>
              </div>
            </li>
            <li class="nav-group">
              <button class="group-label" type="button">Educational Experience</button>
              <div class="dropdown-panel">
                <a href="/education/high-school.html">High School</a>
                <a href="/education/university.html">University</a>
                <a href="/education/community-college.html">Community College</a>
              </div>
            </li>
            <li class="nav-group">
              <button class="group-label" type="button">Personal Projects</button>
              <div class="dropdown-panel">
                <a href="/projects/coding-projects.html">Coding Projects</a>
                <a href="/projects/graphics-portfolio.html">Graphics Portfolio</a>
                <a href="/projects/writing-samples.html">Writing Samples</a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `;
})();
