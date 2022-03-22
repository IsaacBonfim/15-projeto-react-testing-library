import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './rederWithRouter';

describe('Testes referentes ao componente About.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /about pok[ée]dex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const text1 = /This application simulates a Pokédex/igm;
    const line1 = screen.getByText(text1);
    expect(line1).toBeInTheDocument();

    const text2 = /One can filter Pokémons by type/igm;
    const line2 = screen.getByText(text2);
    expect(line2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);
  });
});
