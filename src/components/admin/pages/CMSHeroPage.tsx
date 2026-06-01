'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image, Plus, Trash2, Save, Check } from 'lucide-react';

export default function CMSHeroPage() {
  const { hero, updateHero } = useCMS();
  const [form, setForm] = useState(hero);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateHero(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const addImage = () => {
    setForm((f) => ({
      ...f,
      sliderImages: [...f.sliderImages, { src: '', alt: '' }],
    }));
  };

  const removeImage = (index: number) => {
    setForm((f) => ({
      ...f,
      sliderImages: f.sliderImages.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index: number, field: 'src' | 'alt', value: string) => {
    setForm((f) => ({
      ...f,
      sliderImages: f.sliderImages.map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Hero Section</h2>
        </div>
        <Button onClick={handleSave} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      {/* Text Fields */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Hero Text Content</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Badge Text</Label>
            <Input value={form.badgeText} onChange={(e) => update('badgeText', e.target.value)} />
          </div>
          <div>
            <Label>Heading (First Line)</Label>
            <Input value={form.heading} onChange={(e) => update('heading', e.target.value)} />
          </div>
          <div>
            <Label>Heading Highlight</Label>
            <Input value={form.headingHighlight} onChange={(e) => update('headingHighlight', e.target.value)} />
          </div>
          <div>
            <Label>Heading Line 2</Label>
            <Input value={form.headingLine2} onChange={(e) => update('headingLine2', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Subheading</Label>
            <Textarea rows={2} value={form.subheading} onChange={(e) => update('subheading', e.target.value)} />
          </div>
          <div>
            <Label>Primary Button Text</Label>
            <Input value={form.primaryButtonText} onChange={(e) => update('primaryButtonText', e.target.value)} />
          </div>
          <div>
            <Label>Secondary Button Text</Label>
            <Input value={form.secondaryButtonText} onChange={(e) => update('secondaryButtonText', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Slider Images */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Slider Images</CardTitle>
          <Button variant="outline" size="sm" onClick={addImage} className="gap-1">
            <Plus className="h-4 w-4" /> Add Image
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {form.sliderImages.map((img, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              {img.src && (
                <img src={img.src} alt={img.alt} className="w-20 h-14 object-cover rounded flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input placeholder="Image URL (e.g. /image.jpg)" value={img.src} onChange={(e) => updateImage(index, 'src', e.target.value)} />
                <Input placeholder="Alt text" value={img.alt} onChange={(e) => updateImage(index, 'alt', e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeImage(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Live Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="relative rounded-xl overflow-hidden bg-[#0B3C5D] text-white p-8 min-h-[200px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/65 via-[#0B3C5D]/40 to-[#0B3C5D]/25" style={{ backgroundImage: form.sliderImages[0]?.src ? `url('${form.sliderImages[0].src}')` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="relative z-10 text-center">
              <span className="inline-block bg-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium px-3 py-1 rounded-full mb-3 border border-[#D4AF37]/40">
                {form.badgeText || 'Badge Text'}
              </span>
              <h3 className="text-2xl font-bold mb-2">
                {form.heading || 'HEADING'} <span className="text-[#D4AF37]">{form.headingHighlight || 'HIGHLIGHT'}</span>
                <br />{form.headingLine2 || 'LINE 2'}
              </h3>
              <p className="text-white/80 text-sm max-w-md mx-auto">{form.subheading || 'Subheading text'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
