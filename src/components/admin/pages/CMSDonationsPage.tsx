'use client';

import React, { useState } from 'react';
import { useCMS, DonationItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyDonation: Omit<DonationItem, 'id'> = {
  donorName: '',
  amount: 0,
  date: '',
  campaign: '',
  status: 'pending',
  paymentMethod: 'Cash',
};

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
};

export default function CMSDonationsPage() {
  const { donations, addDonation, updateDonation, removeDonation } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<DonationItem, 'id'>>(emptyDonation);
  const [dialogOpen, setDialogOpen] = useState(false);

  const total = donations.filter((d) => d.status === 'completed').reduce((s, d) => s + d.amount, 0);
  const thisMonth = donations.filter((d) => {
    const dDate = new Date(d.date);
    const now = new Date();
    return d.status === 'completed' && dDate.getMonth() === now.getMonth() && dDate.getFullYear() === now.getFullYear();
  }).reduce((s, d) => s + d.amount, 0);
  const avg = donations.filter((d) => d.status === 'completed').length > 0
    ? total / donations.filter((d) => d.status === 'completed').length
    : 0;

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyDonation, date: new Date().toISOString().split('T')[0] });
    setDialogOpen(true);
  };

  const openEdit = (donation: DonationItem) => {
    setEditingId(donation.id);
    setForm({ donorName: donation.donorName, amount: donation.amount, date: donation.date, campaign: donation.campaign, status: donation.status, paymentMethod: donation.paymentMethod });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateDonation(editingId, form);
    } else {
      addDonation(form);
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyDonation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">Donations</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Donation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Donation' : 'Add New Donation'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Donor Name</Label>
                  <Input value={form.donorName} onChange={(e) => setForm((f) => ({ ...f, donorName: e.target.value }))} />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <Label>Campaign</Label>
                  <Input value={form.campaign} onChange={(e) => setForm((f) => ({ ...f, campaign: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v: 'completed' | 'pending' | 'failed') => setForm((f) => ({ ...f, status: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <Input value={form.paymentMethod} onChange={(e) => setForm((f) => ({ ...f, paymentMethod: e.target.value }))} />
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

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Total Donations</p>
            <p className="text-2xl font-bold text-[#0B3C5D]">${total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold text-[#4C9A2A]">${thisMonth.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Average</p>
            <p className="text-2xl font-bold text-[#D4AF37]">${avg.toFixed(0)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">All Donations ({donations.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {donations.length === 0 && (
            <p className="text-center text-gray-400 py-8">No donations recorded yet.</p>
          )}
          {donations.map((donation) => (
            <div key={donation.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#333] text-sm truncate">{donation.donorName || 'Anonymous'}</h3>
                  <Badge className={statusColors[donation.status]}>{donation.status}</Badge>
                </div>
                <p className="text-xs text-gray-500">
                  ${donation.amount.toLocaleString()} &bull; {donation.date} &bull; {donation.campaign || 'General'} &bull; {donation.paymentMethod}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(donation)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeDonation(donation.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
