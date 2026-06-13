import React, { useContext, useState } from 'react';
import { StudentContext } from '../contexts/StudentContext';
import './StudentManager.css';

export default function StudentManager() {
  const { students, addStudent, removeStudent, bulkAddStudents } = useContext(StudentContext);
  const [singleName, setSingleName] = useState('');
  const [bulkNames, setBulkNames] = useState('');

  const handleAddSingle = (e) => {
    e.preventDefault();
    if (singleName.trim()) {
      addStudent(singleName.trim());
      setSingleName('');
    }
  };

  const handleBulkAdd = (e) => {
    e.preventDefault();
    if (bulkNames.trim()) {
      bulkAddStudents(bulkNames);
      setBulkNames('');
    }
  };

  return (
    <div className="student-manager feature-card-container">
      <h2 className="section-title">🧑‍🎓 학생 명단 관리 ({students.length}명)</h2>
      
      <div className="add-forms">
        <form onSubmit={handleAddSingle} className="add-single">
          <input 
            type="text" 
            placeholder="학생 이름 입력" 
            value={singleName}
            onChange={(e) => setSingleName(e.target.value)}
          />
          <button type="submit" className="btn-secondary">추가</button>
        </form>

        <form onSubmit={handleBulkAdd} className="add-bulk">
          <textarea 
            placeholder="여러 명을 한 번에 추가하려면 쉼표(,)나 줄바꿈으로 구분해서 입력하세요."
            value={bulkNames}
            onChange={(e) => setBulkNames(e.target.value)}
            rows="3"
          />
          <button type="submit" className="btn-secondary">일괄 추가</button>
        </form>
      </div>

      <div className="student-list">
        {students.length === 0 ? (
          <p className="empty-msg">아직 등록된 학생이 없습니다.</p>
        ) : (
          <div className="tags-container">
            {students.map((student, idx) => (
              <span key={idx} className="filter-chip">
                {student}
                <button type="button" onClick={() => removeStudent(student)} className="btn-remove">×</button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
