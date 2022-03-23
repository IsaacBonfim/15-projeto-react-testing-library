import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rederWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const { name, summary, foundAt } = pokemon;
const link = 'More details';

describe('Testes referentes ao componente PokemonDetails.js', () => {
  it(`Testa se as informações detalhadas do Pokémon selecionado são mostradas
  na tela`, () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: link });

    userEvent.click(detailsLink);

    const detailsTitle = screen.getByRole('heading', { name: `${name} Details` });
    expect(detailsTitle).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: link })).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryTitle).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it(`Testa se existe na página uma seção com os mapas contendo as localizações
  do pokémon`, () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: link });

    userEvent.click(detailsLink);

    const localTitle = screen.getByRole('heading', { name: `Game Locations of ${name}` });

    expect(localTitle).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      const img = screen.getAllByRole('img');

      expect(screen.getByText(location)).toBeInTheDocument();
      expect(img[index + 1]).toHaveAttribute('alt', `${name} location`);
      expect(img[index + 1]).toHaveAttribute('src', map);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.', (
  ) => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: link });

    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(screen.getAllByRole('img')[1])
      .toHaveAttribute('alt', `${name} is marked as favorite`);

    userEvent.click(checkbox);

    expect(screen.queryAllByRole('img')[1]).not
      .toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
