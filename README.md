# Todo App

A modern Todo application built with Laravel 11, Vue 3, and Vuetify. This application provides a clean and intuitive interface for managing your daily tasks with features like status tracking, pagination, and real-time updates.

## Features

- ✅ **Create, Read, Update, Delete** todos
- 🏷️ **Status Management** (Pending, In Progress, Completed)
- 📱 **Responsive Design** with Vuetify components
- 🔍 **Form Validation** for data integrity
- 📄 **Pagination** for large datasets
- ⚡ **Real-time Updates** without page refresh
- 🎨 **Modern UI** with Material Design

## Tech Stack

- **Backend**: Laravel 11 (PHP 8.2)
- **Frontend**: Vue 3 + Vuetify
- **Build Tool**: Vite 6.2.4
- **Database**: SQLite (default)
- **Icons**: Heroicons + Material Design Icons

## Requirements

Before you begin, ensure you have the following installed on your system:

- **PHP 8.2** or higher
- **Composer** (latest version)
- **Node.js v22.13.1** or higher
- **npm** (comes with Node.js)

## Installation

Follow these steps to get the application running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/callejasandino/todo-app.git
cd todo-app
```

### 2. Copy Environment File

```bash
cp .env.example .env
```

### 3. Install PHP Dependencies

```bash
composer install
```

### 4. Install Node.js Dependencies

```bash
npm install
```

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Run Database Migrations

```bash
php artisan migrate
```

### 7. Build Frontend Assets

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

### 8. Start the Development Server

```bash
php artisan serve
```

### 9. Access the Application

Open your browser and navigate to:

```
http://127.0.0.1:8000
```

## Development

### Frontend Development

To run the frontend with hot-reload for development:

```bash
npm run dev
```

This will start Vite dev server and watch for changes in your Vue components.

### Backend Development

The Laravel development server will automatically reload when you make changes to PHP files:

```bash
php artisan serve
```

## Project Structure

```
todo-app/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   ├── Models/              # Eloquent Models
│   └── Repositories/        # Data Layer
├── database/
│   └── migrations/          # Database Migrations
├── resources/
│   ├── js/
│   │   ├── components/      # Vue Components
│   │   ├── pages/          # Vue Pages
│   │   └── store/          # Pinia Store
│   └── views/              # Blade Templates
└── routes/
    ├── api.php             # API Routes
    └── web.php             # Web Routes
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `php artisan serve` - Start Laravel development server
- `php artisan migrate` - Run database migrations
- `php artisan migrate:rollback` - Rollback migrations

## API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/todo?page={n}` | Get paginated todos  |
| POST   | `/todo`          | Create new todo      |
| PUT    | `/todo`          | Update existing todo |
| DELETE | `/todo/{id}`     | Delete todo          |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
