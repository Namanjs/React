import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in all the fields.");
            return;
        }

        login(username);

        navigate("/");
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>

                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Jira-Lite</h1>
                    <p className='text-gray-500 mt-2'>Sign in to your workspace</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    {error && (
                        <div className='bg-red-50 text-red-600 p-3 rounded text-sm text-center'>
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded focus:ring-2 focus: ring-blue-500 outline-none'
                            placeholder='Enter username'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none'
                            placeholder='Enter password'
                        />
                    </div>

                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition-colors mt-4"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}