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
  DollarSign,
  X,
  Sliders,
  Copy,
  Eye,
  Sparkles
} from 'lucide-react';
import {
  BlackMetalCardVisual,
  GoldMetalCardVisual,
  SilverMetalCardVisual,
  BlueMetalCardVisual,
  RoseGoldMetalCardVisual,
  WoodCardVisual,
  SmartStandVisual,
  GoldTrishulCardVisual,
  SilverTrishulCardVisual,
  BlueWorldCardVisual
} from '../components/ProductVisuals';

const getSpecValue = (item, key) => {
  if (!item) return null;
  const specs = item.custom_specs || item.customConfig || item.custom_config || {};
  if (typeof specs === 'object' && specs !== null) {
    return specs[key] || null;
  }
  return null;
};

const renderCardVisualThumbnail = (item) => {
  if (!item) return null;
  const specsName = getSpecValue(item, 'name') || item.name || 'ALEXANDER VANCE';
  const slug = (item.slug || item.id || item.name || item.material || '').toLowerCase();

  if (item.image_url && typeof item.image_url === 'string' && (item.image_url.startsWith('/') || item.image_url.startsWith('http') || item.image_url.startsWith('data:'))) {
    return (
      <div className="w-12 h-12 rounded-xl bg-[#070A0F] border border-emerald-900/60 p-1 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#00DC82] transition-colors">
        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain rounded-lg" />
      </div>
    );
  }

  if (slug.includes('gold') || slug.includes('24k')) {
    return (
      <div className="w-14 h-9 rounded-lg bg-gradient-to-tr from-amber-700 via-yellow-500 to-amber-300 border border-amber-300/60 p-1 flex flex-col justify-between shrink-0 shadow-md text-[6px] font-bold text-slate-950 font-syne select-none">
        <div className="flex justify-between items-center"><span className="text-[5px]">ak</span><span className="text-[5px]">NFC</span></div>
        <div className="truncate font-extrabold uppercase leading-none">{specsName.split(' ')[0]}</div>
      </div>
    );
  }

  if (slug.includes('silver') || slug.includes('platinum')) {
    return (
      <div className="w-14 h-9 rounded-lg bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-500 border border-slate-300/80 p-1 flex flex-col justify-between shrink-0 shadow-md text-[6px] font-bold text-slate-900 font-syne select-none">
        <div className="flex justify-between items-center"><span className="text-[5px]">ak</span><span className="text-[5px]">NFC</span></div>
        <div className="truncate font-extrabold uppercase leading-none">{specsName.split(' ')[0]}</div>
      </div>
    );
  }

  if (slug.includes('blue') || slug.includes('sapphire')) {
    return (
      <div className="w-14 h-9 rounded-lg bg-gradient-to-tr from-blue-900 via-sky-600 to-blue-950 border border-sky-400/80 p-1 flex flex-col justify-between shrink-0 shadow-md text-[6px] font-bold text-white font-syne select-none">
        <div className="flex justify-between items-center"><span className="text-[5px]">ak</span><span className="text-[5px]">NFC</span></div>
        <div className="truncate font-extrabold uppercase leading-none">{specsName.split(' ')[0]}</div>
      </div>
    );
  }

  if (slug.includes('wood') || slug.includes('bamboo') || slug.includes('walnut')) {
    return (
      <div className="w-14 h-9 rounded-lg bg-gradient-to-tr from-[#3D261A] via-[#5A3A29] to-[#281810] border border-[#C29B38]/50 p-1 flex flex-col justify-between shrink-0 shadow-md text-[6px] font-bold text-[#F3E5AB] font-syne select-none">
        <div className="flex justify-between items-center"><span className="text-[5px]">ak</span><span className="text-[5px]">NFC</span></div>
        <div className="truncate font-extrabold uppercase leading-none">{specsName.split(' ')[0]}</div>
      </div>
    );
  }

  if (slug.includes('stand') || slug.includes('acrylic')) {
    return (
      <div className="w-14 h-9 rounded-lg bg-gradient-to-tr from-cyan-900 via-teal-800 to-slate-900 border border-cyan-400/60 p-1 flex flex-col justify-between shrink-0 shadow-md text-[6px] font-bold text-cyan-200 font-syne select-none">
        <div className="flex justify-between items-center"><span className="text-[5px]">STAND</span><span className="text-[5px]">★ 5.0</span></div>
        <div className="truncate font-extrabold uppercase leading-none">Google Review</div>
      </div>
    );
  }

  return (
    <div className="w-14 h-9 rounded-lg bg-gradient-to-tr from-[#0D0D11] via-[#1A1A22] to-[#0D0D11] border border-emerald-500/40 p-1 flex flex-col justify-between shrink-0 shadow-md text-[6px] font-bold text-white font-syne select-none">
      <div className="flex justify-between items-center"><span className="text-[5px] text-[#00DC82]">ak</span><span className="text-[5px] text-[#00DC82]">NFC</span></div>
      <div className="truncate font-extrabold uppercase leading-none text-slate-100">{specsName.split(' ')[0]}</div>
    </div>
  );
};

