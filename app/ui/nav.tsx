'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';

export default function Nav() {
  const router = useRouter();
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { userData, setUser } = useUser();
  const { user, loading } = userData;
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let responseData;
    try {
        responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            identifier: data.identifier,
            password: data.password,
            }),
        }
        );
        if (responseData.error) {
            const errorMessage = responseData.error.message || 'An error occurred';
            throw new Error(errorMessage);
        }
        if (setToken(responseData)) {
            setUser({user: responseData.user.username, loading: false});
            router.refresh();
        }
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError('An unexpected error occurred');
        }
    } 
  };

  const logout = () => {
    if (unsetToken()) {
        setUser({user: null, loading: false});
        router.replace('/');
        router.refresh();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    
    <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
    >
    <ul
        className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between 
            md:pt-0 space-x-2"
    >
        <li>
            <Link href="/" className="md:p-2 py-2 block hover:text-purple-400">
                Home
            </Link>
        </li>
        {!loading &&
        (user ? (
            <>
                <li>
                    <Link className="md:p-2 py-2 block hover:text-purple-400" href="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <a
                        className="md:p-2 py-2 block hover:text-purple-400"
                        onClick={logout}
                        style={{ cursor: 'pointer' }}
                    >
                        Logout
                    </a>
                </li>
            </>
        ) : (
            ''
        ))}
        {!loading && !user ? (
        <>
            <li>
                <form onSubmit={handleSubmit} className="form-inline">
                    <input
                        type="text"
                        name="identifier"
                        onChange={handleChange}
                        placeholder="Username"
                        className="md:p-2 form-input py-2 rounded mx-2"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        className="md:p-2 form-input py-2 rounded mx-2"
                        required
                    />

                    <button
                        className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                {error && <small>{error}</small>}
            </li>
            <li>
                <Link className="md:p-2 block py-2 hover:text-purple-400 text-black" href="/register">
                    Register
                </Link>
            </li>
        </>
        ) : (
        ''
        )}
    </ul>
    </div>
  );
};
