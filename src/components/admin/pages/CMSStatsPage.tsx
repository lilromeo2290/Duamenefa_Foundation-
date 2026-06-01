'use client';

import React, { useState } from 'react';
import { useCMS, StatItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Plus, Trash2, Save, Check } from 'lucide-react';

const iconOptions = [
  { value: 'users', label: 'Users' },
  { value: 'handshake', label: 'Handshake' },
  { value: 'radio', label: 'Radio' },
  { value: 'tv', label: 'TV' },
];

export default function CMSStatsPage() {
  const { stats, updateStats, addStat, removeStat } = useCMS();
  const [form, setForm] = useState<StatItem[]>(stats);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateStats(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (index: number, field: keyof StatItem, value: string | number) => {
    setForm((f) => f.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const handleAdd = () => {
    const newStat: StatItem = { id: `stat-${Date.now()}`, icon: 'users', value: 0, suffix: '+', label: 'New Stat' };
    addStat(newStat);
    setForm((f) => [...f, newStat]);
  };

  const handleRemove = (index: number) => {
    const stat = form[index];
    removeStat(stat.id || stat.label);
    setForm((f) => f.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Stats Counter</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAdd} className="gap-1">
            <Plus className="h-4 w-4" /> Add Stat
          </Button>
          <Button onClick={handleSave} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Statistics Items</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {form.map((stat, index) => (
            <div key={stat.id || index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs">Icon</Label>
                  <Select value={stat.icon} onValueChange={(v) => updateField(index, 'icon', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input type="number" value={stat.value} onChange={(e) => updateField(index, 'value', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <Label className="text-xs">Suffix</Label>
                  <Input value={stat.suffix} onChange={(e) => updateField(index, 'suffix', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Label</Label>
                  <Input value={stat.label} onChange={(e) => updateField(index, 'label', e.target.value)} />
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 mt-5">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {form.length === 0 && (
            <p className="text-center text-gray-400 py-8">No stats yet. Click &quot;Add Stat&quot; to create one.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
