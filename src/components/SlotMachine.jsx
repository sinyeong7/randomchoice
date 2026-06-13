import React, { useContext, useState, useEffect } from 'react';
import { StudentContext } from '../contexts/StudentContext';
import './SlotMachine.css';

const Slot = ({ result, isSpinning, allStudents }) => {
  const [displayName, setDisplayName] = useState('?');

  useEffect(() => {
    let interval;
    if (isSpinning) {
      interval = setInterval(() => {
        if (allStudents.length > 0) {
          const randomIdx = Math.floor(Math.random() * allStudents.length);
          setDisplayName(allStudents[randomIdx]);
        } else {
          setDisplayName('?');
        }
      }, 50);
    } else {
      setDisplayName(result || '?');
    }

    return () => clearInterval(interval);
  }, [isSpinning, allStudents, result]);

  return (
    <div className={`slot ${isSpinning ? 'spinning' : ''}`}>
      <div className="slot-name">{displayName}</div>
    </div>
  );
};

export default function SlotMachine() {
  const { students, popSecretStudent } = useContext(StudentContext);
  const [numToPick, setNumToPick] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState([]);
  const [spinningSlots, setSpinningSlots] = useState([]);

  const handleStart = () => {
    if (students.length === 0) {
      alert("학생을 먼저 추가해주세요!");
      return;
    }
    
    if (numToPick > students.length) {
      alert("추출할 인원이 등록된 학생 수보다 많습니다!");
      return;
    }

    let availableStudents = [...students];
    let picked = [];

    for (let i = 0; i < numToPick; i++) {
      let secretPick = popSecretStudent();
      
      if (secretPick && availableStudents.includes(secretPick)) {
        picked.push(secretPick);
        availableStudents = availableStudents.filter(s => s !== secretPick);
      } else {
        const randomIdx = Math.floor(Math.random() * availableStudents.length);
        const randomPick = availableStudents[randomIdx];
        picked.push(randomPick);
        availableStudents.splice(randomIdx, 1);
      }
    }

    setResults(picked);
    setIsSpinning(true);
    setSpinningSlots(new Array(numToPick).fill(true));

    picked.forEach((_, idx) => {
      setTimeout(() => {
        setSpinningSlots(prev => {
          const next = [...prev];
          next[idx] = false;
          return next;
        });
        
        if (idx === picked.length - 1) {
          setTimeout(() => setIsSpinning(false), 500);
        }
      }, 1000 + (idx * 1000));
    });
  };

  return (
    <div className="slot-machine-container glass-panel">
      <h2>🎰 랜덤 발표자 뽑기</h2>
      
      <div className="controls">
        <label>
          추출 인원:
          <input 
            type="number" 
            min="1" 
            max={students.length || 1} 
            value={numToPick} 
            onChange={(e) => setNumToPick(Number(e.target.value))}
            disabled={isSpinning}
          />
        </label>
        <button 
          className="btn-start" 
          onClick={handleStart}
          disabled={isSpinning || students.length === 0}
        >
          {isSpinning ? "추출 중..." : "추출 시작!"}
        </button>
      </div>

      <div className="slots-area">
        {results.length > 0 ? (
          results.map((result, idx) => (
            <Slot 
              key={idx} 
              result={result} 
              isSpinning={spinningSlots[idx]} 
              allStudents={students} 
            />
          ))
        ) : (
          <div className="slot empty-slot">
            <div className="slot-name">?</div>
          </div>
        )}
      </div>
    </div>
  );
}
