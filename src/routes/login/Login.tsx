import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/userStateSlice';

export default function Login() {
	const dispatch = useAppDispatch();
	const [username, setUsername] = useState('');
	return (
		<div className="page login">
			<div className="login-content">
				<input
					style={{
						textAlign: 'center',
					}}
					type={'text'}
					placeholder={'Username...'}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button
					disabled={username.length === 0}
					style={{ width: '100px', height: '30px' }}
					onClick={() => dispatch(loginUser(username))}
				>
					<h3>Login</h3>
				</button>
			</div>
		</div>
	);
}
