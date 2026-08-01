import React, { useState } from 'react';
import { CreditCard, Smartphone, Lock, CheckCircle, Zap, QrCode } from 'lucide-react';

const PaymentForm = ({ bookingDetails, onProcessPayment, processing }) => {
  const [method, setMethod] = useState('GPAY');
  const [cardNumber, setCardNumber] = useState('4532 8912 7311 9023');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('889');
  const [upiId, setUpiId] = useState('9876543210@ybl');
  const [phonePeNum, setPhonePeNum] = useState('9876543210');
  const [gpayNum, setGpayNum] = useState('9876543210');

  const handleSubmit = (e) => {
    e.preventDefault();
    onProcessPayment(method);
  };

  return (
    <div className="bg-[#1E293B] rounded-2xl border border-slate-800 p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-['Outfit']">
        <Lock className="w-5 h-5 text-[#DC2626]" />
        Payment Method Selection
      </h3>

      {/* Payment Method Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        <button
          type="button"
          onClick={() => setMethod('GPAY')}
          className={`py-3 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
            method === 'GPAY'
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20 scale-105'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-[#FACC15]" />
          Google Pay (GPay)
        </button>

        <button
          type="button"
          onClick={() => setMethod('PHONEPE')}
          className={`py-3 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
            method === 'PHONEPE'
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20 scale-105'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4 text-purple-400" />
          PhonePe (P Pay)
        </button>

        <button
          type="button"
          onClick={() => setMethod('UPI')}
          className={`py-3 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
            method === 'UPI'
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20 scale-105'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          UPI ID / QR
        </button>

        <button
          type="button"
          onClick={() => setMethod('CARD')}
          className={`py-3 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
            method === 'CARD'
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-blue-500/20 scale-105'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4 text-[#DC2626]" />
          Credit / Debit Card
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {method === 'GPAY' && (
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <label className="block text-xs font-medium text-slate-300">Enter Google Pay Mobile Number or VPA</label>
            <input
              type="text"
              value={gpayNum}
              onChange={(e) => setGpayNum(e.target.value)}
              placeholder="e.g. 9876543210@okaxis"
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#2563EB]"
            />
            <p className="text-[11px] text-slate-400">A payment collect request will be sent to your Google Pay app.</p>
          </div>
        )}

        {method === 'PHONEPE' && (
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <label className="block text-xs font-medium text-slate-300">Enter PhonePe Mobile Number / VPA</label>
            <input
              type="text"
              value={phonePeNum}
              onChange={(e) => setPhonePeNum(e.target.value)}
              placeholder="e.g. 9876543210@ybl"
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#2563EB]"
            />
            <p className="text-[11px] text-slate-400">You will receive a notification in your PhonePe app to approve payment.</p>
          </div>
        )}

        {method === 'UPI' && (
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <label className="block text-xs font-medium text-slate-300">Virtual Payment Address (UPI ID)</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. username@upi"
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        )}

        {method === 'CARD' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">CVV</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={4}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          className="w-full py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] mt-6 flex items-center justify-center gap-2"
        >
          {processing ? (
            <span>Processing Payment...</span>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Pay ₹{bookingDetails?.totalAmount?.toFixed(2) || '0.00'} Now
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
