'use client';

import React, { useState } from 'react';
import { useCMS, CauseItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Plus, Pencil, Trash2 } from 'lucide-react';

const iconOptions = [
  { value: 'heart', label: 'Heart (Peace)' },
  { value: 'shield', label: 'Shield (Protection)' },
  { value: 'unlock', label: 'Unlock (Liberation)' },
  { value: 'graduation', label: 'Graduation (Education)' },
];

const colorOptions = [
  { value: 'bg-[#0B3C5D]', label: 'Navy Blue' },
  { value: 'bg-[#6B4F3A]', label: 'Brown' },
  { value: 'bg-[#4C9A2A]', label: 'Green' },
  { value: 'bg-[#D4AF37]', label: 'Gold' },
  { value: 'bg-[#C62828]', label: 'Red' },
  { value: 'bg-[#5B21B6]', label: 'Purple' },
];

const emptyCause: Omit<CauseItem, 'id'> = {
  icon: 'heart',
  title: '',
  description: '',
  image: '',
  color: 'bg-[#0B3C5D]',
};

export default function CMSCausesPage() {
  const { causes, addCause, updateCause, removeCause } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<CauseItem, 'id'>>(emptyCause);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyCause);
    setDialogOpen(true);
  };

  const openEdit = (cause: CauseItem) => {
    setEditingId(cause.id);
    setForm({ icon: cause.icon, title: cause.title, description: cause.description, image: cause.image, color: cause.color });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateCause(editingId, form);
    } else {
      addCause(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyCause);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Causes</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Cause
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Cause' : 'Add New Cause'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Icon</Label>
                  <Select value={form.icon} onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Color</Label>
                  <Select value={form.color} onValueChange={(v) => setForm((f) => ({ ...f, color: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
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
        <CardHeader><CardTitle className="text-lg">All Causes ({causes.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {causes.length === 0 && (
            <p className="text-center text-gray-400 py-8">No causes yet. Click &quot;Add Cause&quot; to create one.</p>
          )}
          {causes.map((cause) => (
            <div key={cause.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              {cause.image && (
                <img src={cause.image} alt={cause.title} className="w-16 h-12 object-cover rounded flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${cause.color} text-white p-1 rounded`}>
                    <Heart className="h-3 w-3" />
                  </div>
                  <h3 className="font-semibold text-[#333] truncate">{cause.title}</h3>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{cause.description}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(cause)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeCause(cause.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
