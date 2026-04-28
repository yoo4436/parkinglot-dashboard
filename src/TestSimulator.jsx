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
    <div style={{ padding: '20px', border: '2px dashed #999', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#666' }}>⚙️ (開發者專用) 車牌辨識鏡頭模擬器</h2>
      {message && <div style={{ marginBottom: '15px', color: '#d32f2f' }}>{message}</div>}
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          placeholder="模擬進場車牌 (例: ABC-1234)"
          style={{ padding: '8px', flex: 1 }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '8px' }}>
          <option value="CAR">汽車</option>
          <option value="MOTORCYCLE">機車</option>
        </select>
        <button onClick={handleCheckIn} style={{ padding: '8px 15px', cursor: 'pointer' }}>觸發鏡頭進場</button>
      </div>
    </div>
  );
}