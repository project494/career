(function renderSiteHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const isNestedPage = ['work', 'education', 'projects'].includes(pathParts[pathParts.length - 2]);
  const prefix = isNestedPage ? '../' : '';

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

  mount.innerHTML = `
    <header class="site-header">
      <a class="skip-link" href="#main-content">Skip to content</a>
      <div class="nav-ribbon">
        <a class="brand" href="${links.home}">My Living Resume</a>
        <nav aria-label="Primary navigation">
          <ul class="nav-list">
            <li><a href="${links.home}">Home</a></li>
            <li class="nav-group">
              <button class="group-label" type="button" aria-haspopup="true">Work Experience</button>
              <div class="dropdown-panel" role="menu" aria-label="Work experience pages">
                <a href="${links.work1}" role="menuitem">Career 1</a>
                <a href="${links.work2}" role="menuitem">Career 2</a>
                <a href="${links.work3}" role="menuitem">Career 3</a>
                <a href="${links.work4}" role="menuitem">Career 4</a>
                <a href="${links.work5}" role="menuitem">Career 5</a>
                <a href="${links.work6}" role="menuitem">Career 6</a>
              </div>
            </li>
            <li class="nav-group">
              <button class="group-label" type="button" aria-haspopup="true">Education</button>
              <div class="dropdown-panel" role="menu" aria-label="Education pages">
                <a href="${links.highSchool}" role="menuitem">High School</a>
                <a href="${links.university}" role="menuitem">University</a>
                <a href="${links.communityCollege}" role="menuitem">Community College</a>
              </div>
            </li>
            <li class="nav-group">
              <button class="group-label" type="button" aria-haspopup="true">Projects</button>
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
})();
