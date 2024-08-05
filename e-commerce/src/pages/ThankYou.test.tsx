import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';

test('renders ThankYou component', () => {
  render(
    <MemoryRouter>
      <ThankYou />
    </MemoryRouter>
  );

 
  expect(screen.getByAltText('Logo Furniro')).toBeInTheDocument();

 
  expect(screen.getByText('Obrigado por sua compra')).toBeInTheDocument();
  expect(screen.getByText('Verifique a caixa de entrada do seu email.')).toBeInTheDocument();

 
  const linkElement = screen.getByText('Voltar para Home');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.closest('a')).toHaveAttribute('href', '/');
});
