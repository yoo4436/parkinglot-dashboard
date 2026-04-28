import { useState } from 'react'

function App() {
  // 定義狀態 (State) 來儲存使用者的輸入與後端回傳的訊息
  const [plateNumber, setPlateNumber] = useState('');
  const [type, setType] = useState('CAR');
  const [message, setMessage] = useState('');

  // 準備好用來呼叫後端 API 的函式
  const handleCheckIn = async () => {
    // 1. 先顯示處理中
    setMessage(`處理中：準備讓 ${plateNumber} (${type}) 進場...`);

    // 2. 把參數 (plateNumber 和 vehicleType) 串接在網址後面，模擬 Postman 的行為
    fetch(`http://localhost:8080/api/parking/checkIn?plateNumber=${plateNumber}&type=${type}`, {
      method: 'POST',
      // 因為參數在網址上了，所以不需要 headers 和 body 了
    })
    // 3. 後端回傳的是「純文字」，所以用 .text() 解析，而不是 .json()
    .then(response => response.text()) 
    .then(text => {
      // 這裡的 text 就會是後端吐出來的 "車牌 ABC-1234 已入場"
      setMessage(`✅ ${text}`);
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('❌ 發生錯誤，請確認後端伺服器是否開啟。');
    });
  };

  const handleCheckOut = async () => {
    // 1. 先顯示處理中
    setMessage(`處理中：準備讓 ${plateNumber} (${type}) 進場...`);

    // 2. 把參數 (plateNumber 和 vehicleType) 串接在網址後面，模擬 Postman 的行為
    fetch(`http://localhost:8080/api/parking/checkOut?plateNumber=${plateNumber}`, {
      method: 'POST',
      // 因為參數在網址上了，所以不需要 headers 和 body 了
    })
    // 3. 後端回傳的是「純文字」，所以用 .text() 解析，而不是 .json()
    .then(response => response.text()) 
    .then(text => {
      // 這裡的 text 就會是後端吐出來的 "車牌 ABC-1234 已入場"
      setMessage(`✅ ${text}`);
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('❌ 發生錯誤，請確認後端伺服器是否開啟。');
    });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🚗 智慧停車場儀表板</h1>

      {/* 顯示系統訊息的區塊 */}
      {message && (
        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#e6f7ff', borderLeft: '5px solid #1890ff', borderRadius: '4px' }}>
          <strong>系統訊息：</strong> {message}
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      {/* 進場表單區塊 */}
      <h2>👉 車輛進場 (Check-In)</h2>
      <h2>👉 車輛出場 (Check-Out)</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>車牌號碼：</label>
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          placeholder="例如：ABC-1234"
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>車種：</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
        >
          <option value="CAR">汽車 (Car)</option>
          <option value="MOTORCYCLE">機車 (Motorcycle)</option>
        </select>
      </div>

      <button 
        onClick={handleCheckIn}
        style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        確認進場
      </button>

    </div>
  )
}

export default App