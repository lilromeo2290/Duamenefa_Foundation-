'use client';

import React, { useState } from 'react';
import { useCMS, ProgramItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LayoutGrid, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyProgram: Omit<ProgramItem, 'id'> = {
  title: '',
  description: '',
  image: '',
  icon: 'heart',
  details: '',
};

export default function CMSProgramsPage() {
  const { programs, addProgram, updateProgram, removeProgram } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ProgramItem, 'id'>>(emptyProgram);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyProgram);
    setDialogOpen(true);
  };

  const openEdit = (program: ProgramItem) => {
    setEditingId(program.id);
    setForm({ title: program.title, description: program.description, image: program.image, icon: program.icon, details: program.details });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateProgram(editingId, form);
    } else {
      addProgram(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyProgram);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Programs</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Program' : 'Add New Program'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <Label>Details</Label>
                <Textarea rows={4} value={form.details} onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Icon Name</Label>
                  <Input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="e.g. heart" />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
                </div>
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

      <Card>
        <CardHeader><CardTitle className="text-lg">All Programs ({programs.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {programs.length === 0 && (
            <p className="text-center text-gray-400 py-8">No programs yet. Click &quot;Add Program&quot; to create one.</p>
          )}
          {programs.map((program) => (
            <div key={program.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              {program.image && (
                <img src={program.image} alt={program.title} className="w-20 h-14 object-cover rounded flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#333] text-sm truncate">{program.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{program.description}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(program)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeProgram(program.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
