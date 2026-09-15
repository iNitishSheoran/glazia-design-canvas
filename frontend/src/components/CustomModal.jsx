import React from 'react';

export default function CustomModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "OK" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] transform transition-all">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button onClick={onCancel} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">
              Cancel
            </button>
          )}
          <button onClick={onConfirm} className="px-5 py-2.5 bg-[#1a202c] text-white hover:bg-black rounded-xl font-medium transition-colors">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}