# lasvegasrealestate

> **Unofficial copy: not the website of LasVegasRealEstate.com.** This repository is a development copy of a
> redesign. It is not operated by, affiliated with, or endorsed by LasVegasRealEstate.com, its operator Americana
> Internet Ventures, LLC, The Woodcock Real Estate Group or Berkshire Hathaway HomeServices Nevada
> Properties. The real site is https://www.lasvegasrealestate.com/.
>
> **A snapshot, not a live site.** The pages were read from the live site on 6 October 2026, and
> 17 more from copies the Internet Archive had made of them, the earliest on 22 October 2020. Nothing on
> them is kept current: the market reports, the dated posts and the entries of partners are those the
> site showed when each page was read or copied. **No listing of a home for sale is shown here** (see
> *What this is*).

**Preview: https://chris-sgen.github.io/lasvegasrealestate/**

A **total redesign** of **lasvegasrealestate.com**: 500 pages, built by a redesign pipeline
(`site-reforge`, which is not part of this repository) and changed for public hosting as listed
under *Hardening*. It is a static site with no build step, no dependencies and no backend. Serve the
folder, or use the preview link above.

> **The pictures and silent video loops in `assets/generated/` are AI-generated illustrations made
> for this redesign.** They are not photographs of any property, place or person, and no property shown
> in them is for sale.

