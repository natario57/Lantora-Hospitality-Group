# Lantora Hospitality Group website

One static site for the group and its five restaurants, built with [Astro](https://astro.build) from the Claude Design canvas.

## Run it locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Editing content

Almost everything you'll want to change lives in two files:

- `src/data/site.json`: group name, monogram, contact details, social links, gift card link and the homepage hero slides.
- `src/data/concepts.json`: the five restaurants. Each entry becomes a page at `/concepts/<slug>/` and shows up on the homepage, the Concepts page, Contact, Private Events and the inquiry form. Add or remove an entry to change the number of restaurants.

Anything in `[square brackets]` is placeholder copy waiting for real content.

## Photos

Every image slot shows the design's warm placeholder colour until a photo is set. To add one, put the file in `public/images/` and set the matching field to its path, for example:

```json
"images": { "hero": "/images/restaurant-1/hero.jpg", "card": "/images/restaurant-1/card.jpg" }
```

Hero slides take an `image` field in `site.json` the same way.

## Pages

| Path | Page |
| --- | --- |
| `/` | Group homepage (hero carousel, concepts, events, gift cards, about, contact, first-visit popup) |
| `/concepts/` | All restaurants |
| `/concepts/<slug>/` | One restaurant (shared template) |
| `/private-events/` | Occasions, spaces from every restaurant, how it works |
| `/gift-cards/` | Gift cards (links to Toast) and FAQ |
| `/about/` | Story, values, leadership |
| `/contact/` | Contact form and restaurant directory |
| `/inquiry/` | Full inquiry form; `/inquiry/thanks/` after submitting |

## Deploying on Netlify

`netlify.toml` is already set up (`npm run build`, publish `dist`). Connect the repo in Netlify and deploy. The forms (`contact`, `private-event`, `inquiry`) use Netlify Forms, so submissions appear under **Forms** in the Netlify dashboard once the site is live; turn on email notifications there.
