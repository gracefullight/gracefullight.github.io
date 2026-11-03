# gracefullight.dev

Since 2016.

Install tools, dependencies, and Git hooks:

```sh
mise install
mise run setup
```

Hooks in `hk.pkl` format and lint staged files, add devmoji, and validate
Conventional Commits. Run `mise exec -- hk check --all` to check files manually.

`bun run cmd pdf` uses an existing LibreOffice installation to render HTML to
PDF. On macOS it uses `/Applications/LibreOffice.app`; set `LIBREOFFICE_PATH`
to the `soffice` executable to use another location. Mermaid diagrams still
require a working Mermaid CLI browser setup. LibreOffice can render CSS
differently from a browser.

For an existing Husky checkout, remove its hook path before setup:

```sh
git config --local --unset core.hooksPath
```
