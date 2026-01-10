🧺 DormDrop – Smart Hostel Laundry Management System

Getting Started – Application Workflow

DromDrop follows a role-based access system with three main user types:
Admin, Staff, and Students (Users).
Each role has specific responsibilities and access permissions.

1. Admin Setup (First-Time Configuration)

The Admin is responsible for initializing the system.

Admin can:

Create Staff accounts

Manage system settings

Monitor platform activity

Steps:

Register or log in as an Admin.

Navigate to the Admin Dashboard.

Create Staff accounts for laundry staff members.

⚠️ Staff and Students cannot use the system until the Admin has created the required staff accounts.

2. Staff Access & Responsibilities

Once the Admin creates Staff accounts, Staff members can log in.

Staff can:

View student laundry submissions

Track extra clothing items

Update payment status

Mark laundry as processed

Steps:

Staff logs in using credentials created by Admin.

Access the Staff Dashboard.

Manage laundry requests and payment confirmations.

3. Student (User) Access & Submissions

Students can register and submit laundry requests only after Staff accounts exist.

Students can:

Select clothes for weekly laundry

View item limits

Submit extra items (if needed)

Track submission status

Steps:

Student registers an account.

Logs in to the User Dashboard.

Selects clothing items for laundry.

Submits the request for processing.

If a student submits extra or non-listed items, additional charges will apply, which Staff can verify.

4. Payment & Extra Item Handling

Extra items are recorded by Staff

Payment status is updated manually

Once payment is confirmed, extra items are cleared

Both Staff and Students see updated records

5. System Flow Summary

Admin → Creates Staff → Staff manages laundry → Students submit requests

This structured flow ensures proper authorization, smooth operations, and accurate tracking.

📘 Overview
DormDrop is a full-stack MERN application designed to automate and streamline the laundry management process within hostels. The platform eliminates the manual, time-consuming tasks of laundry tracking by providing separate dashboards for students, staff, and administrators. With features like item selection limits, extra item billing, payment tracking, and status updates, DormDrop offers an efficient, transparent, and organized laundry service system that saves time and reduces confusion.

This project was built with a focus on usability, automation, and accountability, ensuring that both students and staff can interact seamlessly while maintaining clear communication about laundry submissions, charges, and delivery statuses.

🧠 Project Concept and Objective
Laundry management in hostels often becomes disorganized due to manual record keeping, limited item control, and miscommunication between students and laundry staff. DormDrop addresses these challenges through a centralized web application that handles:
Weekly laundry submissions by students.
Automatic calculation of item limits and extra charges.
Staff-side verification, updates, and payment confirmations.
Real-time status tracking and history for both students and staff.
Admin-level control over all user accounts and laundry records.
The main goal of DormDrop is to bring efficiency, transparency, and structure to hostel laundry operations — ensuring a smoother workflow for all users involved.

⚙️ Core Features
👩‍🎓 Student Dashboard
Register and log in securely using JWT-based authentication.
Select items for laundry (shirts, pants, jackets, bedsheets, accessories, etc.).
Built-in item limit per week (e.g., 5 shirts, 3 pants, etc.).
Automatic detection of extra or unlisted items, with additional charge calculation.
Submit laundry requests digitally with pickup and drop details.
View submission history, payment status, and delivery updates in real-time.

👨‍🔧 Staff Dashboard
Access a list of all submitted student laundry requests.
View detailed item lists with student information.
Identify and record extra or non-listed items for billing adjustments.
Update payment and washing status once items are verified.
Remove extra items from the record once payment is confirmed.
Manage weekly reports and completed laundry lists efficiently.

🧑‍💼 Admin Dashboard
Access complete control over the DormDrop system.
Manage user roles (add, edit, or delete student and staff accounts).
Monitor weekly laundry records and payment reports.
Track platform usage statistics and performance.
Handle system maintenance and backup data management.

🏗️ Architecture and Workflow
Students log in and select their laundry items.
The system validates inputs based on item limits.
If extra items are detected, they are marked for additional billing.
Staff members access and review student submissions, verify item counts, and update payment and washing statuses.
Once payment is confirmed, extra items are removed automatically from both sides (student and staff views).
Admins monitor overall performance, handle disputes, and maintain user and data integrity across the system.

🧩 System Modules
Authentication Module:
Handles user registration, login, and session security using JWT tokens.
Laundry Management Module:
Manages item selection, submission validation, and limit checking for students.
Staff Management Module:
Allows staff to view and update laundry records, verify payments, and process laundry returns.
Admin Management Module:
Provides complete system control, including user management, report generation, and data insights.
Payment Tracking Module:
Tracks extra charges, payment confirmations, and clears items after successful transactions.

🧪 Testing and Quality Assurance
DormDrop has been tested for:
Proper data validation (no duplicate submissions).
Secure login and role-based access.
Responsive UI across devices.
Real-time updates between student and staff dashboards.
Error handling for invalid item counts and payment inconsistencies.

/_/
/_/
/_/
/_/
/\*/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
