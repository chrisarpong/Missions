import React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Leadership() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageHeader 
        title="High Commissioner" 
        subtitle="Leadership of the Ghana High Commission, Ottawa" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          
          {/* Profile Image & Contact Column */}
          <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 p-8 flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md mb-6">
              <div className="w-full h-full bg-[#051A53]/10 flex items-center justify-center">
                <span className="text-4xl font-serif text-[#051A53]">DE</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1 font-serif">H.E. Prof. Dora Francisca Edu-Buandoh</h2>
            <p className="text-[#C19853] font-medium text-sm tracking-wide uppercase mb-6">High Commissioner of Ghana to Canada</p>
            
            <div className="w-full space-y-4 text-left mt-4 border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 text-[#051A53] shrink-0" />
                <span>1 Clemow Avenue<br/>Ottawa, Ontario K1S 2B2<br/>Canada</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#051A53] shrink-0" />
                <span>+1 (613) 236-0871</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-[#051A53] shrink-0" />
                <a href="mailto:ottawa@mfa.gov.gh" className="hover:text-[#051A53] transition-colors">ottawa@mfa.gov.gh</a>
              </div>
            </div>
          </div>

          {/* Biography Column */}
          <div className="w-full md:w-2/3 p-8 md:p-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif border-b border-gray-100 pb-4">Biography</h3>
            
            <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
              <p>
                Her Excellency Prof. Dora Francisca Edu-Buandoh is the High Commissioner of the Republic of Ghana to Canada. 
                Prior to her appointment, she served with distinction in academia and various leadership roles, bringing a 
                wealth of experience in educational administration, diplomacy, and international relations.
              </p>
              <p>
                Prof. Edu-Buandoh holds a PhD from the University of Iowa (USA), an MPhil and BA from the University of Cape Coast (Ghana), 
                and a Certificate in Teaching English to Speakers of Other Languages (TESOL) from the University of Wisconsin.
              </p>
              <p>
                Before assuming her role as High Commissioner, she was the Pro Vice-Chancellor of the University of Cape Coast, 
                where she championed numerous academic and administrative reforms. Her leadership is characterized by a strong 
                commitment to excellence, cultural diplomacy, and the empowerment of the Ghanaian diaspora.
              </p>
              <p>
                As High Commissioner, H.E. Prof. Edu-Buandoh is dedicated to strengthening the bilateral relations between 
                Ghana and Canada, promoting trade and investment, and ensuring the welfare of Ghanaians living in Canada.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}