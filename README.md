# How to run

## Do these on root (plugin)
Do these when init install:
1. `yarn install`
2. `yarn prepare`
3. `yarn link`

<br>

Do these to apply each changes on plugin:
1. `yarn prepare`

<br>

How to generate migration:

```
npx typeorm migration:generate -d datasource.js src/migrations/AnamnesisCreate
```
<br>

Don't forget to remove node_modules/@medusajs on plugin, to avoid dependency errors:

```
rm -rf node_modules/@medusajs
```

<br>

## Do these on backend
1. `yarn link medusa-plugin-anamnesis`
2. `npx medusa migrations run`
3. `npx medusa seed --seed-file=data/seed.json`
4. `npm run dev -- -- --preserve-symlinks`

<br>

## Unit Test Coverage
Please make sure to run steps above before running `yarn test --coverage`

<img width="830" alt="image" src="https://github.com/user-attachments/assets/d3ce660a-bfc3-4428-bbcf-31141ae7d13f">

<br>
<br>

## Available Endpoints (postman collection)
<a href="https://www.postman.com/reinhardjs/reinhardjs/collection/nycj76l/noscai-anamnesis?action=share&creator=24954084" target="_blank">https://www.postman.com/reinhardjs/reinhardjs/collection/nycj76l/noscai-anamnesis?action=share&creator=24954084</a>