Two terms used below. The **handoff build** is the private build of this redesign that this copy was
made from, together with its documentation and audit files; it is not published ("handoff" is the
pipeline's name for its packaged output, and says nothing about a recipient). This **preview** is that
build with the changes listed under *Hardening*.

## What this is, and what it is not

This is **not** a pixel-faithful clone. It is a redesign:

| Part | What it is |
| --- | --- |
| **Content, contact details, URLs** | All from `lasvegasrealestate.com`: 365 pages read from the live site on 6 October 2026, between 10:09 and 10:23 UTC (03:09 to 03:23 in Las Vegas), and 17 pages that the live site lists but that could not be read from it, taken from copies the Internet Archive made between 22 October 2020 and 12 April 2026 (see *Sources* in `PROVENANCE.md`). The sentences of the pages are the live site's: 20,475 sentences of the live pages were looked for on their rebuilt pages, 20,418 found, 57 left out with a recorded reason, 0 missing. The redesign's own words are interface text: names and labels of controls and sections (such as "Menu", "Search this site", "Previous", "Next" and "Call"), the dates and page numbers of lists, the heading "Page not found", the messages of the search page, and one line of the panel that stands in for the listings ("The listings open in the MLS search."); and the notes this preview adds (see *Hardening*). |
| **Listings** | On the live site, the panels of listings and the listing pages are drawn in the browser by a listing vendor's widget, for the business's own account, from the vendor's host. **This copy does not load that widget** (49 places on 49 pages). In each place a panel of the redesign stands in: one line, a button to the listing search and the phone number. The listing search (2 forms) and a button in the menu of every page lead to the business's listing service at `sale.lasvegasrealestate.com` (1,514 links): **a search there is a search of that live service**, not of this copy, and a line inside each listing search, under its search bar, says so. The vendor's 11 wrapper pages (frames the vendor fills with its own pages) are not part of this copy. The `Login` cell over every page opens the sign-in of that same live service (`sale.lasvegasrealestate.com/idx/userlogin`), for an account there; the old site's own sign-in page is not part of this copy, nor of the redesign. |
| **Generated imagery** | **12 still pictures and 9 silent video loops generated for this redesign are shown in this copy**, and 4 more stills are only the first and last frame of a loop; they were made with fal.ai and Higgsfield, and `PROVENANCE.md` lists each with its model, and the 9 generated files that are not in this copy too. 336 of the 502 pages show at least one generated file. They show architecture, rooms and objects: a key on a sunlit ledge; the shadows of palm fronds on a white wall; the light of window blinds on a white wall; a stair lit by the sun; an open window with a curtain in an empty room; a blue door in a plaster wall; a floor plan and a pencil on a desk; moving boxes in an empty room; an agave against a plaster wall; a breeze-block wall and its shadow; a colonnade beside still water; a notebook, a cup and a phone on a desk by a window; the edge of a swimming pool; the light of a pool on a white ceiling; a lit plaster wall with two palms beside a still pool, at dusk; and two loungers in the shade of a pergola. None shows a person, a whole house, a street, a landmark or the business's office. A generated picture or loop leads 287 pages (it stands in the head of the page): a loop leads `/55-retirement-communities-siena/`, `/a-history-of-summerlin-in-las-vegas-nevada/`, `/blog/`, `/blog/page/10/`, `/blog/page/11/`, `/blog/page/12/` and 239 more, and a still chosen by the page's subject leads 42 other pages and posts (`PROVENANCE.json` lists the pages each file leads). Every generated picture has empty alt text (413 placements), so screen readers skip it, and every generated file is served from `assets/generated/`, apart from the live site's pictures in `assets/img/`. Nothing on the pages themselves labels them. |
| **Other imagery** | Every other picture is one the live pages show (361 pictures, 382 when the site's own cropped versions of a picture are counted apart, each in 1 to 7 sizes), and every one of them is a copy the Internet Archive kept: the live host stopped answering before any picture could be downloaded from it. They are the site's logos and title cards, photographs of neighbourhoods, buildings and signs of Las Vegas, stock photographs (many show people, who appear to be models of stock photography), and the logos of organisations the pages name. 474 pictures of the live site have no copy and are not here. Some pictures, and every film, of the live site are deliberately not shown: see *Hardening*, 11. |
| **Navigation model and page anatomy** | Modelled on another, unrelated website: a top bar, grouped menus, a closing band with the address and a map before the footer, and one persistent call to action. **No content or asset came from that site.** |
| **Visual design** | New ("Desert Modern"), in the live site's own colours, used as the live site uses them: charcoal for the header, its menus and the footer; white and light-grey pages with black headings; its blue for the logo block, the buttons and the links. No yellow: the thin gold rule the live site draws under its headings is left out, and every small mark of the design takes the two blues of the logo block instead. Flat planes and square corners, a dimension-line ornament under headings, a pale plate behind pictures. Type: Archivo for headings, Hanken Grotesk for text and DM Mono for small labels, under the SIL Open Font License (texts in `assets/fonts/`). |
| **Platform** | Removed: no WordPress, no page-builder markup, no form plugin, no listing widget, no shop plugin, no analytics or tag-manager scripts. The one third-party embed that loads by itself is the Google map (see *Known limits*). |

## Verification

These figures were measured by the pipeline and filled in from the measurement files. The first
seven rows come from the handoff build's audit. The others were read again from this tree. The
browser figures were measured first on a local server that serves this tree under `/lasvegasrealestate/`, then again at the public URL (https://chris-sgen.github.io/lasvegasrealestate/). On the local server the browser could reach no other host, so the map frames did not load; at the public URL they loaded from Google, the only other host the pages asked for. The tree has 502 pages: the 500 rebuilt ones plus `/404.html` and `/search/`, which the build makes itself. Tested in headless Chrome only.

| Check | Result |
| --- | --- |
| Every sentence of the live pages looked for on its rebuilt page | **20,475 checked: 20,418 found, 57 left out with a recorded reason, 0 missing** |
| Words of each live page looked for, in order, on the whole rebuilt page | **99.95% mean** over 353 pages; no page under the limit of 95%. The gate's own comparison reads lower for a reason given under C17 |
| Responsive sweep, 390 / 768 / 1024 / 1440 px | **0 blocker · 0 major introduced by the redesign** across 2,052 page × width sweeps (18 minor, 66 nit) |
| Links and controls on phones and tablets | PASS: 2,056 page loads at 390 / 768 / 1024 / 1440 px; 184,440 links and controls measured at 390 and 768 px against a 44 px target size, and nothing reaching past the screen |
| The site search against the pages | PASS: 67 queries, 306 entries, 0 failed |
| The forms of the handoff build | 106 of 106 checks passed on 9 form pages (in this preview the forms are disabled; see *Hardening*) |
| The pipeline's gate (`sr-gate.mjs`, not part of this repository) | 20 PASS · 8 FAIL · 1 UNPROVEN. The verdict is NOT-READY, and the handoff build was packaged with a recorded override. Each check that is not green is explained below |
| Preview hardening, read again from the shipped bytes | **502 pages, 2,080 files besides the three documents: 0 findings.** 9 forms of the business and 502 sign-up boxes inert; 1 site search form that sends a GET to `/search/` and 2 listing search forms that send a GET to `sale.lasvegasrealestate.com`; 505 map frames, each carrying `referrerpolicy="no-referrer"`; no part of the listing vendor's widget; no film of a video site; no file and no reference of a picture or film this copy does not show; the footer's copyright line once on every page, leading to the live site; a line inside each listing search, under its search bar; no comment in the stylesheets or the script |
| Reference audit: every local `href` / `src` / `srcset` / `url()` / video-loop source / search-index address | **153,214 local references, each to a file of this tree in the same capitals**; none outside `404.html` written from the root of the host (`404.html` names its files under `/lasvegasrealestate/`, because GitHub Pages serves it at any depth) |
| Binary files read for metadata | 1,540 WebP, 18 MP4, 8 WOFF2: no EXIF, XMP or C2PA; the WebP files carry only the encoder's stock colour profile, whose only words are "sRGB" and its maker's line ("Google Inc. 2016"); the MP4 files carry no creation time and no tag but the encoder's name; each font file has the licence text of its project beside it |
| Rendering under `/lasvegasrealestate/`, every page except `404.html` at 1440 and 390 px, every picture asked for | **1,002 page loads: 0 failed requests on this site, 0 requests outside `/lasvegasrealestate/`, 0 requests to another host but the map frames' (blocked here), 0 requests that are not a GET, 0 script errors, 0 broken pictures, 0 pages that scroll sideways at 390, nothing kept in the browser**; 8,832 pictures loaded; every note and stand-in panel shown; `404.html` loaded at depth with its stylesheet. At the public URL: 501 pages and 192 other files asked for, 693 identical to this tree, byte for byte; an unknown address answered with the not-found page; 10 loads in a browser with the same checks (there the map frames loaded from Google) |
| Video loop | 294 pages with a loop (`/55-retirement-communities-siena/`, `/a-history-of-summerlin-in-las-vegas-nevada/`, `/blog/`, `/blog/page/10/`, `/blog/page/11/`, `/blog/page/12/` and 288 more): it played from inside `/lasvegasrealestate/`, muted, without controls |
| Site search | The query "summerlin" was answered with results: the 20 the page shows first (it shows them 20 at a time), every one inside `/lasvegasrealestate/` |
| Forms, each tried with scripts on and off | **11 forms (9 of the business, and the sign-up box on 2 pages): Enter pressed in a field and the form's button clicked, as shipped (22 trials), sent nothing and went nowhere.** Two reduced configurations were also tried: only the form's attributes (`method="dialog"`, `action=""`, `onsubmit`) left, with a live submit button added; and those attributes taken off with a real address put back, leaving the hidden disabled button and field. Nothing was sent in either. With every safeguard taken off (22 control trials) every form was seen to submit, so the trials can see a submission. The same trials at the public URL: 88, with the same result (their controls posted to an unused address of the testing machine, so nothing was sent to the public host) |
| The checker itself | `preview-selftest.mjs` planted 117 defects in a copy of this tree; 132 of the 132 reports they must give were given. 111 of the 119 rules that read the files are exercised by a plant; the rules of the browser are proved by their controls (above) |

**Why the checks of the gate that are not green are not green:**

- **C02 Crawl was not truncated** (FAIL). The live host stopped accepting connections from the machine that read it, on 6 October 2026, after 365 pages, and it has not answered that machine since: later attempts to reach it went unanswered, and nothing was tried to get around the stop. 17 more pages came from copies that the Internet Archive already held (see *Sources* in `PROVENANCE.md`). Of the 361 addresses still not fetched, weighed one by one in the handoff build, 181 are not addresses at all (the live markup wrote a name where an address belongs), 140 have a page in the rebuild anyway (most are the lists of posts under a tag, which the rebuild makes from the posts), 22 are addresses with a query that the rebuild deliberately has no page for (searches of the old listing plugins, and the home page with tracking marks), and 18 are pages whose content is not in this copy (see *Known limits*).
- **C07 Image inventory completed with real dimensions** (FAIL). No picture could be downloaded from the live host: it stopped accepting connections from that machine before the download step ran. 1,125 picture addresses of the live site have a file in the handoff build, each a copy kept by the Internet Archive; the other 474 have none, because the archive holds no usable copy of them. Where such a picture belongs, the page is shown without it.
- **C09 Design baseline captured from a browser, not just source CSS** (FAIL). Once its host stopped accepting connections from that machine, no browser could read the live site's pages; before that, only two renderings of the home page had been made, and the brand colours were measured on them. The design baseline the check asks for was therefore derived from the live site's own stylesheets, as the Internet Archive kept them, which the check rightly does not take for a measurement.
- **C10 Motion inventory has no open gaps** (FAIL). The two open gaps (which element of the live pages moves, and what moves as a page is scrolled) need a browser on the live site, whose host stopped accepting connections from that machine before its pages could be read in one. The redesign brings its own movement.
- **C16 Every source page exists in the rebuild** (FAIL). The 29 missing pages are exactly the addresses the build leaves out on purpose: test pages, drafts, the empty pages of earlier listing plugins and of a shop that sells nothing, and an empty list of partners.
- **C17 Content survived the rebuild** (FAIL). The old theme has no `<main>` element, so the check compares each whole live page (both menus, the dialogs and a block of injected links included) with the content of the rebuilt page. Compared whole page to whole page with the same measure, the recorded removals set aside by name, mean recall is 99.95% over 353 pages, with no page under the limit.
- **C20 No invented content** (FAIL). All 11 flagged phrases are the live site's own words (titles of its posts and sentences of its pages). The check's claim tracer reads a fixed run of characters after a word such as "best"; where the phrase is shorter, the run continues into the next element of the new layout, and that run of characters is not on the live page.
- **C21 No trace of the source platform** (FAIL). All 25 flagged files hold links to documents on other organisations' websites (`www.nar.realtor` 1, `liedinstitute.unlv.edu` 10, `www.unlv.edu` 10, `liedcenter.unlv.edu` 4 links): reports the blog cites, whose own addresses contain `/wp-content/` or `/sites/default/files/`. The same scan with every address on another host set aside finds no trace of the old platform.
- **C22 Design matches the source pixel-for-pixel at every breakpoint** (UNPROVEN). This is a redesign. The check asks whether the rebuild is pixel-identical to the live site; it is not meant to be. It also has nothing to compare: the live host stopped accepting connections before its pages could be read in a browser.

## Hardening applied to this public copy

`PROVENANCE.json` gives the counts.

1. **`noindex, nofollow, noarchive, nosnippet, noimageindex` on every page.** This is the only control here that search engines honour. It
   is a request; the major ones follow it. A `robots.txt` with `Disallow: /` is also shipped,
   but it has **no effect** here: crawlers read `robots.txt` only at the host root
   (`chris-sgen.github.io/robots.txt`), not under `/lasvegasrealestate/`. GitHub Pages cannot send an `X-Robots-Tag`
   header either. That leaves the non-HTML files (the pictures, the videos, the search index) with no index
   control of their own; `noimageindex` asks search engines not to index the pictures a page shows, and
   those files are linked only from pages marked `nofollow`. The repository itself is public: github.com
   shows its files like any public repository's, and those pages of github.com (the repository's own page and
   the pages that show its files) can be indexed.
2. `og:url` points at this preview, `og:description` / `twitter:description` carry the disclosure,
   `og:site_name` reads "Unofficial preview (not LasVegasRealEstate.com)", and `og:title` / `twitter:title` begin "Unofficial preview:"
   (502 pages). The picture tags (`og:image`, `twitter:image`: 1,004 tags) are removed, and the
   site's icons are not this copy's tab or home-screen icon (1,506 icon links removed). The `<title>` of a
   rebuilt page is the live page's own. What a link card shows depends on the app: apps that take a link's
   description or site name from these tags show the disclosure; apps that read none of these tags show the
   page's own title with the `chris-sgen.github.io` address.
3. **JSON-LD removed** (1,530 blocks). It asserted the business's identity, address, telephone and opening hours as data, and described the site, its pages and their breadcrumbs.
4. **Every form of the business is inert, with or without JavaScript**: the 9 forms on "Commercial Property Listing" (`/commercial-property-listing/`), "Contact Us" (`/contact-us/`), "Las Vegas Commercial Buyers" (`/las-vegas-commercial-buyers/`), "Las Vegas Commercial Real Estate Search" (`/las-vegas-commercial-real-estate-search/`), "Property Listing" (`/property-listing/`), "Realtor Referral" (`/realtor-referral/`), "Sell Commercial Property" (`/sell-commercial-property/`), "Sell Multi-Family Property" (`/sell-multifamily-property/`) and "Sell Residential Property" (`/sell-residential-property/`), and the newsletter sign-up box at the foot of every page (502 pages). Three safeguards are layered:
   - **A hidden, disabled submit button is placed first in each form**, followed by a hidden, disabled
     text field. A form whose default button is disabled is not submitted when Enter is pressed in it; a
     browser that skips a disabled button decides by counting the form's single-line fields, and the hidden
     field keeps that count above one.
   - Each **submit button is replaced by a disabled `type="button"`** (511 buttons).
   - Each form gets `action=""`, `onsubmit="return false"`, `method="dialog"` and `data-preview="inert"`,
     and the hooks by which the handoff build's script finds a form are removed, so that script does not touch
     these forms at all.

   A notice in the head of each page with a form of the business, under the page's title, says that the form on
   the page is disabled and that nothing entered in it is sent, whatever the page says about sending it; a shorter
   line right above the form says it again, and a line under each form and under each sign-up box says it once
   more. The fields can still be typed in; nothing typed leaves the browser. **The site search still works**: it
   sends the query only to this site's own `/search/` page, as part of that page's address. **The listing
   search leaves this copy**: it sends its words, as part of an address, to the business's listing service at
   `sale.lasvegasrealestate.com`, as it does on the live site, and a line under the search bar of each of the 2 listing searches says so.
5. **The listing vendor's widget is not loaded** (49 places on 49 pages). On the live site it draws listings for the
   business's account from the vendor's host. In its place the panel of the redesign is shown, which in the handoff
   build stands in only when the widget draws nothing. The vendor's 11 wrapper pages, written for the vendor's
   host, are not shipped.
6. `<meta name="referrer" content="no-referrer">`, so outbound clicks don't reveal this URL to third parties. The
   505 map frames carry `referrerpolicy="no-referrer"` themselves, because an attribute on a frame overrules the
   page's tag. **Marks taken off links:** 26 links of the live pages carried marks that tell their target where
   the visit comes from, or tie it to someone's visit, search or advertising click (campaign marks, a marketing tool's visitor
   tokens, ad-click ids, the session and click marks of Google searches, the ad-campaign and search marks of two shops:
   28 kinds, named in `PROVENANCE.json`), 1 of them a link to the live site; from this copy they would
   be untrue, and they are taken off. 1 link went through an affiliate network's redirect, which would credit a
   commission to an affiliate's account: it leads straight to the shop's page the redirect led to. 1 link, the
   click-tracking address of an e-mail campaign, carried the encoded e-mail address of a person: its words stay, its address does not.
7. **No on-page disclosure banner.** The disclosure is carried by the link-preview tags (in apps that show them;
   see 2) and by this README. Apart from the notes named here a page looks like a page of the live site: its
   logo, address, phone number and words. There are four kinds of note on the pages: the notices of the forms (4),
   the line under the search bar of each listing search (4), 14 notes where a film is not shown (11), and the note on the live
   site's terms of use and privacy policy (15).
8. `sitemap.xml`, `llms.txt` and `_redirects` are not shipped: the first two advertise the business's real URLs to
   crawlers, and GitHub Pages ignores the third. `robots.txt` is replaced (see 1).
9. **The map frames use no API key.** All 505 (on 502 pages) are keyless Google Maps embeds. 504 show the
   business's address: one in the closing band of every page, 2 more in the text of a page. 1 shows another place that a page's text names.
10. `<link rel="canonical">` is **kept** pointing at the live site's page. That is the usual signal for a duplicate,
    and deliberately different from `og:url`; the `rel="prev"` / `rel="next"` links of the lists of posts name the
    live site's pages too. The two pages the build makes itself (`/404.html` and `/search/`) have no page on the live
    site and carry no canonical. **76 links whose words are the business's web address**
    ("LasVegasRealEstate.com", in the text of the pages) open the live site; in the handoff build they lead to the build
    itself. The 29 links to the posts' tag "lasvegasrealestate.com" stay in this copy: their words are the tag's name.
11. **Pictures of identifiable people, listing photographs of particular homes, a picture agency's photograph, and every
    film are not shown.** The pages are built without them, as they are without the pictures that have no copy:
    - **Stills of films in which a person presents a subject** (57 placements on 43 pages): the opening still of
      a film, or the picture of a post of the video blog, showing the presenter, several in front of the
      brokerage's sign.
    - **A group photograph of a real estate team** (9 placements on 9 pages): a banner with the photograph, the team's logo
      and its contact lines. The words of the page around it stay.
    - **A photograph of the author of a guest post**, named in its description (4 placements on 4 pages).
    - **Photographs taken to sell particular private homes**, with their house numbers (363 placements on 333 pages):
      one carries the copyright mark of the listing service of the local association of realtors, one a brokerage's
      sale sign. Other pictures of houses, in some of which a house number can be read, carry no such mark and are kept.
    - **A photograph that carries a picture agency's watermark** (11 placements on 11 pages).
    - **Every film**: 11 films of a video site, on 13 pages, some of them presented by agents
      whom their pages name (a copy cannot vouch for what any of them shows), and the site's own introduction film,
      in which a person presents the site (on `/jack-woodcock-introduction-to-lasvegasrealestate-com-2/`). Their frames, buttons and links go, and a note
      with a link to the live page stands in each place (14 notes).

    Photographs that appear to be stock photography are kept. Where a post's picture was one of these, its card in
    the lists shows words only, and a head of a page that lost its picture is set as a head without one (the way
    the build sets them when a picture has no copy).
12. **The footer's copyright line is the live site's own** ("© 2026 Las Vegas Real Estate Listings | LasVegasRealEstate.com", as the live footer printed it when it was
    read): it is kept on every page (502), and the name in it leads to the live site, whose content it is.
13. **Files and notes of the build left out.** 310 files of the handoff build that no page, stylesheet or script
    of this copy names are not shipped (among them the pictures and the film named in 11, and renditions that only the
    link-preview tags or the icon links named). The comments of the stylesheets and of the site's script, notes of the handoff build to whoever
    maintains it, are taken out (238 and 121 comments); the script was checked to parse without them.
    A small helper of the build's tooling in the head of 501 pages (it rewrites picture addresses held in inline
    styles, and no page of this copy has one) is taken out too.
