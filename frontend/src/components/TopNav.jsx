import React, { useState } from 'react';
import { Undo, Redo, FileText, LogOut } from 'lucide-react';

export default function TopNav({ activeCanvasInfo, handleUndo, handleRedo, historyStep, historyLength, logout, username }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userInitial = username ? username.charAt(0).toUpperCase() : 'U';

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 shrink-0 z-20">
      <div className="flex items-center gap-3 w-[260px]">
        <div className="w-6 h-6 bg-[#1a202c] rounded-md flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-sm"></div>
        </div>
        <span className="font-bold text-[17px]">Forme</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500 text-sm font-medium flex-1 justify-center mr-[260px]">
        <FileText size={16} className="text-gray-400"/> 
        {activeCanvasInfo ? activeCanvasInfo.title : 'Untitled project'} 
        <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={handleUndo} 
          disabled={historyStep === 0} 
          className="flex flex-col items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
        >
          <Undo size={18}/>
          <span className="text-[10px] font-semibold mt-0.5">Undo</span>
        </button>
        <button 
          onClick={handleRedo} 
          disabled={historyStep === historyLength - 1} 
          className="flex flex-col items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
        >
          <Redo size={18}/>
          <span className="text-[10px] font-semibold mt-0.5">Redo</span>
        </button>
        
        <div className="relative ml-3">
          <div 
            className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-indigo-100 transition-colors shadow-sm" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {userInitial}
          </div>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}