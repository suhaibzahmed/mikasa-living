# Mikasa Living Architecture Document

This document provides a comprehensive overview of the technical architecture, file structure, and implementation details of the Mikasa Living application.

## 1. High-Level Architecture

The application is a full-stack Next.js application with a PostgreSQL database managed by Prisma. It uses Firebase for phone number-based OTP authentication and features distinct user, vendor, and admin roles. Session management is handled via server-side cookies. Image uploads are managed through Supabase Storage.

## 2. File and Folder Structure

The project is organized into the following key directories:

```
/
├── actions/
│   ├── admin/
│   │   ├── actions.ts
│   │   └── fetch.actions.ts
│   ├── user/
│   │   ├── actions.ts
│   │   └── fetch.actions.ts
│   ├── vendor/
│   │   ├── actions.ts
│   │   └── fetch.actions.ts
│   └── session.ts
├── app/
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── vendor-management/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── _components/
│   │   │       └── vendors/
│   │   │           ├── VendorTable.tsx
│   │   │           └── VendorDetails.tsx
│   ├── (auth)/
│   │   ├── user/
│   │   │   ├── sign-in/
│   │   │   │   └── _components/
│   │   │   │       ├── SignInForm.tsx
│   │   │   │       └── OtpVerification.tsx
│   │   │   ├── sign-up/
│   │   │   │   └── _components/
│   │   │   │       ├── PhoneNumberInput.tsx
│   │   │   │       ├── OtpVerification.tsx
│   │   │   │       ├── UserDetails.tsx
│   │   │   │       └── RenderSteps.tsx
│   │   │   └── verify-otp/
│   │   │       └── _components/
│   │   │           └── VerifyOtpForm.tsx
│   │   └── vendor/
│   │       ├── sign-in/
│   │       ├── sign-up/
│   │       │   └── _components/
│   │       │       ├── ... (multi-step form components)
│   │       └── verify-otp/
│   │           └── _components/
│   │               └── VerifyOtpForm.tsx
│   ├── (user)/
│   │   └── _components/
│   │       └── UserSidebar.tsx
│   ├── (vendor)/
│   │   ├── vendor/
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   └── _components/
│   │       ├── BusinessDetails.tsx
│   │       ├── Portfolio.tsx
│   │       ├── Photos.tsx
│   │       ├── UploadPhoto.tsx
│   │       └── VerificationPending.tsx
├── components/
│   ├── common/
│   │   ├── form/
│   │   └── sidebar/
│   └── ui/
│       ├── pagination.tsx
│       └── pagination-with-links.tsx
├── constants/
│   └── config.ts
├── lib/
│   ├── store/
│   │   ├── userStore.ts
│   │   └── vendorStore.ts
│   └── supabase.ts
├── prisma/
├── schemas/
│   └── vendor.schema.ts
└── middleware.ts
```

### 2.1. `actions/`

This directory contains all the server actions for the application.

- **`actions/admin/`**: Contains actions related to the admin dashboard.
  - **`fetch.actions.ts`**: Includes functions for fetching data for the admin dashboard, such as `getVendors`, `getVendorById`, and `getPendingVendors`.
- **`actions/user/`**: Contains actions related to users, such as creating, verifying, and fetching user data. The `createUser` action now also stores the `firebaseUid`.
- **`actions/vendor/`**: Contains actions related to vendors.
  - **`actions.ts`**: Includes the `updateVendorDetails` action for updating a vendor's business information and the `uploadVendorPhoto` action for handling image uploads. The `uploadVendorPhoto` action includes server-side validation to ensure the vendor does not exceed their plan's photo limit.
  - **`fetch.actions.ts`**: Includes the `getVendorById` function, which now fetches the vendor's plan and photos in a single query.
- **`actions/session.ts`**: Contains the centralized `createSession` action, which is used to create a session cookie for any user role (user, vendor, or admin).

### 2.2. `app/`

This is the main directory for the application's routes and UI.

- **`app/(admin)/admin/vendor-management/`**: This directory contains the vendor management section.
  - **`page.tsx`**: The main vendor management page, which now fetches data on the server based on URL search parameters and uses the Promise-based `searchParams` API.
  - **`[id]/page.tsx`**: A dynamic page to display the details of a single vendor.
  - **`_components/vendors/`**: Contains the components for the vendor management section.
    - **`VendorTable.tsx`**: A client component that displays a paginated and filterable list of vendors. It now filters by `verificationStatus` instead of `isVerified`.
    - **`VendorDetails.tsx`**: A client component that displays the details of a single vendor in a card layout.
- **`app/(auth)/vendor/sign-up/`**: This directory contains the multi-step vendor sign-up flow.
  - **`_components/`**: Holds the modular components for each step of the sign-up process. The `PaymentForm` component now uses the `createVendorAndSession` action to create the vendor and a session in a single step.
