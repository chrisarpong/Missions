import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Globe, ChevronRight } from 'lucide-react';

const MISSIONS_DATA = [
  // Africa
  { country: 'Addis Ababa', region: 'Africa', type: 'Embassy', address: 'Addis Ababa, Ethiopia', phone: '+251 11 371 2556', email: 'ghanaethiopia@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Algiers', region: 'Africa', type: 'Embassy', address: 'Algiers, Algeria', phone: '+213 21 69 18 50', email: 'ghanaalgeria@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Cairo', region: 'Africa', type: 'Embassy', address: 'Cairo, Egypt', phone: '+20 2 2728 9400', email: 'ghanacairo@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Dakar', region: 'Africa', type: 'Embassy', address: 'Dakar, Senegal', phone: '+221 33 822 8800', email: 'ghanasenegal@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Harare', region: 'Africa', type: 'Embassy', address: 'Harare, Zimbabwe', phone: '+263 4 708 561', email: 'ghanaharare@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Juba', region: 'Africa', type: 'Embassy', address: 'Juba, South Sudan', phone: '+211 920 111 111', email: 'ghanajuba@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Kinshasa', region: 'Africa', type: 'Embassy', address: 'Kinshasa, Democratic Republic of Congo', phone: '+243 81 111 1111', email: 'ghanakinshasa@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Lagos', region: 'Africa', type: 'High Commission', address: 'Lagos, Nigeria', phone: '+234 1 4613 4500', email: 'ghananigerialagos@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Lilongwe', region: 'Africa', type: 'High Commission', address: 'Lilongwe, Malawi', phone: '+265 1 753 433', email: 'ghanamalawi@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Lusaka', region: 'Africa', type: 'High Commission', address: 'Lusaka, Zambia', phone: '+260 211 252 122', email: 'ghanazambia@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Nairobi', region: 'Africa', type: 'High Commission', address: 'Nairobi, Kenya', phone: '+254 20 272 6801', email: 'ghanakeniya@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Port-au-Prince', region: 'Americas', type: 'Embassy', address: 'Port-au-Prince, Haiti', phone: '+509 2943 3650', email: 'ghanahaiti@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Pretoria', region: 'Africa', type: 'High Commission', address: 'Pretoria, South Africa', phone: '+27 12 342 6090', email: 'ghanasouthafrica@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Tirana', region: 'Europe', type: 'Embassy', address: 'Tirana, Albania', phone: '+355 4 247 0600', email: 'ghanaalbania@mfa.gov.gh', url: 'mfa.gov.gh' },
  
  // Europe
  { country: 'Berlin', region: 'Europe', type: 'Embassy', address: 'Berlin, Germany', phone: '+49 30 2062 9100', email: 'ghanaberlin@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Bern', region: 'Europe', type: 'Mission to UN', address: 'Bern, Switzerland', phone: '+41 31 352 7700', email: 'ghanabern@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Brno', region: 'Europe', type: 'Consulate General', address: 'Brno, Czech Republic', phone: '+420 2 2231 0000', email: 'ghanabrno@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Brussels', region: 'Europe', type: 'Embassy', address: 'Brussels, Belgium', phone: '+32 2 779 3900', email: 'ghanabrussels@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Budapest', region: 'Europe', type: 'Embassy', address: 'Budapest, Hungary', phone: '+36 1 469 3200', email: 'ghanabudapest@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Copenhagan', region: 'Europe', type: 'Embassy', address: 'Copenhagen, Denmark', phone: '+45 33 12 7700', email: 'ghanacopenhagen@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Geneva', region: 'Europe', type: 'Mission to UN', address: 'Geneva, Switzerland', phone: '+41 22 798 5900', email: 'ghanageneva@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'The Hague', region: 'Europe', type: 'Embassy', address: 'The Hague, Netherlands', phone: '+31 70 350 6400', email: 'ghanathehague@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Istanbul', region: 'Europe', type: 'Consulate General', address: 'Istanbul, Turkey', phone: '+90 212 275 3700', email: 'ghanaistanbul@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'London', region: 'Europe', type: 'High Commission', address: 'London, United Kingdom', phone: '+44 20 7201 5900', email: 'ghanalondon@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Madrid', region: 'Europe', type: 'Embassy', address: 'Madrid, Spain', phone: '+34 91 402 3050', email: 'ghanamadrid@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Milan', region: 'Europe', type: 'Consulate General', address: 'Milan, Italy', phone: '+39 02 7610 5500', email: 'ghanamilan@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Moscow', region: 'Europe', type: 'Embassy', address: 'Moscow, Russia', phone: '+7 495 737 0900', email: 'ghanamoscow@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Paris', region: 'Europe', type: 'Embassy', address: 'Paris, France', phone: '+33 1 4560 9888', email: 'ghanaparis@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Prague', region: 'Europe', type: 'Embassy', address: 'Prague, Czech Republic', phone: '+420 2 2231 0000', email: 'ghanaprague@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Rome', region: 'Europe', type: 'Embassy', address: 'Rome, Italy', phone: '+39 06 8440 2700', email: 'ghanarome@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Vienna', region: 'Europe', type: 'Embassy', address: 'Vienna, Austria', phone: '+43 1 214 4650', email: 'ghanavienna@mfa.gov.gh', url: 'mfa.gov.gh' },

  // Americas
  { country: 'Bogotá', region: 'Americas', type: 'Embassy', address: 'Bogotá, Colombia', phone: '+57 1 236 6300', email: 'ghanabogota@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Brasília', region: 'Americas', type: 'Embassy', address: 'Brasília, Brazil', phone: '+55 61 2101 9000', email: 'ghanabrasilia@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Caribbean', region: 'Americas', type: 'Regional Office', address: 'Port of Spain, Trinidad and Tobago', phone: '+1 868 622 2500', email: 'ghanacaribbean@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Mexico City', region: 'Americas', type: 'Embassy', address: 'Mexico City, Mexico', phone: '+52 55 5203 1030', email: 'ghanamexicacity@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'New York', region: 'Americas', type: 'Permanent Mission to UN', address: 'New York, USA', phone: '+1 212 287 5880', email: 'ghanaun@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Ottawa', region: 'Americas', type: 'High Commission', address: 'Ottawa, Canada', phone: '+1 613 236 0871', email: 'ghanacanada@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Washington D.C.', region: 'Americas', type: 'Embassy', address: 'Washington D.C., USA', phone: '+1 202 342 7100', email: 'ghanausa@mfa.gov.gh', url: 'mfa.gov.gh' },

  // Asia
  { country: 'Bangkok', region: 'Asia', type: 'Embassy', address: 'Bangkok, Thailand', phone: '+66 2 714 9000', email: 'ghanabangkok@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Beijing', region: 'Asia', type: 'Embassy', address: 'Beijing, China', phone: '+86 10 6532 6300', email: 'ghanabeiing@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Canberra', region: 'Asia', type: 'High Commission', address: 'Canberra, Australia', phone: '+61 2 6283 7000', email: 'ghanacanberra@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Colombo', region: 'Asia', type: 'High Commission', address: 'Colombo, Sri Lanka', phone: '+94 11 250 0000', email: 'ghanacolombo@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Delhi', region: 'Asia', type: 'High Commission', address: 'Delhi, India', phone: '+91 11 4300 8000', email: 'ghanadelhi@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Doha', region: 'Asia', type: 'Embassy', address: 'Doha, Qatar', phone: '+974 4448 5500', email: 'ghanadorha@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Dubai', region: 'Asia', type: 'Consulate General', address: 'Dubai, United Arab Emirates', phone: '+971 4 339 3000', email: 'ghanadubai@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Hong Kong', region: 'Asia', type: 'Consulate General', address: 'Hong Kong', phone: '+852 2802 0800', email: 'ghanahongkong@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Istanbul', region: 'Asia', type: 'Consulate General', address: 'Istanbul, Turkey', phone: '+90 212 275 3700', email: 'ghanaistanbul@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Islamabad', region: 'Asia', type: 'Embassy', address: 'Islamabad, Pakistan', phone: '+92 51 2827 7000', email: 'ghanaislamabad@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Jakarta', region: 'Asia', type: 'Embassy', address: 'Jakarta, Indonesia', phone: '+62 21 5228 1000', email: 'ghanajakarta@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Kuala Lumpur', region: 'Asia', type: 'High Commission', address: 'Kuala Lumpur, Malaysia', phone: '+60 3 2164 0000', email: 'ghanakualalumpur@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Riyadh', region: 'Asia', type: 'Embassy', address: 'Riyadh, Saudi Arabia', phone: '+966 11 488 1000', email: 'ghanariyadh@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Seoul', region: 'Asia', type: 'Embassy', address: 'Seoul, South Korea', phone: '+82 2 720 8000', email: 'ghanaSeoul@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Shanghai', region: 'Asia', type: 'Consulate General', address: 'Shanghai, China', phone: '+86 21 5888 0000', email: 'ghanashanghai@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Singapore', region: 'Asia', type: 'High Commission', address: 'Singapore', phone: '+65 6836 5300', email: 'ghanasingapore@mfa.gov.gh', url: 'mfa.gov.gh' },
  { country: 'Tokyo', region: 'Asia', type: 'Embassy', address: 'Tokyo, Japan', phone: '+81 3 5791 3600', email: 'ghanatokyo@mfa.gov.gh', url: 'mfa.gov.gh' },
];

function MissionCard({ mission }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-gray-200 bg-white hover:shadow-md transition-shadow"
    >
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{mission.country}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded mt-1.5 inline-block ${
              mission.type === 'Embassy' ? 'bg-blue-100 text-blue-700' :
              mission.type === 'High Commission' ? 'bg-purple-100 text-purple-700' :
              mission.type.includes('Consulate') ? 'bg-green-100 text-green-700' :
              mission.type.includes('Mission') ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-gray-700'
            }`}>{mission.type}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="p-5 space-y-3 text-sm">
        <div className="flex gap-2 text-gray-600">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
          <span>{mission.address}</span>
        </div>
        <div className="flex gap-2 text-gray-600">
          <Phone className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
          <a href={`tel:${mission.phone}`} className="hover:text-[#051A53] transition-colors">{mission.phone}</a>
        </div>
        <div className="flex gap-2 text-gray-600">
          <Mail className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
          <a href={`mailto:${mission.email}`} className="hover:text-[#051A53] transition-colors text-xs break-all">{mission.email}</a>
        </div>
        <div className="flex gap-2 text-gray-600">
          <Globe className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
          <a href={`https://${mission.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#051A53] transition-colors">{mission.url}</a>
        </div>
      </div>
    </motion.div>
  );
}

