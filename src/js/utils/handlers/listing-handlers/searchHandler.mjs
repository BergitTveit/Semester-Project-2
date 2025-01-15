import { loadAndDisplaySearchResults } from '../../display-loaders/searchResultLoader.mjs';

export async function handleSearch(event) {
    event.preventDefault();
    const searchInput = event.target.querySelector('input');
    if (!searchInput) return;

    const searchText = searchInput.value.trim();
    if (!searchText) return;

    await loadAndDisplaySearchResults(searchText);
}
