// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/company-admin/page.jsx
import Link from 'next/link';

export default function CompanyAdminDashboard() {
  // Define routes for the next level choices
  const candidateSimsRoute = '/company-admin/candidate-sims';
  const internalMobilityRoute = '/company-admin/internal-mobility';

  return (
    // Apply the dark gradient background and default light text color
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center px-4 sm:px-6 md:px-8 py-4 overflow-hidden text-white font-sans">

      {/* Header - Styled like the user-side nav */}
      <header className="w-full max-w-7xl mx-auto mb-8 md:mb-12">
        <nav className="w-full py-3 px-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
               🏢 Company Admin Portal
            </h1>
            {/* Link back to the initial role selection */}
            <Link href="/" className="flex-shrink-0 ml-4">
              <button className="text-sm text-blue-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-md transition-all duration-200 whitespace-nowrap">
                 ← Back to Role Selection
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content - Choices */}
      <main className="flex-1 flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-xl md:text-2xl font-medium text-gray-200 mb-10 text-center">Select an Area to Manage:</h2>
        {/* Apply grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full">

          {/* Card 1: Candidate Simulations */}
          <Link href={candidateSimsRoute} className="block"> {/* Ensure Link itself doesn't prevent stretching */}
            {/* Add flex, flex-col, and h-full HERE */}
            <div className="bg-white/5 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-white/15 hover:bg-blue-900/30 hover:border-blue-400 transition-all duration-300 cursor-pointer group text-center transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex flex-col h-full">
              {/* Icon (doesn't need to grow) */}
              <div className="text-5xl md:text-6xl mb-5 text-blue-300 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">👥</div>
              {/* Content Area */}
              <div className="flex flex-col flex-grow"> {/* Allow this part to grow if needed */}
                 <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                    Candidate Simulations
                 </h3>
                 <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                    Create, manage, and review simulations for potential new hires.
                 </p>
              </div>
            </div>
          </Link>

          {/* Card 2: Internal Tools/Mobility */}
          <Link href={internalMobilityRoute} className="block"> {/* Ensure Link itself doesn't prevent stretching */}
             {/* Add flex, flex-col, and h-full HERE */}
            <div className="bg-white/5 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-white/15 hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-300 cursor-pointer group text-center transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex flex-col h-full">
              {/* Icon (doesn't need to grow) */}
              <div className="text-5xl md:text-6xl mb-5 text-purple-300 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">🔄</div>
              {/* Content Area */}
              <div className="flex flex-col flex-grow"> {/* Allow this part to grow if needed */}
                 <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-200">
                    Internal Mobility & Development
                 </h3>
                 <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                    Tools for internal employee transitions, skill tracking, and development paths.
                 </p>
              </div>
            </div>
          </Link>

        </div>
      </main>

      {/* Footer (Optional) */}
       <footer className="w-full max-w-7xl mx-auto mt-12 text-center text-gray-400 text-xs pb-4">
            © {new Date().getFullYear()} Real Role Admin
       </footer>
    </div>
  );
}