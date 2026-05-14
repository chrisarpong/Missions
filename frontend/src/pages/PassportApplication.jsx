import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

const FAQCategories = [
  {
    title: 'General Information',
    items: [
      { q: 'What is a passport?', a: 'A passport is an official travel document issued by the government of a country to certify the identity and nationality of its citizens.' },
      { q: 'Who is eligible to apply for a Ghanaian passport?', a: 'Any Ghanaian citizen, whether residing in Ghana or abroad, is eligible to apply for a Ghanaian passport.' },
    ]
  },
  {
    title: 'What Documents Are Available?',
    items: [
      { q: 'What types of passports are available?', a: 'Ghana issues the following types of passports: Ordinary Passports (valid for 5 and 10 years), Official Passports for government officials, and Diplomatic Passports for diplomats.' },
      { q: 'What is the validity period of a Ghanaian passport?', a: 'Ordinary passports are issued with a validity period of 5 years for minors and 10 years for adults.' },
    ]
  },
  {
    title: 'Document Requirements',
    items: [
      { q: 'What documents do I need to submit?', a: 'You will need: Birth Certificate (original and 2 copies), National ID Card, Tax Identification Number (TIN), completed passport application form, and 4 passport-sized photographs.' },
      { q: 'Can I present my documents myself?', a: 'Yes, you may present your documents in person at any passport office or through an authorized agent.' },
    ]
  },
  {
    title: 'Eligibility Requirements',
    items: [
      { q: 'What are the citizenship requirements?', a: 'Applicants must be Ghanaian citizens by birth, descent, naturalization, or marriage. Proof of citizenship is required.' },
      { q: 'Are there age restrictions?', a: 'Minors under 18 require parental/guardian consent and must appear in person with their parents or guardians.' },
    ]
  },
  {
    title: 'Application Process, Examination & Procedures',
    items: [
      { q: 'How do I apply for a passport?', a: 'Visit the nearest passport office, complete the application form with accurate information, submit required documents, and pay the applicable fee.' },
      { q: 'Where can I obtain a passport application form?', a: 'Application forms are available at all passport offices, regional immigration offices, and online through the Ministry website.' },
      { q: 'Do I need to undergo medical examination?', a: 'Medical examination may be required for certain cases, as determined by the Immigration Service.' },
    ]
  },
  {
    title: 'Document Submission Process',
    items: [
      { q: 'Can I submit my documents by mail?', a: 'Postal submission is accepted. Send your documents to the Immigration Service headquarters with a self-addressed envelope and return postage.' },
    ]
  },
  {
    title: 'Cost and Payment Notices',
    items: [
      { q: 'What is the cost of a passport?', a: 'Passport fees vary based on the type and validity period. Please visit a passport office or the ministry website for current fee schedules.' },
      { q: 'What payment methods are accepted?', a: 'Payment can be made in cash or by bank transfer at authorized payment centers.' },
    ]
  },
  {
    title: 'General Validity',
    items: [
      { q: 'How long is a passport valid?', a: 'Standard passports are valid for 5 years (minors) or 10 years (adults) from the date of issue.' },
      { q: 'Can I renew my passport early?', a: 'Passport renewal can be applied for once the passport is within 6 months of expiration.' },
    ]
  },
  {
    title: 'Guarantee for Sponsor Eligibility',
    items: [
      { q: 'Do I need a sponsor?', a: 'For certain applications, a sponsor or guarantor may be required. The sponsor must be a Ghanaian citizen with a valid passport.' },
    ]
  },
  {
    title: 'Deportation Notice',
    items: [
      { q: 'Can a passport be cancelled due to deportation?', a: 'Yes, the Immigration Service may cancel or revoke a passport if an individual has been deported or is subject to deportation.' },
    ]
  },
  {
    title: 'Special Cases',
    items: [
      { q: 'How long will it take to process my application?', a: 'Standard processing time is 10–15 working days. Expedited processing may be available for an additional fee.' },
      { q: 'Can I track my application status?', a: 'Yes, you can track your application status using your application reference number at the passport office or through the ministry website.' },
    ]
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left py-4 px-5 hover:bg-gray-50 transition-colors flex items-center justify-between group">
        <span className="text-sm font-medium text-gray-700 group-hover:text-[#051A53]">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function PassportApplication() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80')`, backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-[#051A53]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Passport Application</h1>
            <p className="text-white/70 max-w-2xl text-lg">Your complete guide to obtaining and managing a Ghanaian passport for travel and identification purposes.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info + Quick Facts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="bg-gray-50 border border-gray-200 p-8">
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide mb-2">Passport Services</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Your Travel Document</h2>
              <p className="text-gray-700 leading-relaxed">
                A passport is an essential travel document issued by the Ministry of Foreign Affairs that certifies your identity and citizenship. Whether you're traveling for business, leisure, or official purposes, our Passport Services unit is here to guide you through the application process with efficiency and professionalism.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <div className="bg-green-50 border-l-4 border-green-600 p-6">
              <p className="text-xs text-green-700 uppercase font-semibold tracking-wide mb-2">Quick Facts</p>
              <h3 className="text-lg font-bold text-green-900 mb-4">Start Your Passport Application</h3>
              <ul className="space-y-3 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                  <span>Processing time: 10–15 working days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                  <span>Validity: 5 years (minors) / 10 years (adults)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                  <span>Available online booking & expedited options</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ Sections */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common passport application questions below</p>
          </div>

          <div className="space-y-6">
            {FAQCategories.map((cat, i) => (
              <motion.div key={cat.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-lg">{cat.title}</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {cat.items.map((item, idx) => (
                    <FAQItem key={idx} q={item.q} a={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Visit your nearest passport office or apply online through our secure portal.
          </p>
          <button className="px-8 py-3 bg-[#051A53] text-white text-sm font-semibold hover:bg-[#051A53]/90 transition-colors inline-flex items-center gap-2">
            Start Application <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}