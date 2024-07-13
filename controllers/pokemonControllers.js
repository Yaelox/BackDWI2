const axios = require('axios');

const getPokemonById = async (req, res) => {
    try {
        const pokemonId = req.params.id;
        const pokemonData = await getPokemonData(pokemonId);
        const speciesData = await axios.get(pokemonData.species.url);
        const evolutionChainData = await getEvolutionChain(speciesData.data.evolution_chain.url);

        res.json({
            pokemon: pokemonData,
            evolutions: evolutionChainData.chain
        });
    } catch (error) {
        console.error('Error fetching Pokemon data:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getPokemonData = async (pokemonId) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching Pokemon data: ${error.message}`);
    }
};

const getEvolutionChain = async (evolutionChainUrl) => {
    try {
        const response = await axios.get(evolutionChainUrl);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching evolution chain data: ${error.message}`);
    }
};

module.exports = {
    getPokemonById
};
