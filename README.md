# Career Website

Static multi-page resume website for career history, education, and portfolio highlights.

## Architecture Decision

This project is intentionally a **static multi-page site**.

- Each page has a real `.html` file and normal anchor links.
- Navigation and progressive enhancement are handled by `shared-header.js`.
- There is no client-side SPA router or route rewriting requirement.

## Open Locally

Open `index.html` in a browser, or serve the folder with any static file server. The site does not require a build step.

## Edit Content

- Home page: `index.html`
- Work pages: `work/job-1.html` through `work/job-6.html`
- Education pages: `education/high-school.html`, `education/university.html`, and `education/community-college.html`
- Project pages: `projects/coding-projects.html`, `projects/graphics-portfolio.html`, and `projects/writing-samples.html`
- Shared navigation: `shared-header.js`
- Site styles: `styles.css`

The current content is polished placeholder copy. Swap in real names, dates, links, and measurable achievements when they are ready.

## Chat configuration

Chat is **off by default** (including production) and is only initialized when explicitly enabled.

### Enable chat

Use one or both methods:

1. Add data attributes to the `shared-header.js` script tag:

```html
<script
  src="shared-header.js"
  data-enable-chat="true"
  data-chatkit-domain-key="YOUR_DOMAIN_KEY"
  data-chat-owner="your-user-id"
></script>
```

2. Turn chat on for a request with a query parameter:

- `?enableChat=true` enables chat for that URL.
- `?enableChat=false` disables chat for that URL.

### Disable chat

- Default behavior is disabled (`data-enable-chat` omitted or false).
- You can force disable via URL with `?enableChat=false`.

### Secrets and config location

- Do **not** hardcode domain keys, user IDs, or ownership values in `shared-header.js`.
- Inject chat config through deployment templates/server-side rendering, environment-based HTML generation, or secure secret management in your hosting platform.
- Public pages should only receive publishable values intended for browser use.

### Ownership restriction

Set `data-chat-owner` to your account owner ID and keep `CHATKIT_CONFIG.expectedOwner` aligned with that same owner ID. If they do not match, chat refuses to initialize and displays a fallback message. This prevents accidental use of chat agents that are not owned by the expected user.
