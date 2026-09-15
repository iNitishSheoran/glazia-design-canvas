import React from 'react';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function RightSidebar({ selectedElement, moveLayer, updateProperty, deleteSelected }) {
  const inputClass = "p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 w-full text-sm";
  const sectionTitleClass = "text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4 mt-8";

  return (
    <aside className="w-[300px] bg-white border-l border-gray-200 flex flex-col z-10 shrink-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Selected Object</h3>
        </div>
        
        <h2 className="text-[22px] font-semibold mb-6">Properties</h2>
        
        {!selectedElement ? (
          <div className="text-sm text-gray-400 italic">Select an object to edit properties</div>
        ) : (
          <div className="flex flex-col">
            
            <div className="flex gap-2 mb-2">
              <button className="flex-1 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50" onClick={() => moveLayer('up')}>
                <ArrowUp size={14} className="text-gray-400"/> Front
              </button>
              <button className="flex-1 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50" onClick={() => moveLayer('down')}>
                <ArrowDown size={14} className="text-gray-400"/> Back
              </button>
            </div>

            <h3 className={sectionTitleClass}>Transform</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500">X position</label>
                <input className={inputClass} type="number" value={Math.round(selectedElement.x)} onChange={(e) => updateProperty(e, 'x')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500">Y position</label>
                <input className={inputClass} type="number" value={Math.round(selectedElement.y)} onChange={(e) => updateProperty(e, 'y')} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-xs text-gray-500">Rotation</label>
              <input className={inputClass} type="number" value={Math.round(selectedElement.rotation)} onChange={(e) => updateProperty(e, 'rotation')} />
            </div>

            {selectedElement.type === 'text' && (
              <>
                <h3 className={sectionTitleClass}>Typography</h3>
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs text-gray-500">Font size</label>
                  <input className={inputClass} type="number" value={Math.round(selectedElement.height)} onChange={(e) => updateProperty(e, 'height')} />
                </div>
                <div className="flex flex-col gap-1.5 mb-2">
                  <label className="text-xs text-gray-500">Text content</label>
                  <input className={inputClass} type="text" value={selectedElement.text} onChange={(e) => updateProperty(e, 'text')} />
                </div>
              </>
            )}

            {selectedElement.type !== 'text' && (
              <>
                <h3 className={sectionTitleClass}>Dimensions</h3>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">Width</label>
                    <input className={inputClass} type="number" value={Math.round(selectedElement.width)} onChange={(e) => updateProperty(e, 'width')} />
                  </div>
                  {selectedElement.type === 'rect' && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">Height</label>
                      <input className={inputClass} type="number" value={Math.round(selectedElement.height)} onChange={(e) => updateProperty(e, 'height')} />
                    </div>
                  )}
                </div>
              </>
            )}

            <h3 className={sectionTitleClass}>Appearance</h3>
            <div className="flex flex-col gap-1.5 mb-8">
              <label className="text-xs text-gray-500">Color</label>
              <div className={`${inputClass} flex items-center gap-3 p-1.5 bg-white relative`}>
                <input type="color" value={selectedElement.fill} onChange={(e) => updateProperty(e, 'fill')} className="absolute opacity-0 w-8 h-8 cursor-pointer" />
                <div className="w-8 h-8 rounded shrink-0 border border-black/10 shadow-sm" style={{ backgroundColor: selectedElement.fill }}></div>
                <span className="text-sm uppercase text-gray-700 tracking-wide font-medium">{selectedElement.fill}</span>
              </div>
            </div>

            <button className="w-full py-2.5 mt-auto bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors" onClick={deleteSelected}>
              <Trash2 size={16}/> Delete shape
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}