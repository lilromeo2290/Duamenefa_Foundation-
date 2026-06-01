'use client';

import React, { useState } from 'react';
import { useCMS, PostItem } from '@/lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Newspaper, Plus, Pencil, Trash2 } from 'lucide-react';

const emptyPost: Omit<PostItem, 'id'> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'General',
  date: new Date().toISOString().split('T')[0],
  status: 'draft',
  author: 'Admin',
};

export default function CMSNewsPage() {
  const { posts, addPost, updatePost, removePost } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<PostItem, 'id'>>(emptyPost);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.status === filter);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyPost, date: new Date().toISOString().split('T')[0] });
    setDialogOpen(true);
  };

  const openEdit = (post: PostItem) => {
    setEditingId(post.id);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, image: post.image, category: post.category, date: post.date, status: post.status, author: post.author });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const slug = form.slug || generateSlug(form.title);
    if (editingId) {
      updatePost(editingId, { ...form, slug });
    } else {
      addPost({ ...form, slug });
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyPost);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Newspaper className="h-6 w-6 text-[#C62828]" />
          <h2 className="text-2xl font-bold text-[#333]">News / Blog</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#C62828] hover:bg-[#8E0000] gap-2">
              <Plus className="h-4 w-4" /> Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Post' : 'Add New Post'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: f.slug || generateSlug(title) }));
                }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea rows={2} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea rows={8} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Image URL</Label>
                  <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
                </div>
                <div>
                  <Label>Author</Label>
                  <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="flex items-center gap-3 pt-7">
                  <Switch checked={form.status === 'published'} onCheckedChange={(checked) => setForm((f) => ({ ...f, status: checked ? 'published' : 'draft' }))} />
                  <Label>{form.status === 'published' ? 'Published' : 'Draft'}</Label>
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

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(['all', 'published', 'draft'] as const).map((f) => (
          <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm"
            onClick={() => setFilter(f)}
            className={filter === f ? 'bg-[#C62828] hover:bg-[#8E0000]' : ''}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? posts.length : posts.filter((p) => p.status === f).length})
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">All Posts ({filtered.length})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-8">No posts yet.</p>
          )}
          {filtered.map((post) => (
            <div key={post.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-20 h-14 object-cover rounded flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#333] text-sm truncate">{post.title}</h3>
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}
                    className={post.status === 'published' ? 'bg-green-100 text-green-800' : ''}>
                    {post.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{post.category} &bull; {post.date} &bull; by {post.author}</p>
                <p className="text-xs text-gray-400 line-clamp-1 mt-1">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(post)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removePost(post.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
