import React, { useEffect, useState, useMemo } from 'react';
import { supabase, uploadMenuItemImage, validateImageFile, deleteMenuItemImage } from '../lib/supabase';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { useAuth } from '../components/AuthContext';
import { getCachedData, invalidateCache, setCachedData } from '../lib/dataCache';
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

interface ItemStat {
  item_name: string;
  total_sold: number;
  revenue: number;
}

interface OrderRow {
  id: string;
  date: string | null;
  status: string | null;
  order_type: string | null;
  items: any;
  total_amount: number | null;
  delivery_address: string | null;
  table_number: string | null;
  created_at: string | null;
}

const ORDER_STATUSES = ['pending', 'preparing', 'ready', 'completed'];

const statusColor = (status: string | null) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'preparing': return 'bg-blue-100 text-blue-700';
    case 'ready': return 'bg-green-100 text-green-700';
    case 'completed': return 'bg-gray-200 text-gray-600';
    default: return 'bg-gray-100 text-gray-500';
  }
};

const getEffectiveImage = (item: MenuItemRow): string | null => {
  if (item.image) return item.image;
  const staticItem = MENU_ITEMS.find((mi) => mi.id === item.id);
  return staticItem?.image || null;
};

export const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<MenuItemRow[]>([]);
  const [staticOnlyIds, setStaticOnlyIds] = useState<Set<string>>(new Set());
  const [deletedStaticIds, setDeletedStaticIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('bakemart_deleted_static_items');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
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
  const [removeImage, setRemoveImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<ItemStat[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'stats'>('menu');
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchItems = async () => {
    if (!supabase) {
      setItems(
        MENU_ITEMS.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          description: item.description || '',
          badge: item.badge || null,
          available: true,
          image: item.image || null,
        }))
      );
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getCachedData<MenuItemRow[]>(
        'admin-menu-items',
        async () => {
          const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('category');

          if (error) {
            console.error('AdminDashboard: menu_items fetch error', error);
            return [];
          }
          return data || [];
        },
        { ttlMs: 10 * 60 * 1000 }
      );

      const dbIds = new Set((data || []).map((row) => row.id));
      const staticOnly: MenuItemRow[] = MENU_ITEMS.filter((item) => !dbIds.has(item.id) && !deletedStaticIds.has(item.id)).map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description || '',
        badge: item.badge || null,
        available: true,
        image: item.image || null,
      }));

      setItems([...(data || []), ...staticOnly]);
      setStaticOnlyIds(new Set(staticOnly.map((i) => i.id)));
    } catch (err) {
      console.error('AdminDashboard: menu_items fetch exception', err);
      setItems(
        MENU_ITEMS.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          description: item.description || '',
          badge: item.badge || null,
          available: true,
          image: item.image || null,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!supabase) {
      setStats([]);
      setStatsLoading(false);
      return;
    }
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await getCachedData<ItemStat[]>(
        'admin-order-stats',
        async () => {
          const { data, error } = await supabase.from('orders').select('items');

          if (error) {
            console.error('AdminDashboard: orders fetch error', error);
            return [];
          }

          const tally: Record<string, { total_sold: number; revenue: number }> = {};

          (data || []).forEach((order: { items: unknown }) => {
            const orderItems = Array.isArray(order.items) ? order.items : [];
            orderItems.forEach((item: any) => {
              const name = item?.name;
              const qty = Number(item?.quantity) || 0;
              const price = Number(item?.price) || 0;
              if (!name) return;

              if (!tally[name]) tally[name] = { total_sold: 0, revenue: 0 };
              tally[name].total_sold += qty;
              tally[name].revenue += qty * price;
            });
          });

          return Object.entries(tally)
            .map(([item_name, v]) => ({ item_name, ...v }))
            .sort((a, b) => b.total_sold - a.total_sold);
        },
        { ttlMs: 2 * 60 * 1000 }
      );
      setStats(data);
    } catch (err) {
      console.error('AdminDashboard: orders fetch exception', err);
      setStatsError('Failed to load stats');
      setStats([]);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!supabase) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const data = await getCachedData<OrderRow[]>(
        'admin-orders',
        async () => {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('AdminDashboard: orders fetch error', error);
            return [];
          }
          return data || [];
        },
        { ttlMs: 2 * 60 * 1000 }
      );
      setOrders(data);
    } catch (err) {
      console.error('AdminDashboard: orders fetch exception', err);
      setOrdersError('Failed to load orders');
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!supabase) return;
    setUpdatingOrderId(orderId);
    try {
      const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      if (error) {
        console.error('AdminDashboard: order status update error', error);
        alert('Failed to update order status: ' + error.message);
        return;
      }
      fetchOrders();
    } catch (err) {
      console.error('AdminDashboard: order status update exception', err);
      alert('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchStats();
    fetchOrders();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bakemart_deleted_static_items', JSON.stringify([...deletedStaticIds]));
    } catch {
      // ignore storage errors
    }
  }, [deletedStaticIds]);

  const startEdit = (item: MenuItemRow) => {
    setEditingId(item.id);
    setEditForm(item);
    setEditImage(null);
    setRemoveImage(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditImage(null);
    setRemoveImage(false);
  };

  const saveEdit = async () => {
    if (!editingId || !supabase) return;
    setUploading(true);
    try {
      let imageUrl = editForm.image || null;
      if (removeImage) {
        if (editForm.image && editForm.image.startsWith('http')) {
          await deleteMenuItemImage(editForm.image as string);
        }
        imageUrl = null;
      } else if (editImage) {
        imageUrl = await uploadMenuItemImage(editImage, editingId);
      }

      const updateData: Record<string, unknown> = {
        name: editForm.name,
        price: editForm.price,
        description: editForm.description,
        badge: editForm.badge || null,
        category: editForm.category,
        available: editForm.available ?? true,
      };
      if (imageUrl !== undefined) {
        updateData.image = imageUrl;
      }

      if (staticOnlyIds.has(editingId)) {
        const { error } = await supabase.from('menu_items').insert([{ id: editingId, ...updateData }]);
        if (error) {
          console.error('Supabase insert error:', error);
          alert('Failed to add item to database: ' + error.message);
          return;
        }
        setStaticOnlyIds((prev) => {
          const next = new Set(prev);
          next.delete(editingId);
          return next;
        });
      } else {
        const { error } = await supabase.from('menu_items').update(updateData).eq('id', editingId);
        if (error) {
          console.error('Supabase update error:', error);
          alert('Failed to save item: ' + error.message);
          return;
        }
      }

      setEditingId(null);
      setEditImage(null);
      setRemoveImage(false);
      invalidateCache('admin-menu-items');
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
    if (staticOnlyIds.has(item.id)) {
      setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, available: !i.available } : i));
      window.dispatchEvent(new Event('menu-updated'));
      return;
    }
    try {
      await supabase.from('menu_items').update({ available: !item.available }).eq('id', item.id);
      invalidateCache('admin-menu-items');
      fetchItems();
      window.dispatchEvent(new Event('menu-updated'));
    } catch (err) {
      console.error('AdminDashboard: toggle available error', err);
      alert('Failed to update availability');
    }
  };

  const deleteItem = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Delete this item permanently?')) return;
    if (staticOnlyIds.has(id)) {
      setDeletedStaticIds((prev) => new Set(prev).add(id));
      setItems((prev) => prev.filter((item) => item.id !== id));
      window.dispatchEvent(new Event('menu-updated'));
      return;
    }
    try {
      await supabase.from('menu_items').delete().eq('id', id);
      invalidateCache('admin-menu-items');
      fetchItems();
      window.dispatchEvent(new Event('menu-updated'));
    } catch (err) {
      console.error('AdminDashboard: delete item error', err);
      alert('Failed to delete item');
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
      let imageUrl = null;
      if (newItemImage) {
        imageUrl = await uploadMenuItemImage(newItemImage, newItem.id);
      }
      await supabase.from('menu_items').insert([{ ...newItem, available: true, image: imageUrl }]);
      setNewItem({ id: '', name: '', category: '', price: 0, description: '', badge: '' });
      setNewItemImage(null);
      setShowAddForm(false);
      invalidateCache('admin-menu-items');
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
    const name = (item.name || '').toLowerCase();
    const category = (item.category || '').toLowerCase();
    const description = (item.description || '').toLowerCase();
    const badge = item.badge ? item.badge.toLowerCase() : '';
    return (
      name.includes(q) ||
      category.includes(q) ||
      description.includes(q) ||
      badge.includes(q)
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
        {/* Tab navigation */}
        <div className="flex gap-2 mb-6 border-b border-[#EADECB]">
          {(['menu', 'orders', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#000000] text-[#000000]'
                  : 'border-transparent text-[#000000]/50 hover:text-[#000000]'
              }`}
            >
              {tab === 'stats' ? 'Popular Items' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-[#EADECB]">
            <h2 className="font-serif text-lg font-bold text-[#000000] mb-4">Orders</h2>

            {ordersLoading ? (
              <p className="text-[#000000]/60 text-sm">Loading orders...</p>
            ) : ordersError ? (
              <p className="text-red-500 text-sm">Error loading orders: {ordersError}</p>
            ) : orders.length === 0 ? (
              <p className="text-[#000000]/50 text-sm">No orders yet — they'll show up here as customers order.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const orderItems = Array.isArray(order.items) ? order.items : [];
                  return (
                    <div key={order.id} className="border border-[#EADECB] rounded-xl p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#000000]">Order #{order.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${statusColor(order.status)}`}>
                            {order.status || 'unknown'}
                          </span>
                        </div>
                        <span className="text-xs text-[#000000]/50">
                          {order.created_at ? new Date(order.created_at).toLocaleString() : order.date}
                        </span>
                      </div>

                      <div className="text-xs text-[#000000]/70 mb-2">
                        {order.order_type && <span className="mr-3">Type: {order.order_type}</span>}
                        {order.table_number && <span className="mr-3">Table: {order.table_number}</span>}
                        {order.delivery_address && <span>Deliver to: {order.delivery_address}</span>}
                      </div>

                      <ul className="text-xs text-[#000000]/80 mb-3 space-y-0.5">
                        {orderItems.map((item: any, idx: number) => (
                          <li key={idx}>
                            {item.quantity}× {item.name}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono font-bold text-sm text-[#000000]">
                          KSh {(order.total_amount || 0).toLocaleString()}
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                          {ORDER_STATUSES.map((s) => (
                            <button
                              key={s}
                              disabled={updatingOrderId === order.id || order.status === s}
                              onClick={() => updateOrderStatus(order.id, s)}
                              className={`text-[10px] px-2.5 py-1.5 rounded-full font-semibold border transition-all active:scale-95 disabled:opacity-40 ${
                                order.status === s
                                  ? 'bg-[#000000] text-white border-[#000000]'
                                  : 'bg-[#FAF3E7] hover:bg-[#EADECB] text-[#000000] border-[#D8C7B0]'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-[#EADECB]">
            <h2 className="font-serif text-lg font-bold text-[#000000] mb-4">Popular Items</h2>

            {statsLoading ? (
              <p className="text-[#000000]/60 text-sm">Loading stats...</p>
            ) : statsError ? (
              <p className="text-red-500 text-sm">Error loading stats: {statsError}</p>
            ) : stats.length === 0 ? (
              <p className="text-[#000000]/50 text-sm">No orders yet — stats will appear here once customers start ordering.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#EADECB] text-left text-[#000000]/60 uppercase text-[10px] tracking-wider">
                      <th className="py-2 pr-4 font-semibold">Item</th>
                      <th className="py-2 pr-4 font-semibold">Sold</th>
                      <th className="py-2 pr-4 font-semibold">Revenue (KSh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((stat) => (
                      <tr key={stat.item_name} className="border-b border-[#EADECB]">
                        <td className="py-2 pr-4 font-semibold text-[#000000]">{stat.item_name}</td>
                        <td className="py-2 pr-4 text-[#000000]">{stat.total_sold}</td>
                        <td className="py-2 pr-4 font-mono text-[#000000]">{stat.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'menu' && (
        <>
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
                            {getEffectiveImage(editForm as MenuItemRow) && !removeImage ? (
                              <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#FAF3E7] border border-[#EADECB]">
                                <img
                                  src={getEffectiveImage(editForm as MenuItemRow) || ''}
                                  alt={editForm.name || 'Item'}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const staticItem = MENU_ITEMS.find((mi) => mi.id === (editForm as MenuItemRow).id);
                                    if (staticItem?.image) {
                                      (e.target as HTMLImageElement).src = staticItem.image;
                                    } else {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }
                                  }}
                                />
                               <button
                                 onClick={() => {
                                   setRemoveImage(true);
                                   setEditImage(null);
                                 }}
                                 className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-all active:scale-95"
                                 title="Remove image"
                               >
                                 <X className="w-3.5 h-3.5" />
                               </button>
                             </div>
                           ) : removeImage ? (
                             <div className="w-full h-40 rounded-lg overflow-hidden bg-[#FAF3E7] border border-[#EADECB] flex items-center justify-center">
                               <span className="text-[10px] font-bold uppercase tracking-wider text-[#000000]/30">Image Removed</span>
                             </div>
                           ) : null}
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
                             {getEffectiveImage(item) ? (
                               <img
                                 src={getEffectiveImage(item) || ''}
                                 alt={item.name}
                                 className="w-full h-full object-cover"
                                 onError={(e) => {
                                   const staticItem = MENU_ITEMS.find((mi) => mi.id === item.id);
                                   if (staticItem?.image) {
                                     (e.target as HTMLImageElement).src = staticItem.image;
                                   } else {
                                     (e.target as HTMLImageElement).src = '';
                                     (e.target as HTMLImageElement).style.display = 'none';
                                   }
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
                             <p className="text-xs text-[#000000]/50 line-clamp-2 mb-2">{item.description || ''}</p>
                             <span className="font-mono font-bold text-[#000000] text-sm">KSh {(item.price || 0).toLocaleString()}</span>
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
        </>
        )}
      </div>
    </div>
  );
};