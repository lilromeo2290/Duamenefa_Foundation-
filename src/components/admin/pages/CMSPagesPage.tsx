'use client';

import React, { useState } from 'react';
import { useCMS, PageContent } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileStack, Save, Check } from 'lucide-react';

const pageOptions = [
  { value: 'about', label: 'About Us' },
  { value: 'whowear', label: 'Who We Are' },
  { value: 'contact', label: 'Contact Us' },
  { value: 'forms', label: 'Forms' },
  { value: 'newsletters', label: 'Newsletters' },
  { value: 'activities', label: 'Activities' },
  { value: 'executives', label: 'Executives' },
  { value: 'associates', label: 'Associates' },
  { value: 'reporters', label: 'Reporters' },
  { value: 'programs', label: 'Programs' },
  { value: 'donate', label: 'Donate' },
  { value: 'stories', label: 'Stories' },
  { value: 'media', label: 'Media' },
  { value: 'trokosi', label: 'Trokosi' },
  { value: 'vocationalschool', label: 'Vocational School' },
  { value: 'costheta', label: 'Costheta' },
  { value: 'volunteerform', label: 'Volunteer Form' },
  { value: 'tournaments', label: 'Regional Tournaments' },
];

export default function CMSPagesPage() {
  const { pages, updatePage } = useCMS();
  const [selectedPage, setSelectedPage] = useState('about');
  const [saved, setSaved] = useState(false);

  const currentPage: PageContent = pages[selectedPage] || { title: '', subtitle: '', content: '', image: '' };
  const [form, setForm] = useState<PageContent>(currentPage);

  React.useEffect(() => {
    const p = pages[selectedPage] || { title: '', subtitle: '', content: '', image: '' };
    setForm(p);
  }, [selectedPage, pages]);

  const handleSave = () => {
    updatePage(selectedPage, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: keyof PageContent, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileStack className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Page Content</h2>
        </div>
        <Button onClick={handleSave} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Page</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-full md:w-80">
              <SelectValue placeholder="Choose a page..." />
            </SelectTrigger>
            <SelectContent>
              {pageOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Editing: {pageOptions.find((p) => p.value === selectedPage)?.label || selectedPage}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Page Title</Label>
              <Input value={form.title} onChange={(e) => update('title', e.target.value)} />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input value={form.subtitle} onChange={(e) => update('subtitle', e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Content</Label>
            <Textarea rows={8} value={form.content} onChange={(e) => update('content', e.target.value)} />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input value={form.image} onChange={(e) => update('image', e.target.value)} />
          </div>
          {form.image && (
            <img src={form.image} alt="Page image" className="w-full max-h-48 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
