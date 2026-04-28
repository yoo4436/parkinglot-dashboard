import { useState } from 'react';
import PaymentKiosk from './PaymentKiosk';
import TestSimulator from './TestSimulator';

function Dashboard() {
  const [view, setView] = useState('kiosk');

  return (
    // 修正：拿掉寬度限制，讓它 100% 適應外層的 #root
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      
      {view === 'kiosk' ? <PaymentKiosk /> : <TestSimulator />}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button 
          onClick={() => setView(view === 'kiosk' ? 'simulator' : 'kiosk')}
          style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
        >
          切換至 {view === 'kiosk' ? '開發者後台 (模擬進場)' : '前台繳費機'}
        </button>
      </div>

    </div>
  );
}

export default Dashboard;