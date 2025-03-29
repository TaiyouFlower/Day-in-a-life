"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const targetCompany = "DevsData";
  const inputRef = useRef(null);

  useEffect(() => {
    const normalizedInput = query.toLowerCase();
    const normalizedTarget = targetCompany.toLowerCase();
    
    let inputIndex = 0;
    for (let char of normalizedTarget) {
      if (char === normalizedInput[inputIndex]) {
        inputIndex++;
      }
    }
    
    if (inputIndex > 0 && query.length > 0) {
      setSuggestions([targetCompany]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      setSuggestions([]); // Clear suggestions on search
      router.push(`/company/${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions immediately on click
    inputRef.current.blur(); // Remove focus from input
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center px-8 py-4 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="w-full max-w-7xl mb-16 py-4 px-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <h1 className="text-2xl">Day in a life</h1>
          </div>
          <div className="flex space-x-6 text-lg">
            <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Companies</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Careers</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex flex-col space-y-8 lg:w-1/2">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Experience Your Dream Job with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DiaL
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Step into the shoes of professionals at top companies. Test drive careers, develop skills, 
              and find your perfect workplace match.
            </p>
          </div>

          {/* Search Container */}
          <div className="w-full relative animate-slide-down">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for companies (e.g. DevsData)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                ref = {inputRef}
                className="text-black w-full px-6 py-4 text-lg rounded-2xl border-0 shadow-xl focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all bg-white/90 backdrop-blur-sm"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Explore
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden animate-slide-down">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors flex items-center"
                  >
                    <span className="text-blue-600 font-medium">{suggestion}</span>
                    <span className="ml-2 text-gray-500 text-sm">Top match</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex space-x-8 pt-8 animate-fade-in-delayed">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-gray-400">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-gray-400">Roles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-gray-400">Experiences</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 animate-image-float">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/images/mainImg.jpg" 
              alt="Work environment" 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-sm text-white/80">Currently featured</div>
              <div className="text-2xl font-bold">DevsData LLC</div>
              <div className="text-lg">Frontend Developer Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="w-full max-w-7xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-delayed">
        <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
            <div className="text-2xl">👔</div>
          </div>
          <h3 className="text-white text-2xl font-semibold mb-4">Real Work Environments</h3>
          <p className="text-gray-400">Experience actual company tools, workflows, and daily challenges</p>
        </div>
        <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
            <div className="text-2xl">📈</div>
          </div>
          <h3 className="text-white text-2xl font-semibold mb-4">Skill Development</h3>
          <p className="text-gray-400">Gain practical experience with real-world tasks and projects</p>
        </div>
        <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
            <div className="text-2xl">🤝</div>
          </div>
          <h3 className="text-white text-2xl font-semibold mb-4">Company Matching</h3>
          <p className="text-gray-400">Find workplaces that align with your values and work style</p>
        </div>
      </div>
    </div>
  );
}