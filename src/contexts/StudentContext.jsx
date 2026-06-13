import React, { createContext, useState, useEffect } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  const [secretOrder, setSecretOrder] = useState(() => {
    const saved = localStorage.getItem('secretOrder');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('secretOrder', JSON.stringify(secretOrder));
  }, [secretOrder]);

  const addStudent = (name) => {
    if (name && !students.includes(name)) {
      setStudents([...students, name]);
    }
  };

  const removeStudent = (name) => {
    setStudents(students.filter(s => s !== name));
  };

  const bulkAddStudents = (namesString) => {
    const newNames = namesString.split(/[\n,]+/).map(n => n.trim()).filter(n => n && !students.includes(n));
    setStudents([...students, ...newNames]);
  };

  const addSecretStudent = (name) => {
      setSecretOrder([...secretOrder, name]);
  }

  const removeSecretStudent = (index) => {
      setSecretOrder(secretOrder.filter((_, i) => i !== index));
  }
  
  const popSecretStudent = () => {
      if (secretOrder.length === 0) return null;
      const first = secretOrder[0];
      setSecretOrder(secretOrder.slice(1));
      return first;
  }

  return (
    <StudentContext.Provider value={{
      students, addStudent, removeStudent, bulkAddStudents,
      secretOrder, addSecretStudent, removeSecretStudent, popSecretStudent,
      setSecretOrder
    }}>
      {children}
    </StudentContext.Provider>
  );
};
