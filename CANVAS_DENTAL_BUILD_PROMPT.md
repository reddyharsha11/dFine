# dFine Dental Canvas Build Prompt

Use this prompt in Canvas/Codex/Cursor to turn the existing `client/` and `server/` folders in this repo into a polished, production-ready dental clinic website.

## Prompt

You are working inside an existing MERN project with two folders: `client/` and `server/`.

Do not create a brand-new app from scratch. Inspect the existing files first, then extend and improve them in place.

Your job is to build a fully functional, visually premium dental clinic website for **dFine Dental & Health Care, Khajaguda, Hyderabad** using the current codebase structure.

## Core Goal

Transform the current project into a world-class dental website with:

- A high-conversion homepage
- Fully working appointment booking flow
- Services listing and service detail pages
- Gallery and testimonials pages
- Contact page with form submission
- Admin login and dashboard
- Backend APIs wired to MongoDB
- Smooth animations and responsive design
- Clean, production-quality code

## Important Repo Context

This repo already contains:

- Frontend routes in `client/src/App.jsx`
- Homepage sections in `client/src/components/home/*`
- Layout components in `client/src/components/layout/*`
- Pages in `client/src/pages/*`
- Backend Express app in `server/index.js`
- Models, controllers, and routes for appointments, reviews, gallery, contact, admin, and settings

You must inspect the current implementation and improve it instead of replacing everything blindly.

## Design Direction

The visual direction should feel like:

- Riverdale Dental: warm, welcoming, premium clinic layout
- Apptics SaaS: dense, polished, conversion-focused UI
- Denta Care: bold hero typography, strong accents, playful tooth visual energy

Overall vibe:

**Luxury Spa x Clinical Precision x Modern SaaS**

## Brand Rules

Use this palette and visual system consistently:

```css
:root {
  --clr-primary: #2F7B6E;
  --clr-primary-hover: #236358;
  --clr-primary-light: #BDDBD1;
  --clr-primary-pale: #E7F3F0;
  --clr-accent: #E8643A;
  --clr-accent-hover: #CF5530;
  --clr-accent-light: #FAE8E0;
  --clr-bg-white: #FFFFFF;
  --clr-bg-soft: #FBF9F1;
  --clr-bg-section: #E7E9E3;
  --clr-bg-dark: #1A2E2A;
  --clr-bg-dark2: #243B35;
  --clr-text-primary: #1C2B27;
  --clr-text-secondary: #4A6B62;
  --clr-text-muted: #8BA89F;
  --clr-text-white: #FFFFFF;
  --clr-gold: #D4A847;
  --font-display: 'Cormorant Garamond', serif;
  --font-heading: 'Sora', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-label: 'DM Sans', sans-serif;
}
```

Rules:

- Default page background should feel warm, never sterile
- Primary CTA buttons must use coral-orange
- Use serif display typography for hero and premium headings
- Avoid generic default styling
- Preserve professionalism while still feeling modern and bold

## Frontend Requirements

Use the existing React 18 + Vite app and improve these pages:

1. `/`
   - Full-bleed luxury hero
   - Transparent navbar that becomes solid on scroll
   - Strong headline: “Every Smile Matters.”
   - Coral CTA buttons
   - Floating quick appointment form in hero
   - Trust bar
   - Services ticker
   - Services grid
   - Stats section
   - Why choose us
   - Doctor profile
   - Gallery preview
   - Before/after section
   - Testimonials carousel
   - FAQ
   - Map/contact section
   - Floating WhatsApp button

2. `/services`
   - Filterable services grid
   - Category chips
   - “Know More” and “Book This” actions

3. `/services/:slug`
   - Service hero
   - What it is
   - How it works
   - Who it is for
   - Timeline/process
   - FAQ
   - Related services
   - Sticky mini booking sidebar

4. `/book`
   - Multi-step booking experience
   - Service selection
   - Date and time slot picking
   - User details form
   - Submit to backend
   - Success state

5. `/gallery`
   - Filter tabs
   - Responsive masonry/grid layout
   - Before/after comparisons where applicable

