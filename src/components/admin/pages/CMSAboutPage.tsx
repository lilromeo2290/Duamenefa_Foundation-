'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Plus, Trash2, Save, Check } from 'lucide-react';

export default function CMSAboutPage() {
  const { aboutPreview, updateAboutPreview } = useCMS();
  const [form, setForm] = useState(aboutPreview);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateAboutPreview(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const updateStatCard = (key: string, value: string) =>
    setForm((f) => ({ ...f, statCard: { ...f.statCard, [key]: value } }));

  const addImage = () => setForm((f) => ({ ...f, images: [...f.images, { src: '', alt: '' }] }));
  const removeImage = (index: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  const updateImage = (index: number, field: 'src' | 'alt', value: string) =>
    setForm((f) => ({ ...f, images: f.images.map((img, i) => (i === index ? { ...img, [field]: value } : img)) }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">About Section</h2>
        </div>
        <Button onClick={handleSave} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">About Preview Content</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Badge Text</Label>
            <Input value={form.badgeText} onChange={(e) => update('badgeText', e.target.value)} />
          </div>
          <div>
            <Label>Heading</Label>
            <Input value={form.heading} onChange={(e) => update('heading', e.target.value)} />
          </div>
          <div>
            <Label>Heading Highlight</Label>
            <Input value={form.headingHighlight} onChange={(e) => update('headingHighlight', e.target.value)} />
          </div>
          <div>
            <Label>Button Text</Label>
            <Input value={form.buttonText} onChange={(e) => update('buttonText', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Paragraph 1</Label>
            <Textarea rows={4} value={form.paragraph1} onChange={(e) => update('paragraph1', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Paragraph 2</Label>
            <Textarea rows={4} value={form.paragraph2} onChange={(e) => update('paragraph2', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Stat Card</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Value</Label>
            <Input value={form.statCard.value} onChange={(e) => updateStatCard('value', e.target.value)} />
          </div>
          <div>
            <Label>Label</Label>
            <Input value={form.statCard.label} onChange={(e) => updateStatCard('label', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Section Images</CardTitle>
          <Button variant="outline" size="sm" onClick={addImage} className="gap-1">
            <Plus className="h-4 w-4" /> Add Image
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {form.images.map((img, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              {img.src && (
                <img src={img.src} alt={img.alt} className="w-20 h-14 object-cover rounded flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input placeholder="Image URL" value={img.src} onChange={(e) => updateImage(index, 'src', e.target.value)} />
                <Input placeholder="Alt text" value={img.alt} onChange={(e) => updateImage(index, 'alt', e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeImage(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
