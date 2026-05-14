import React from 'react';
import { motion } from 'framer-motion';

export default function CountryProfile() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Ghana</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Country Profile</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Highlights */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gray-50 border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Country Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-16 bg-red-600 relative flex">
                  <div className="flex-1 bg-yellow-400 border-b-4 border-green-600"></div>
                  <div className="flex-1 bg-red-600 border-b-4 border-green-600"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Capital:</strong> Accra</li>
                <li><strong>Independence:</strong> 6th March 1957</li>
                <li><strong>Population:</strong> ~33.5 million</li>
                <li><strong>Area:</strong> 238,535 sq km</li>
                <li><strong>Languages:</strong> English (official), Twi, Fante, Ga, others</li>
                <li><strong>Religion:</strong> Christianity, Islam, Traditional Beliefs</li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Currency:</strong> Ghana Cedi (GHS)</li>
                <li><strong>Time Zone:</strong> GMT (UTC +0)</li>
                <li><strong>Borders:</strong> Côte d'Ivoire, Burkina Faso, Togo, Benin, Atlantic Ocean</li>
                <li><strong>Government:</strong> Presidential Republic</li>
                <li><strong>Democracy Index:</strong> Ranked among Africa's strongest democracies</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Historical Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Historical Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Republic of Ghana is located on the Gulf of Guinea in West Africa. The country has been a beacon of democracy, stability, and development in Africa since independence in 1957. Ghana was the first sub-Saharan African nation to gain independence, and this momentous occasion inspired a wave of independence movements across the continent.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Under the leadership of Dr. Kwame Nkrumah, Ghana pursued an ambitious agenda of Pan-African solidarity and continental integration. The country has since established itself as a regional leader in the Economic Community of West African States (ECOWAS) and an active member of the African Union.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ghana's democratic institutions, including peaceful electoral transfers of power, have made it a model for democratic governance in Africa. The country is rich in natural resources, including gold, cocoa, and offshore petroleum reserves, making it an important player in global trade and investment. Ghana's strategic location, cultural diversity, and historical significance continue to make it a vital partner in regional and international affairs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}