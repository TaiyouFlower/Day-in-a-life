// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/company-admin/internal-mobility/page.jsx
"use client";

import Link from 'next/link';
import { useState, useMemo } from 'react';
// --- Import Google AI SDK ---
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// --- Sample Data (Consider moving to a separate file or fetching) ---
const departments = ["Engineering", "Marketing", "Sales", "HR", "Product", "Finance", "Design", "Operations"];
const rolesByDept = {
  "Engineering": ["Software Engineer I", "Software Engineer II", "Senior Software Engineer", "QA Engineer", "DevOps Engineer", "Engineering Manager"],
  "Marketing": ["Marketing Specialist", "Content Creator", "SEO Analyst", "Social Media Manager", "Marketing Manager"],
  "Sales": ["Sales Development Rep", "Account Executive", "Sales Manager", "Customer Success Manager"],
  "HR": ["HR Coordinator", "Recruiter", "HR Business Partner", "HR Manager"],
  "Product": ["Associate Product Manager", "Product Manager", "Senior Product Manager", "Product Lead"],
  "Finance": ["Accountant", "Financial Analyst", "Finance Manager"],
  "Design": ["UI/UX Designer", "Graphic Designer", "Product Designer", "Design Lead"],
  "Operations": ["Operations Associate", "Operations Manager", "Project Manager"]
};
// --- --- ---

// --- Configure Google AI SDK ---
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
let genAI;
let model;

// Initialize AI only if API key exists, handle potential errors
try {
    if (API_KEY) {
        genAI = new GoogleGenerativeAI(API_KEY);
        // Define safety settings to reduce overly cautious blocking (adjust as needed)
        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];
        model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Fast and capable model
            safetySettings,
        });
    } else {
        console.warn("Gemini API Key not found. AI features will be disabled. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local");
    }
} catch (error) {
    console.error("Error initializing GoogleGenerativeAI:", error);
    // Set model to null so the UI knows AI is unavailable
    model = null;
}
// --- --- ---

