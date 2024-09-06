import React from "react";
import ThemeToggle from "../components/ThemeToggle";

const OAuthAppDescription: React.FC = () => {
  return (
    <>
    <ThemeToggle />
    <div className="min-h-screen bg-base-100 py-12">
        
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center">
            
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-8 text-center">
            Setting Up OAuth with Lucia, Hono, and React
          </h1>
          <p className="text-lg mb-6 text-base-content text-left">
            This guide walks you through integrating OAuth authentication into a web application using modern tools like Lucia for authentication, Hono for the backend, and React for the frontend. Styling is provided by Tailwind CSS and DaisyUI, ensuring a beautiful, responsive design.
          </p>
        </div>
        <div className="text-center m-10 flex justify-center items-center gap-3">
          <a href="https://github.com/FIKE110/AuthWithHonoAndReact" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary">
            View on GitHub
          </a>
          <br />
          <a href="/auth/login" className="btn btn-primary">
            Get Started
          </a>
        </div>
        <div className="prose lg:prose-xl max-w-none mx-auto">
          <h2>Technologies Used</h2>
          <ul className="list-disc ml-5">
          <li><strong>Bun:</strong> A fast javascript runtime</li>
            <li><strong>Lucia:</strong> A robust authentication library that handles user sessions and OAuth.</li>
            <li><strong>Hono:</strong> A minimalist, fast web framework for the backend API.</li>
            <li><strong>React:</strong> A popular frontend library for building user interfaces.</li>
            <li><strong>Tailwind CSS:</strong> A utility-first CSS framework for rapid UI development.</li>
            <li><strong>DaisyUI:</strong> A UI component library built on top of Tailwind CSS for designing beautiful interfaces.</li>
          </ul>

          <h2 className="py-4">Setting Up the Backend</h2>
          <p className="pb-4">
            First, I set up the backend using Hono and integrated Lucia for authentication. I used the Prisma adapter for Lucia to manage user sessions.
          </p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto">
            <code>
{`import { Hono } from 'hono';
import lucia from 'lucia-auth';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './db/db';

prisma.$connect();
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const auth = lucia({
  adapter: adapter,
  secret: process.env.LUCIA_SECRET,
  env: process.env.PROFILE as any,
});

const app = new Hono();

// Define routes and middleware here

export default app;`}
            </code>
          </pre>

          <h2 className="py-4">Integrating OAuth</h2>
          <p className="pb-4">
            For OAuth integration, I configured Google and GitHub as the providers. The client IDs and secrets were stored in environment variables for security.
          </p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto">
            <code>
{`import { Google } from '@lucia-auth/oauth/google';
import { auth } from './config/auth';

const googleAuth = Google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
  scope: ['openid', 'email', 'profile'],
});

// Set up routes for OAuth handling with Hono
app.get('/auth/oauth/google', googleAuth.redirect());
app.get('/auth/oauth/google/callback', googleAuth.handleCallback());
`}
            </code>
          </pre>

          <h2 className="py-4">Setting Up the Frontend</h2>
          <p className="pb-4">
            On the frontend, I used React along with DaisyUI and Tailwind CSS for styling. I created components for user authentication and profile management.
          </p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto">
            <code>
{`import React from 'react';
import { useAuth } from './hooks/useAuth';

const Profile: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">User Profile</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        </div>
      ) : (
        <button onClick={login} className="btn btn-primary">Login with Google</button>
      )}
    </div>
  );
};

export default Profile;`}
            </code>
          </pre>

          <h2 className="py-4">Conclusion</h2>
          <p>
            By using Lucia for authentication, Hono for the backend, and React for the frontend, I was able to build a seamless OAuth authentication system. Tailwind CSS and DaisyUI made it easy to style the application with a modern, responsive design.
          </p>
        </div>

       
      </div>
    </div>
    </>
  );
};

export default OAuthAppDescription;
