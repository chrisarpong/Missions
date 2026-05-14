import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Trash2, Edit2, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import TaskModal from '@/components/crm/TaskModal';

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES = ['To Do', 'In Progress', 'Done', 'Cancelled'];

const statusIcons = {
  'To Do': <Clock className="w-4 h-4" />,
  'In Progress': <AlertCircle className="w-4 h-4" />,
  'Done': <CheckCircle2 className="w-4 h-4" />,
  'Cancelled': <Clock className="w-4 h-4" />,
};

const statusColors = {
  'To Do': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Done': 'bg-green-100 text-green-700',
  'Cancelled': 'bg-red-100 text-red-700',
};

export default function CRMTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatus] = useState('All');
  const [priorityFilter, setPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.DiploTask.list('-due_date').then(setTasks).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        await base44.entities.DiploTask.update(editing.id, data);
        setTasks(tasks.map(t => t.id === editing.id ? { ...t, ...data } : t));
      } else {
        const created = await base44.entities.DiploTask.create(data);
        setTasks([created, ...tasks]);
      }
      setShowModal(false);
      setEditing(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await base44.entities.DiploTask.delete(id);
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const filtered = tasks.filter(t => {
    const searchMatch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const statMatch = statusFilter === 'All' || t.status === statusFilter;
    const prioMatch = priorityFilter === 'All' || t.priority === priorityFilter;
    return searchMatch && statMatch && prioMatch;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]" />
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <select value={statusFilter} onChange={e => setStatus(e.target.value)} className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white">
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={priorityFilter} onChange={e => setPriority(e.target.value)} className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white">
          <option value="All">All Priorities</option>
          {PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Task</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Priority</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Due Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Assigned To</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(task => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-medium text-gray-900">{task.title}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded inline-flex items-center gap-1 ${statusColors[task.status]}`}>{statusIcons[task.status]} {task.status}</span></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${task.priority === 'Urgent' ? 'bg-red-100 text-red-700' : task.priority === 'High' ? 'bg-orange-100 text-orange-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                      {task.due_date ? (
                        <>
                          <Calendar className="w-3.5 h-3.5 text-gray-400" /> {task.due_date}
                        </>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{task.assigned_to || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditing(task); setShowModal(true); }} className="text-blue-600 hover:text-blue-700 mr-3"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No tasks found</div>
        )}
      </div>

      {showModal && <TaskModal task={editing} onSave={handleSave} onClose={() => { setShowModal(false); setEditing(null); }} />}
    </div>
  );
}