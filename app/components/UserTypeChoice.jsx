// app/components/UserTypeChoice.jsx
"use client"; // Needs client-side interaction for routing

import { useRouter } from 'next/navigation';

export default function UserTypeChoice() {
  const router = useRouter();

  // Route for the individual user flow (where they search for companies)
  const individualUserStartRoute = '/find-company';

  // Route for the company representative flow
  const companyStartRoute = '/company-admin';

  const handleChoice = (route) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in">Welcome to Day in a Life</h1>
      <p className="text-xl text-gray-300 mb-16 text-center animate-fade-in">Please select your role to continue:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-3xl animate-slide-up">
        {/* Individual User Card */}
        <div
          onClick={() => handleChoice(individualUserStartRoute)}
          className="bg-white/10 p-8 rounded-2xl border border-white/20 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-2 group"
        >
          <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">👤</div>
          <h2 className="text-2xl font-semibold mb-3">Individual User</h2>
          <p className="text-gray-300 group-hover:text-white transition-colors">Explore companies and simulate a day in different roles.</p>
        </div>

        {/* Company Card */}
        <div
          onClick={() => handleChoice(companyStartRoute)}
          className="bg-white/10 p-8 rounded-2xl border border-white/20 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-2 group"
        >
           <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">🏢</div>
          <h2 className="text-2xl font-semibold mb-3">Company Representative</h2>
          <p className="text-gray-300 group-hover:text-white transition-colors">Manage simulations or access internal company tools.</p>
        </div>
      </div>
    </div>
  );
}