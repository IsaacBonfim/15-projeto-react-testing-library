import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './rederWithRouter';
import App from '../App';
import pokemons from '../data';

const id = 'pokemon-name';
const pokemonTypes = [...new Set(pokemons
  .reduce((types, { type }) => [...types, type], []))];

describe('Testes referentes ao componente Pokedex.js', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  it(`Testa se é exibido o próximo Pokémon da lista quando o botão Próximo
  pokémon é clicado.`, () => {
    renderWithRouter(<App />);

    const next = screen.getByTestId('next-pokemon');
    let pokemon = screen.getByTestId(id);

    expect(pokemon).toHaveTextContent(pokemons[0].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[1].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[2].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[3].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[4].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[5].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[6].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[7].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[8].name);

    userEvent.click(next);
    pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(pokemons[0].name);
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(id);

    expect(pokemon).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: 'All' });

    expect(allBtn).toBeInTheDocument();
    expect(typeBtn).toHaveLength(pokemonTypes.length);

    typeBtn.forEach((btn, index) => {
      expect(btn).toHaveTextContent(pokemonTypes[index]);

      userEvent.click(btn);

      const typeOfPokemons = pokemons.filter((pokemon) => pokemon.type === btn.innerHTML);
      const next = screen.getByTestId('next-pokemon');

      if (typeOfPokemons.length <= 1) {
        expect(next).toBeDisabled();
      } else {
        let currPokemon = screen.getByTestId(id);

        expect(currPokemon).toHaveTextContent(typeOfPokemons[0].name);

        userEvent.click(next);

        currPokemon = screen.getByTestId(id);
        expect(currPokemon).toHaveTextContent(typeOfPokemons[1].name);
      }
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: 'All' });

    userEvent.click(typeBtn[2]);

    expect(screen.getByTestId(id)).not.toHaveTextContent(pokemons[0].name);

    userEvent.click(allBtn);

    expect(screen.getByTestId(id)).toHaveTextContent(pokemons[0].name);
  });
});
