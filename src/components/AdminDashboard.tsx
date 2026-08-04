import React, { useEffect, useState, useRef, useMemo } from 'react';
import { supabase, uploadMenuItemImage, validateImageFile } from '../lib/supabase';
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
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null);
  const inlineFileInputRef = useRef<HTMLInputElement>(null);
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

  const handleInlineUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingItemId || !supabase) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      alert(validationError);
      setUploadingItemId(null);
      if (inlineFileInputRef.current) inlineFileInputRef.current.value = '';
      return;
    }
    setUploading(true);
    try {
      const url = await uploadMenuItemImage(file, uploadingItemId);
      if (url) {
        await supabase.from('menu_items').update({ image: url }).eq('id', uploadingItemId);
        fetchItems();
      }
    } catch (err) {
      console.error('Inline upload error:', err);
    } finally {
      setUploading(false);
      setUploadingItemId(null);
      if (inlineFileInputRef.current) inlineFileInputRef.current.value = '';
    }
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

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItemRow[]> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const categoryNames = Object.keys(groupedItems).sort();

  const formatCategoryLabel = (id: string) =>
    id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-[#FAF3E7] pb-20">
      <header className="bg-white border-b border-[#000000]/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif-display text-xl font-bold text-[#000000]">BakeMart Menu Manager</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-[#000000]/60 hover:text-[#000000]"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
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

        {/* Hidden inline file input for quick image upload */}
        <input
          type="file"
          accept="image/*"
          ref={inlineFileInputRef}
          onChange={handleInlineUpload}
          className="hidden"
        />

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
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    const validationError = validateImageFile(file);
                    if (validationError) {
                      alert(validationError);
                      setNewItemImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                      return;
                    }
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
        ) : categoryNames.length === 0 ? (
          <p className="text-[#000000]/60">No items found.</p>
        ) : (
          <div className="space-y-10">
            {categoryNames.map((catId) => (
              <section key={catId}>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] mb-3 border-b border-[#000000]/10 pb-2">
                  {formatCategoryLabel(catId)} <span className="text-[#000000]/40 font-normal">({groupedItems[catId].length})</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupedItems[catId].map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#000000]/10 flex flex-col">
                      {editingId === item.id ? (
                        <div className="space-y-2">
                          <input value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="border rounded-lg px-3 py-2 w-full font-semibold text-sm" />
                          <textarea value={editForm.description || ''}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="border rounded-lg px-3 py-2 w-full text-xs" />
                          <div className="flex gap-2">
                            <input type="number" value={editForm.price || 0}
                              onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                              className="border rounded-lg px-3 py-2 w-24 text-sm" />
                            <input value={editForm.badge || ''} placeholder="Badge"
                              onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                              className="border rounded-lg px-3 py-2 flex-1 text-sm" />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 bg-[#FAF3E7] border border-[#D8C7B0] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#EADECB] transition-colors flex-1">
                              <Image className="w-3.5 h-3.5 text-[#000000]" />
                              <span className="text-[10px] text-[#000000] truncate">
                                {editImage ? editImage.name : 'Choose image'}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                ref={editFileInputRef}
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  const validationError = validateImageFile(file);
                                  if (validationError) {
                                    alert(validationError);
                                    setEditImage(null);
                                    if (editFileInputRef.current) editFileInputRef.current.value = '';
                                    return;
                                  }
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
                                className="text-red-500 text-[10px] font-semibold shrink-0"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button onClick={saveEdit}
                              className="flex items-center gap-1 bg-[#000000] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                              <Save className="w-3.5 h-3.5" /> Save
                            </button>
                            <button onClick={cancelEdit}
                              className="flex items-center gap-1 bg-gray-200 text-[#000000] px-3 py-1.5 rounded-full text-xs font-semibold">
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="relative mb-3 aspect-square rounded-lg overflow-hidden bg-[#FAF3E7] flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[10px] text-[#000000]/40">No Image</span>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="font-semibold text-sm text-[#000000]">{item.name}</span>
                              {item.badge && (
                                <span className="text-[9px] bg-[#000000]/40 text-[#000000] px-1.5 py-0.5 rounded-full font-semibold">
                                  {item.badge}
                                </span>
                              )}
                              {!item.available && (
                                <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">
                                  Sold Out
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#000000]/50 line-clamp-2 mb-2">{item.description}</p>
                            <span className="font-mono font-bold text-[#000000] text-sm">KSh {item.price}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#000000]/10">
                            <button
                              onClick={() => {
                                setUploadingItemId(item.id);
                                setTimeout(() => inlineFileInputRef.current?.click(), 0);
                              }}
                              disabled={uploadingItemId === item.id && uploading}
                              className="text-[10px] bg-[#FAF3E7] hover:bg-[#EADECB] text-[#000000] px-2 py-1.5 rounded-full font-semibold disabled:opacity-50 active:scale-95 transition-all flex items-center gap-1"
                              title="Add/Change image"
                            >
                              <Image className="w-3 h-3" />
                              Image
                            </button>
                            <button
                              onClick={() => toggleAvailable(item)}
                              className={`text-[10px] px-2 py-1.5 rounded-full font-semibold transition-all ${
                                item.available
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200 active:scale-95'
                                  : 'bg-red-100 text-red-600 hover:bg-red-200 active:scale-95'
                              }`}
                            >
                              {item.available ? '✓ Avail' : '✕ Sold'}
                            </button>
                            <button onClick={() => startEdit(item)}
                              className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1.5 rounded-full font-semibold text-[#000000] active:scale-95 transition-all">
                              Edit
                            </button>
                            <button onClick={() => deleteItem(item.id)}
                              className="text-red-500 hover:bg-red-50 p-1.5 rounded-full active:scale-95 transition-all ml-auto">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};