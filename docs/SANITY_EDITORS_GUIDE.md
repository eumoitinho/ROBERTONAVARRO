Sanity Editing Guide — what editors should change

This guide lists the Sanity Studio fields that control the homepage, header/nav and footer content. Editors should only change text, links and images. Design, colors and layout are preserved by the frontend code.

1) Site Settings (document: `siteSettings`)

- siteName (string)
- siteUrl (url)
- logo (image) — logo image used in the header and footer
- tagline (string) — small slogan shown in the footer
- contact (object)
  - email (string)
  - phone (string)
  - whatsapp (string)
  - address (text)
- socialMedia (object)
  - facebook (url)
  - instagram (url)
  - twitter (url)
  - linkedin (url)
  - youtube (url)
  - tiktok (url)
- mainNavigation (array of objects)
  - title (string)
  - href (string)
  - isButton (boolean)
  - openInNewTab (boolean)
- footer (object)
  - copyrightText (string) — replaces default copyright text in the footer
  - footerLinks (array of { title, href }) — if present these will be rendered in the footer under "Links"
  - showSocialMedia (boolean)

2) Homepage (document: `homepage`)

- heroSection (object)
  - badge (string)
  - title (string)
  - subtitle (string)
  - description (text)
  - achievementsNumber (string)
  - achievementsLabel (string)
  - primaryButtonText (string)
  - primaryButtonLink (string)
  - backgroundImage (image)

- formacoesSection (object)
  - badge, title, highlightedText, description
  - formacoes (array)
    - title, description, link, buttonText

- mentorSection (object)
  - badge, title, highlightedText, subtitle
  - backgroundImage (image)
  - bioParagraphs (array of text)
  - stats (array of { icon, value, label })

- videosSection (object)
  - badge, title, highlightedText, description
  - videos (array)
    - youtubeId (string)
    - title (string)
    - person (string)
    - description (text)
    - chipLabel (string)
    - thumbnail (image)
  - stats (array of { icon, title, description })
  - ctaButtonText (string)
  - ctaButtonLink (string)

- testimonialsSection (object)
  - badge, title, highlightedText, description
  - testimonials (array)
    - name (string)
    - role (string)
    - initial (string)
    - quote (text)
    - rating (number)
    - image (image)
  - ctaText, ctaButtonText, ctaButtonLink

- locationSection (object)
  - show (boolean)
  - mapEmbedUrl (url) — Paste the Google Maps embed URL here (the `src` of the iframe)
  - address (string)
  - phone (string)
  - email (string)

- sectionControls (object)
  - showMentorSection, showVideosSection, showTestimonialsSection, showLocationSection, showEventPopup

3) Best practices for editors

- Only edit the strings, links and images listed above.
- Do not change CSS classes or layout-related fields in code — the Studio only controls content.
- For images, prefer uploads at suitable resolutions (thumbnails for video cards should be ~1280x720 or similar).
- For Google Maps: open Google Maps, click Share > Embed map > copy the iframe src URL and paste into `mapEmbedUrl`.

If you want, I can also export a shorter cheat-sheet used by editors to the Studio desk structure or add inline help text in the Sanity schema (descriptions) to guide editors. Let me know which you'd prefer.
