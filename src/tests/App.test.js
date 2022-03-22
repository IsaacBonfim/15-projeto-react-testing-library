import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './rederWithRouter';

describe('Testes referentes ao componente App.js', () => {
  it(`Testa se o topo da aplicação contém um conjunto fixo de links 
  denavegação.`, () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  it(`Testa se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it(`Testa se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it(`Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma
  URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/qualquercoisa');

    const error = screen.getByRole('heading', { level: 2, name: /not found/gmi });

    expect(error).toBeInTheDocument();
  });
});
