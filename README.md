# Software Engineer Technical Test

Welcome to the repository for the Software Engineer Application's technical test.

<br>

## Overview
This project was created as part of the application process for the Software Engineer / Developer position at https://nosc.ai. 

It demonstrates my skills in backend development, including system design, API development, and testing.

https://github.com/noscai/senior-backend-engineer-job-application

<br>

## Do below steps on root folder (plugin)
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

## `cd ./backend` then do below steps inside backend folder
1. `yarn link medusa-plugin-anamnesis`
2. `npx medusa migrations run`
3. `npx medusa seed --seed-file=data/seed.json`
4. `npm run dev -- -- --preserve-symlinks`

<br>

## Unit Test Coverage
Please make sure to run steps above before running `yarn test --coverage`

<img width="1419" alt="image" src="https://github.com/user-attachments/assets/7826a9aa-f6c6-46ad-8e88-d6dabdd4ebef">


<br>
<br>

## Available Endpoints (postman collection)
<a href="https://www.postman.com/reinhardjs/reinhardjs/collection/nycj76l/noscai-anamnesis?action=share&creator=24954084" target="_blank">https://www.postman.com/reinhardjs/reinhardjs/collection/nycj76l/noscai-anamnesis?action=share&creator=24954084</a>
