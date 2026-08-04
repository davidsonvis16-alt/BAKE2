import React, { useEffect, useState, useRef } from 'react';
import { supabase, uploadMenuItemImage } from '../lib/supabase';
import { useAuth } from '../components/AuthContext';
import { Trash2, Plus, Save, X, LogOut, Search, Image } from 'lucide-react';

interface MenuItemRow {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  badge: string | null;
  available: boolean;
  image?: string | null;
}

export const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<MenuItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItemRow>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    id: '', name: '', category: '', price: 0, description: '', badge: '', image: ''
  });
  const [newItemImage, setNewItemImage] = useState<File | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const { logout } = useAuth();

  const fetchItems = async () => {
    if (!supabase) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category');

      if (error) {
        console.error('AdminDashboard: menu_items fetch error', error);
        setItems([]);
      } else {
        setItems(data || []);
      }
    } catch (err) {
      console.error('AdminDashboard: menu_items fetch exception', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startEdit = (item: MenuItemRow) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId || !supabase) return;
    setUploading(true);
    try {
      let imageUrl = editForm.image || null;
      if (editImage) {
        imageUrl = await uploadMenuItemImage(editImage, editingId);
      }
      await supabase.from('menu_items').update({
        name: editForm.name,
        price: editForm.price,
        description: editForm.description,
        badge: editForm.badge || null,
        category: editForm.category,
        image: imageUrl,
      }).eq('id', editingId);
      setEditingId(null);
      setEditImage(null);
      fetchItems();
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Failed to save item');
    } finally {
      setUploading(false);
    }
  };

  const toggleAvailable = async (item: MenuItemRow) => {
    if (!supabase) return;
    await supabase.from('menu_items').update({ available: !item.available }).eq('id', item.id);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Delete this item permanently?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    fetchItems();
  };

  const addItem = async () => {
    if (!supabase) return;
    if (!newItem.id || !newItem.name || !newItem.category) {
      alert('ID, name, and category are required');
      return;
    }
    setUploading(true);
    try {
      let imageUrl = newItem.image;
      if (newItemImage) {
        imageUrl = await uploadMenuItemImage(newItemImage, newItem.id);
      }
      await supabase.from('menu_items').insert([{ ...newItem, available: true, image: imageUrl || null }]);
      setNewItem({ id: '', name: '', category: '', price: 0, description: '', badge: '', image: '' });
      setNewItemImage(null);
      setShowAddForm(false);
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item');
    } finally {
      setUploading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF3E7] pb-20">
      <header className="bg-white border-b border-[#000000]/10 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif-display text-xl font-bold text-[#000000]">BakeMart Menu Manager</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-[#000000]/60 hover:text-[#000000]"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-[#000000] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#000000]/90"
          >
            <Plus className="w-4 h-4" /> Add New Item
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]/40" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-white border border-[#000000]/10 rounded-full pl-9 pr-4 py-2 text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000]/40 transition-colors"
            />
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-[#000000]/10 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="ID (e.g. b16)" value={newItem.id}
                onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                className="border rounded-lg px-3 py-2" />
              <input placeholder="Category id (e.g. bakery-desserts)" value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="border rounded-lg px-3 py-2" />
            </div>
            <input placeholder="Item name" value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full" />
            <textarea placeholder="Description" value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Price (KSh)" value={newItem.price || ''}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="border rounded-lg px-3 py-2" />
              <input placeholder="Badge (optional)" value={newItem.badge}
                onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                className="border rounded-lg px-3 py-2" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 bg-[#FAF3E7] border border-[#D8C7B0] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#EADECB] transition-colors flex-1">
                <Image className="w-4 h-4 text-[#000000]" />
                <span className="text-xs text-[#000000]">
                  {newItemImage ? newItemImage.name : 'Choose image file'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setNewItemImage(file);
                  }}
                  className="hidden"
                />
              </label>
              {newItemImage && (
                <button
                  type="button"
                  onClick={() => {
                    setNewItemImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-red-500 text-xs font-semibold"
                >
                  Remove
                </button>
              )}
            </div>
            <button onClick={addItem}
              className="bg-[#000000] text-white px-4 py-2 rounded-full font-semibold">
              Save Item
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-[#000000]/60">Loading menu...</p>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#000000]/10">
                {editingId === item.id ? (
                  <div className="space-y-2">
                    <input value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border rounded-lg px-3 py-2 w-full font-semibold" />
                    <textarea value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="border rounded-lg px-3 py-2 w-full text-sm" />
                    <div className="flex gap-3">
                      <input type="number" value={editForm.price || 0}
                        onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        className="border rounded-lg px-3 py-2 w-32" />
                      <input value={editForm.badge || ''} placeholder="Badge"
                        onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                        className="border rounded-lg px-3 py-2 flex-1" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 bg-[#FAF3E7] border border-[#D8C7B0] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#EADECB] transition-colors flex-1">
                        <Image className="w-4 h-4 text-[#000000]" />
                        <span className="text-xs text-[#000000]">
                          {editImage ? editImage.name : 'Choose image file'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          ref={editFileInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setEditImage(file);
                          }}
                          className="hidden"
                        />
                      </label>
                      {editImage && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditImage(null);
                            if (editFileInputRef.current) editFileInputRef.current.value = '';
                          }}
                          className="text-red-500 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={saveEdit}
                        className="flex items-center gap-1 bg-[#000000] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                      <button onClick={cancelEdit}
                        className="flex items-center gap-1 bg-gray-200 text-[#000000] px-4 py-1.5 rounded-full text-sm font-semibold">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#000000]">{item.name}</span>
                          {item.badge && (
                            <span className="text-[10px] bg-[#000000]/40 text-[#000000] px-2 py-0.5 rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )}
                          {!item.available && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                              Sold Out
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#000000]/50">{item.category}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#000000] shrink-0">KSh {item.price}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleAvailable(item)}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                          item.available ? 'bg-[#000000]/15 text-[#000000]' : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {item.available ? 'Available' : 'Sold Out'}
                      </button>
                      <button onClick={() => startEdit(item)}
                        className="text-xs bg-gray-100 px-3 py-1.5 rounded-full font-semibold text-[#000000]">
                        Edit
                      </button>
                      <button onClick={() => deleteItem(item.id)}
                        className="text-red-500 p-1.5">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
