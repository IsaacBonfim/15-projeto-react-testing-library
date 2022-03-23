import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rederWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

const link = 'More details';

describe('', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const { name, type, image, averageWeight } = pokemons[0];
    const { measurementUnit, value } = averageWeight;

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeSprite = screen.getByRole('img');

    expect(pokeName).toHaveTextContent(name);
    expect(pokeType).toHaveTextContent(type);
    expect(pokeSprite).toHaveAttribute('src', image);
    expect(pokeSprite).toHaveAttribute('alt', `${name} sprite`);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it(`Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para
  exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const detailLink = screen.getByRole('link', { name: link });

    expect(detailLink).toBeInTheDocument();
    expect(detailLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  it(`Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de Pokémon`, () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: link });

    userEvent.click(detailLink);

    const detailTitle = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`, level: 2 });

    expect(detailTitle).toBeInTheDocument();
  });

  it('Testa também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const detailLink = screen.getByRole('link', { name: link });

    userEvent.click(detailLink);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favorite = screen.getAllByRole('img');

    expect(favorite[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite[1])
      .toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
