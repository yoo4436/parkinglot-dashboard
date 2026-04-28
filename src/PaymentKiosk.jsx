import { useState } from 'react';

export default function PaymentKiosk() {
  const [plateNumber, setPlateNumber] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const handleQuery = () => {
    if (!plateNumber) {
      setMessage('請先輸入車牌號碼！');
      return;
    }
    setMessage('');
    setStep(2);
  };

  const handlePayment = (paymentMethod) => {
    setMessage(`處理中：正在使用 ${paymentMethod} 進行扣款...`);
    
    fetch(`http://localhost:8080/api/parking/checkOut?plateNumber=${plateNumber}`, {
      method: 'POST',
    })
    .then(response => response.text()) 
    .then(text => {
      setMessage(`✅ 交易成功！${text}，請於 15 分鐘內離場。`);
      setStep(3);
    })
    .catch(error => setMessage('❌ 結帳發生錯誤，請洽管理員。'));
  };

  const resetKiosk = () => {
    setPlateNumber('');
    setMessage('');
    setStep(1);
  };

  return (
    // ✨ 大改造 1：設定 maxWidth: 500px 和 minHeight: 650px，做出機台的比例
    // ✨ 大改造 2：使用 display: 'flex', flexDirection: 'column' 讓內部元素上下排列
    <div style={{ 
      maxWidth: '500px', 
      minHeight: '650px', 
      margin: '0 auto', 
      border: '1px solid #e0e0e0', 
      borderRadius: '24px', // 更圓潤的機台邊角
      padding: '40px 30px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      
      {/* 機台頭部 (永遠固定在上方) */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1890ff', fontSize: '36px', fontWeight: 'bold' }}>🅿️ 智慧繳費機</h1>
      </div>
      
      {message && (
        <div style={{ padding: '15px', backgroundColor: '#e6f7ff', borderRadius: '8px', color: '#0050b3', marginBottom: '20px', textAlign: 'center' }}>
          <strong>提示：</strong> {message}
        </div>
      )}

      {/* ✨ 大改造 3：把步驟內容包在 flex: 1 裡面，它會自動把空間撐開，並讓內容垂直置中 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* 步驟 1：輸入車牌 */}
        {step === 1 && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '30px', color: '#333' }}>請輸入您的車牌號碼</h2>
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="例如：ABC-1234"
              style={{ padding: '20px', fontSize: '28px', width: '100%', boxSizing: 'border-box', textAlign: 'center', textTransform: 'uppercase', marginBottom: '30px', borderRadius: '12px', border: '2px solid #ddd', outline: 'none' }}
            />
            <button 
              onClick={handleQuery}
              style={{ display: 'block', width: '100%', padding: '20px', fontSize: '22px', fontWeight: 'bold', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(24,144,255,0.3)' }}
            >
              查詢停車費
            </button>
          </div>
        )}

        {/* 步驟 2：選擇付款方式 */}
        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', color: '#666', marginBottom: '10px' }}>車牌：<span style={{ color: '#1890ff', fontWeight: 'bold' }}>{plateNumber}</span></h2>
            <h1 style={{ fontSize: '64px', margin: '10px 0 20px', color: '#333' }}>$120</h1>
            <p style={{ color: '#888', marginBottom: '40px', fontSize: '18px' }}>請選擇下方付款方式</p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => handlePayment('信用卡')} style={{ padding: '20px 10px', fontSize: '18px', cursor: 'pointer', borderRadius: '12px', flex: 1, border: '1px solid #ccc', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>💳 信用卡</button>
              <button onClick={() => handlePayment('LINE Pay')} style={{ padding: '20px 10px', fontSize: '18px', cursor: 'pointer', borderRadius: '12px', flex: 1, backgroundColor: '#00c300', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,195,0,0.3)' }}>📱 LINE Pay</button>
              <button onClick={() => handlePayment('悠遊卡')} style={{ padding: '20px 10px', fontSize: '18px', cursor: 'pointer', borderRadius: '12px', flex: 1, backgroundColor: '#1282c0', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(18,130,192,0.3)' }}>🚌 悠遊卡</button>
            </div>
            
            <button onClick={resetKiosk} style={{ marginTop: '40px', padding: '10px', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', textDecoration: 'underline', fontSize: '16px' }}>返回上一步重填</button>
          </div>
        )}

        {/* 步驟 3：完成畫面 */}
        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '80px', marginBottom: '20px', lineHeight: '1' }}>🎉</h1>
            <h2 style={{ fontSize: '26px', marginBottom: '40px', color: '#333', lineHeight: '1.5' }}>感謝您的使用<br/>祝您行車平安！</h2>
            <button onClick={resetKiosk} style={{ padding: '20px 40px', fontSize: '20px', fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(76,175,80,0.3)' }}>完成並返回首頁</button>
          </div>
        )}
      </div>

    </div>
  );
}