- **`app/(auth)/user/sign-up/`**: This directory contains the new multi-step user sign-up flow.
  - **`_components/`**: Holds the modular components for each step of the sign-up process: `PhoneNumberInput`, `OtpVerification`, and `UserDetails`. The `RenderSteps` component conditionally renders the current step.
- **`app/(auth)/user/sign-in/`**: This directory contains the refactored multi-step user sign-in flow.
- **`app/(auth)/user/verify-otp/`**: This page is used by the sign-in flow to verify the OTP.
- **`app/(user)/`**: This route group contains the main application for logged-in users.
  - **`layout.tsx`**: The layout for the user dashboard, which now fetches user data on the server and passes it to the `UserSidebar`.
  - **`_components/UserSidebar.tsx`**: The sidebar for the user dashboard, which now dynamically displays the logged-in user's name and email.
- **`app/(vendor)/vendor/profile/`**: This is the main page for the vendor to view and edit their profile.
  - **`page.tsx`**: The main profile page, which uses a tabbed layout to separate business details, portfolio, and availability.
  - **`_components/`**: Contains the components for the vendor profile section.
    - **`BusinessDetails.tsx`**: A form that allows vendors to view and edit their business information.
    - **`Portfolio.tsx`**: A component that manages the photo and video sections of the vendor's portfolio.
    - **`Photos.tsx`**: Displays the vendor's uploaded photos in a grid and shows the current photo count.
    - **`UploadPhoto.tsx`**: A form that allows vendors to upload new photos. It includes logic to disable the form when the vendor has reached their plan's photo limit.
    - **`VerificationPending.tsx`**: A component that is displayed when the vendor's account is not yet verified.

### 2.3. `prisma/`

This directory contains the Prisma schema file.

- **`schema.prisma`**: The `Vendor` model has been updated to use a `verificationStatus` enum instead of a boolean `isVerified` field. New `Photo` and `Video` models have been added to manage vendor media uploads in a more scalable way. The `Plan` model now includes a `photoLimit`.

### 2.4. `lib/`

This directory contains all the library code and helper functions.

- **`lib/store/`**: Contains the Zustand stores for managing client-side state.
  - **`userStore.ts`**: Manages the state for the multi-step user sign-up flow, including the current step, phone number, `firebaseUid`, and `idToken`.
- **`lib/supabase.ts`**: Contains the `uploadImageFile` function for uploading images to the Supabase `vendor-photos` bucket.

### 2.5. `constants/`

This directory contains all the application-wide constants.

- **`config.ts`**: Contains configuration constants, such as `VENDOR_PAGE_SIZE`, `MAX_FILE_SIZE`, and `ACCEPTED_IMAGE_TYPES` for image uploads.

## 3. Application Flow

### 3.1. Vendor Sign-Up Flow

1.  **Multi-Step Form**: A multi-step form guides the vendor through the registration process.
2.  **OTP Verification**: The vendor verifies their phone number via OTP, and the `idToken` is stored in the `vendorStore`.
3.  **Payment**: After the payment step, the `createVendorAndSession` action is called, creating the vendor and a session in a single atomic operation.
4.  **Redirection**: The vendor is redirected to their dashboard.

### 3.2. Admin Flow (Vendor Management)

1.  **Vendor List**:
    - The admin navigates to `/admin/vendor-management`.
    - The page fetches a paginated list of vendors from the server, based on the URL search parameters.
    - The admin can filter the list by company name, `verificationStatus`, and plan.
2.  **Vendor Details**:
    - The admin can view the details of a specific vendor.
    - The page includes "Approve" and "Reject" buttons, which are not yet functional.

## 4. Authentication Flow (Vendor)

The vendor authentication flow has been improved to be more robust and efficient.

1.  **Sign-Up**:
    1.  A multi-step form guides the vendor through the registration process.
    2.  After the final step, the `createVendorAndSession` action is called, creating the vendor and a session in a single atomic operation.
    3.  The vendor is redirected to their dashboard, and the session is immediately available.
2.  **Route Protection**:
    1.  The `middleware.ts` file checks for the presence of a session cookie on all protected vendor routes.

### 3.3. Vendor Profile and Portfolio Flow

1.  **Profile Page**: The vendor navigates to `/vendor/profile`.
2.  **Data Fetching**: The `getVendorById` action is called to fetch the vendor's details, plan, and photos in a single query.
3.  **Business Details**: The vendor can view and edit their business information in the "Business Details" tab.
4.  **Photo Gallery**: The vendor can view their uploaded photos in the "Portfolio" tab. The number of uploaded photos and the remaining photo limit are displayed.
5.  **Photo Upload**:
    - If the vendor has not reached their photo limit, they can upload a new photo.
    - The `uploadVendorPhoto` server action validates the image, uploads it to Supabase, and creates a new `Photo` record in the database.
    - The action includes a server-side check to ensure the vendor does not exceed their plan's photo limit.

This detailed architecture document should provide a clear understanding of the project's structure and implementation, making it easy to resume work in the future.