6. `/about`
   - Clinic story
   - Doctor profile
   - Values
   - Clinic photos
   - Certifications/partners

7. `/testimonials`
   - Review summary
   - Filter by rating/source
   - Load more or pagination

8. `/contact`
   - Functional contact form
   - Clinic details
   - Hours
   - Embedded map

9. `/admin/login`
   - Clean admin authentication page

10. `/admin/dashboard`
   - Sidebar layout
   - Stats cards
   - Appointments table
   - Reviews manager
   - Gallery manager
   - Messages inbox
   - Settings area

## Backend Requirements

Use and improve the existing Express backend in `server/`.

Ensure these APIs are fully functional and consistent:

- `POST /api/appointments`
- `GET /api/appointments`
- `GET /api/appointments/:id`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`
- `GET /api/appointments/today`
- `GET /api/appointments/stats`
- `GET /api/reviews`
- `GET /api/reviews/all`
- `POST /api/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`
- `GET /api/gallery`
- `GET /api/gallery/all`
- `POST /api/gallery`
- `PUT /api/gallery/:id`
- `DELETE /api/gallery/:id`
- `POST /api/contact`
- `GET /api/contact`
- `PUT /api/contact/:id`
- `DELETE /api/contact/:id`
- `POST /api/admin/login`
- `GET /api/admin/me`
- `PUT /api/admin/change-password`
- `GET /api/settings`
- `PUT /api/settings`

## Data + Validation Requirements

- Use MongoDB models already present in `server/models`
- Validate appointment phone numbers properly
- Validate required fields on all public forms
- Return clean JSON responses with useful error messages
- Use protected admin routes with JWT auth
- Handle server errors with the existing error middleware

## Booking Flow Requirements

The appointment flow is one of the most important parts.

Implement it so that:

- Users can choose a service
- Users can choose a future date
- Users can choose a time slot
- Users can submit name, phone, optional email, optional notes
- Submission hits `POST /api/appointments`
- Success UI confirms the booking
- Admin can view the booking in dashboard
- If email utilities already exist, wire them in cleanly

## UX + Animation Requirements

- Use `framer-motion` for reveals, hover motion, hero entrance, accordions, and page polish
- Keep animation tasteful, not distracting
- Preserve strong mobile responsiveness
- Make the navbar, cards, forms, and CTAs feel intentional and premium
- Use loading, empty, success, and error states

## Implementation Rules

- Reuse existing components wherever reasonable
- Create new files only when needed
- Keep code modular and readable
- Do not break existing routes
- Do not leave placeholder lorem ipsum
- Fill the site with realistic dFine Dental content
- Use Hyderabad/Khajaguda clinic details consistently
- Keep accessibility in mind: labels, buttons, alt text, keyboard-friendly interactions

## Content to Use

Clinic name:
- dFine Dental & Health Care

Doctor:
- Dr. G. Srujan Kumar
- Endodontist & Dental Aesthetics Specialist

Phone:
- +91 69090 90906

Location:
- Khajaguda, Hyderabad

Hours:
- Mon-Sun, 10:00 AM - 10:00 PM

Primary services:
- Dental Implants
- Smile Designing
- Invisible Braces
- Root Canal
- Teeth Whitening
- Veneers
- Orthodontics
- General Checkup

## Working Process

Follow this order:

1. Inspect existing client and server code
2. Fix or refine shared styling and theme tokens
3. Upgrade layout, navbar, footer, and common UI
4. Complete homepage sections
5. Complete booking flow and API integration
6. Complete services, gallery, about, testimonials, and contact pages
7. Complete admin login and dashboard
8. Verify forms, routing, and API integration
9. Run build/tests if available and fix issues

## Deliverables

When finished, provide:

- A short summary of what was implemented
- Key files changed
- Any setup still required in `.env`
- Any limitations or follow-up items

## Quality Bar

The final result should feel like a real premium dental brand website, not a template.

It must be:

- Responsive
- Functional
- Cohesive
- Premium-looking
- Cleanly coded
- Ready for deployment after env setup

Start by inspecting the existing repo structure and then implement the app end-to-end.
