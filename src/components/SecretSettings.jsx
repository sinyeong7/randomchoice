import React, { useContext, useEffect, useState } from 'react';
import { StudentContext } from '../contexts/StudentContext';
import './SecretSettings.css';

export default function SecretSettings() {
  const { students, secretOrder, addSecretStudent, removeSecretStudent } = useContext(StudentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [newSecret, setNewSecret] = useState('');

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

  const handleAddSecret = (e) => {
    e.preventDefault();
    if (newSecret.trim()) {
      addSecretStudent(newSecret.trim());
      setNewSecret('');
    }
  };

  return (
    <div className={`secret-settings-overlay ${isOpen ? 'open' : ''}`}>
      <div className="secret-settings-modal modal-card">
        <button className="btn-close" onClick={() => setIsOpen(false)}>×</button>
        <h2 className="modal-title">🤫 비밀 설정 모드</h2>
        
        <form onSubmit={handleAddSecret} className="secret-form">
          <div className="form-group">
            <label>비밀 학생 등록 (이 학생들은 우선적으로 뽑힙니다!)</label>
            <div className="input-row">
              <input 
                type="text" 
                placeholder="학생 이름 입력" 
                value={newSecret}
                onChange={(e) => setNewSecret(e.target.value)}
              />
              <button type="submit" className="btn-secondary">추가</button>
            </div>
          </div>
        </form>

        <div className="secret-list-container">
          <h3>현재 대기 중인 비밀 학생 ({secretOrder.length}명)</h3>
          <div className="secret-list">
            {secretOrder.length === 0 ? (
              <p className="empty-msg">대기 중인 학생이 없습니다.</p>
            ) : (
              <div className="tags-container">
                {secretOrder.map((student, idx) => (
                  <span key={idx} className="filter-chip secret">
                    {student}
                    <button type="button" onClick={() => removeSecretStudent(idx)} className="btn-remove">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
