import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import privacyPolicyMd from '../../PRIVACY_POLICY.md?raw';
import termsOfServiceMd from '../../TERMS_OF_SERVICE.md?raw';
import './Footer.css';

function Footer() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    if (type === 'privacy') {
      setModalContent({ title: '개인정보처리방침', content: privacyPolicyMd });
    } else if (type === 'terms') {
      setModalContent({ title: '이용약관', content: termsOfServiceMd });
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <footer className="app-footer">
      <div className="footer-links">
        <button className="footer-link-btn" onClick={() => openModal('terms')}>이용약관</button>
        <span className="divider">|</span>
        <button className="footer-link-btn" onClick={() => openModal('privacy')}>개인정보처리방침</button>
      </div>
      
      <div className="footer-info">
        <p>개인정보책임자: 백인규 교사 (서울가동초등학교) | 문의: 02-448-5766</p>
        <p>Copyright &copy; 2026 두근두근 발표자 뽑기. All rights reserved.</p>
      </div>

      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content md-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalContent.title}</h2>
              <button className="close-btn material-symbols-outlined" onClick={closeModal}>close</button>
            </div>
            <div className="modal-body markdown-body">
              <ReactMarkdown>{modalContent.content}</ReactMarkdown>
            </div>
            <div className="modal-footer">
              <button className="md-btn primary" onClick={closeModal}>확인</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