14. **The typefaces' licences ship with the fonts**: `assets/fonts/OFL-Archivo.txt`, `assets/fonts/OFL-DM-Mono.txt` and `assets/fonts/OFL-Hanken-Grotesk.txt`, the SIL Open Font License as each
    font project publishes it.
15. **The live site's terms of use and privacy policy** (`/privacy-terms-policy/`, linked from every footer) are carried as
    the live site's words, under a note at the top of the page: it says that the words are the live site's own, that
    they describe the live website and its services, and that they do not describe this preview, whose forms send nothing.

## Known limits

- **The forms of the business do not submit.** This is deliberate (see 4 above). In the handoff build the forms are
  complete but not connected to a receiver.
- **No listing is shown.** The listing vendor's widget is not loaded (see 5); the panel that stands in sends visitors to
  the listing search, which belongs to the live listing service at `sale.lasvegasrealestate.com`.
- **This is a snapshot.** The live pages were read on 6 October 2026, between 10:09 and 10:23 UTC (03:09 to 03:23 in Las Vegas); 17 pages and the pictures are
  copies the Internet Archive made between 22 October 2020 and 12 April 2026 (pages) and 29 March 2019 and 27 October 2025 (pictures). Market figures,
  dated posts and the entries of partners will go stale; the business's own site is the place for what holds today.