export default function InternalMobilityPage() {
  // --- State ---
  const [fromDept, setFromDept] = useState('');
  const [fromRole, setFromRole] = useState('');
  const [fromExp, setFromExp] = useState(''); // String for empty input handling
  const [toDept, setToDept] = useState('');
  const [toRole, setToRole] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [validationError, setValidationError] = useState('');

  // --- Derived State ---
  const fromRoles = useMemo(() => fromDept ? rolesByDept[fromDept] || [] : [], [fromDept]);
  const toRoles = useMemo(() => toDept ? rolesByDept[toDept] || [] : [], [toDept]);

  // --- Input Validation ---
  const validateInputs = () => {
    const experience = Number(fromExp);
    if (!fromDept || !fromRole || !toDept || !toRole ) {
      setValidationError("Please select 'From' and 'To' departments and roles.");
      return false;
    }
     if (fromExp === '' || isNaN(experience) || experience <= 0) {
        setValidationError("Please enter a valid experience number greater than 0.");
        return false;
    }
    if (fromDept === toDept && fromRole === toRole) {
        setValidationError("The 'From' and 'To' roles cannot be identical for analysis.");
        return false;
    }
    setValidationError('');
    return true;
  }

  // --- Function to call AI for Analysis ---
  const handleAnalyze = async () => {
    if (!validateInputs()) return;
    if (!model) {
       setAnalysisError("AI analysis unavailable: Check API Key setup or console for errors.");
       return;
     }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);
    const experienceYears = Number(fromExp); // Use converted number

    // --- Construct the AI Prompt ---
    const prompt = `
      Analyze the potential internal job transition:
      From: ${fromRole} (${fromDept}, ${experienceYears} years exp)
      To: ${toRole} (${toDept})

      Instructions:
      1. Compare the typical skills/responsibilities of these specific roles/departments.
      2. Generate analysis based *only* on this comparison and the provided experience.
      3. IMPORTANT: Output ONLY a valid JSON object. The response MUST start with { and end with }. NO introductory text, explanation, markdown formatting, or anything else outside the JSON structure is allowed.
      4. The JSON object MUST contain these exact keys:
         "time": (string, estimated transition time range specifically for this path, e.g., "4-8 months")
         "strengths": (array of 2-4 concise string advantages for this specific move)
         "weaknesses": (array of 2-4 concise string skill gaps/challenges for this specific move)
         "benefits": (array of 2-4 concise string benefits of this move)
         "disadvantages": (array of 2-4 concise string risks/downsides of this move)

      Be specific and differentiate your analysis based on the inputs. Keep descriptions concise (bullet point style).
    `;

    console.log("Sending Prompt to AI:", prompt);
    let rawTextResponse = '';

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        rawTextResponse = response.text();
        console.log("AI Raw Response:", rawTextResponse);

        // Robust JSON Extraction
        let cleanedText = rawTextResponse.trim();
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            cleanedText = jsonMatch[0];
            console.log("Extracted potential JSON:", cleanedText);
        } else {
             console.error("Could not find valid JSON object structure in response.");
             throw new Error("AI response did not contain a recognizable JSON object.");
        }

        // Attempt to parse
        const parsedResult = JSON.parse(cleanedText);

        // Validate structure
        if ( typeof parsedResult.time === 'string' && Array.isArray(parsedResult.strengths) && Array.isArray(parsedResult.weaknesses) && Array.isArray(parsedResult.benefits) && Array.isArray(parsedResult.disadvantages) ) {
           setAnalysisResult(parsedResult);
        } else {
            console.error("Parsed AI response missing required keys or has incorrect types:", parsedResult);
            throw new Error("AI response JSON structure validation failed.");
        }

    } catch (error) {
        console.error("Error during AI analysis/parsing:", error);
        setAnalysisError(`Failed to get or parse analysis from AI. Please check the console for the raw AI response. Error: ${error.message}`);
        console.error("Raw AI text that caused error:", rawTextResponse);
    } finally {
        setIsAnalyzing(false);
    }
  };
  // --- End of handleAnalyze function ---

  return (
    // --- Main Container: Dark Gradient Background ---
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center px-4 sm:px-6 md:px-8 py-4 overflow-y-auto text-white font-sans"> {/* Allow vertical scroll */}

       {/* --- Header: User-Side Style --- */}
       <header className="w-full max-w-7xl mx-auto mb-8 md:mb-12 sticky top-4 z-10">
         <nav className="w-full py-3 px-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 shadow-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                    {/* Updated Icon */}
                    <svg className="w-6 h-6 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                    Internal Mobility Analysis
                </h1>
                <Link href="/company-admin" className="flex-shrink-0 ml-4">
                    <button className="text-sm text-blue-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-md transition-all duration-200 whitespace-nowrap">
                       ← Back to Admin
                    </button>
                </Link>
            </div>
         </nav>
       </header>

       {/* --- Main Content Area --- */}
       <main className="w-full max-w-7xl mx-auto flex-1 mb-10">

          {/* Input Section Card */}
          <section className="mb-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/15 p-6 md:p-8 shadow-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 border-b border-white/15 pb-4">Analyze Potential Transition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              {/* "From Where" Inputs */}
              <div className="space-y-5 bg-black/10 p-5 rounded-lg border border-white/10 shadow-inner">
                <h3 className="text-lg font-medium text-gray-100 flex items-center mb-3">
                    <svg className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                    From (Current Role)
                </h3>
                {/* Department */}
                <div>
                  <label htmlFor="fromDept" className="block text-xs font-medium text-gray-300 mb-1.5">Department</label>
                  <select id="fromDept" value={fromDept} onChange={(e) => { setFromDept(e.target.value); setFromRole(''); setValidationError(''); }} className="w-full p-2.5 bg-white/90 backdrop-blur-sm text-black rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm">
                    <option value="" className="text-gray-500">Select Department...</option>
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
                 {/* Role */}
                <div>
                  <label htmlFor="fromRole" className="block text-xs font-medium text-gray-300 mb-1.5">Role / Position</label>
                  <select id="fromRole" value={fromRole} onChange={(e) => {setFromRole(e.target.value); setValidationError('');}} disabled={!fromDept} className="w-full p-2.5 bg-white/90 backdrop-blur-sm text-black rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm disabled:bg-gray-500/30 disabled:cursor-not-allowed disabled:text-gray-400 shadow-sm">
                    <option value="" className="text-gray-500">Select Role...</option>
                    {fromRoles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                {/* Experience */}
                <div>
                  <label htmlFor="fromExp" className="block text-xs font-medium text-gray-300 mb-1.5">Years of Experience</label>
                  <input type="number" id="fromExp" value={fromExp} placeholder="e.g., 3" min="0" step="0.5" onChange={(e) => {setFromExp(e.target.value); setValidationError('');}} className="w-full p-2.5 bg-white/90 backdrop-blur-sm text-black rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm placeholder-gray-500"/>
                </div>
              </div>

              {/* "To Where" Inputs */}
              <div className="space-y-5 bg-black/10 p-5 rounded-lg border border-white/10 shadow-inner">
                 <h3 className="text-lg font-medium text-gray-100 flex items-center mb-3">
                    <svg className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    To (Target Role)
                 </h3>
                 {/* Department */}
                <div>
                  <label htmlFor="toDept" className="block text-xs font-medium text-gray-300 mb-1.5">Department</label>
                  <select id="toDept" value={toDept} onChange={(e) => { setToDept(e.target.value); setToRole(''); setValidationError('');}} className="w-full p-2.5 bg-white/90 backdrop-blur-sm text-black rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm">
                    <option value="" className="text-gray-500">Select Department...</option>
                     {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
                 {/* Role */}
                <div>
                  <label htmlFor="toRole" className="block text-xs font-medium text-gray-300 mb-1.5">Role / Position</label>
                  <select id="toRole" value={toRole} onChange={(e) => {setToRole(e.target.value); setValidationError('');}} disabled={!toDept} className="w-full p-2.5 bg-white/90 backdrop-blur-sm text-black rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm disabled:bg-gray-500/30 disabled:cursor-not-allowed disabled:text-gray-400 shadow-sm">
                    <option value="" className="text-gray-500">Select Role...</option>
                    {toRoles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                 {/* Spacer */}
                 <div className="h-10 md:h-[5.25rem]"></div>
              </div>
            </div>

            {/* Validation Error Display */}
            {validationError && ( <p className="text-sm text-red-400 mt-5 text-center font-medium animate-pulse">{validationError}</p> )}

            {/* Analyze Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !model}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-70 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.03] disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 shadow-lg disabled:shadow-md ${isAnalyzing ? 'opacity-75 animate-pulse cursor-wait' : ''}`}
              >
                {isAnalyzing ? ( <span className="flex items-center justify-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-40"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-90"></path></svg> Analyzing... </span> ) : ( '✨ Analyze Transition (AI)' )}
              </button>
               {!API_KEY && model !== null && <p className="text-xs text-orange-400 mt-2">AI Analysis unavailable: API Key configuration error.</p>}
               {model === null && <p className="text-xs text-orange-400 mt-2">AI Analysis unavailable: API Key missing or invalid setup.</p>}
            </div>
          </section>

          {/* --- Results Section --- */}
          {/* Loading Spinner */}
           {isAnalyzing && ( <div className="mt-8 flex justify-center items-center p-10"><svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-40"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-90"></path></svg><p className="ml-4 text-lg text-gray-300">Generating AI Analysis...</p></div> )}
          {/* Error Display */}
           {analysisError && !isAnalyzing && ( <div className="mt-8 p-5 bg-red-900/60 border border-red-500/50 text-red-200 rounded-lg animate-fade-in shadow-md backdrop-blur-sm"><h3 className="font-semibold mb-2 flex items-center text-red-100"><svg className="w-5 h-5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>Analysis Error</h3><p className="text-sm">{analysisError}</p><p className="text-xs mt-2 opacity-80">Check the browser console for the raw AI response which might help diagnose the issue.</p></div> )}
          {/* Success Results Display */}
          {analysisResult && !isAnalyzing && !analysisError && (
            <section className="mt-8 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-5 border-b border-white/15 pb-3">AI-Generated Transition Analysis</h2>
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 {/* Time Card */}
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-lg"> <h3 className="font-semibold text-blue-400 mb-2 flex items-center text-sm"><svg className="w-4 h-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Est. Transition Time </h3> <p className="text-white text-base font-medium">{analysisResult.time || "N/A"}</p> </div>
                 {/* Strengths Card */}
                 <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-lg"> <h3 className="font-semibold text-green-400 mb-2 flex items-center text-sm"><svg className="w-4 h-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg> Potential Strengths </h3> <ul className="list-disc list-inside text-gray-300 text-xs space-y-1 pl-2">{(analysisResult.strengths || []).map((item, i) => <li key={`str-${i}`}>{item}</li>)} {!(analysisResult.strengths?.length > 0) && <li className="italic text-gray-500">None specified</li>} </ul> </div>
                 {/* Weaknesses Card */}
                 <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-lg"> <h3 className="font-semibold text-red-400 mb-2 flex items-center text-sm"><svg className="w-4 h-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg> Potential Weaknesses / Gaps </h3> <ul className="list-disc list-inside text-gray-300 text-xs space-y-1 pl-2">{(analysisResult.weaknesses || []).map((item, i) => <li key={`weak-${i}`}>{item}</li>)} {!(analysisResult.weaknesses?.length > 0) && <li className="italic text-gray-500">None specified</li>} </ul> </div>
                 {/* Benefits Card */}
                 <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-lg"> <h3 className="font-semibold text-purple-400 mb-2 flex items-center text-sm"><svg className="w-4 h-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.518a.562.562 0 01.329 1.004l-4.056 2.948a.563.563 0 00-.182.557l1.528 4.702a.562.562 0 01-.828.614l-4.396-2.28a.563.563 0 00-.62 0l-4.396 2.28a.562.562 0 01-.828-.614l1.528-4.702a.563.563 0 00-.182-.557l-4.056-2.948a.562.562 0 01.329-1.004h5.518a.563.563 0 00.475-.31l2.125-5.11z" /></svg> Potential Benefits </h3> <ul className="list-disc list-inside text-gray-300 text-xs space-y-1 pl-2">{(analysisResult.benefits || []).map((item, i) => <li key={`ben-${i}`}>{item}</li>)} {!(analysisResult.benefits?.length > 0) && <li className="italic text-gray-500">None specified</li>} </ul> </div>
                 {/* Disadvantages Card */}
                 <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/15 shadow-lg md:col-span-2"> <h3 className="font-semibold text-yellow-400 mb-2 flex items-center text-sm"><svg className="w-4 h-4 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg> Potential Disadvantages / Considerations </h3> <ul className="list-disc list-inside text-gray-300 text-xs space-y-1 pl-2">{(analysisResult.disadvantages || []).map((item, i) => <li key={`dis-${i}`}>{item}</li>)} {!(analysisResult.disadvantages?.length > 0) && <li className="italic text-gray-500">None specified</li>} </ul> </div>
              </div>
            </section>
          )}
       </main>

        {/* Footer */}
       <footer className="w-full max-w-7xl mx-auto mt-12 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} Day in a Life Admin Tools
       </footer>
    </div>
  );
}