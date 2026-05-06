import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 這是 React Router 提供的超能力，用來切換網址
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 防止表單送出時重整網頁
    setError(''); // 每次登入前先清空錯誤訊息
    
    try {
          // 呼叫我們用 Spring Boot 寫好的 API
          const response = await fetch(`http://localhost:8080/api/auth/login?username=${account}&password=${password}`, {
            method: 'POST',
          });

          if (response.ok) {
            // 如果登入成功，解析回傳的 JSON (裡面會有一把 token)
            const data = await response.json();
            
            // ✨ 關鍵：把 JWT 存進瀏覽器的 localStorage 裡，這樣重新整理網頁才不會被登出
            localStorage.setItem('jwtToken', data.token);
            
            // 登入成功！跳轉到專屬儀表板
            navigate('/dashboard');
          } else {
            // 抓取後端回傳的錯誤訊息 (例如 "帳號或密碼錯誤")
            const errorText = await response.text();
            setError(errorText || '登入失敗，請確認帳號密碼。');
          }
    } catch (err) {
          setError('無法連線至伺服器，請確認後端是否已啟動。');
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