const renderCardVisualDetail = (item) => {
  if (!item) return null;
  const name = getSpecValue(item, 'name') || item.name || 'ALEXANDER VANCE';
  const title = getSpecValue(item, 'title') || item.material || 'CHIEF EXECUTIVE OFFICER';
  const slug = (item.slug || item.id || item.name || item.material || '').toLowerCase();

  if (item.image_url && typeof item.image_url === 'string' && (item.image_url.startsWith('/') || item.image_url.startsWith('http') || item.image_url.startsWith('data:'))) {
    return (
      <div className="w-full aspect-[1.586/1] max-w-[280px] rounded-2xl bg-[#070A0F] border border-emerald-900/60 p-2 flex items-center justify-center shadow-2xl relative overflow-hidden mx-auto">
        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain rounded-xl" />
      </div>
    );
  }

  if (slug.includes('gold') || slug.includes('24k')) {
    return <GoldMetalCardVisual name={name} title={title} cardId={item.id || 'AK-GOLD'} />;
  }
  if (slug.includes('silver') || slug.includes('platinum')) {
    return <SilverMetalCardVisual name={name} title={title} cardId={item.id || 'AK-SILVER'} />;
  }
  if (slug.includes('blue') || slug.includes('sapphire')) {
    return <BlueMetalCardVisual name={name} title={title} cardId={item.id || 'AK-BLUE'} />;
  }
  if (slug.includes('wood') || slug.includes('bamboo') || slug.includes('walnut')) {
    return <WoodCardVisual name={name} title={title} cardId={item.id || 'AK-WOOD'} />;
  }
  if (slug.includes('stand') || slug.includes('acrylic')) {
    return <SmartStandVisual cardId={item.id || 'AK-STAND'} />;
  }

  return <BlackMetalCardVisual name={name} title={title} cardId={item.id || 'AK-BLACK'} />;
};

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

  // Interactive Item Visual Modal state
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [selectedOrderContext, setSelectedOrderContext] = useState(null);
  const [copiedSpecs, setCopiedSpecs] = useState(false);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const handleCopyProductionSpecs = (item, order) => {
    const specsName = getSpecValue(item, 'name') || item.name || 'N/A';
    const specsTitle = getSpecValue(item, 'title') || item.title || 'N/A';
    const specsCompany = getSpecValue(item, 'company') || 'N/A';
    const material = item.material || getSpecValue(item, 'material') || 'Matte Black Stainless Steel';
    const fontStyle = getSpecValue(item, 'fontStyle') || 'Syne Modern';
    const inlayColor = getSpecValue(item, 'inlayColor') || 'Standard Engrave';
    const targetUrl = getSpecValue(item, 'qrUrl') || getSpecValue(item, 'profileUrl') || 'https://aiklub.com/profile';

    const text = `=== AI KLUB PRODUCTION LASER ENGRAVING BLUEPRINT ===
Order ID: ${order?.order_number || order?.id || 'N/A'}
Item: ${item.name || item.title || 'Smart Card'}
Material: ${material}
Engraved Name: ${specsName}
Engraved Title: ${specsTitle}
Company: ${specsCompany}
Font Style: ${fontStyle}
Inlay Color: ${inlayColor}
NFC / QR Link: ${targetUrl}
===================================================`;

    navigator.clipboard.writeText(text);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 3000);
  };

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

      <main className="flex-grow pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                        <span>Ordered Smart Items ({items.length || 1}):</span>
                      </span>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5 text-slate-700">
                        {items.length === 0 ? (
                          <div
                            onClick={() => {
                              const fallbackItem = { name: 'Custom aikulb Matte Black Metal', material: 'Matte Black Stainless Steel', price: ord.total_amount || 2298, quantity: 1 };
                              setSelectedOrderItem(fallbackItem);
                              setSelectedOrderContext(ord);
                            }}
                            className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center space-x-3 min-w-0">
                              {renderCardVisualThumbnail({ name: 'Custom aikulb Matte Black Metal', material: 'Matte Black Stainless Steel' })}
                              <div className="min-w-0">
                                <div className="font-extrabold text-neutral-900 text-xs font-manrope group-hover:text-purple-700 transition-colors truncate">
                                  Custom aikulb Matte Black Metal
                                </div>
                                <div className="text-[11px] font-medium text-slate-500 truncate">
                                  Matte Black Metal • Click to view card photo & specs
                                </div>
                                <div className="text-[10px] font-bold text-purple-600 flex items-center space-x-1 mt-0.5">
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                  <span>View Card Details →</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-black text-emerald-600 font-mono text-xs">1x ₹{ord.total_amount || 2298}</span>
                            </div>
                          </div>
                        ) : (
                          items.map((it, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setSelectedOrderItem(it);
                                setSelectedOrderContext(ord);
                              }}
                              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                {renderCardVisualThumbnail(it)}
                                <div className="min-w-0">
                                  <div className="font-extrabold text-neutral-900 text-xs font-manrope group-hover:text-purple-700 transition-colors truncate">
                                    {it.name || it.title || 'AI KLUB Smart Card'}
                                  </div>
                                  <div className="text-[11px] font-medium text-slate-500 truncate">
                                    {it.material || getSpecValue(it, 'material') || 'NFC Embedded Hardware'}
                                    {getSpecValue(it, 'name') ? ` • ${getSpecValue(it, 'name')}` : ''}
                                  </div>
                                  <div className="text-[10px] font-bold text-purple-600 flex items-center space-x-1 mt-0.5">
                                    <Sparkles className="w-3 h-3 text-purple-500" />
                                    <span>View Exact Card Photo & Specs →</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-black text-emerald-600 font-mono text-xs">{it.quantity || it.qty || 1}x ₹{it.price || (ord.total_amount || 1999)}</span>
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

        {/* Interactive Item Specification & Visual Details Modal */}
        {selectedOrderItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 font-sans">
              
              {/* Modal Header */}
              <div className="p-5 bg-[#0D0D11] text-white flex items-center justify-between shrink-0 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold font-manrope text-white">Production & Card Visual Details</h3>
                    <p className="text-[11px] text-purple-300 font-mono">Order {selectedOrderContext?.order_number || selectedOrderContext?.id || 'N/A'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrderItem(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#F8FAFC]">
                {/* Card Visual Photo Frame */}
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/15 rounded-full blur-3xl"></div>
                  <div className="text-[11px] font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#00DC82]" />
                    <span>EXACT 3D SMART CARD PHOTO PREVIEW</span>
                  </div>
                  <div className="w-full flex justify-center py-2">
                    {renderCardVisualDetail(selectedOrderItem)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono text-center">
                    {selectedOrderItem.material || getSpecValue(selectedOrderItem, 'material') || 'Matte Black Stainless Steel Hardware'}
                  </div>
                </div>

                {/* Laser Engraving Specifications */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="font-extrabold text-neutral-900 font-manrope text-sm flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-purple-600" />
                      <span>Laser Engraving & Core Specifications</span>
                    </h4>
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-bold font-mono text-[10px]">
                      Ready for Production
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-inter">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mb-1">Engraved Name</span>
                      <div className="font-black text-neutral-900 text-xs">
                        {getSpecValue(selectedOrderItem, 'name') || selectedOrderItem.name || 'ALEXANDER VANCE'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mb-1">Engraved Title / Role</span>
                      <div className="font-extrabold text-neutral-900 text-xs">
                        {getSpecValue(selectedOrderItem, 'title') || selectedOrderItem.title || 'CHIEF EXECUTIVE OFFICER'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mb-1">Company / Org</span>
                      <div className="font-bold text-neutral-900 text-xs">
                        {getSpecValue(selectedOrderItem, 'company') || 'AI KLUB GLOBAL'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mb-1">Metal Finish</span>
                      <div className="font-bold text-neutral-900 text-xs">
                        {selectedOrderItem.material || getSpecValue(selectedOrderItem, 'material') || 'Matte Black Stainless Steel'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mb-1">Typography Font</span>
                      <div className="font-bold text-neutral-900 text-xs">
                        {getSpecValue(selectedOrderItem, 'fontStyle') || 'Syne Modern Bold'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mb-1">Inlay Color</span>
                      <div className="font-bold text-neutral-900 text-xs">
                        {getSpecValue(selectedOrderItem, 'inlayColor') || '24K Gold Foil Accent'}
                      </div>
                    </div>
                  </div>

                  {/* NFC Hardware Chip Info */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 font-mono text-[11px] space-y-1">
                    <div className="font-bold flex items-center justify-between">
                      <span>⚡ NFC Hardware Core: NTAG216 High Speed</span>
                      <span className="text-emerald-700">888 Bytes</span>
                    </div>
                    <div className="text-[10px] text-emerald-800">
                      Encoded profile link: {getSpecValue(selectedOrderItem, 'qrUrl') || getSpecValue(selectedOrderItem, 'profileUrl') || 'https://aiklub.com/profile/demo'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => handleCopyProductionSpecs(selectedOrderItem, selectedOrderContext)}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedSpecs ? '✓ Copied Production Specs!' : 'Copy Production Specs'}</span>
                </button>

                <button
                  onClick={() => setSelectedOrderItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition"
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
