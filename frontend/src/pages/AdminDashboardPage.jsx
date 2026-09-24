import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';

import {
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  Edit3,
  Star,
  Search,
  Sparkles,
  Package,
  Layers,
  Tag,
  SlidersHorizontal,
  Eye,
  RefreshCw,
  X,
  CreditCard,
  Zap,
  Check,
  AlertTriangle,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  UserCheck
} from 'lucide-react';

const PRESET_CARDS = [
  { label: 'Matte Black Steel', material: 'Matte Black Stainless Steel', category_id: 'cat-metal', image_url: '/assets/products/metal_black.svg', defaultPrice: 1999, defaultOrig: 2999 },
  { label: '24K Gold Metal', material: '24K Electroplated Gold Metal', category_id: 'cat-metal', image_url: '/assets/products/metal_gold.svg', defaultPrice: 2399, defaultOrig: 3499 },
  { label: 'Brushed Silver Steel', material: 'Brushed Silver Steel', category_id: 'cat-metal', image_url: '/assets/products/metal_silver.svg', defaultPrice: 1999, defaultOrig: 2799 },
  { label: 'Dark Walnut Wood', material: 'Organic Dark Walnut Wood', category_id: 'cat-wood', image_url: '/assets/products/wood_walnut.svg', defaultPrice: 1499, defaultOrig: 1999 },
  { label: 'Sustainable Bamboo', material: 'Natural Sustainable Bamboo', category_id: 'cat-wood', image_url: '/assets/products/wood_bamboo.svg', defaultPrice: 1399, defaultOrig: 1899 },
  { label: 'Waterproof PVC', material: 'Matte Waterproof PVC', category_id: 'cat-pvc', image_url: '/assets/products/pvc_card.svg', defaultPrice: 999, defaultOrig: 1499 },
  { label: 'Acrylic Smart Stand', material: 'Crystal Acrylic & NFC Core', category_id: 'cat-stand', image_url: '/assets/products/smart_stand.svg', defaultPrice: 799, defaultOrig: 1199 },
  { label: 'Google Review Card', material: 'Gloss Smart PVC & NFC', category_id: 'cat-review', image_url: '/assets/products/review_card.svg', defaultPrice: 599, defaultOrig: 999 },
];

const parseOrderAddress = (rawAddress) => {
  if (!rawAddress) return null;
  if (typeof rawAddress === 'object') return rawAddress;
  try {
    const parsed = JSON.parse(rawAddress);
    return typeof parsed === 'object' ? parsed : null;
  } catch (e) {
    return null;
  }
};

