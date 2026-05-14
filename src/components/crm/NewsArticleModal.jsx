import React, { useState } from 'react';
import { X } from 'lucide-react';
import ReactQuill from 'react-quill';

const CATEGORIES = ['Press Release', 'Statement', 'News', 'Speech', 'Media Advisory', 'Communiqué'];
const STATUSES = ['Draft', 'Published', 'Archived'];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

export default function NewsArticleModal({ article, onSave, onClose }) {
  const [form, setForm] = useState(article || {
    title: '', slug: '', category: 'News', summary: '', body: '',
    image_url: '', author: '', published_date: '', status: 'Draft', featured: false, tags: [],
    seo_title: '', seo_description: '', seo_og_image: ''
  });
  const [activeTab, setActiveTab] = useState('content');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-gray-800">{article ? 'Edit Article' : 'New Article'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-700" /></button>
        </div>
        <div className="flex border-b border-gray-200 bg-gray-50 sticky top-[60px] z-9">
          <button onClick={() => setActiveTab('content')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-[#051A53] text-[#051A53]' : 'border-transparent text-gray-600 hover:text-gray-800'}`}>
            Content
          </button>
          <button onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'seo' ? 'border-[#051A53] text-[#051A53]' : 'border-transparent text-gray-600 hover:text-gray-800'}`}>
            SEO Settings
          </button>
        </div>
        <div className="p-6 space-y-4">
          {activeTab === 'content' && (
            <>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Title *</label>
                <input value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Article title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Published Date</label>
                  <input type="date" value={form.published_date} onChange={e => set('published_date', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Author</label>
                  <input value={form.author} onChange={e => set('author', e.target.value)}
                    className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Author name" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Image URL</label>
                <input value={form.image_url} onChange={e => set('image_url', e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Summary</label>
                <textarea value={form.summary} onChange={e => set('summary', e.target.value)} rows={2}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" placeholder="Short summary for listings..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Full Body</label>
                <div className="border border-gray-200 focus-within:border-[#051A53] overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={form.body}
                    onChange={v => set('body', v)}
                    modules={quillModules}
                    placeholder="Full article content..."
                    style={{ height: '300px' }}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4" />
                <span className="text-sm text-gray-700">Featured article (shown prominently)</span>
              </label>
              <style>{`
                .ql-container { font-size: 14px; }
                .ql-editor { min-height: 250px; }
              `}</style>
            </>
          )}

          {activeTab === 'seo' && (
            <>
              <div className="bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                Optimize your article for search engines and social media sharing.
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Meta Title</label>
                <input value={form.seo_title} onChange={e => set('seo_title', e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" 
                  placeholder="Defaults to article title if empty" maxLength={60} />
                <p className="text-xs text-gray-400 mt-1">{form.seo_title.length}/60 characters</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Meta Description</label>
                <textarea value={form.seo_description} onChange={e => set('seo_description', e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" rows={3}
                  placeholder="Defaults to article summary if empty" maxLength={160} />
                <p className="text-xs text-gray-400 mt-1">{form.seo_description.length}/160 characters</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Open Graph Image URL</label>
                <input value={form.seo_og_image} onChange={e => set('seo_og_image', e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" 
                  placeholder="Defaults to article image if empty" />
                <p className="text-xs text-gray-400 mt-1">Used when sharing on social media</p>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 text-xs text-gray-600 space-y-2">
                <p className="font-semibold">Preview:</p>
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-blue-600 font-semibold text-xs">{form.seo_title || form.title}</p>
                  <p className="text-green-700 text-xs">mfa.gov.gh › article</p>
                  <p className="text-gray-600 text-xs">{form.seo_description || form.summary}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 text-sm bg-[#051A53] text-white hover:bg-[#051A53]/90">
            {article ? 'Save Changes' : 'Create Article'}
          </button>
        </div>
      </div>
    </div>
  );
}