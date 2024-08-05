import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer'
import { MemoryRouter } from 'react-router-dom';

test('renders Footer component', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  
  expect(screen.getByText('Furniro.')).toBeInTheDocument();

  
  // expect(screen.getByText('400 University Drive Suite 200 Coral')).toBeInTheDocument();
  // expect(screen.getByText('Gables,')).toBeInTheDocument();
  // expect(screen.getByText('FL 33134 USA')).toBeInTheDocument();

  
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Shop')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();

  
  expect(screen.getByText('Payment Option')).toBeInTheDocument();
  expect(screen.getByText('Return')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policies')).toBeInTheDocument();

  
  expect(screen.getByText('Newsletter')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Your Email Address')).toBeInTheDocument();
  expect(screen.getByText('SUBSCRIBE')).toBeInTheDocument();

  
  expect(screen.getByText('2023 furino. All rights reserved')).toBeInTheDocument();
});
