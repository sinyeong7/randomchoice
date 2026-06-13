import React from 'react';
import { StudentProvider } from './contexts/StudentContext';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretSettings from './components/SecretSettings';
import './App.css';

function App() {
  return (
    <StudentProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="title-wrapper">
            <span className="material-symbols-outlined header-icon">volunteer_activism</span>
            <h1>두근두근 발표자 뽑기</h1>
          </div>
          <p>친구들과 함께하는 즐거운 수업 시간!</p>
        </header>
        
        <main className="app-main">
          <SlotMachine />
          <StudentManager />
        </main>
        
        <SecretSettings />
      </div>
    </StudentProvider>
  );
}

export default App;
