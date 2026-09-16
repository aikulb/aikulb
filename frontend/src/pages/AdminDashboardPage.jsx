import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';
import { ShieldCheck, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New product state
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(1999);
  const [newProdMaterial, setNewProdMaterial] = useState('Matte Black Stainless Steel');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    const [statsRes, prodRes] = await Promise.all([
      api.getAdminStats(),
      api.getProducts(),
    ]);

    if (statsRes.success) setStats(statsRes.data.stats);
    if (prodRes.success) setProducts(prodRes.data);
    setLoading(false);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const res = await api.createAdminProduct({
      name: newProdName,
      price: Number(newProdPrice),
      material: newProdMaterial,
      description: newProdDesc,
    });
    if (res.success) {
      setCreated(true);
      fetchAdminData();
      setNewProdName('');
      setTimeout(() => setCreated(false), 3000);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete product?')) {
      const res = await api.deleteAdminProduct(id);
      if (res.success) fetchAdminData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A0F] flex items-center justify-center text-white font-manrope">
        <div className="animate-spin w-8 h-8 border-4 border-[#00DC82] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Admin Title */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-emerald-950">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#00DC82] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#00DC82]" />
              <span>aikulb Super Admin Panel</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-heading">Platform Administration</h1>
          </div>
        </div>

        {/* Metrics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-[#0D121B] border border-emerald-900/50 shadow-lg">
              <div className="text-xs font-mono text-slate-400 uppercase font-bold">Total Revenue</div>
              <div className="text-3xl font-black text-[#00DC82] font-heading mt-1">₹{stats.totalRevenue}</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D121B] border border-emerald-900/50 shadow-lg">
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Total Orders</div>
              <div className="text-3xl font-black text-white font-heading mt-1">{stats.totalOrders}</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D121B] border border-emerald-900/50 shadow-lg">
              <div className="text-xs font-mono text-green-400 uppercase font-bold">Total Users</div>
              <div className="text-3xl font-black text-white font-heading mt-1">{stats.totalUsers}</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D121B] border border-emerald-900/50 shadow-lg">
              <div className="text-xs font-mono text-teal-400 uppercase font-bold">Active Profiles</div>
              <div className="text-3xl font-black text-white font-heading mt-1">{stats.totalProfiles}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Add Product Form */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0D121B] border border-emerald-900/50 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
              <Plus className="w-5 h-5 text-[#00DC82]" />
              <span>Add New Hardware Product</span>
            </h3>

            {created && (
              <div className="p-3 rounded-xl bg-[#10B981]/15 text-[#00DC82] border border-[#10B981]/40 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#00DC82]" />
                <span>Product created successfully!</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-inter">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070A0F] border border-emerald-900/60 text-white font-bold focus:outline-none focus:border-[#00DC82]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070A0F] border border-emerald-900/60 text-white font-bold focus:outline-none focus:border-[#00DC82]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Material</label>
                <input
                  type="text"
                  required
                  value={newProdMaterial}
                  onChange={(e) => setNewProdMaterial(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070A0F] border border-emerald-900/60 text-white font-medium focus:outline-none focus:border-[#00DC82]"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070A0F] border border-emerald-900/60 text-white font-medium focus:outline-none focus:border-[#00DC82]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-extrabold text-xs shadow-lg transition uppercase tracking-wider cursor-pointer"
              >
                Publish Product
              </button>
            </form>
          </div>

          {/* Right Product List */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0D121B] border border-emerald-900/50 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Manage Products Catalog ({products.length})</h3>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[#070A0F] border border-emerald-900/60 flex justify-between items-center text-xs shadow-sm">
                  <div>
                    <div className="font-bold text-white text-sm">{p.name}</div>
                    <div className="text-slate-400 text-[11px] font-medium">{p.material} • Stock: {p.stock}</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-[#00DC82] font-mono text-sm">₹{p.price}</span>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
