import React, { useState } from 'react';
import { StudentProvider } from './contexts/StudentContext';
import StudentManager from './components/StudentManager';
import SlotMachine from './components/SlotMachine';
import SecretSettings from './components/SecretSettings';
import './App.css';

function App() {
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isAgreed) {
    return (
      <div className="gateway-container">
        <div className="md-card gateway-box">
          <span className="material-symbols-outlined gateway-icon">gavel</span>
          <h2>윤리 핵심 가이드 서약</h2>
          <p className="gateway-text">
            이 사진에 있는 윤리 핵심가이드를 빠짐없이 읽고<br/>
            이를 지키겠습니다.
          </p>
          <button className="md-btn primary gateway-btn" onClick={() => setIsAgreed(true)}>
            동의하고 시작하기
          </button>
        </div>
      </div>
    );
  }

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
