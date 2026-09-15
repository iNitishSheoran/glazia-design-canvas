import React from 'react';
import { Square, Circle as CircleIcon, Type, Save, Trash2, Minus, MousePointer2, Download, ChevronDown } from 'lucide-react';

export default function LeftSidebar({ setSelectedId, addElement, saveCanvas, exportPNG, savedCanvases, canvasId, handleCanvasLoad, handleDeleteCanvas }) {
  const inputClass = "p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 w-full text-sm";
  
  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col z-10 shrink-0">
      <div className="p-5 flex-1 overflow-y-auto">
        <h3 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-3">Workspace</h3>
        <h2 className="text-[22px] font-semibold mb-6">Tools</h2>
        
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-[15px] mb-2" onClick={() => setSelectedId(null)}>
            <MousePointer2 size={18} className="rotate-[-20deg]" /> Select
          </button>
          
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-[15px]" onClick={() => addElement('rect')}>
            <Square size={18} /> Rectangle
          </button>
          
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-[15px]" onClick={() => addElement('circle')}>
            <CircleIcon size={18} /> Circle
          </button>
          
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-[15px]" onClick={() => addElement('text')}>
            <Type size={18} /> Text
          </button>
        
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 pb-8">
        <button className="w-full p-3 bg-[#1a202c] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors" onClick={() => saveCanvas(false)}>
          <Save size={18} /> Save changes
        </button>
        <button className="w-full p-3 border border-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors" onClick={exportPNG}>
          <Download size={18} /> Export PNG
        </button>
        
        <h3 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mt-4 mb-1">Your Canvases</h3>
        <div className="relative">
          <select className={`${inputClass} appearance-none bg-white cursor-pointer`} value={canvasId || ""} onChange={handleCanvasLoad}>
            <option value="">-- New Blank Canvas --</option>
            {savedCanvases.map((c) => ( <option key={c._id} value={c._id}>{c.title}</option> ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none"/>
        </div>
        
        <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium text-sm mt-3 px-1 transition-colors disabled:opacity-30 disabled:hover:text-gray-400" onClick={handleDeleteCanvas} disabled={!canvasId}>
          <Trash2 size={16} /> Delete canvas
        </button>
      </div>
    </aside>
  );
}