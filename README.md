# gracefullight.dev

Since 2016.

Install tools, dependencies, and Git hooks:

```sh
mise install
mise run setup
```

Hooks in `hk.pkl` format and lint staged files, add devmoji, and validate
Conventional Commits. Run `mise exec -- hk check --all` to check files manually.

For an existing Husky checkout, remove its hook path before setup:

```sh
git config --local --unset core.hooksPath
```
