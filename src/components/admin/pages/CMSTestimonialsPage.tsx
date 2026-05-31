'use client';

import React, { useState } from 'react';
import { useCMS, TestimonialItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyTestimonial: Omit<TestimonialItem, 'id'> = {
  quote: '',
  name: '',
  role: '',
  initials: '',
  avatar: '',
};

export default function CMSTestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, removeTestimonial } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<TestimonialItem, 'id'>>(emptyTestimonial);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyTestimonial);
    setDialogOpen(true);
  };

  const openEdit = (item: TestimonialItem) => {
    setEditingId(item.id);
    setForm({ quote: item.quote, name: item.name, role: item.role, initials: item.initials, avatar: item.avatar });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateTestimonial(editingId, form);
    } else {
      addTestimonial(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyTestimonial);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Testimonials</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Quote</Label>
                <Textarea rows={4} value={form.quote} onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))} />
              </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Initials</Label>
                  <Input value={form.initials} onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value }))} maxLength={3} />
                </div>
                <div>
                  <Label>Avatar URL</Label>
                  <Input value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} placeholder="Optional" />
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
        <CardHeader><CardTitle className="text-lg">All Testimonials ({testimonials.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {testimonials.length === 0 && (
            <p className="text-center text-gray-400 py-8">No testimonials yet.</p>
          )}
          {testimonials.map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 italic line-clamp-3 mb-1">&ldquo;{item.quote}&rdquo;</p>
                <p className="font-semibold text-[#333] text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.role}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeTestimonial(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
