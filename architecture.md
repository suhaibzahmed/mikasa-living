# Mikasa Living Architecture Document

This document provides a comprehensive overview of the technical architecture, file structure, and implementation details of the Mikasa Living application.

## 1. High-Level Architecture

The application is a full-stack Next.js application with a PostgreSQL database managed by Prisma. It uses Firebase for phone number-based OTP authentication and features distinct user, vendor, and admin roles. Session management is handled via server-side cookies.

## 2. File and Folder Structure

The project is organized into the following key directories:

```
/
├── actions/
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

- **`actions/user/`**: Contains actions related to users, such as creating, verifying, and fetching user data. The `createUser` action now also stores the `firebaseUid`.
- **`actions/vendor/`**: Contains actions related to vendors.
  - **`fetch.actions.ts`**: Includes the `getVendors` function, which now supports server-side filtering and pagination, and the `getVendorById` function to fetch a single vendor's details.
- **`actions/session.ts`**: Contains the centralized `createSession` action, which is used to create a session cookie for any user role (user, vendor, or admin).

### 2.2. `app/`

This is the main directory for the application's routes and UI.

- **`app/(admin)/admin/vendor-management/`**: This directory contains the vendor management section.
  - **`page.tsx`**: The main vendor management page, which now fetches data on the server based on URL search parameters and uses the Promise-based `searchParams` API.
  - **`[id]/page.tsx`**: A dynamic page to display the details of a single vendor.
  - **`_components/vendors/`**: Contains the components for the vendor management section.
    - **`VendorTable.tsx`**: A client component that displays a paginated and filterable list of vendors. It uses the `use-debounce` hook for the search input and the `PaginationWithLinks` component for pagination.
    - **`VendorDetails.tsx`**: A client component that displays the details of a single vendor in a card layout.
- **`app/(auth)/user/sign-up/`**: This directory contains the new multi-step user sign-up flow.
  - **`_components/`**: Holds the modular components for each step of the sign-up process: `PhoneNumberInput`, `OtpVerification`, and `UserDetails`. The `RenderSteps` component conditionally renders the current step.
- **`app/(auth)/user/sign-in/`**: This directory contains the refactored multi-step user sign-in flow.
- **`app/(auth)/user/verify-otp/`**: This page is used by the sign-in flow to verify the OTP.
- **`app/(user)/`**: This route group contains the main application for logged-in users.
  - **`layout.tsx`**: The layout for the user dashboard, which now fetches user data on the server and passes it to the `UserSidebar`.
  - **`_components/UserSidebar.tsx`**: The sidebar for the user dashboard, which now dynamically displays the logged-in user's name and email.

### 2.3. `lib/`

This directory contains all the library code and helper functions.

- **`lib/store/`**: Contains the Zustand stores for managing client-side state.
  - **`userStore.ts`**: Manages the state for the multi-step user sign-up flow, including the current step, phone number, `firebaseUid`, and `idToken`.

### 2.4. `constants/`

This directory contains all the application-wide constants.

- **`config.ts`**: Contains configuration constants, such as `VENDOR_PAGE_SIZE`.

## 3. Application Flow

### 3.1. User Flow

1.  **Sign-Up (Multi-Step Form)**:
    - **Step 1: Phone Number**: The user enters their phone number.
    - **Step 2: OTP Verification**: The user verifies the OTP sent to their phone. The `firebaseUid` and `idToken` are stored in the `userStore`.
    - **Step 3: User Details**: The user enters their name and optional email.
    - The `createUser` action is called, saving the user to the database.
    - The `createSession` action is called to create a session for the new user.
    - The user is redirected to the homepage (`/`).
2.  **Sign-In**:
    - The user enters their phone number.
    - The system checks if the user exists.
    - If they exist, an OTP is sent and verified on the `/user/verify-otp` page.
    - A session is created, and the user is redirected to the homepage (`/`).
3.  **Dashboard**:
    - The user lands on the homepage, where they can browse vendors.
    - The `UserSidebar` now displays the user's name and email, fetched from the database.

### 3.2. Admin Flow (Vendor Management)

1.  **Vendor List**:
    - The admin navigates to `/admin/vendor-management`.
    - The page fetches a paginated list of vendors from the server, based on the URL search parameters.
    - The admin can filter the list by company name, verification status, and plan. The search input is debounced to improve performance.
    - The admin can navigate through the pages of vendors using the `PaginationWithLinks` component.
2.  **Vendor Details**:
    - The admin can click on a "View" button to navigate to the details page for a specific vendor.
    - The details page displays the vendor's information in a card layout.
    - The page includes "Approve" and "Reject" buttons, which are not yet functional.

## 4. Authentication Flow (User)

The user authentication flow has been refactored to be a modular, multi-step process.

1.  **Sign-Up**:
    1.  A multi-step form guides the user through the registration process, managed by the `userStore`.
    2.  After the final step, the `createUser` action is called, saving the user to the database.
    3.  The `createSession` action is called to create a session for the new user.
    4.  `router.refresh()` is called before redirecting to ensure the session cookie is available on the server, preventing redirect loops.
2.  **Sign-In**:
    1.  The user enters their phone number and is redirected to the `verify-otp` page.
    2.  After OTP verification, the `createSession` action is called.
    3.  `router.refresh()` is called before redirecting to prevent redirect loops.
3.  **Route Protection**:
    1.  The `middleware.ts` file checks for the presence of a session cookie on all protected routes.
    2.  The `app/(user)/layout.tsx` file verifies the session on the server using the `checkUserAuth` function.

This detailed architecture document should provide a clear understanding of the project's structure and implementation, making it easy to resume work in the future.
