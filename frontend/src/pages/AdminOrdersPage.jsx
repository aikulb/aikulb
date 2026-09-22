import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';
import {
  Zap,
  Package,
  Search,
  RefreshCw,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  Filter,
  Download,
  ShieldCheck,
  CreditCard,
  Clock,
  Check,
  ExternalLink,
  DollarSign
} from 'lucide-react';

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

export const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    setLoading(true);
    const statsRes = await api.getAdminStats();
    if (statsRes.success && statsRes.data) {
      setStats(statsRes.data.stats);
      setOrders(statsRes.data.recentOrders || []);
    }
    setLoading(false);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus, newPaymentStatus) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId || o.order_number === orderId
          ? { ...o, status: newStatus || o.status, payment_status: newPaymentStatus || o.payment_status }
          : o
      )
    );

    const res = await api.updateOrderStatus(orderId, {
      status: newStatus,
      payment_status: newPaymentStatus,
    });

    if (res.success) {
      showToast('✓ Order status updated and synced with database!');
      fetchOrdersData();
    } else {
      showToast('⚠️ Failed to update order status');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const exportOrdersCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Order Number', 'Date', 'Customer Name', 'Customer Email', 'Customer Phone', 'Total Amount', 'Status', 'Payment Status', 'Payment Method'];
    const rows = filteredOrders.map((o) => {
      const addr = parseOrderAddress(o.shipping_address_json);
      return [
        o.order_number || o.id,
        new Date(o.created_at || Date.now()).toLocaleDateString('en-IN'),
        addr?.fullName || 'Customer',
        addr?.email || 'N/A',
        addr?.phone || 'N/A',
        o.total_amount || 0,
        o.status || 'Processing',
        o.payment_status || 'Paid',
        o.payment_method || 'UPI'
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ai_klub_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Exported Orders CSV spreadsheet!');
  };

  // Filtered Orders Calculation
  const filteredOrders = orders.filter((ord) => {
    const addr = parseOrderAddress(ord.shipping_address_json);
    const ordNum = (ord.order_number || ord.id || '').toLowerCase();
    const custName = (addr?.fullName || addr?.name || '').toLowerCase();
    const custEmail = (addr?.email || '').toLowerCase();
    const custPhone = (addr?.phone || '').toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      ordNum.includes(searchQuery.toLowerCase()) ||
      custName.includes(searchQuery.toLowerCase()) ||
      custEmail.includes(searchQuery.toLowerCase()) ||
      custPhone.includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (ord.status || 'Processing').toLowerCase() === statusFilter.toLowerCase();
    const matchesPayment = paymentFilter === 'all' || (ord.payment_status || 'Paid').toLowerCase() === paymentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalRevenue = stats?.totalRevenue || orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const processingCount = orders.filter((o) => (o.status || 'Processing') === 'Processing').length;
  const deliveredCount = orders.filter((o) => (o.status || '').toLowerCase().includes('deliver') || (o.status || '').toLowerCase().includes('complet')).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold font-mono border border-slate-700 flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-[#00DC82]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4 text-purple-600" />
            <span>← Back to Card & Product Management</span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportOrdersCSV}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-black hover:bg-slate-50 text-xs font-bold flex items-center space-x-1.5 shadow-xs transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-purple-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchOrdersData}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Orders</span>
            </button>
          </div>
        </div>

        {/* Page Title & KPI Cards */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-purple-700 uppercase bg-purple-100 px-3 py-1 rounded-full border border-purple-200 mb-2">
                <Zap className="w-4 h-4 text-purple-700" />
                <span>AI KLUB Orders Studio & Revenue Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-manrope">
                Customer Orders & Fulfillment
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 font-inter">
                Manage live customer NFC smart card orders, track courier shipments, update order statuses, and chat on WhatsApp.
              </p>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Total Orders</span>
                <Package className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-neutral-900 font-manrope mt-2">{orders.length}</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">Live customer purchases</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Total Revenue</span>
                <span className="text-emerald-600 font-bold">₹</span>
              </div>
              <div className="text-3xl font-black text-emerald-600 font-manrope mt-2">₹{Math.round(totalRevenue)}</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">Gross total sales</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Processing</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-amber-600 font-manrope mt-2">{processingCount}</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">Awaiting dispatch</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Delivered</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-emerald-600 font-manrope mt-2">{deliveredCount}</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">Successfully fulfilled</div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search orders by Order #, Customer Name, Email, Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 shadow-xs font-medium"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="flex items-center space-x-3 text-xs font-inter">
              <div className="flex items-center space-x-1.5 text-slate-600 font-bold">
                <Filter className="w-3.5 h-3.5 text-purple-600" />
                <span>Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-bold text-xs focus:outline-none focus:border-purple-600"
              >
                <option value="all">All Order Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-bold text-xs focus:outline-none focus:border-purple-600"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="cash on delivery">Cash on Delivery</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

          </div>
        </div>

        {/* Orders List Container */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-xs font-mono font-bold text-slate-500">Syncing Live Orders from Database...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 font-medium">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 font-manrope">No Orders Found</h3>
            <p className="text-xs text-slate-500 mt-1">No orders matched your search query or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((ord) => {
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
                <div
                  key={ord.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-400 transition shadow-xs space-y-4 font-inter"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-black text-neutral-900 font-mono text-lg">{ord.order_number || ord.id}</span>

                        {/* Interactive Order Status Dropdown */}
                        <div className="flex items-center space-x-1.5 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                          <span className="text-[11px] text-[#6C4CFF] font-bold font-mono">Status:</span>
                          <select
                            value={ord.status || 'Processing'}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value, ord.payment_status)}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-lg px-2 py-0.5 border border-purple-300 cursor-pointer focus:outline-none"
                            title="Click to update order status in database"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Interactive Payment Status Dropdown */}
                        <div className="flex items-center space-x-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                          <span className="text-[11px] text-emerald-700 font-bold font-mono">Payment:</span>
                          <select
                            value={ord.payment_status || 'Paid'}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, ord.status, e.target.value)}
                            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-lg px-2 py-0.5 border border-emerald-300 cursor-pointer focus:outline-none"
                            title="Click to update payment status in database"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="Pending">Pending</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </div>
                      </div>


                      <p className="text-xs text-slate-500 mt-1">
                        Placed on {new Date(ord.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-600 font-manrope">₹{ord.total_amount || 1999}</div>
                      <div className="text-xs text-slate-500 font-mono font-bold mt-0.5">{ord.payment_method || 'UPI / Cash on Delivery'}</div>
                    </div>
                  </div>

                  {/* 2-Column Grid Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    
                    {/* Left Column: Customer Shipping Address */}
                    <div>
                      <span className="font-bold text-slate-800 block mb-2 flex items-center space-x-1.5 font-manrope">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>Customer Shipping Address:</span>
                      </span>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-slate-700">
                        <div className="font-extrabold text-neutral-900 font-manrope text-sm flex items-center justify-between">
                          <span>{custName}</span>
                          {custPhone && (
                            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                              📞 {custPhone}
                            </span>
                          )}
                        </div>
                        {custEmail !== 'N/A' && (
                          <div className="text-slate-600 text-xs font-medium">✉️ {custEmail}</div>
                        )}
                        <div className="text-slate-600 font-medium pt-2 border-t border-slate-200 leading-relaxed">
                          📍 {[addr?.address, addr?.city, addr?.state, addr?.pincode].filter(Boolean).join(', ') || 'Express Courier Shipping Dispatch'}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Ordered Smart Items */}
                    <div>
                      <span className="font-bold text-slate-800 block mb-2 flex items-center space-x-1.5 font-manrope">
                        <Package className="w-4 h-4 text-purple-600" />
                        <span>Ordered Smart Items ({items.length}):</span>
                      </span>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-slate-700">
                        {items.length === 0 ? (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-neutral-900">1x AI KLUB Custom NFC Business Card</div>
                              <div className="text-[11px] text-slate-500">Matte Black Stainless Steel • NFC + QR Core</div>
                            </div>
                            <span className="font-black text-emerald-600 font-mono">₹{ord.total_amount || 1999}</span>
                          </div>
                        ) : (
                          items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-3 pb-2 border-b last:border-b-0 last:pb-0 border-slate-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 text-[#00DC82] flex items-center justify-center font-bold text-[10px] font-mono shrink-0">
                                  NFC
                                </div>
                                <div>
                                  <div className="font-bold text-neutral-900 text-xs font-manrope">{it.name || it.title || 'AI KLUB Smart Card'}</div>
                                  <div className="text-[11px] text-slate-500">{it.material || it.style || 'NFC Embedded Hardware'}</div>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-black text-emerald-600 font-mono">{it.quantity || it.qty || 1}x ₹{it.price || (ord.total_amount || 1999)}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Order Footer Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
                    <a
                      href={`https://wa.me/${waTarget}?text=Hi%20${encodeURIComponent(custName)},%20regarding%20your%20ai%20klub%20Order%20${encodeURIComponent(ord.order_number || ord.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-slate-950 font-extrabold flex items-center justify-center space-x-2 shadow-xs transition cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-slate-950" />
                      <span>Chat Customer on WhatsApp ({custPhone || '+91 77995 29358'})</span>
                    </a>

                    <div className="flex items-center space-x-2 justify-end text-xs text-slate-500 font-mono font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>SQLite Database Synced</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
