import { useState } from 'react';
import PaymentKiosk from './PaymentKiosk';
import TestSimulator from './TestSimulator';

function App() {
  // 決定要顯示「繳費機」還是「模擬器」
  const [view, setView] = useState('kiosk');

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* 根據 view 狀態，決定畫出哪一個積木 */}
      {view === 'kiosk' ? <PaymentKiosk /> : <TestSimulator />}

      {/* 開發者隱藏按鈕：用來在繳費機與模擬器之間切換 */}
      <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <button 
          onClick={() => setView(view === 'kiosk' ? 'simulator' : 'kiosk')}
          style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '12px' }}
        >
          切換至 {view === 'kiosk' ? '開發者後台 (模擬進場)' : '前台繳費機'}
        </button>
      </div>

    </div>
  );
}

export default App;