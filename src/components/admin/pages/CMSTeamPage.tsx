'use client';

import React, { useState } from 'react';
import { useCMS, TeamMember } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyMember: Omit<TeamMember, 'id'> = {
  name: '',
  role: '',
  category: 'executive',
  image: '',
  bio: '',
};

const categoryLabels: Record<string, string> = {
  executive: 'Executive',
  associate: 'Associate',
  reporter: 'Reporter',
};

export default function CMSTeamPage() {
  const { team, addTeamMember, updateTeamMember, removeTeamMember } = useCMS();
  const [filter, setFilter] = useState<'all' | 'executive' | 'associate' | 'reporter'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<TeamMember, 'id'>>(emptyMember);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = filter === 'all' ? team : team.filter((m) => m.category === filter);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyMember, category: filter === 'all' ? 'executive' : filter });
    setDialogOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({ name: member.name, role: member.role, category: member.category, image: member.image, bio: member.bio });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateTeamMember(editingId, form);
    } else {
      addTeamMember(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyMember);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Team Members</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v: 'executive' | 'associate' | 'reporter') => setForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="associate">Associate</SelectItem>
                    <SelectItem value="reporter">Reporter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea rows={3} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} className="bg-[#C62828] hover:bg-[#8E0000]">
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(['all', 'executive', 'associate', 'reporter'] as const).map((cat) => (
          <Button key={cat} variant={filter === cat ? 'default' : 'outline'} size="sm"
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'bg-[#C62828] hover:bg-[#8E0000]' : ''}
          >
            {cat === 'all' ? 'All' : categoryLabels[cat]} ({cat === 'all' ? team.length : team.filter((m) => m.category === cat).length})
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Team Members ({filtered.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-8">No team members in this category.</p>
          )}
          {filtered.map((member) => (
            <div key={member.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-12 h-12 object-cover rounded-full flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-[#333] text-sm truncate">{member.name}</h3>
                  <Badge variant="secondary" className="text-[10px]">{categoryLabels[member.category]}</Badge>
                </div>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(member)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeTeamMember(member.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