export default function MissionsAbroad() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'Africa', 'Europe', 'Americas', 'Asia'];
  
  const filtered = useMemo(() => {
    return MISSIONS_DATA.filter(m => {
      const searchMatch = !search || 
        m.country.toLowerCase().includes(search.toLowerCase()) ||
        m.address.toLowerCase().includes(search.toLowerCase());
      const regionMatch = selectedRegion === 'All' || m.region === selectedRegion;
      return searchMatch && regionMatch;
    });
  }, [search, selectedRegion]);

  const grouped = regions.reduce((acc, region) => {
    if (region === 'All') return acc;
    acc[region] = filtered.filter(m => m.region === region);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Global Network</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Ghana Missions Abroad</h1>
            <p className="text-white/70 max-w-2xl text-lg">Find contact information for Ghana's embassies, high commissions, and consulates worldwide.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by country or city..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`shrink-0 px-5 py-2.5 text-sm font-medium transition-all ${
                  selectedRegion === r
                    ? 'bg-[#051A53] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        {selectedRegion === 'All' ? (
          <div className="space-y-14">
            {regions.slice(1).map(region => (
              <div key={region}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#051A53]">{region}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped[region]?.map((m, i) => (
                    <MissionCard key={i} mission={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m, i) => (
              <MissionCard key={i} mission={m} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No missions found matching your search.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> For the most current contact information, embassy hours, or to schedule appointments, please visit the main Ministry of Foreign Affairs website or contact the specific mission directly.
          </p>
        </div>
      </div>
    </div>
  );
}