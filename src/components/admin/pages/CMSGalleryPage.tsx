'use client';

import React, { useState } from 'react';
import { useCMS, GalleryItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyImage: Omit<GalleryItem, 'id'> = {
  src: '',
  caption: '',
};

export default function CMSGalleryPage() {
  const { gallery, addGalleryImage, updateGalleryImage, removeGalleryImage } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>(emptyImage);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyImage);
    setDialogOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({ src: item.src, caption: item.caption });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateGalleryImage(editingId, form);
    } else {
      addGalleryImage(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyImage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Gallery</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Image' : 'Add New Image'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Image URL</Label>
                <Input value={form.src} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} placeholder="/image.jpg" />
              </div>
              <div>
                <Label>Caption</Label>
                <Input value={form.caption} onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))} />
              </div>
              {form.src && (
                <div>
                  <Label>Preview</Label>
                  <img src={form.src} alt={form.caption} className="w-full h-40 object-cover rounded-lg mt-1" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
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
        <CardHeader><CardTitle className="text-lg">Gallery Images ({gallery.length})</CardTitle></CardHeader>
        <CardContent>
          {gallery.length === 0 && (
            <p className="text-center text-gray-400 py-8">No gallery images yet.</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="group relative rounded-lg overflow-hidden shadow-md bg-gray-100">
                <img src={item.src} alt={item.caption} className="w-full h-36 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/logo.jpg'; }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-end justify-between p-2">
                  <p className="text-white text-xs font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity flex-1">{item.caption}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="text-white hover:text-white hover:bg-white/20 h-7 w-7">
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeGalleryImage(item.id)} className="text-white hover:text-white hover:bg-white/20 h-7 w-7">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