const parseOrderItems = (rawItems) => {
  if (!rawItems) return [];
  if (Array.isArray(rawItems)) return rawItems;
  if (typeof rawItems === 'object') return [rawItems];
  try {
    const parsed = JSON.parse(rawItems);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === 'object') return [parsed];
    return [];
  } catch (e) {
    return [];
  }
};

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state for creating product
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1999);
  const [originalPrice, setOriginalPrice] = useState(2999);
  const [material, setMaterial] = useState('Matte Black Stainless Steel');
  const [categoryId, setCategoryId] = useState('cat-metal');
  const [stock, setStock] = useState(100);
  const [imageUrl, setImageUrl] = useState('/assets/products/metal_black.svg');
  const [isFeatured, setIsFeatured] = useState(true);
  const [description, setDescription] = useState('');
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Catalog Filter & Edit Modal state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);

  // Interactive Stat Cards & Modals state
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'featured'
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [profilesModalOpen, setProfilesModalOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus, newPaymentStatus) => {
    setRecentOrders((prev) =>
      prev.map((o) =>
        o.id === orderId || o.order_number === orderId
          ? { ...o, status: newStatus || o.status, payment_status: newPaymentStatus || o.payment_status }
          : o
      )
    );

    await api.updateOrderStatus(orderId, {
      status: newStatus,
      payment_status: newPaymentStatus,
    });
    fetchAdminData();
  };

  const filteredOrders = recentOrders.filter((ord) => {
    if (!orderSearchQuery.trim()) return true;
    const q = orderSearchQuery.toLowerCase();
    const addr = parseOrderAddress(ord.shipping_address_json);
    const ordNum = (ord.order_number || ord.id || '').toLowerCase();
    const custName = (addr?.fullName || addr?.name || '').toLowerCase();
    const custEmail = (addr?.email || '').toLowerCase();
    const custPhone = (addr?.phone || '').toLowerCase();
    return ordNum.includes(q) || custName.includes(q) || custEmail.includes(q) || custPhone.includes(q);
  });

  const filteredUsers = recentUsers.filter((usr) => {
    if (!userSearchQuery.trim()) return true;
    const q = userSearchQuery.toLowerCase();
    return (
      (usr.name || '').toLowerCase().includes(q) ||
      (usr.email || '').toLowerCase().includes(q) ||
      (usr.role || '').toLowerCase().includes(q)
    );
  });


  const fetchAdminData = async () => {
    setLoading(true);
    const [statsRes, prodRes] = await Promise.all([
      api.getAdminStats(),
      api.getProducts(),
    ]);

    if (statsRes.success && statsRes.data) {
      setStats(statsRes.data.stats);
      setRecentOrders(statsRes.data.recentOrders || []);
      setRecentUsers(statsRes.data.recentUsers || []);
    }
    if (prodRes.success && prodRes.data) {
      setProducts(prodRes.data);
    }
    setLoading(false);
  };

  const selectPreset = (preset) => {
    setMaterial(preset.material);
    setCategoryId(preset.category_id);
    setImageUrl(preset.image_url);
    setPrice(preset.defaultPrice);
    setOriginalPrice(preset.defaultOrig);
    if (!name) {
      setName(`AI KLUB ${preset.label}`);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Product Name is required.');
      return;
    }
    setFormError('');
    setActionLoading(true);

    const res = await api.createAdminProduct({
      name: name.trim(),
      price: Number(price),
      original_price: Number(originalPrice || price),
      material,
      category_id: categoryId,
      stock: Number(stock),
      image_url: imageUrl,
      is_featured: isFeatured,
      description: description.trim() || `Premium ${material} smart card with embedded NFC & QR technology.`,
      short_description: `Premium ${material} NFC smart card.`,
    });

    setActionLoading(false);

    if (res.success) {
      setCreatedSuccess(true);
      fetchAdminData();
      setName('');
      setDescription('');
      setTimeout(() => setCreatedSuccess(false), 4000);
    } else {
      setFormError(res.message || 'Failed to create product.');
    }
  };

  const handleToggleFeatured = async (product) => {
    const newFeaturedState = !product.is_featured;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_featured: newFeaturedState } : p))
    );
    await api.updateAdminProduct(product.id, { is_featured: newFeaturedState });
    fetchAdminData();
  };

  const handleDeleteProduct = async (id, prodName) => {
    if (window.confirm(`Are you sure you want to delete "${prodName}"? This will remove it from all store pages.`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      const res = await api.deleteAdminProduct(id);
      if (res.success) {
        fetchAdminData();
      }
    }
  };

  const handleSaveEditProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setActionLoading(true);

    const res = await api.updateAdminProduct(editingProduct.id, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      original_price: Number(editingProduct.original_price),
      material: editingProduct.material,
      stock: Number(editingProduct.stock),
      is_featured: editingProduct.is_featured,
      description: editingProduct.description,
      image_url: editingProduct.image_url,
    });

    setActionLoading(false);

    if (res.success) {
      setEditingProduct(null);
      fetchAdminData();
    } else {
      alert(res.message || 'Failed to update product');
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMaterial =
      selectedMaterialFilter === 'all'
        ? true
        : p.material.toLowerCase().includes(selectedMaterialFilter.toLowerCase());

    const matchesFeatured =
      filterMode === 'featured' ? Boolean(p.is_featured) : true;

    return matchesSearch && matchesMaterial && matchesFeatured;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center text-neutral-900 font-sans">
        <div className="animate-spin w-10 h-10 border-4 border-[#00DC82] border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-500 font-mono text-xs font-bold">Loading Admin Panel & Inventory Sync...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#00875A] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#00875A]" />
              <span>AI KLUB Super Admin Panel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-manrope">
              Card & Product Management
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 font-inter">
              Add new custom smart cards, manage live hardware stock, and sync catalog instantly across all pages.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAdminData}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-bold flex items-center space-x-2 transition shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#00875A]" />
              <span>Refresh Catalog</span>
            </button>
          </div>
        </div>

        {/* Overview Stats - Interactive Clickable Cards with Active Indicators & Modals */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            
            {/* Box 1: Total Catalog Cards */}
            <div
              onClick={() => setFilterMode('all')}
              className={`p-6 rounded-3xl border shadow-sm relative overflow-hidden group cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                filterMode === 'all'
                  ? 'bg-emerald-50/80 border-[#00875A] ring-2 ring-[#00875A]/40 shadow-md'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-emerald-300'
              }`}
              title="Click to view & manage all catalog cards"
            >
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-[#00875A]" />
                  <span>Total Catalog Cards</span>
                </div>
                {filterMode === 'all' && (
                  <span className="text-[10px] bg-[#00875A] text-white px-2 py-0.5 rounded-full font-sans font-bold">Active</span>
                )}
              </div>
              <div className="text-3xl font-black text-[#00875A] font-manrope mt-2">{products.length}</div>
              <div className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center justify-between">
                <span>Live in store & portfolio</span>
                <span className="text-[#00875A] font-bold">View All →</span>
              </div>
            </div>

            {/* Box 2: Featured Cards Filter */}
            <div
              onClick={() => setFilterMode(filterMode === 'featured' ? 'all' : 'featured')}
              className={`p-6 rounded-3xl border shadow-sm relative overflow-hidden group cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                filterMode === 'featured'
                  ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/40 shadow-md'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-amber-300'
              }`}
              title="Click to filter homepage featured cards"
            >
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Featured Cards</span>
                </div>
                {filterMode === 'featured' && (
                  <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-sans font-bold">Filtered</span>
                )}
              </div>
              <div className="text-3xl font-black text-amber-600 font-manrope mt-2">
                {products.filter((p) => p.is_featured).length}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center justify-between">
                <span>Shown on Homepage</span>
                <span className="text-amber-600 font-bold">{filterMode === 'featured' ? 'Clear Filter' : 'Filter →'}</span>
              </div>
            </div>

            {/* Box 3: Total Orders & Revenue Dedicated Page Trigger */}
            <div
              onClick={() => navigate('/admin/orders')}
              className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:border-purple-300 hover:shadow-md hover:bg-purple-50/40"
              title="Click to open Orders & Revenue Management Studio in a new dedicated page"
            >
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>Total Orders</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-sans font-bold">Manage Page</span>
                  <a
                    href="/admin/orders"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-slate-400 hover:text-purple-600 transition"
                    title="Open in new browser tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="text-3xl font-black text-neutral-900 font-manrope mt-2">{stats.totalOrders}</div>
              <div className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center justify-between">
                <span>Revenue: ₹{stats.totalRevenue}</span>
                <span className="text-purple-600 font-bold flex items-center space-x-1">
                  <span>Open Orders Page</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </span>
              </div>
            </div>

            {/* Box 4: Registered Profiles & Users Dedicated Page Trigger */}
            <div
              onClick={() => navigate('/admin/users')}
              className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:border-teal-300 hover:shadow-md hover:bg-teal-50/40"
              title="Click to view User Database & Registered Profiles in a new dedicated page"
            >
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>Registered Profiles</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-sans font-bold">Users Page</span>
                  <a
                    href="/admin/users"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-slate-400 hover:text-teal-600 transition"
                    title="Open in new browser tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="text-3xl font-black text-neutral-900 font-manrope mt-2">{stats.totalProfiles}</div>
              <div className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center justify-between">
                <span>{stats.totalUsers} users registered</span>
                <span className="text-teal-600 font-bold flex items-center space-x-1">
                  <span>Open Users Page</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </span>
              </div>
            </div>


          </div>
        )}

        {/* Active Filter Banner */}
        {filterMode === 'featured' && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Filtering Catalog: Showing only Homepage Featured Cards ({products.filter((p) => p.is_featured).length} items)</span>
            </div>
            <button
              onClick={() => setFilterMode('all')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Main 2-Column Section: Left Add Product Form, Right Live Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Left Column: Add Card Form & Live Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#00875A]">
                    <Plus className="w-5 h-5 text-[#00875A]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-neutral-900 font-manrope">Add New Card</h2>
                    <p className="text-[11px] text-slate-500 font-medium">Create & publish smart NFC product</p>
                  </div>
                </div>
              </div>

              {createdSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-[#00875A] border border-emerald-200 text-xs font-bold flex items-center space-x-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[#00875A]" />
                  <div>
                    <div>Card created successfully!</div>
                    <div className="text-[11px] font-normal text-emerald-800">It is now visible across Store & Showcase pages.</div>
                  </div>
                </div>
              )}

              {formError && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Quick Presets Selector */}
              <div className="mb-6">
                <label className="text-slate-800 text-xs font-bold block mb-2 flex items-center space-x-1.5 font-manrope">
                  <Sparkles className="w-3.5 h-3.5 text-[#00875A]" />
                  <span>Quick Material & Visual Presets:</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_CARDS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => selectPreset(preset)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition border cursor-pointer ${
                        material === preset.material
                          ? 'bg-[#00DC82]/15 border-[#00DC82] text-emerald-900 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-700 hover:text-black hover:border-slate-400 shadow-xs'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-inter">
                <div>
                  <label className="text-slate-800 block mb-1 font-bold font-manrope">Card Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI KLUB Executive Black Titanium Card"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-800 block mb-1 font-bold font-manrope">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-bold focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-800 block mb-1 font-bold font-manrope">MRP / Original (₹)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-500 font-bold focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-800 block mb-1 font-bold font-manrope">Material Description *</label>
                    <input
                      type="text"
                      required
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-medium focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-800 block mb-1 font-bold font-manrope">Stock Quantity</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-bold focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-800 block mb-1 font-bold font-manrope">Category</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-medium focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                    >
                      <option value="cat-metal">Metal NFC Cards</option>
                      <option value="cat-wood">Wooden NFC Cards</option>
                      <option value="cat-pvc">PVC Smart Cards</option>
                      <option value="cat-stand">Smart NFC Standees</option>
                      <option value="cat-review">NFC Review Products</option>
                      <option value="cat-social">NFC Social Cards</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-800 block mb-1 font-bold font-manrope">Visual Asset / Image</label>
                    <select
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-medium focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                    >
                      <option value="/assets/products/metal_black.svg">Black Metal Style</option>
                      <option value="/assets/products/metal_gold.svg">Gold Metal Style</option>
                      <option value="/assets/products/metal_silver.svg">Silver Metal Style</option>
                      <option value="/assets/products/wood_walnut.svg">Walnut Wood Style</option>
                      <option value="/assets/products/wood_bamboo.svg">Bamboo Wood Style</option>
                      <option value="/assets/products/pvc_card.svg">PVC Card Style</option>
                      <option value="/assets/products/smart_stand.svg">Acrylic Stand Style</option>
                      <option value="/assets/products/review_card.svg">Google Review Style</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-800 block mb-1 font-bold font-manrope">Product Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter detailed description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-neutral-900 font-medium focus:outline-none focus:border-[#00DC82] transition shadow-xs"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-[#00DC82] bg-white border-slate-300 focus:ring-0"
                    />
                    <span className="text-slate-800 font-bold text-xs font-manrope">Featured on Homepage Portfolio</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-105 text-white font-black text-xs shadow-md transition uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-2 mt-4 font-manrope"
                >
                  {actionLoading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Publish Card To Database</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Live Interactive Card Preview Card */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-[#00875A]" />
                  <span>LIVE CARD PREVIEW</span>
                </span>
                <span className="text-[#00875A]">Card View</span>
              </div>

              <div className="relative aspect-[1.586/1] rounded-2xl p-6 bg-gradient-to-br from-[#121926] via-[#070A0F] to-[#121926] border border-slate-700 shadow-xl flex flex-col justify-between overflow-hidden group text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00DC82]/10 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-start z-10">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#00DC82] font-extrabold uppercase">
                      ai klub.
                    </div>
                    <div className="text-sm font-extrabold text-white mt-1">
                      {name || 'Card Preview Title'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">{material}</div>
                  </div>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-12 h-12 object-contain drop-shadow-md rounded-lg bg-black/40 p-1 border border-white/10"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/products/metal_black.svg';
                    }}
                  />
                </div>

                <div className="flex justify-between items-end z-10">
                  <div>
                    <span className="text-lg font-black text-[#00DC82] font-mono">
                      ₹{price || 1999}
                    </span>
                    {originalPrice > price && (
                      <span className="text-xs text-slate-500 line-through font-mono ml-2">
                        ₹{originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-[#00DC82] font-bold">
                    NFC + QR ENABLED
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Manage Catalog List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-6">
              
              {/* Header with Search & Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-lg font-extrabold text-neutral-900 font-manrope flex items-center space-x-2">
                    <Package className="w-5 h-5 text-[#00875A]" />
                    <span>Live Hardware Catalog ({filteredProducts.length})</span>
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">All products stored in database</p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search cards by name/sku..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-neutral-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#00DC82] shadow-xs"
                  />
                </div>
              </div>

              {/* Material Filters */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                <span className="text-slate-600 font-bold flex items-center space-x-1 shrink-0 font-manrope">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter:</span>
                </span>
                {['all', 'metal', 'wood', 'pvc', 'acrylic', 'review'].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterialFilter(mat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition capitalize cursor-pointer shrink-0 ${
                      selectedMaterialFilter === mat
                        ? 'bg-[#00DC82] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:text-black border border-slate-300'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>

              {/* Products List Grid */}
              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono font-bold">
                    No products found matching "{searchQuery}".
                  </div>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs group"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={p.image_url || '/assets/products/metal_black.svg'}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-contain bg-slate-900 p-1.5 border border-slate-300 shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/products/metal_black.svg';
                          }}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-neutral-900 text-sm font-manrope">{p.name}</span>
                            {p.is_featured && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold font-mono">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium flex items-center space-x-3 mt-0.5">
                            <span>{p.material}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-400">{p.sku || p.id}</span>
                            <span>•</span>
                            <span
                              className={`font-mono font-bold ${
                                p.stock > 50
                                  ? 'text-[#00875A]'
                                  : p.stock > 0
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                              }`}
                            >
                              Stock: {p.stock}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        <div className="text-right">
                          <div className="font-black text-[#00875A] font-mono text-sm">₹{p.price}</div>
                          {p.original_price > p.price && (
                            <div className="text-[10px] text-slate-400 line-through font-mono">
                              ₹{p.original_price}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            className={`p-2 rounded-xl border transition cursor-pointer ${
                              p.is_featured
                                ? 'bg-amber-50 border-amber-300 text-amber-600'
                                : 'bg-slate-100 border-slate-300 text-slate-500 hover:text-black'
                            }`}
                            title={p.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>

                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 text-neutral-900">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Edit Product</h3>
                <p className="text-xs text-slate-500 font-medium">{editingProduct.name}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs font-inter">
              <div>
                <label className="text-slate-800 block mb-1 font-bold font-manrope">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-bold focus:outline-none focus:border-[#00DC82]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-800 block mb-1 font-bold font-manrope">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-bold focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
                <div>
                  <label className="text-slate-800 block mb-1 font-bold font-manrope">MRP / Original (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.original_price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, original_price: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-500 font-bold focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-800 block mb-1 font-bold font-manrope">Material</label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-medium focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
                <div>
                  <label className="text-slate-800 block mb-1 font-bold font-manrope">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-bold focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-800 block mb-1 font-bold font-manrope">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-medium focus:outline-none focus:border-[#00DC82]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="editFeatured"
                  checked={editingProduct.is_featured}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00DC82] bg-white border-slate-300"
                />
                <label htmlFor="editFeatured" className="text-slate-800 font-bold cursor-pointer font-manrope">
                  Featured Product
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer font-manrope"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-xl bg-[#00DC82] hover:bg-emerald-400 text-white font-black uppercase tracking-wider cursor-pointer font-manrope"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 1: Interactive Orders & Revenue Management Studio */}
      {ordersModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="p-6 bg-[#0F172A] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-manrope">Orders & Revenue Management Studio</h3>
                  <p className="text-xs text-slate-300 font-inter">Live Customer Card Orders ({recentOrders.length} orders • ₹{stats?.totalRevenue || 0} total revenue)</p>
                </div>
              </div>
              <button
                onClick={() => setOrdersModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter / Search Bar */}
            <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search orders by Order #, Customer Name, Phone, Email..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-bold hidden sm:inline">
                DB Real-time Sync Active
              </span>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-medium">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No customer orders match search query.</p>
                </div>
              ) : (
                filteredOrders.map((ord) => {
                  const addr = parseOrderAddress(ord.shipping_address_json);
                  const items = parseOrderItems(ord.items_json);

                  const custName = addr?.fullName || addr?.name || addr?.recipient || 'Customer';
                  const custEmail = addr?.email || 'N/A';
                  const custPhone = addr?.phone || addr?.mobile || ord?.phone || '';
                  const cleanDigits = custPhone.replace(/\D/g, '');
                  const waTarget = cleanDigits.length >= 10
                    ? (cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits)
                    : '917799529358';

                  return (
                    <div key={ord.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-purple-300 transition shadow-xs">
                      {/* Header line */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-neutral-900 font-mono text-base">{ord.order_number || ord.id}</span>
                            
                            {/* Live Editable Order Status */}
                            <select
                              value={ord.status || 'Processing'}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value, ord.payment_status)}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[11px] rounded-lg px-2.5 py-0.5 border border-purple-300 cursor-pointer focus:outline-none"
                              title="Click to update order status in database"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* Live Editable Payment Status */}
                            <select
                              value={ord.payment_status || 'Paid'}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, ord.status, e.target.value)}
                              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] rounded-lg px-2.5 py-0.5 border border-emerald-300 cursor-pointer focus:outline-none"
                              title="Click to update payment status in database"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Cash on Delivery">Cash on Delivery</option>
                              <option value="Pending">Pending</option>
                              <option value="Refunded">Refunded</option>
                            </select>

                          </div>
                          <p className="text-xs text-slate-500 mt-1">Placed on {new Date(ord.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-black text-emerald-600 font-manrope">₹{ord.total_amount || 1999}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{ord.payment_method || 'UPI / Cash on Delivery'}</div>
                        </div>
                      </div>

                      {/* 2-Column Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-inter">
                        {/* Left Column: Customer Shipping Address */}
                        <div>
                          <span className="font-bold text-slate-700 block mb-1.5 flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-purple-600" />
                            <span>Customer Shipping Address:</span>
                          </span>
                          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1 text-slate-700 shadow-2xs">
                            <div className="font-extrabold text-neutral-900 font-manrope text-xs flex items-center justify-between">
                              <span>{custName}</span>
                              {custPhone && (
                                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  📞 {custPhone}
                                </span>
                              )}
                            </div>
                            {custEmail !== 'N/A' && (
                              <div className="text-slate-500 text-[11px] font-medium">✉️ {custEmail}</div>
                            )}
                            <div className="text-slate-600 font-medium pt-1.5 border-t border-slate-100 mt-1">
                              📍 {[addr?.address, addr?.city, addr?.state, addr?.pincode].filter(Boolean).join(', ') || 'Express Shipping Dispatch'}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Ordered Smart Items */}
                        <div>
                          <span className="font-bold text-slate-700 block mb-1.5 flex items-center space-x-1">
                            <Package className="w-3.5 h-3.5 text-purple-600" />
                            <span>Ordered Smart Items:</span>
                          </span>
                          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2 text-slate-700 shadow-2xs">
                            {items.length === 0 ? (
                              <div>
                                <div className="font-bold text-neutral-900">1x AI KLUB Custom NFC Business Card</div>
                                <div className="text-[11px] text-slate-500">Matte Black Stainless Steel • NFC + QR Hardware Core</div>
                              </div>
                            ) : (
                              items.map((it, idx) => (
                                <div key={idx} className="flex items-center justify-between gap-2 pb-1.5 border-b last:border-b-0 last:pb-0 border-slate-100">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-7 h-7 rounded-md bg-slate-900 text-[#00DC82] flex items-center justify-center font-bold text-[9px] font-mono shrink-0">
                                      NFC
                                    </div>
                                    <div>
                                      <div className="font-bold text-neutral-900 text-xs">{it.name || it.title || 'AI KLUB Smart Card'}</div>
                                      <div className="text-[10px] text-slate-500">{it.material || it.style || 'NFC Embedded'}</div>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="font-extrabold text-emerald-600 font-mono">{it.quantity || it.qty || 1}x ₹{it.price || (ord.total_amount || 1999)}</span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                        <a
                          href={`https://wa.me/${waTarget}?text=Hi%20${encodeURIComponent(custName)},%20regarding%20your%20ai%20klub%20Order%20${encodeURIComponent(ord.order_number || ord.id)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-slate-950 font-extrabold flex items-center justify-center space-x-2 shadow-xs transition cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 fill-slate-950" />
                          <span>Chat Customer on WhatsApp ({custPhone || '+91 77995 29358'})</span>
                        </a>

                        <div className="flex items-center space-x-2 justify-end text-[11px] text-slate-500 font-mono font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Database Synced</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 text-right">
              <button
                onClick={() => setOrdersModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer hover:bg-slate-800"
              >
                Close Orders Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Interactive Registered Profiles & User Database */}
      {profilesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="p-6 bg-[#0F172A] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-manrope">Registered Profiles & User Database</h3>
                  <p className="text-xs text-slate-300 font-inter">Live Registered Profiles ({stats?.totalProfiles || 0} profiles • {stats?.totalUsers || 0} users)</p>
                </div>
              </div>
              <button
                onClick={() => setProfilesModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter / Search Bar */}
            <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search users by Name, Email, Role..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-bold hidden sm:inline">
                Live SQLite Records
              </span>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-medium">
                  <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No user profiles matching query.</p>
                </div>
              ) : (
                filteredUsers.map((usr) => (
                  <div key={usr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-teal-300 transition shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center uppercase font-manrope shrink-0">
                        {usr.name ? usr.name.substring(0, 2) : 'US'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-extrabold text-neutral-900 text-sm">{usr.name || 'AI KLUB User'}</h4>
                          <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-900 text-[10px] font-mono font-bold uppercase">{usr.role || 'customer'}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">{usr.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs justify-between sm:justify-end">
                      <span className="text-slate-400 font-mono text-[11px]">{usr.id}</span>
                      <a
                        href={`/profile/john`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center space-x-1"
                      >
                        <span>View Digital Card</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 text-right">
              <button
                onClick={() => setProfilesModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer hover:bg-slate-800"
              >
                Close Profiles Registry
              </button>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};
