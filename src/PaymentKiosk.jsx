import { useState } from 'react';

export default function PaymentKiosk() {
  const [plateNumber, setPlateNumber] = useState('');
  const [message, setMessage] = useState('');
  
  // 狀態管理：記錄使用者目前在哪個步驟 (1: 輸入車牌, 2: 選擇付款方式, 3: 完成)
  const [step, setStep] = useState(1);

  // 模擬步驟 1 -> 2：查詢費用
  const handleQuery = () => {
    if (!plateNumber) {
      setMessage('請先輸入車牌號碼！');
      return;
    }
    // 未來這裡要串接後端的「查詢費用 API」，現在先直接進入付款畫面
    setMessage('');
    setStep(2);
  };

  // 模擬步驟 2 -> 3：執行付款與離場 (呼叫我們寫好的 checkOut API)
  const handlePayment = (paymentMethod) => {
    setMessage(`處理中：正在使用 ${paymentMethod} 進行扣款...`);
    
    fetch(`http://localhost:8080/api/parking/checkOut?plateNumber=${plateNumber}`, {
      method: 'POST',
    })
    .then(response => response.text()) 
    .then(text => {
      setMessage(`✅ 交易成功！${text}，請於 15 分鐘內離場。`);
      setStep(3); // 進入完成畫面
    })
    .catch(error => setMessage('❌ 結帳發生錯誤，請洽管理員。'));
  };

  const resetKiosk = () => {
    setPlateNumber('');
    setMessage('');
    setStep(1);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#1890ff' }}>🅿️ 智慧繳費機</h1>
      
      {message && (
        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#e6f7ff', borderRadius: '4px' }}>
          <strong>提示：</strong> {message}
        </div>
      )}

      {/* 步驟 1：輸入車牌 */}
      {step === 1 && (
        <div style={{ textAlign: 'center' }}>
          <h2>請輸入您的車牌號碼</h2>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="例如：ABC-1234"
            style={{ padding: '15px', fontSize: '24px', width: '80%', textAlign: 'center', textTransform: 'uppercase', marginBottom: '20px' }}
          />
          <button 
            onClick={handleQuery}
            style={{ display: 'block', width: '80%', margin: '0 auto', padding: '15px', fontSize: '18px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            查詢停車費
          </button>
        </div>
      )}

      {/* 步驟 2：選擇付款方式 */}
      {step === 2 && (
        <div style={{ textAlign: 'center' }}>
          <h2>車牌：<span style={{ color: '#1890ff' }}>{plateNumber}</span></h2>
          {/* 未來這裡會顯示真實從後端撈回來的金額 */}
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>$120</h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>請選擇付款方式</p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={() => handlePayment('信用卡')} style={{ padding: '20px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', flex: 1 }}>💳 信用卡</button>
            <button onClick={() => handlePayment('LINE Pay')} style={{ padding: '20px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', flex: 1, backgroundColor: '#00c300', color: 'white', border: 'none' }}>📱 LINE Pay</button>
            <button onClick={() => handlePayment('悠遊卡')} style={{ padding: '20px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', flex: 1, backgroundColor: '#1282c0', color: 'white', border: 'none' }}>🚌 悠遊卡</button>
          </div>
          
          <button onClick={resetKiosk} style={{ marginTop: '20px', padding: '10px', background: 'none', border: 'none', color: '#999', cursor: 'pointer', textDecoration: 'underline' }}>返回上一步</button>
        </div>
      )}

      {/* 步驟 3：完成畫面 */}
      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '64px', margin: '0' }}>🎉</h1>
          <h2>感謝您的使用，祝您行車平安！</h2>
          <button onClick={resetKiosk} style={{ marginTop: '20px', padding: '15px 30px', fontSize: '18px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>返回首頁</button>
        </div>
      )}
    </div>
  );
}