- **474 pictures of the live site have no copy**, and their pages are shown without them. **18 pages of the
  live site are not in this copy at all**: the live host could not be read for them, the Internet Archive holds no copy of
  16 of them, and its copies of the other 2 were set aside as out of date.
- **The pages carry the contact details the live site published**, for the business and for partners it names (lenders,
  a marketing firm): names, phone numbers and e-mail addresses, as they stood when each page was read or copied. Some
  may be out of date.
- **The words on the pages are the live site's, and some of them speak about the live site** ("please complete the
  form below", "Here at LasVegasRealEstate.com"): they are carried as written.
- **The generated pictures and loops are illustrations, not photographs.** No caption or frame on the pages tells them
  apart; `PROVENANCE.md` lists each one.
- **The video loops have no pause control.** They are silent, hidden from screen readers, start when they come near the
  screen and pause when they leave it. When the device asks for reduced motion or data saving they do not play at all,
  and the still picture shows instead. WCAG 2.2.2 (Pause, Stop, Hide) asks for a way to pause moving content that starts
  by itself and lasts more than five seconds; these loops do not offer one.
- **The map frames load from Google** when a page is opened and the frame comes near the screen, with no referrer.
  Google receives the visitor's IP address and browser details, as for any embedded map.
- **Very long words in page titles break where the line ends** (on 16 pages whose title holds a word such as
  "LasVegasRealEstate.com" or a run-together tag name).
- **Tested in headless Chrome only.** Other browsers were not tried.

## Running it locally

Serve the folder with any static file server and open the address it prints. The pages link to each other and to
their files by relative addresses, so the folder works at any path; only `404.html` names its files under
`/lasvegasrealestate/`, because GitHub Pages serves it at any depth.

## Files

- `index.html`, one folder per page, `404.html`, `search/`: the pages.
- `assets/`: the stylesheets, the script, the search index, the fonts and their licences, the pictures of the live
  site (`assets/img/`) and the generated pictures and loops (`assets/generated/`).
- `PROVENANCE.md` / `PROVENANCE.json`: where everything came from, and the counts of the hardening.
- `robots.txt`, `.nojekyll`, `.gitattributes`, `.gitignore`: files for the host and the repository.
