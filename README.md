# e-Gestion

**e-Gestion** is a comprehensive web-based management system designed for educational and training institutions. It streamlines the administration of courses, trainers, trainees, and schedules through an intuitive and modern interface.

## About the Project

e-Gestion provides a complete solution for managing training centers and educational institutions. The system supports three distinct user roles with tailored functionalities:

### For Administrators
- **Trainer Management (Formateurs)**: Manage trainer profiles, assign modules, and send login credentials
- **Trainee Management (Stagiaires)**: Handle trainee registration, profile management, and access control
- **Course Structure**: Create and organize filieres (specializations), modules, and groups
- **Schedule Management (Emplois)**: Create, update, and distribute timetables
- **User Administration**: Manage system users and role assignments

### For Trainers (Formateurs)
- **Course Materials (Cours)**: Upload and manage course content
- **Exercises (Exercices)**: Create and distribute exercises to trainees
- **Schedule Access**: View assigned teaching schedules
- **Personal Dashboard**: Track assigned modules and groups

### For Trainees (Stagiaires)
- **Learning Resources**: Access course materials and exercises
- **Schedule Viewing**: Check class timetables
- **Personal Dashboard**: Monitor academic progress and assignments

The platform features a role-based access control system ensuring that each user type has appropriate permissions and sees only relevant information for their role.

## Tech Stack

### Backend
- **Laravel 10** - PHP web application framework
- **Laravel Sanctum** - API authentication
- **Spatie Laravel Permission** - Role and permission management
- **Inertia.js** - Server-side routing with client-side rendering

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **Inertia.js React Adapter** - React adapter for Inertia.js
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite & Flowbite React** - UI component library
- **Headless UI** - Unstyled, accessible UI components
- **Redux Toolkit** - State management
- **Heroicons & React Icons** - Icon libraries
- **Vite** - Frontend build tool

## Requirements

- PHP ^8.1
- Composer
- Node.js & npm
- MySQL/PostgreSQL or other supported database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/OtmaneTouhami/e-Gestion.git
cd e-Gestion
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Configure your database in the `.env` file

7. Run migrations:
```bash
php artisan migrate
```

## Development

Start the Laravel development server:
```bash
php artisan serve
```

In a separate terminal, start the Vite development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8000`

## Building for Production

Compile assets for production:
```bash
npm run build
```

## Key Features

- **Role-Based Access Control**: Separate interfaces for administrators, trainers, and trainees
- **Document Management**: Upload, manage, and download course materials and exercises
- **Schedule Management**: Create and distribute timetables with PDF export functionality
- **User Management**: Automated credential generation and email distribution
- **Module Assignment**: Flexible assignment of trainers to modules and specializations
- **Modern UI/UX**: Responsive design with a clean, intuitive interface
- **Real-time Updates**: Seamless page transitions with Inertia.js

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
