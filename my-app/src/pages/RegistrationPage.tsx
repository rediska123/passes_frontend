// src/features/auth/Register.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/AuthSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { User } from '../api/Api';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { BreadCrumbs } from '../components/BreadCrumbs';
import PassNav from '../components/passes_nav';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
        const { request } = await api.user.userCreate({
            "username": username,
            "password": password
        } )
        if (request.status == 200) {
            const { request } = await api.auth.authCreate({
                "username": username,
                "password": password
            })
            if (request.status == 200) {
                dispatch(setUser(JSON.parse(request.response)))
                navigate(`${ROUTES.CLIENTCARDS}`)
            }
        }
        console.log(request.data);
  };

  return (
    <Container>
    <PassNav/>
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CLIENTCARDS }]} />
      <h2>Register</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;