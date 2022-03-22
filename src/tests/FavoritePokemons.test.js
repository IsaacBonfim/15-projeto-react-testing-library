import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './rederWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const favoritePokemons = pokemons.filter((_poke, index) => index < 2);

describe('Testes referentes ao componente FavoritePokemons.js', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavoritesMessage = screen.getByText('No favorite pokemon found');

    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(2);
  });
});
