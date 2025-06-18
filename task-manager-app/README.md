# Task Manager App

A modern, responsive task management application built with Angular 17. This application allows users to manage tasks with features like creating, editing, viewing, and deleting tasks, as well as filtering by owner.

---

## ⚠️ Intentional Accessibility Issues

This project contains 5 intentional accessibility issues for demonstration or testing purposes. These are:

| Issue # | Description                                      | Example Location         | Why it's a Problem                |
|---------|--------------------------------------------------|-------------------------|-----------------------------------|
| 1       | Icon-only buttons lack `aria-label`              | Task list action icons  | Screen readers can't announce action |
| 2       | Missing `<label>` for form fields                | Task detail form        | Screen readers can't identify field |
| 3       | Poor color contrast for status badges            | Status badge CSS        | Text unreadable for some users    |
| 4       | No `alt`/`aria-label` for informative icons      | Status icon in task     | Screen readers miss meaning       |
| 5       | No keyboard focus indicator on interactive elements | Buttons, links, form fields | Keyboard users can't see which element is focused |

### Details

1. **Missing `aria-label` or `aria-labelledby` on Icon-Only Buttons**
   - **Where:** Task list action buttons (view, edit, delete)
   - **Problem:** Screen readers may not announce the purpose of these buttons clearly, making them unusable for non-visual users.

2. **Missing `<label>` for Form Inputs**
   - **Where:** Task detail form (e.g., task name input)
   - **Problem:** Screen readers rely on labels to announce the purpose of form fields. Placeholders are not a substitute for labels.

3. **Poor Color Contrast for Status Badges**
   - **Where:** Status badge CSS (e.g., yellow on white)
   - **Problem:** Users with low vision or color blindness may not be able to read the status due to insufficient contrast.

4. **No `alt` Text for Informative Icons**
   - **Where:** Status icon in task list/detail
   - **Problem:** Screen readers will skip the icon or just read the emoji, not the meaning (e.g., "In Progress").

5. **No Keyboard Focus Indicator on Interactive Elements**
   - **Where:** Buttons, links, and form fields throughout the app
   - **Problem:** Users who navigate with a keyboard cannot see which element is currently focused, making navigation difficult or impossible for them.

---

## Features

### Task Management
- **View Tasks**: Display a list of all tasks in a modern card-based layout
- **Create Tasks**: Add new tasks with name, description, status, and owner
- **Edit Tasks**: Modify existing task properties
- **Delete Tasks**: Remove tasks with confirmation
- **Task Details**: View comprehensive task information

### Task Properties
Each task includes:
- **Name**: Task title (required, minimum 3 characters)
- **Description**: Detailed task description (required, minimum 10 characters)
- **Status**: Task progress status (NEW, IN PROGRESS, DONE)
- **Owner**: Person responsible for the task (required, minimum 2 characters)
- **Created Date**: When the task was created
- **Updated Date**: When the task was last modified

### Filtering and Search
- **Filter by Owner**: Select specific owners from a dropdown
- **Search**: Search across task names, descriptions, and owners
- **Clear Filters**: Reset all filters to show all tasks
- **Task Count**: Display the number of tasks found

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Status Indicators**: Color-coded status badges with icons
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Loading spinners for better user experience

## Mock Data

The application comes with 10 pre-populated tasks covering various scenarios:
1. Design User Interface (Alice Johnson - IN PROGRESS)
2. Implement Authentication (Bob Smith - DONE)
3. Database Schema Design (Carol Davis - NEW)
4. API Development (David Wilson - IN PROGRESS)
5. Unit Testing (Eva Brown - NEW)
6. Performance Optimization (Frank Miller - IN PROGRESS)
7. Documentation (Grace Lee - DONE)
8. Security Audit (Henry Taylor - NEW)
9. Mobile Responsiveness (Iris Garcia - IN PROGRESS)
10. Deployment Setup (Jack Anderson - NEW)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:4200`

3. The application will automatically reload if you change any source files

### Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### Viewing Tasks
- The main page displays all tasks in a grid layout
- Each task card shows the task name, description, status, owner, and creation date
- Click the eye icon (👁️) to view detailed task information

### Creating a New Task
1. Click the "New Task" button in the header
2. Fill in the required fields:
   - Task Name (minimum 3 characters)
   - Description (minimum 10 characters)
   - Status (select from dropdown)
   - Owner (minimum 2 characters)
3. Click "Create Task" to save

### Editing a Task
1. Navigate to the task detail page
2. Click the "Edit Task" button
3. Modify the desired fields
4. Click "Save Changes" to update

### Deleting a Task
1. Navigate to the task detail page
2. Click the "Delete Task" button
3. Confirm the deletion in the popup dialog

### Filtering Tasks
- Use the "Filter by Owner" dropdown to show tasks from specific owners
- Use the search box to find tasks by name, description, or owner
- Click "Clear Filters" to reset all filters

## Technical Details

### Architecture
- **Framework**: Angular 17 with standalone components
- **Styling**: SCSS with modern CSS Grid and Flexbox
- **State Management**: RxJS BehaviorSubject for reactive state
- **Routing**: Angular Router with parameterized routes
- **Forms**: Reactive Forms with validation

### File Structure
```
src/
├── app/
│   ├── models/
│   │   └── task.model.ts          # Task interface and enum
│   ├── services/
│   │   └── task.service.ts        # Task management service
│   ├── task-list/
│   │   ├── task-list.component.ts # Task list component
│   │   ├── task-list.component.html
│   │   └── task-list.component.scss
│   ├── task-detail/
│   │   ├── task-detail.component.ts # Task detail/edit component
│   │   ├── task-detail.component.html
│   │   └── task-detail.component.scss
│   ├── app.component.ts           # Main app component
│   ├── app.component.html         # App template
│   └── app.routes.ts              # Application routes
├── styles.scss                    # Global styles
└── main.ts                        # Application entry point
```

### Key Components

#### TaskListComponent
- Displays tasks in a responsive grid
- Handles filtering and search functionality
- Provides navigation to task details and creation

#### TaskDetailComponent
- Handles both viewing and editing tasks
- Manages form validation and submission
- Supports task creation, editing, and deletion

#### TaskService
- Manages task data with RxJS observables
- Provides CRUD operations for tasks
- Handles filtering and data persistence

## Browser Support

The application is built with modern web standards and supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a demonstration project. Feel free to explore the code and use it as a reference for building similar applications.

## License

This project is open source and available under the MIT License.
