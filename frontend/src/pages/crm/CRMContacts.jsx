import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Trash2, Edit2, Mail, Phone } from 'lucide-react';
import ContactModal from '@/components/crm/ContactModal';

const CATEGORIES = ['Ambassador', 'Diplomat', 'Government Official', 'NGO / IO', 'Business', 'Media', 'Academic', 'Other'];
const STATUSES = ['Active', 'Inactive', 'VIP', 'Pending'];

export default function CRMContacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategory] = useState('All');
  const [statusFilter, setStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Contact.list().then(setContacts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        await base44.entities.Contact.update(editing.id, data);
        setContacts(contacts.map(c => c.id === editing.id ? { ...c, ...data } : c));
      } else {
        const created = await base44.entities.Contact.create(data);
        setContacts([created, ...contacts]);
      }
      setShowModal(false);
      setEditing(null);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this contact?')) {
      await base44.entities.Contact.delete(id);
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const filtered = contacts.filter(c => {
    const searchMatch = !search || c.full_name.toLowerCase().includes(search.toLowerCase()) || c.organization?.toLowerCase().includes(search.toLowerCase());
    const catMatch = categoryFilter === 'All' || c.category === categoryFilter;
    const statMatch = statusFilter === 'All' || c.status === statusFilter;
    return searchMatch && catMatch && statMatch;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]" />
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <select value={categoryFilter} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white">
          <option>All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatus(e.target.value)} className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white">
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Organization</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(contact => (
                  <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-medium text-gray-900">{contact.full_name}</span></td>
                    <td className="px-4 py-3 text-gray-600">{contact.organization || '—'}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{contact.category}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded ${contact.status === 'VIP' ? 'bg-purple-100 text-purple-700' : contact.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{contact.status}</span></td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {contact.email || contact.phone ? (
                        <div className="flex gap-2">
                          {contact.email && <a href={`mailto:${contact.email}`} className="text-[#051A53] hover:underline"><Mail className="w-3.5 h-3.5" /></a>}
                          {contact.phone && <a href={`tel:${contact.phone}`} className="text-[#051A53] hover:underline"><Phone className="w-3.5 h-3.5" /></a>}
                        </div>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditing(contact); setShowModal(true); }} className="text-blue-600 hover:text-blue-700 mr-3"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(contact.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No contacts found</div>
        )}
      </div>

      {showModal && <ContactModal contact={editing} onSave={handleSave} onClose={() => { setShowModal(false); setEditing(null); }} />}
    </div>
  );
}