import { useState } from 'react';

export default function TestSimulator() {
  const [plateNumber, setPlateNumber] = useState('');
  const [type, setType] = useState('CAR');
  const [message, setMessage] = useState('');

  const handleCheckIn = async () => {
    setMessage(`處理中：準備讓 ${plateNumber} (${type}) 進場...`);
    fetch(`http://localhost:8080/api/parking/checkIn?plateNumber=${plateNumber}&type=${type}`, {
      method: 'POST',
    })
    .then(response => response.text()) 
    .then(text => setMessage(`✅ ${text}`))
    .catch(error => setMessage('❌ 發生錯誤，請確認後端伺服器是否開啟。'));
  };

  return (
    // ✨ 優化 1：加入 maxWidth, margin 置中，並給予更舒適的 padding 與陰影
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '40px 30px', 
      border: '2px dashed #ccc', 
      borderRadius: '24px', 
      backgroundColor: '#fafafa', // 稍微帶一點灰，區別於前台的純白
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
      boxSizing: 'border-box' 
    }}>
      
      {/* 面板標題區 */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#555', fontSize: '24px', margin: '0' }}>⚙️ 車牌辨識鏡頭模擬器</h2>
        <p style={{ color: '#999', fontSize: '14px', marginTop: '8px' }}>(開發者測試專用後台)</p>
      </div>

      {/* 訊息提示區 (改成更顯眼的樣式) */}
      {message && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: message.includes('❌') ? '#fff1f0' : '#e6f7ff', color: message.includes('❌') ? '#cf1322' : '#0050b3', border: `1px solid ${message.includes('❌') ? '#ffa39e' : '#91d5ff'}`, borderRadius: '8px', textAlign: 'center' }}>
          {message}
        </div>
      )}
      
      {/* ✨ 優化 2：將表單改成 Flex Column (垂直排列)，讓輸入框又大又清楚 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 車牌輸入框 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontWeight: 'bold' }}>模擬車牌號碼</label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="例如: ABC-1234"
            style={{ width: '100%', padding: '15px', fontSize: '18px', textTransform: 'uppercase', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* 車種選擇 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontWeight: 'bold' }}>車輛類型</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            style={{ width: '100%', padding: '15px', fontSize: '18px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', cursor: 'pointer' }}
          >
            <option value="CAR">汽車 (Car)</option>
            <option value="MOTORCYCLE">機車 (Motorcycle)</option>
          </select>
        </div>

        {/* ✨ 優化 3：按鈕改成深色系，看起來更像硬體的「觸發按鈕」 */}
        <button 
          onClick={handleCheckIn} 
          style={{ marginTop: '10px', padding: '15px', fontSize: '20px', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
        >
          📸 觸發鏡頭進場
        </button>
        
      </div>
    </div>
  );
}