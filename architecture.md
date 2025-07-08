# Mikasa Living Architecture Document

This document provides a comprehensive overview of the technical architecture, file structure, and implementation details of the Mikasa Living application.

## 1. High-Level Architecture

The application is a full-stack Next.js application with a PostgreSQL database managed by Prisma. It uses Firebase for phone number-based OTP authentication and features distinct user, vendor, and admin roles.

## 2. File and Folder Structure

The project is organized into the following key directories:

```
/
├── actions/
│   ├── user/
│   │   ├── actions.ts
│   │   └── fetch.actions.ts
│   └── vendor/
│       ├── actions.ts
│       └── fetch.actions.ts
├── app/
│   ├── (admin)/
│   ├── (auth)/
│   │   ├── user/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── verify-otp/
│   │   └── vendor/
│   │       ├── sign-in/
│   │       ├── sign-up/
│   │       │   └── _components/
│   │       └── verify-otp/
│   ├── (user)/
│   ├── (vendor)/
│   └── api/
│       └── auth/
│           └── session/
│               └── route.ts
├── components/
│   ├── common/
│   │   ├── form/
│   │   └── sidebar/
│   └── ui/
├── constants/
├── lib/
│   └── store/
├── prisma/
├── schemas/
└── middleware.ts
```

### 2.1. `actions/`

This directory contains all the server actions for the application.

- **`actions/user/`**: Contains actions related to users, such as creating and verifying users.
- **`actions/vendor/`**: Contains actions related to vendors, such as creating and verifying vendors.

### 2.2. `app/`

This is the main directory for the application's routes and UI.

- **`app/(admin)/`**, **`app/(user)/`**, **`app/(vendor)/`**: These are route groups for the different user roles. Each contains the layouts and pages specific to that role.
- **`app/(auth)/`**: This route group contains all the authentication-related pages for both users and vendors.
  - **`app/(auth)/vendor/sign-up/_components/`**: This directory holds the components for the multi-step vendor sign-up form.
- **`app/api/`**: This directory contains all the API routes for the application.
  - **`app/api/auth/session/route.ts`**: This API route is responsible for creating a server-side session for a user or vendor after they successfully log in.

### 2.3. `components/`

This directory contains all the reusable React components.

- **`components/common/`**: Contains common, application-wide components, such as the sidebar and form elements.
- **`components/ui/`**: Contains the UI components from the component library (e.g., ShadCN).

### 2.4. `constants/`

This directory contains all the constant data for the application, such as sidebar menu configurations.

### 2.5. `lib/`

This directory contains all the library code and helper functions.

- **`lib/store/`**: Contains the Zustand stores for managing client-side state.
- **`lib/firebase.ts`**: Initializes the Firebase client SDK.
- **`lib/firebase-admin.ts`**: Initializes the Firebase Admin SDK for server-side operations.
- **`lib/session.ts`**: Contains the `verifySession` function for server-side session verification.
- **`lib/error.ts`**: Contains the standardized error handling function for server actions.

### 2.6. `prisma/`

This directory contains the Prisma schema and migration files.

### 2.7. `schemas/`

This directory contains all the Zod schemas for form validation.

### 2.8. `middleware.ts`

This file contains the Next.js middleware for protecting routes.

## 3. Application Flow

This section describes the user, vendor, and admin journeys through the application.

### 3.1. User Flow

1.  **Landing Page**: The user lands on the home page, where they can browse vendors.
2.  **Sign-Up**:
    - The user provides their name, phone number, and optional email.
    - They receive and verify an OTP.
    - A new user record is created in the database.
3.  **Sign-In**:
    - The user enters their phone number.
    - The system checks if the user exists.
    - If they exist, an OTP is sent and verified.
    - The user is logged in.
4.  **Booking**: (Functionality to be implemented) The user can browse vendors and book services.

### 3.2. Vendor Flow

1.  **Sign-Up (Multi-Step Form)**:
    - **Step 1: Phone Number**: The vendor enters and verifies their phone number with an OTP.
    - **Step 2: OTP Verification**: The `firebaseUid` and `idToken` are stored.
    - **Step 3: Vendor Details**: The vendor provides their company name, email, and GST number.
    - **Step 4: Plan Selection**: The vendor chooses a subscription plan.
    - **Step 5: Billing Cycle**: The vendor selects a billing cycle.
    - **Step 6: Payment**: (Non-functional) The vendor proceeds through a payment step.
    - **Step 7: Confirmation**: The `createNewVendor` action is called, saving the vendor to the database. A session is created, and the vendor is redirected to their dashboard.
2.  **Sign-In**:
    - The vendor enters their phone number and receives an OTP.
    - After OTP verification, the `firebaseUid` is used to check if the vendor exists.
    - If the vendor exists, a session is created, and they are redirected to the dashboard.
3.  **Dashboard**: The vendor can manage their profile, bookings, and services.

### 3.3. Admin Flow

1.  **Sign-In**: The admin signs in through a dedicated sign-in page.
2.  **Dashboard**: The admin has an overview of the platform, including recent users and pending vendors.
3.  **User and Vendor Management**: The admin can view and manage all users and vendors on the platform.

## 4. Authentication Flow (Vendor)

The vendor authentication flow is a key part of the application.

1.  **Sign-Up**: A multi-step form guides the vendor through the registration process.
    1.  The vendor enters and verifies their phone number with an OTP.
    2.  The `firebaseUid` and `idToken` are stored in the `vendorStore`.
    3.  The vendor provides their details.
    4.  After the final step, the `createNewVendor` action is called, saving the vendor to the database.
    5.  A session is created for the new vendor, and they are redirected to their dashboard.
2.  **Sign-In**:
    1.  The vendor enters their phone number and receives an OTP.
    2.  After OTP verification, the `firebaseUid` is used to check if the vendor exists.
    3.  If the vendor exists, a session is created, and they are redirected to the dashboard.
3.  **Route Protection**:
    1.  The `middleware.ts` file checks for the presence of a session cookie on all vendor routes.
    2.  The `app/(vendor)/layout.tsx` file verifies the session on the server for an extra layer of security.

This detailed architecture document should provide a clear understanding of the project's structure and implementation, making it easy to resume work in the future.
