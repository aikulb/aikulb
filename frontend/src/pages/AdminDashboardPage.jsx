import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';
import { ShieldCheck, Plus, Trash2, Edit3, DollarSign, ShoppingBag, Users, Layers, CheckCircle2 } from 'lucide-react';

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
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-neutral-900 font-manrope">
        <div className="animate-spin w-8 h-8 border-4 border-[#FF3838] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Admin Title */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#FF3838] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#FF3838]" />
              <span>aikulb Super Admin Panel</span>
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 font-heading">Platform Administration</h1>
          </div>
        </div>

        {/* Metrics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
              <div className="text-xs font-mono text-neutral-500 uppercase font-bold">Total Revenue</div>
              <div className="text-3xl font-black text-neutral-900 font-heading mt-1">₹{stats.totalRevenue}</div>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
              <div className="text-xs font-mono text-purple-600 uppercase font-bold">Total Orders</div>
              <div className="text-3xl font-black text-neutral-900 font-heading mt-1">{stats.totalOrders}</div>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
              <div className="text-xs font-mono text-emerald-600 uppercase font-bold">Total Users</div>
              <div className="text-3xl font-black text-neutral-900 font-heading mt-1">{stats.totalUsers}</div>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
              <div className="text-xs font-mono text-amber-600 uppercase font-bold">Active Profiles</div>
              <div className="text-3xl font-black text-neutral-900 font-heading mt-1">{stats.totalProfiles}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Add Product Form */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-neutral-900 font-heading flex items-center space-x-2">
              <Plus className="w-5 h-5 text-[#FF3838]" />
              <span>Add New Hardware Product</span>
            </h3>

            {created && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Product created!</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-600 block mb-1 font-semibold">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-bold focus:outline-none focus:border-[#FF3838]"
                />
              </div>

              <div>
                <label className="text-neutral-600 block mb-1 font-semibold">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-bold focus:outline-none focus:border-[#FF3838]"
                />
              </div>

              <div>
                <label className="text-neutral-600 block mb-1 font-semibold">Material</label>
                <input
                  type="text"
                  required
                  value={newProdMaterial}
                  onChange={(e) => setNewProdMaterial(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                />
              </div>

              <div>
                <label className="text-neutral-600 block mb-1 font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF3838] hover:bg-[#e62e2e] text-white font-bold text-xs shadow-lg transition"
              >
                Publish Product
              </button>
            </form>
          </div>

          {/* Right Product List */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-neutral-900 font-heading">Manage Products Catalog ({products.length})</h3>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white border border-neutral-200 flex justify-between items-center text-xs shadow-sm">
                  <div>
                    <div className="font-bold text-neutral-900 text-sm">{p.name}</div>
                    <div className="text-neutral-500 text-[11px] font-medium">{p.material} • Stock: {p.stock}</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-[#FF3838] font-mono text-sm">₹{p.price}</span>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
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
