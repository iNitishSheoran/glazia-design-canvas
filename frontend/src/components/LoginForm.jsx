import React from 'react';

export default function LoginForm({ handleAuth, isLogin, setIsLogin, username, setUsername, password, setPassword }) {
  return (
    <form onSubmit={handleAuth} className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-6 w-[400px] border border-gray-100">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <div className="w-8 h-8 bg-[#1a202c] rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        <h2 className="text-2xl font-bold">Forme</h2>
      </div>
      <div className="text-center mb-2">
        <p className="text-gray-500">{isLogin ? 'Welcome back to your workspace' : 'Create your creative account'}</p>
      </div>
      <div className="flex flex-col gap-4">
        <input className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="p-3 bg-[#1a202c] text-white rounded-lg font-medium hover:bg-black transition-colors" type="submit">
        {isLogin ? 'Sign In' : 'Create Account'}
      </button>
      <button type="button" className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign in'}
      </button>
    </form>
  );
}