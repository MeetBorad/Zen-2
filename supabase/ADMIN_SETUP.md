# Staff sign-in and admin dashboard setup

The staff login uses Supabase Auth. Staff status is stored in `app_metadata`, which is controlled by the project administrator; it is never accepted from the public sign-up form.

## 1. Apply the database schema

Run `schema.sql` in the Supabase SQL Editor. It enables staff-only access to merchant and subscription records and limits anonymous merchant reads to the fields needed for public review links.

## 2. Create the first staff account

Create an Auth user in the Supabase Dashboard, or create a merchant account from the website. In the SQL Editor, assign the staff role to that account, replacing the email with the exact account email:

```sql
UPDATE auth.users
SET raw_app_meta_data =
  COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"staff"}'::jsonb
WHERE email = 'your-admin-email@example.com'
RETURNING id, email;
```

Confirm that exactly one account is returned. Sign out and back in after changing the role so the new role is included in the session token. The staff Admin ID is that account's email; its password is the password set in Supabase Auth. Do not put either value in source code or frontend environment variables.

## 3. Configure environment variables

The Vite client needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The server-side subscription cancellation endpoint and Razorpay webhook need `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET`.

Set the same values in the Vercel project settings for the environments you use. Keep `SUPABASE_SERVICE_ROLE_KEY`, Razorpay secrets, and webhook secrets server-side; never prefix them with `VITE_`.

## 4. Set Supabase Auth URLs

In Supabase Authentication → URL Configuration, set the Site URL to `https://zentapdigitalsolutions.com` and add `https://zentapdigitalsolutions.com` to the allowed redirect URLs. The signup and resend-confirmation flows redirect to the origin where the form was submitted, so add `http://localhost:5173` for local Vite testing as well. Supabase rejects confirmation redirects that are not on this allow list. After changing these settings, resend confirmation for any account whose existing email link points at localhost; old links retain their original redirect.

## 5. Run and test

Run `npm run dev` for the website, then open `http://localhost:5173/#/auth?role=merchant` and choose **Enter merchant preview** to explore a sample merchant workspace without creating an account or changing real data. This demo is enabled only for local development and Vercel Preview deployments; production builds do not include the demo login.

Merchant sign-up and sign-in remain available through Supabase Auth. Merchant sign-up collects the contact name, business name, business category, city, and phone/WhatsApp number as user metadata; these details are stored on the Supabase Auth user and do not create or link a merchant workspace. After signup, a Vercel serverless endpoint verifies the new Auth user and sends those details, email, selected plan, and email-confirmation status to the configured Telegram chat. Keep `TELEGRAM_BOT_TOKEN` and `FOUNDER_TELEGRAM_CHAT_ID` configured as server-side Vercel environment variables only. Staff dashboard data and updates require the SQL schema and a signed-in account with the `app_metadata.role` claim set to `staff`. The cancellation endpoint is a Vercel serverless function; use `vercel dev` or a Vercel deployment to test that API locally.

The preview merchant workspace includes sample review topic and rating filters, summary insights, and business-category-aware review topics and AI reply examples. Changing the business category updates the topic filters and draft context. These interactions use static sample data only; Google Business Profile syncing and live AI review processing are not connected in the preview.

Subscription cancellation is scheduled with Razorpay at the end of the current billing cycle. The dashboard's status changes when Razorpay confirms the final cancellation through the configured webhook.
