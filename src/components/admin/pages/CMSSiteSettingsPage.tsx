'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, RotateCcw, Save, Check } from 'lucide-react';

export default function CMSSiteSettingsPage() {
  const { siteSettings, updateSiteSettings, resetToDefaults } = useCMS();
  const [form, setForm] = useState(siteSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSiteSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetToDefaults();
    setForm(useCMS.getState().siteSettings);
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Site Settings</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Reset to Defaults
          </Button>
          <Button onClick={handleSave} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* General */}
      <Card>
        <CardHeader><CardTitle className="text-lg">General Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Site Name</Label>
            <Input value={form.siteName} onChange={(e) => update('siteName', e.target.value)} />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input value={form.tagline} onChange={(e) => update('tagline', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Phone (Ghana)</Label>
            <Input value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={form.email} onChange={(e) => update('email', e.target.value)} />
          </div>
          <div>
            <Label>WhatsApp</Label>
            <Input value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} />
          </div>
          <div>
            <Label>U.S. Phone</Label>
            <Input value={form.usPhone} onChange={(e) => update('usPhone', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Ghana Address</Label>
            <Input value={form.address} onChange={(e) => update('address', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>U.S. Address</Label>
            <Input value={form.usAddress} onChange={(e) => update('usAddress', e.target.value)} />
          </div>
          <div>
            <Label>Tax ID</Label>
            <Input value={form.taxId} onChange={(e) => update('taxId', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Social & Media */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Social Media & Media URLs</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Facebook URL</Label>
            <Input value={form.facebookUrl} onChange={(e) => update('facebookUrl', e.target.value)} />
          </div>
          <div>
            <Label>YouTube URL</Label>
            <Input value={form.youtubeUrl} onChange={(e) => update('youtubeUrl', e.target.value)} />
          </div>
          <div>
            <Label>Twitter URL</Label>
            <Input value={form.twitterUrl} onChange={(e) => update('twitterUrl', e.target.value)} />
          </div>
          <div>
            <Label>Instagram URL</Label>
            <Input value={form.instagramUrl} onChange={(e) => update('instagramUrl', e.target.value)} />
          </div>
          <div>
            <Label>Radio Stream URL</Label>
            <Input value={form.radioStreamUrl} onChange={(e) => update('radioStreamUrl', e.target.value)} />
          </div>
          <div>
            <Label>News URL</Label>
            <Input value={form.newsUrl} onChange={(e) => update('newsUrl', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Developer Credit */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Developer Credit</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Developer Name</Label>
            <Input value={form.developerName} onChange={(e) => update('developerName', e.target.value)} />
          </div>
          <div>
            <Label>Developer URL</Label>
            <Input value={form.developerUrl} onChange={(e) => update('developerUrl', e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
