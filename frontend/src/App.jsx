import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import CustomModal from './components/CustomModal';
import LoginForm from './components/LoginForm';
import TopNav from './components/TopNav';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import CanvasArea from './components/CanvasArea';
import { useHistory } from './hooks/useHistory';
import { useModal } from './hooks/useModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [canvasId, setCanvasId] = useState(null);
  const [savedCanvases, setSavedCanvases] = useState([]);
  const stageRef = useRef(null);

  const { modal, showModal } = useModal();
  const { elements, setElements, history, setHistory, historyStep, setHistoryStep, updateElementsAndHistory, handleUndo, handleRedo } = useHistory([]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await axios.post(`${API_URL}${endpoint}`, { username, password });

      if (isLogin) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUsername('');
        setPassword('');
      } else {
        showModal('Success', 'Account created successfully! You can now log in.', () => setIsLogin(true));
      }
    } catch (error) {
      showModal('Error', error.response?.data?.message || 'Authentication failed', () => { });
    }
  };

  const logout = () => {
    showModal('Logout', 'Are you sure you want to log out?', () => {
      setToken(null);
      localStorage.removeItem('token');
      setElements([]);
      setCanvasId(null);
      setHistory([[]]);
      setHistoryStep(0);
    }, () => { }, 'Logout');
  };

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAllCanvases = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/canvases`, authHeaders);
      setSavedCanvases(res.data);
    } catch (error) { }
  }, [token]);

  useEffect(() => {
    fetchAllCanvases();
  }, [fetchAllCanvases]);

  const saveCanvas = async (isAuto = false) => {
    try {
      if (canvasId) {
        await axios.put(`${API_URL}/canvases/${canvasId}`, { elements }, authHeaders);
        if (!isAuto) showModal('Saved', 'Your canvas has been updated successfully.', () => { });
      } else {
        const res = await axios.post(`${API_URL}/canvases`, { title: `Canvas ${savedCanvases.length + 1}`, elements }, authHeaders);
        setCanvasId(res.data._id);
        if (!isAuto) showModal('Saved', 'New canvas created and saved.', () => { });
      }
      fetchAllCanvases();
    } catch (error) {
      if (!isAuto) showModal('Error', 'Failed to save the canvas.', () => { });
    }
  };

  useEffect(() => {
    if (!canvasId || !token || elements.length === 0) return;
    const timer = setTimeout(() => { saveCanvas(true); }, 2000);
    return () => clearTimeout(timer);
  }, [elements, canvasId, token, saveCanvas]);

  const addElement = (type) => {
    const newEl = {
      id: Date.now().toString(),
      type,
      x: 200,
      y: 200,
      width: type === 'rect' ? 180 : 120,
      height: type === 'rect' ? 100 : 120,
      fill: type === 'text' ? '#D83CF0' : '#4f82f2',
      rotation: 0,
      text: type === 'text' ? 'Double click to edit' : undefined
    };
    updateElementsAndHistory([...elements, newEl]);
  };

  const updateProperty = (e, prop) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    updateElementsAndHistory(
      elements.map((el) => el.id === selectedId ? { ...el, [prop]: val } : el)
    );
  };

  const deleteSelected = () => {
    updateElementsAndHistory(elements.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  const moveLayer = (direction) => {
    if (!selectedId) return;
    const index = elements.findIndex((el) => el.id === selectedId);
    if (index < 0) return;
    const newArr = [...elements];
    const [moved] = newArr.splice(index, 1);
    if (direction === 'up') newArr.push(moved);
    else newArr.unshift(moved);
    updateElementsAndHistory(newArr);
  };

  const exportPNG = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas-export.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteCanvas = () => {
    showModal('Delete Canvas', 'Are you sure you want to permanently delete this canvas?', async () => {
      try {
        await axios.delete(`${API_URL}/canvases/${canvasId}`, authHeaders);
        setCanvasId(null);
        setElements([]);
        fetchAllCanvases();
      } catch (error) {
        showModal('Error', 'Failed to delete canvas', () => { });
      }
    }, () => { }, 'Delete');
  };

  const handleCanvasLoad = (e) => {
    const id = e.target.value;
    if (!id) {
      setCanvasId(null);
      setElements([]);
      updateElementsAndHistory([]);
      return;
    }
    const c = savedCanvases.find((can) => can._id === id);
    if (c) {
      setCanvasId(c._id);
      updateElementsAndHistory(c.elements);
    }
  };

  const activeCanvasInfo = savedCanvases.find(c => c._id === canvasId);
  const selectedElement = elements.find((el) => el.id === selectedId);

  if (!token) {
    return (
      <div className="flex h-screen w-screen bg-[#f8f9fc] justify-center items-center font-sans text-slate-800">
        <CustomModal {...modal} />
        <LoginForm
          handleAuth={handleAuth}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f8f9fa] font-sans text-[#1a202c] overflow-hidden">
      <CustomModal {...modal} />

      <TopNav
        activeCanvasInfo={activeCanvasInfo}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        historyStep={historyStep}
        historyLength={history.length}
        logout={logout}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar
          setSelectedId={setSelectedId}
          addElement={addElement}
          saveCanvas={saveCanvas}
          exportPNG={exportPNG}
          savedCanvases={savedCanvases}
          canvasId={canvasId}
          handleCanvasLoad={handleCanvasLoad}
          handleDeleteCanvas={handleDeleteCanvas}
        />

        <main className="flex-1 relative flex flex-col min-w-0">
          <div className="h-12 flex items-center px-6 justify-between text-[13px] text-gray-500 shrink-0 border-b border-gray-200/50 bg-[#f8f9fa]">
            <div>Projects <span className="mx-2">›</span> <span className="font-semibold text-gray-800">{activeCanvasInfo ? activeCanvasInfo.title : 'Untitled project'}</span></div>
          </div>

          <div className="flex-1 overflow-auto bg-[#f8f9fa] flex items-center justify-center p-8 relative">
            <CanvasArea
              elements={elements}
              setElements={updateElementsAndHistory}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              stageRef={stageRef}
            />
          </div>
        </main>

        <RightSidebar
          selectedElement={selectedElement}
          moveLayer={moveLayer}
          updateProperty={updateProperty}
          deleteSelected={deleteSelected}
        />
      </div>
    </div>
  );
}