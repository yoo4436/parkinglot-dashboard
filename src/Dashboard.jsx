import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestSimulator from './TestSimulator';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSimulator, setShowSimulator] = useState(false);

  // 狀態一開始是空的，準備接收後端資料
  const [myVehicles, setMyVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 使用 useEffect 在元件載入時呼叫後端 API
  useEffect(() => {
    const fetchMyVehicles = async () => {
      // 從 localStorage 拿出我們登入時存的通行證
      const token = localStorage.getItem('jwtToken');
      
      try {
        const response = await fetch('http://localhost:8080/api/user/vehicles', {
          method: 'GET',
          headers: {
            // 把 JWT 放在 Header 裡出示給 Spring Security 看
            'Authorization': `Bearer ${token}` 
          }
        });

        if (response.ok) {
          const data = await response.json();
          setMyVehicles(data); // 把後端傳來的陣列存進狀態
        } else {
          // 如果 Token 過期或失效，就強制登出
          handleLogout(); 
        }
      } catch (error) {
        console.error("連線失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyVehicles();
  }, []); // 空陣列代表這個 useEffect 只會在畫面第一次渲染時執行一次

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  return (
    // 確保外層寬度 100%
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' }}>
      
      <nav style={{ backgroundColor: '#fff', width: '100%', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
        <h2 style={{ margin: 0, color: '#1890ff', fontSize: '20px' }}>🅿️ 我的智慧車庫</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#666', fontWeight: 'bold' }}>歡迎，車主</span>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 15px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
          >
            登出
          </button>
        </div>
      </nav>

      {/* 讓內容區塊置中，但最大不超過 800px，且 width: 100% */}
      <div style={{ maxWidth: '800px', width: '100%', margin: '30px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '22px' }}>🚗 已綁定車輛狀態</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {myVehicles.map((vehicle) => (
            // 卡片內部加上 flexWrap: 'wrap'，防止內容擠壓重疊
            <div key={vehicle.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', borderLeft: vehicle.status === 'PARKING' ? '6px solid #52c41a' : '6px solid #d9d9d9' }}>
              
              {/* 給文字區塊 flex: '1 1 250px'，保證它至少有 250px 寬度，按鈕就不會撞上來 */}
              <div style={{ flex: '1 1 250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{vehicle.plate}</span>
                  {vehicle.status === 'PARKING' ? (
                    <span style={{ backgroundColor: '#f6ffed', color: '#52c41a', border: '1px solid #b7eb8f', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>● 停車中</span>
                  ) : (
                    <span style={{ backgroundColor: '#fafafa', color: '#8c8c8c', border: '1px solid #d9d9d9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>○ 未進場</span>
                  )}
                </div>
                <div style={{ color: '#888', fontSize: '14px', marginBottom: vehicle.status === 'PARKING' ? '15px' : '0' }}>
                  車型：{vehicle.model}
                </div>
                
                {vehicle.status === 'PARKING' && (
                  <div style={{ backgroundColor: '#f9f9f9', padding: '10px 15px', borderRadius: '8px', display: 'inline-block' }}>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>進場時間：{vehicle.entryTime}</div>
                    <div style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>目前累積：<span style={{ color: '#1890ff', fontSize: '20px' }}>${vehicle.currentFee}</span></div>
                  </div>
                )}
              </div>

              <div>
                {vehicle.status === 'PARKING' ? (
                  <button style={{ padding: '15px 25px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(24,144,255,0.3)', whiteSpace: 'nowrap' }}>
                    💳 立即線上繳費
                  </button>
                ) : (
                  <button style={{ padding: '15px 25px', backgroundColor: '#f0f0f0', color: '#999', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'not-allowed', whiteSpace: 'nowrap' }}>
                    無需繳費
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <button 
            onClick={() => setShowSimulator(!showSimulator)}
            style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
          >
            {showSimulator ? '關閉開發者面板' : '開啟車牌辨識鏡頭模擬器 (測試用)'}
          </button>
          
          {showSimulator && (
            <div style={{ marginTop: '20px' }}>
              <TestSimulator />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}