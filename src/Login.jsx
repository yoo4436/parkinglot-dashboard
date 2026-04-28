import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 這是 React Router 提供的超能力，用來切換網址
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // 防止表單送出時重整網頁
    
    // 目前我們還沒接上 Java 後端，先寫死一組假帳號密碼來測試跳轉
    if (account === 'admin' && password === '1234') {
      setError('');
      // 登入成功！跳轉到專屬儀表板
      navigate('/dashboard');
    } else {
      setError('帳號或密碼錯誤，請重試！');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5', width: '100vw' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#1890ff', margin: '0 0 10px 0' }}>🅿️ 智慧停車雲端服務</h1>
          <p style={{ color: '#666', margin: 0 }}>登入後即可隨時掌握愛車動態與費用</p>
        </div>

        {error && (
          <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#fff2f0', border: '1px solid #ffccc7', borderRadius: '8px', color: '#ff4d4f', textAlign: 'center', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>帳號 (Account)</label>
            <input 
              type="text" 
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="請輸入帳號 (測試請打 admin)"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d9d9d9', boxSizing: 'border-box', fontSize: '16px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>密碼 (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼 (測試請打 1234)"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d9d9d9', boxSizing: 'border-box', fontSize: '16px', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ marginTop: '10px', padding: '15px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(24,144,255,0.3)' }}
          >
            登入系統
          </button>
        </form>
        
      </div>
    </div>
  );
}