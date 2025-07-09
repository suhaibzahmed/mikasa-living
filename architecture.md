# Mikasa Living Architecture Document

This document provides a comprehensive overview of the technical architecture, file structure, and implementation details of the Mikasa Living application.

## 1. High-Level Architecture

The application is a full-stack Next.js application with a PostgreSQL database managed by Prisma. It uses Firebase for phone number-based OTP authentication and features distinct user, vendor, and admin roles. Session management is handled via server-side cookies.

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
│   │   └── actions.ts
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
│   └── ... (other lib files)
├── prisma/
├── schemas/
└── middleware.ts
```

### 2.1. `actions/`

This directory contains all the server actions for the application.

- **`actions/admin/`**: Contains actions related to the admin dashboard.
  - **`fetch.actions.ts`**: Includes functions for fetching data for the admin dashboard, such as `getVendors`, `getVendorById`, and `getPendingVendors`.
- **`actions/user/`**: Contains actions related to users, such as creating, verifying, and fetching user data. The `createUser` action now also stores the `firebaseUid`.
- **`actions/vendor/`**: Contains actions related to vendors, such as the new `createVendorAndSession` function, which creates a new vendor and a session cookie in a single atomic operation.
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

### 2.3. `prisma/`

This directory contains the Prisma schema file.

- **`schema.prisma`**: The `Vendor` model has been updated to use a `verificationStatus` enum instead of a boolean `isVerified` field. New `Photo` and `Video` models have been added to manage vendor media uploads in a more scalable way.

### 2.4. `lib/`

This directory contains all the library code and helper functions.

- **`lib/store/`**: Contains the Zustand stores for managing client-side state.
  - **`userStore.ts`**: Manages the state for the multi-step user sign-up flow, including the current step, phone number, `firebaseUid`, and `idToken`.

### 2.5. `constants/`

This directory contains all the application-wide constants.

- **`config.ts`**: Contains configuration constants, such as `VENDOR_PAGE_SIZE`.

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

This detailed architecture document should provide a clear understanding of the project's structure and implementation, making it easy to resume work in the future.
