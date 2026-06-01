'use client';

import React, { useState } from 'react';
import { useCMS, EventItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyEvent: Omit<EventItem, 'id'> = {
  title: '',
  date: '',
  location: '',
  description: '',
  image: '',
  status: 'upcoming',
  attendees: 0,
};

const statusColors: Record<string, string> = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
};

export default function CMSEventsPage() {
  const { events, addEvent, updateEvent, removeEvent } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<EventItem, 'id'>>(emptyEvent);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyEvent);
    setDialogOpen(true);
  };

  const openEdit = (event: EventItem) => {
    setEditingId(event.id);
    setForm({ title: event.title, date: event.date, location: event.location, description: event.description, image: event.image, status: event.status, attendees: event.attendees });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateEvent(editingId, form);
    } else {
      addEvent(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyEvent);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Events</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v: 'upcoming' | 'ongoing' | 'completed') => setForm((f) => ({ ...f, status: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Attendees</Label>
                  <Input type="number" value={form.attendees} onChange={(e) => setForm((f) => ({ ...f, attendees: parseInt(e.target.value) || 0 }))} />
                </div>
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
        <CardHeader><CardTitle className="text-lg">All Events ({events.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {events.length === 0 && (
            <p className="text-center text-gray-400 py-8">No events yet. Click &quot;Add Event&quot; to create one.</p>
          )}
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              {event.image && (
                <img src={event.image} alt={event.title} className="w-20 h-14 object-cover rounded flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#333] text-sm truncate">{event.title}</h3>
                  <Badge className={statusColors[event.status]}>{event.status}</Badge>
                </div>
                <p className="text-xs text-gray-500">{event.date} &bull; {event.location}</p>
                {event.attendees > 0 && <p className="text-xs text-gray-400">{event.attendees} attendees</p>}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(event)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeEvent(event.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
