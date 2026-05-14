import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sections = [
  { name: 'Overview', id: 'overview' },
  { name: 'Information Manual', id: 'manual' },
  { name: 'Application', id: 'application' },
  { name: 'Exemptions', id: 'exemptions' },
  { name: 'Archives', id: 'archives' }
];

export default function RightToInformation() {
  const [active, setActive] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Services</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Right to Information</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1">
            <div className="bg-white border border-gray-200 overflow-hidden sticky top-20">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-sm">Browse Sections</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {sections.map(s => (
                  <button key={s.id} onClick={() => setActive(s.id)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      active === s.id
                        ? 'bg-[#051A53] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                    {s.name}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200 p-4 space-y-2">
                <button className="w-full text-left text-xs font-medium text-[#051A53] hover:underline">Download Manual</button>
                <button className="w-full text-left text-xs font-medium text-[#051A53] hover:underline">Download Request Form</button>
                <button className="w-full text-left text-xs font-medium text-[#051A53] hover:underline">Contact RTI Unit</button>
              </div>
            </div>

            {/* Quick Facts */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-6 bg-gray-50 border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-base mb-4">RTI Unit</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Ministry Contact Point</strong> for all Right to Information requests and inquiries.
              </p>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="lg:col-span-3">
            {active === 'overview' && (
              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Right to Information Act, 2019 (Act 989)</h2>
                <p className="text-sm text-gray-700 mb-4 font-medium italic">
                  "All persons shall have the right to information, subject to such qualifications and laws as are necessary in a democratic society."
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Article 21 (1) (f) of the Constitution of Ghana provides this fundamental right. The Right to Information Act, 2019 (Act 989) was passed by Parliament and assented to in 2019 to give effect to the constitutional right to information held by public institutions in Ghana.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  The Ministry recognizes the RTI law as an essential framework for transparency and accountability in public administration.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  In line with this mandate, the Ministry has established a Right to Information (RTI) Unit operated by an Information Officer.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Access to information is subject to lawful exemptions under the Act to protect relevant public interests.
                </p>
              </div>
            )}

            {active === 'manual' && (
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Manual</h2>
                <p className="text-gray-700 mb-4">The Ministry's Information Manual outlines the types of documents held, the procedures for requesting information, and the exemptions that apply under the Right to Information Act, 2019.</p>
                <button className="px-6 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">Download Manual (PDF)</button>
              </div>
            )}

            {active === 'application' && (
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Submit a Request</h2>
                <p className="text-gray-700 mb-4">To request information from the Ministry, complete the Right to Information Request Form and submit it to the RTI Unit. Requests are processed within 14 working days in accordance with the Act.</p>
                <button className="px-6 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">Download Request Form</button>
              </div>
            )}

            {active === 'exemptions' && (
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Exemptions Under the RTI Act</h2>
                <p className="text-gray-700 mb-4">Certain categories of information are exempt from disclosure under the Right to Information Act, 2019, including:</p>
                <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside">
                  <li>Information affecting national security</li>
                  <li>Personal information of individuals</li>
                  <li>Legal professional privilege</li>
                  <li>Commercial confidential information</li>
                </ul>
              </div>
            )}

            {active === 'archives' && (
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Public Archives</h2>
                <p className="text-gray-700">The Ministry maintains archives of official documents, press releases, and ministerial statements that are publicly accessible.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}