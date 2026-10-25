# Connecting a Hostinger Domain to NIK'S DIGITAL (GitHub Pages)

This guide links a domain bought on Hostinger to the NIK'S DIGITAL site hosted on GitHub Pages.

Replace `niksdigitaltech.com` below with the real domain.

## Before you start

- The site is deployed from the `main` branch by `.github/workflows/deploy.yml`.
- The repository is `Devesh1304/niks-digital`.
- The GitHub Pages address is `https://devesh1304.github.io/niks-digital/`.

## Step 1: Add the custom domain file

Create a file named `CNAME` in the project root containing only the domain:

```
niksdigitaltech.com
```

Commit and push it:

```bash
git add CNAME
git commit -m "Add custom domain"
git push
```

The deploy workflow publishes the whole `dist` build, so the domain will be served from the root of your domain.

## Step 2: Set the custom domain on GitHub

1. Open https://github.com/Devesh1304/niks-digital/settings/pages
2. Under **Custom domain**, enter `niksdigitaltech.com` and click **Save**.
3. Wait for the DNS check to pass (it can take a few minutes).
4. Tick **Enforce HTTPS** once it becomes available.

## Step 3: Set the DNS records in Hostinger

1. Log in to hPanel and open **Domains**, then select your domain.
2. Open **DNS / Nameservers**, then **Manage DNS records**.
3. Delete any existing A or CNAME records for `@` and `www` that point elsewhere.
4. Add these records:

| Type  | Name | Points to              |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | devesh1304.github.io   |

DNS changes can take from a few minutes to a few hours to take effect.

## Step 4: Check the site

- Open `https://niksdigitaltech.com` and `https://www.niksdigitaltech.com`.
- Both should show the NIK'S DIGITAL home page with the HTTPS padlock.
- If the page does not load, check the DNS records in hPanel and the **Custom domain** setting on GitHub.

## Troubleshooting

- **"DNS check unsuccessful" on GitHub:** the A records are missing or still point to an old host. Fix them and wait.
- **Blank page or missing styles:** clear the browser cache, or do a hard refresh (Ctrl+F5).
- **Old version still showing:** wait for the latest **Deploy to GitHub Pages** run under the repository's **Actions** tab to finish.

