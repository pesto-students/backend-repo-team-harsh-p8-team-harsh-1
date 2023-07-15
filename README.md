# Full Stack E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MongoDB, 2023




Key Features:

- We will be using Shadcn UI for the Admin!
- Our admin dashboard is going to serve as both CMS, Admin and API!
- We will be able to control multiple vendors / stores through this single CMS! (For example We can have a "Shoe store" and a "Laptop store" and a "Suit store", and our CMS will generate API routes for all of those individually!)
- We will be able to create, update and delete categories!
- We will be able to create, update and delete products!
- We will be able to upload multiple images for products, and change them whenever We want!
- We will be able to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form.
- We will be able to create, update and delete "Billboards" which are these big texts on top of the page. We will be able to attach them to a single category, or use them standalone (Our Admin generates API for all of those cases!)
- We will be able to Search through all categories, products, sizes, colors, billboards with included pagination!
- We will be able to control which products are "featured" so they show on the homepage!
- We will be able to see your orders, sales, etc.
- We will be able to see graphs of your revenue etc.
- We will use JWT Authentication!
- Order creation
- Stripe checkout
- Stripe webhooks
- MOngoDB + Prisma

### Prerequisites

**Node version 14.x**


### Install packages

```shell
npm i
```

### Setup .env file


```js

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
JWT_SECRET=
```

### Connect to DB and Push Prisma
```shell
npx prisma generate
npx prisma db push
```


### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
