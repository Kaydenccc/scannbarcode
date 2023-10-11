'use client';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';
import { setCookie } from '@/helper';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/axios';

export default function SimpleRegistrationForm() {
  const navigation = useRouter();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  }

  async function login(e) {
    e.preventDefault();
    console.log(userLogin);
    try {
      // const res = await axiosInstance.post('/login', userLogin);

      const res = await fetch('https://fc0qw89g-8000.asse.devtunnels.ms/api/login', {
        method: 'post',
        body: JSON.stringify(userLogin),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        credentials: 'include',
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          throw err;
        });
      console.log('RESPONSE = ', res);
      setCookie('token', res.data, 1);
      alert(res.data);
      navigation.push('/');
    } catch (err) {
      alert(err);
      throw err;
    }
  }
  return (
    <Card color="transparent" shadow={false} className="flex mt-20 justify-center items-center">
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your email and password to login.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" name="email" onChange={handleChange} />
          <Input type="password" size="lg" name="password" label="Password" onChange={handleChange} />
        </div>
        <Button onClick={login} className="mt-6" fullWidth>
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Dont have an account?{' '}
          <a href="#" className="font-medium text-gray-900">
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
}
