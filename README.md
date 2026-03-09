# Contenx Media Hub Website

A modern, responsive marketing website for **Contenx Media Hub**, built with clean HTML, CSS, and JavaScript.

It includes:
- A responsive multi-section landing page (`index.html`)
- A dedicated contact page (`form.html`)
- A full-screen animated navigation menu
- A working Formspree contact form integration

## Live Project Scope

This project is designed to present services, social proof, recent work, pricing, and contact details in a professional and conversion-focused format.

## Tech Stack

- HTML5
- CSS3 (custom responsive styling with media queries)
- Vanilla JavaScript (menu interactions, smooth scrolling, form submission)
- Formspree (form backend)

## Key Features

- Responsive design for desktop, tablet, and phone
- Animated hamburger menu (`--` to `X`) with smooth transition
- Full-viewport navigation overlay with numbered links
- Section-based smooth scrolling
- Pricing cards with responsive grid behavior
- Stats section responsive layout refinement (2-column to 1-column)
- Contact form connected to Formspree endpoint

## Project Structure

```text
Contenx Media Hub/
|- index.html          # Main landing page
|- form.html           # Contact form page
|- style.css           # Main site styles
|- form.css            # Form page styles
|- script.js           # Shared JavaScript interactions
|- assets/             # Icons, logos, UI graphics
|- images/             # Hero, work, and content images
|- README.md
```

## Getting Started (Local)

1. Open the project folder:
   `C:\Users\David\Desktop\Contenx Media Hub`
2. Run with any static server, or open `index.html` directly in your browser.
3. For the contact page, open `form.html`.

### Optional: Run with VS Code Live Server

- Install the **Live Server** extension.
- Right-click `index.html` and choose **Open with Live Server**.

## Form Setup

The form is already connected to Formspree:

- Endpoint: `https://formspree.io/f/xjgagprd`
- Form ID location: `form.html` (`action` attribute on `#contact-form`)

JavaScript submission handling lives in `script.js` and includes:
- loading state
- success and error messaging
- fallback warning if a placeholder form ID is used

## Navigation & UX Notes

- Menu toggle is controlled by `.menu-toggle` in `script.js`
- Overlay menu container uses `.section-menu`
- Body scroll lock is controlled via `.menu-open`
- Menu closes on:
  - link click
  - outside click
  - `Escape` key

## Deployment

Because this is a static site, you can deploy quickly on:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

### Recommended Deploy Flow

1. Push repository to GitHub.
2. Connect the repo to your hosting provider.
3. Set build command to **none** (static site).
4. Set publish directory to project root.

## Maintenance Tips

- Keep all JavaScript in `script.js` (avoid inline scripts).
- Reuse CSS variables in `:root` for consistent design updates.
- Test key breakpoints after edits (`1024px`, `820px`, `768px`, `576px`, `480px`).
- Optimize large images for faster page load.

## Author

Built for **Contenx Media Hub**.
