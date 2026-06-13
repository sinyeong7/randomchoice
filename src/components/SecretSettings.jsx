import React, { useContext, useEffect, useState } from 'react';
import { StudentContext } from '../contexts/StudentContext';
import './SecretSettings.css';

export default function SecretSettings() {
  const { students, secretOrder, addSecretStudent, removeSecretStudent } = useContext(StudentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Shift + P
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (selectedStudent) {
      addSecretStudent(selectedStudent);
      setSelectedStudent('');
    }
  };

  return (
    <div className="secret-overlay">
      <div className="secret-modal glass-panel">
        <button className="btn-close" onClick={() => setIsOpen(false)}>×</button>
        <h3>🕵️ 선생님 비밀 설정</h3>
        <p className="secret-desc">다음에 발표될 학생의 순서를 몰래 지정합니다.</p>
        
        <div className="secret-add-form">
          <select 
            value={selectedStudent} 
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- 학생 선택 --</option>
            {students.map((student, idx) => (
              <option key={idx} value={student}>{student}</option>
            ))}
          </select>
          <button onClick={handleAdd} className="btn-secret-add">순서에 추가</button>
        </div>

        <div className="secret-list">
          <h4>현재 지정된 순서</h4>
          {secretOrder.length === 0 ? (
            <p className="empty-msg">지정된 학생이 없습니다.</p>
          ) : (
            <ol>
              {secretOrder.map((name, idx) => (
                <li key={idx}>
                  <span className="secret-name">{name}</span>
                  <button onClick={() => removeSecretStudent(idx)} className="btn-secret-remove">취소</button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
