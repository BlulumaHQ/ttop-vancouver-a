<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Share page components between English, `/zh-tw/*`, and `/zh-cn/*` leaf routes; derive locale from the URL through React context so SSR and navigation stay consistent.
- Keep separate Taiwan Traditional and mainland Simplified translation dictionaries; translate text in React rendering rather than mutating the DOM or storing a language preference.
- Serve delivery logos from the existing public image paths for self-hosted deployment; retain unused CDN pointers under `.lovable/asset-archive/` without deleting their remote assets so older Lovable deployments remain intact.
