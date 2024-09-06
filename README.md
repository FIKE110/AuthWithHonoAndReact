# AuthWithHonoAndReact

**AuthWithHonoAndReact** is a web application that integrates authentication and user management using a variety of modern tools and frameworks. This project features Hono for the backend, React for the frontend, and utilizes OAuth for user authentication. The styling is handled with Tailwind CSS and DaisyUI.

## Technologies Used

- **Bun**: Fast JavaScript runtime for development.
- **Lucia**: Authentication library for managing user sessions and OAuth.
- **Tailwind CSS**: Utility-first CSS framework for building responsive UIs.
- **DaisyUI**: Component library built on top of Tailwind CSS.
- **OAuth**: Open standard for authorization and user authentication.

## Features

- OAuth authentication with Google and GitHub.
- User profile management with profile pictures.
- Responsive design with Tailwind CSS.
- Modern UI components using DaisyUI.

## Setup and Installation

### Prerequisites

- Node.js (for development and running the application)
- Bun (for managing dependencies and scripts)
- Google or GitHub account for OAuth configuration

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/AuthWithHonoAndReact.git
   cd AuthWithHonoAndReact

2. Install Dependencies

   bun install

3. Configure Environment Variables

   Create a .env file in the root of your project and add:

   LUCIA_SECRET=your-lucia-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   PORT=3000

4. Run the Application

   bun dev

   Access the application at http://localhost:3000.

Usage

- Register: Create a new account using OAuth (Google or GitHub).
- Login: Authenticate with OAuth credentials.
- Profile: View and manage user profiles.

Directory Structure

- /src: Source code for backend and frontend.
  - /backend: Hono and Lucia configuration, API routes.
  - /frontend: React components, Tailwind CSS, DaisyUI styling.

Contributing

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes.
4. Push your branch and create a pull request.

License

MIT License - see the LICENSE file for details.

Acknowledgments

- Hono: https://hono.dev/
- Lucia: https://lucia-auth.com/
- Tailwind CSS: https://tailwindcss.com/
- DaisyUI: https://daisyui.com/
- OAuth: https://oauth.net/