import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './rederWithRouter';
import { NotFound } from '../components';

describe('Testes referentes ao componente NotFound.js', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Page requested not found');
  });

  it('Testa se página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getAllByRole('img');

    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
