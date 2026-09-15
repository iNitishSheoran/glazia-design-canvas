import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';

export default function CanvasArea({ elements, setElements, selectedId, setSelectedId, stageRef }) {
  const trRef = useRef(null);
  const layerRef = useRef(null);
  const [editingText, setEditingText] = useState(null);

  useEffect(() => {
    if (selectedId && trRef.current && layerRef.current) {
      const node = layerRef.current.findOne(`#${selectedId}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, elements]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
      setEditingText(null);
    }
  };

  const handleDragEnd = (e, id) => {
    const node = e.target;
    setElements(
      elements.map((el) => {
        if (el.id === id) {
          return { ...el, x: node.x(), y: node.y() };
        }
        return el;
      })
    );
  };

  const handleTransformEnd = (e, id) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    setElements(
      elements.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          };
        }
        return el;
      })
    );
  };

  const handleTextDblClick = (e, el) => {
    const textNode = e.target;
    const textPosition = textNode.getAbsolutePosition();
    
    setEditingText({
      id: el.id,
      text: el.text,
      x: textPosition.x,
      y: textPosition.y,
      width: textNode.width(),
      height: textNode.height(),
      fontSize: el.height,
      color: el.fill
    });
  };

  const handleTextEditChange = (e) => {
    setEditingText({
      ...editingText,
      text: e.target.value
    });
  };

  const handleTextEditBlur = () => {
    setElements(
      elements.map((el) => {
        if (el.id === editingText.id) {
          return { ...el, text: editingText.text };
        }
        return el;
      })
    );
    setEditingText(null);
  };

  return (
    <div className="relative shadow-sm bg-white border border-gray-200">
      <Stage
        width={800}
        height={600}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
      >
        <Layer ref={layerRef}>
          {elements.map((el) => {
            const isEditing = editingText && editingText.id === el.id;

            const props = {
              key: el.id,
              id: el.id,
              x: el.x,
              y: el.y,
              fill: el.fill,
              rotation: el.rotation,
              draggable: true,
              onClick: () => setSelectedId(el.id),
              onTap: () => setSelectedId(el.id),
              onDragEnd: (e) => handleDragEnd(e, el.id),
              onTransformEnd: (e) => handleTransformEnd(e, el.id),
            };

            if (el.type === 'rect') {
              return <Rect {...props} width={el.width} height={el.height} />;
            }
            if (el.type === 'circle') {
              return <Circle {...props} radius={el.width / 2} />;
            }
            if (el.type === 'line') {
              return <Rect {...props} width={el.width} height={Math.max(2, el.height * 0.1)} />;
            }
            if (el.type === 'text') {
              return (
                <Text
                  {...props}
                  text={isEditing ? '' : el.text}
                  fontSize={el.height}
                  onDblClick={(e) => handleTextDblClick(e, el)}
                  onDblTap={(e) => handleTextDblClick(e, el)}
                />
              );
            }
            return null;
          })}

          {selectedId && !editingText && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>

      {editingText && (
        <textarea
          value={editingText.text}
          onChange={handleTextEditChange}
          onBlur={handleTextEditBlur}
          autoFocus
          style={{
            position: 'absolute',
            top: `${editingText.y}px`,
            left: `${editingText.x}px`,
            width: `${Math.max(100, editingText.width + 40)}px`,
            height: `${Math.max(50, editingText.height + 40)}px`,
            fontSize: `${editingText.fontSize}px`,
            color: editingText.color,
            background: 'transparent',
            border: '2px dashed #3b82f6',
            outline: 'none',
            resize: 'none',
            lineHeight: 1,
            padding: '0px',
            margin: '0px'
          }}
        />
      )}
    </div>
  );
}