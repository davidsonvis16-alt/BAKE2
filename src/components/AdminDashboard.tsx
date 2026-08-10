import React, { useEffect, useState, useMemo } from 'react';
import { supabase, uploadMenuItemImage, validateImageFile } from '../lib/supabase';
import { CATEGORIES } from '../data/menuData';
import { useAuth } from '../components/AuthContext';
import { Trash2, Plus, Save, X, Check, LogOut, Search } from 'lucide-react';

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
    id: '', name: '', category: '', price: 0, description: '', badge: ''
  });
  const [uploading, setUploading] = useState(false);
  const [newItemImage, setNewItemImage] = useState<File | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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
      const updateData: Record<string, unknown> = {
        name: editForm.name,
        price: editForm.price,
        description: editForm.description,
        badge: editForm.badge || null,
        category: editForm.category,
      };
      if (imageUrl !== undefined && imageUrl !== null) {
        updateData.image = imageUrl;
      }
      const { error } = await supabase.from('menu_items').update(updateData).eq('id', editingId);
      if (error) {
        console.error('Supabase update error:', error);
        alert('Failed to save item: ' + error.message);
        return;
      }
      setEditingId(null);
      setEditImage(null);
      fetchItems();
      window.dispatchEvent(new Event('menu-updated'));
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
    window.dispatchEvent(new Event('menu-updated'));
  };

  const deleteItem = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Delete this item permanently?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    fetchItems();
    window.dispatchEvent(new Event('menu-updated'));
  };

  const addItem = async () => {
    if (!supabase) return;
    if (!newItem.id || !newItem.name || !newItem.category) {
      alert('ID, name, and category are required');
      return;
    }
    setUploading(true);
    try {
      let imageUrl = null;
      if (newItemImage) {
        imageUrl = await uploadMenuItemImage(newItemImage, newItem.id);
      }
      await supabase.from('menu_items').insert([{ ...newItem, available: true, image: imageUrl }]);
      setNewItem({ id: '', name: '', category: '', price: 0, description: '', badge: '' });
      setNewItemImage(null);
      setShowAddForm(false);
      fetchItems();
      window.dispatchEvent(new Event('menu-updated'));
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
      <header className="bg-white border-b border-[#EADECB] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-[#000000]">BakeMart Menu Manager</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-[#000000]/60 hover:text-[#000000] font-semibold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-[#000000] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#000000]/90 shadow-md transition-all active:scale-95"
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
              className="w-full sm:w-80 bg-white border border-[#D8C7B0] rounded-full pl-9 pr-4 py-2 text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors"
            />
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-[#EADECB] space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="ID (e.g. b16)" value={newItem.id}
                onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
              <select value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors">
                <option value="">Select category…</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <input placeholder="Item name" value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
            <textarea placeholder="Description" value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-xs text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Price (KSh)" value={newItem.price || ''}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
              <input placeholder="Badge (optional)" value={newItem.badge}
                onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#000000]/70 mb-1">Item Image</label>
              <input type="file" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  const validationError = validateImageFile(file);
                  if (validationError) {
                    alert(validationError);
                    return;
                  }
                  setNewItemImage(file);
                }}
                className="block w-full text-xs text-[#000000]" />
              {newItemImage && (
                <p className="text-[10px] text-[#000000]/60 mt-1">{newItemImage.name}</p>
              )}
            </div>
            <button onClick={addItem}
              className="bg-[#000000] text-white px-5 py-2.5 rounded-full font-semibold shadow-md transition-all active:scale-95">
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
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] mb-3 border-b border-[#EADECB] pb-2">
                  {formatCategoryLabel(catId)} <span className="text-[#000000]/40 font-normal">({groupedItems[catId].length})</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupedItems[catId].map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#EADECB] flex flex-col">
                       {editingId === item.id ? (
                        <div className="space-y-2">
                          {editForm.image && (
                            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#FAF3E7] border border-[#EADECB]">
                              <img
                                src={editForm.image}
                                alt={editForm.name || 'Item'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <input value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full font-semibold text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
                          <textarea value={editForm.description || ''}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-full text-xs text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
                          <div className="flex gap-2">
                            <input type="number" value={editForm.price || 0}
                              onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                              className="border border-[#D8C7B0] rounded-lg px-3 py-2 w-24 text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
                            <input value={editForm.badge || ''} placeholder="Badge"
                              onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                              className="border border-[#D8C7B0] rounded-lg px-3 py-2 flex-1 text-sm text-[#000000] placeholder-[#000000]/40 outline-none focus:border-[#000000] transition-colors" />
                           </div>
                           <div className="flex gap-2">
                             <input type="file" accept="image/*"
                               onChange={(e) => {
                                 const file = e.target.files?.[0] || null;
                                 const validationError = validateImageFile(file);
                                 if (validationError) {
                                   alert(validationError);
                                   return;
                                 }
                                 setEditImage(file);
                               }}
                               className="block w-full text-xs text-[#000000]" />
                             {editImage && (
                               <p className="text-[10px] text-[#000000]/60">{editImage.name}</p>
                             )}
                           </div>
                           <div className="flex gap-2 pt-1">
                            <button onClick={saveEdit}
                              className="flex items-center gap-1 bg-[#000000] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all active:scale-95">
                              <Save className="w-3.5 h-3.5" /> Save
                            </button>
                            <button onClick={cancelEdit}
                              className="flex items-center gap-1 bg-[#FAF3E7] hover:bg-[#EADECB] text-[#000000] px-4 py-2 rounded-full text-xs font-semibold border border-[#D8C7B0] transition-all active:scale-95">
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </div>
                       ) : (
                        <>
                          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#FAF3E7] mb-3 border border-[#EADECB]">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '';
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#000000]/30">
                                <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="font-semibold text-sm text-[#000000]">{item.name}</span>
                              {item.badge && (
                                <span className="text-[9px] bg-[#000000]/40 text-[#000000] px-2 py-0.5 rounded-full font-semibold">
                                  {item.badge}
                                </span>
                              )}
                              {!item.available && (
                                <span className="text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                                  Sold Out
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#000000]/50 line-clamp-2 mb-2">{item.description}</p>
                            <span className="font-mono font-bold text-[#000000] text-sm">KSh {item.price.toLocaleString()}</span>
                          </div>

                           <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#EADECB]">
                             <button
                               onClick={() => toggleAvailable(item)}
                               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                 item.available ? 'bg-green-500' : 'bg-red-400'
                               }`}
                               title={item.available ? 'Click to mark as sold out' : 'Click to mark as available'}
                             >
                               <span
                                 className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                   item.available ? 'translate-x-6' : 'translate-x-1'
                                 }`}
                               />
                             </button>
                             <span className="text-[10px] font-semibold text-[#000000]/60 w-10">
                               {item.available ? 'On' : 'Off'}
                             </span>
                             <button onClick={() => startEdit(item)}
                               className="text-[10px] bg-[#FAF3E7] hover:bg-[#EADECB] px-2.5 py-1.5 rounded-full font-semibold text-[#000000] border border-[#D8C7B0] active:scale-95 transition-all">
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