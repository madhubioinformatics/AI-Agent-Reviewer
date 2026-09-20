# AI Agent Reviewer

**A conversational AI peer reviewer for your manuscripts and grants.** Paste a paper (or a proposal), set how much it should hurt, and just talk — it writes a full referee report, checks claims against the literature, adapts to your target journal or funder, remembers the conversation, and exports to PDF/Word.

Built with [Claude](https://claude.ai) for **ZotCraft 2026 — The Claude Cowork Challenge** (Swarup Lab, UCI MIND).

![AI Agent Reviewer](screenshot.png)

## What it does

- **Talks like a real reviewer.** A single-page chat agent, not a form. Ask for a full review, the top fixes, a decision letter, or anything about the document — and follow up, because it remembers the whole conversation.
- **Two modes.** Review a **manuscript** (journal peer review) or a **grant proposal** (study-section style: Significance, Innovation, Approach, feasibility, Specific Aims).
- **A brutality dial** from *Kind mentor* to *Reviewer #2 from hell* — the interface heats from teal to red as you raise it.
- **Venue calibration.** Set a target journal (Nature tier, specialist, methods, clinical, megajournal) or funder (NIH R01/R21/F-K, NSF, Foundation) and the review recalibrates its bar and decision thresholds.
- **Literature lookup (optional).** With PubMed / bioRxiv connectors on, it can fetch a paper by PMID/DOI/title and review it, or check your claims against the published literature.
- **Export.** Download any reply as **PDF** or **Word**, or just type "download as PDF and Word." Copy is always available.
- **Honest by design.** It grounds everything in the text you give it, never invents references, and is upfront that it's assistive — not a substitute for real peer review.

## Running it

This is a single static file (`index.html`) — no build step.

There are two ways to power the model:

1. **Inside Claude (no API key).** Open the file as a live artifact in a Claude chat and it uses your Claude session automatically. This is how it was built and demoed.
2. **As a downloaded file or on GitHub Pages (bring your own key).** Open `index.html` in a browser or host it, then click the **API key** panel at the top and paste your own [Anthropic API key](https://console.anthropic.com/settings/keys). The key is stored only in your browser and sent straight to Anthropic.

> **Note:** on a public/hosted page the no-key path does **not** work — the browser can't reach the model without credentials — so a hosted deployment requires each user to add their own key, or a small server-side proxy that holds one key. The PubMed/bioRxiv lookup relies on Claude account connectors, so it works best inside Claude.

### Host it on GitHub Pages

Push this repo, then in the repo: **Settings → Pages → Deploy from a branch → `main` / root**. It goes live at `https://<username>.github.io/ai-agent-reviewer/`.

## How to use

1. Choose **Manuscript** or **Grant proposal**.
2. Paste the text on the left, or upload a PDF / Word / TXT file.
3. Set the tone dial, and a target journal or funder if you have one.
4. Ask for a review — then follow up ("now be harsher", "expand point 3", "would this pass at PLOS ONE?").
5. Export any reply with the **PDF / Word** buttons.

## Credits & licensing

- Powered by [Claude](https://claude.ai) (Anthropic).
- Fonts: [Inter](https://rsms.me/inter/) and [Newsreader](https://fonts.google.com/specimen/Newsreader) via Google Fonts (OFL).
- PDF text extraction: [pdf.js](https://mozilla.github.io/pdf.js/) (Apache-2.0). Word extraction: [mammoth.js](https://github.com/mwilliamson/mammoth.js) (BSD-2). PDF export: [jsPDF](https://github.com/parallax/jsPDF) (MIT).
- Everything is open-source and properly licensed.

Released under the [MIT License](LICENSE). Fork it, remix the personas, point it at your own field.
