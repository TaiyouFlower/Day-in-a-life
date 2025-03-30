// app/company/[company]/page.jsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const positions = [
  {
    title: "Junior Frontend Developer",
    emoji: "🚀",
    description: "Build user interfaces and implement client-side logic",
    responsibilities: [
      "React/Next.js development",
      "UI/UX implementation",
      "Cross-browser testing",
      "Component library maintenance",
    ],
    gradient: "from-blue-400 to-purple-400",
  },
  {
    title: "Backend Developer",
    emoji: "🛠️",
    description: "Design and maintain server-side systems",
    responsibilities: [
      "API development",
      "Database optimization",
      "System architecture",
      "Cloud integration",
    ],
    gradient: "from-green-400 to-cyan-400",
  },
  {
    title: "UX Designer",
    emoji: "🎨",
    description: "Create intuitive user experiences",
    responsibilities: [
      "Wireframing & prototyping",
      "User testing sessions",
      "Design system management",
      "Accessibility audits",
    ],
    gradient: "from-pink-400 to-red-400",
  },
];

export default function CompanyPage() {
  const router = useRouter();
  const { company } = useParams();
  const decodedCompany = decodeURIComponent(company);

  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (isMounted) {
        alert(
          "Since the website is not fully ready yet, to test it out properly select Junior Frontend Developer."
        );
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handlePositionChoose = (positionTitle) => {
    if (positionTitle === "Junior Frontend Developer") {
      router.push(
        `/simulate?company=${encodeURIComponent(
          company
        )}&position=${encodeURIComponent(positionTitle)}`
      );
    } else {
      alert("Not Ready Yet! Please Select Junior Frontend Developer :)");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-8 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto mb-16 py-4 px-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl text-white">Day in a life</h1>
          </div>
          <div className="flex space-x-6 text-lg">
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Companies
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Careers
            </a>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4">
            Explore Careers at{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {decodedCompany}
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Select a position to begin your immersive workday simulation
          </p>
        </header>

        {/* Position Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-card-stagger">
          {positions.map((position, index) => (
            <div
              key={position.title}
              className="relative bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group cursor-pointer animate-card-in"
              onClick={() => handlePositionChoose(position.title)} // Fixed here
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${position.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
              />

              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 bg-white/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="text-3xl">{position.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {position.title}
                </h3>
                <p className="text-gray-400 mb-6">{position.description}</p>
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-4">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-3">
                    {position.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <svg
                          className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="max-w-3xl mx-auto mt-20 text-center animate-fade-in">
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to experience a day at {decodedCompany}?
            </h2>
            <p className="text-gray-400 mb-6">
              Select a position above to begin your realistic work simulation
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
                🕒 How It Works
              </button>
              <button className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-xl font-medium transition-all">
                💼 View All Companies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
