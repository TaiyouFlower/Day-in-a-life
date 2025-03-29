// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/page.jsx

import UserTypeChoice from './components/UserTypeChoice';

/**
 * Root page component for the application.
 * Renders the initial choice screen for the user.
 */
export default function HomePage() {
  return (
    <main>
      {/* Render the component that presents the two main user path choices */}
      <UserTypeChoice />
    </main>
  );
}