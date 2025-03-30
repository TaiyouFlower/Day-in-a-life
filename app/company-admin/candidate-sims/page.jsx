// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/company-admin/candidate-sims/page.jsx
import Link from 'next/link';

export default function CandidateSimsPage() {
  return (
    // Consistent light background, standard font
    <div className="min-h-screen bg-gray-100 p-6 md:p-8 font-sans">
       {/* Header */}
       <header className="w-full max-w-6xl mx-auto mb-8">
         <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-200">
           <h1 className="text-lg md:text-xl font-semibold text-gray-800">👥 Manage Candidate Simulations</h1>
           <Link href="/company-admin">
             <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
               ← Back to Admin Portal
             </button>
           </Link>
         </div>
       </header>
       {/* Content Area */}
       <main className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Simulation Management</h2>
          <p className="text-gray-600 text-sm">
            This section will contain tools to:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-3 space-y-1">
             <li>Create new "Day in the Life" simulations for specific roles.</li>
             <li>Edit properties and steps of existing simulations.</li>
             <li>View candidate results or interaction data (if implemented).</li>
             <li>Manage company branding elements within simulations.</li>
             <li>Organize simulations by department or job family.</li>
          </ul>
          <p className="mt-6 text-gray-500 italic text-sm">(Placeholder - Functionality to be built)</p>
          {/* Add placeholder buttons or table structure here later */}
       </main>
        {/* Footer (Optional) */}
       <footer className="w-full max-w-6xl mx-auto mt-12 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Real Role Admin
       </footer>
    </div>
  );
}