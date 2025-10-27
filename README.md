# TicketDash - React Ticket Management System

A modern, responsive ticket management application built with React, Vite, and Tailwind CSS. Features authentication, CRUD operations, and a clean, intuitive interface.

## Features

- **Authentication System**: Secure login/signup with session management
- **Ticket CRUD Operations**: Create, read, update, and delete tickets
- **Dashboard Analytics**: Real-time stats and recent activity
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Form Validation**: Comprehensive validation using Zod schemas
- **Error Handling**: User-friendly error messages and feedback
- **Protected Routes**: Authentication-based route protection

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ticket-dash
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── pages/              # Page components
├── utils/              # Utility functions
├── validations/        # Zod validation schemas
└── main.jsx           # Application entry point
```

## Key Components

### Authentication

- **AuthContext**: Manages user authentication state
- **RequireAuth**: Protects routes requiring authentication
- Login/Signup forms with validation

### Ticket Management

- **TicketContext**: Manages ticket CRUD operations
- **TicketForm**: Form component for creating/editing tickets
- **Dashboard**: Analytics and recent activity
- **TicketsPage**: Ticket listing and management

### Validation

- Zod schemas for form validation
- Client-side validation with error feedback

## Usage

1. **Sign Up**: Create a new account
2. **Login**: Access your dashboard
3. **Create Tickets**: Add new support tickets
4. **Manage Tickets**: View, edit, and delete tickets
5. **Dashboard**: Monitor ticket statistics and activity

## Features in Detail

### Authentication

- Secure user registration and login
- Session persistence with localStorage
- Protected routes for authenticated users only

### Ticket CRUD

- Create tickets with title, description, status, and priority
- Edit existing tickets
- Delete tickets with confirmation
- Filter tickets by status

### Dashboard

- Real-time statistics (total, open, resolved tickets)
- Recent activity feed
- Quick navigation to ticket management

### Responsive Design

- Mobile-first approach
- Consistent layout across devices
- Accessible UI components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
