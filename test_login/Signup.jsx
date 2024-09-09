import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            await axios.post('/api/signup', { email, password });
            // 회원가입 성공 시 처리
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;
