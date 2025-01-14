import { handleSearch } from '../../utils/handlers/listing-handlers/searchHandler.mjs';
import { createButton } from '../common/buttons.mjs';
import { createSearchInput } from '../common/forminputs.mjs';

export function initializeSearchForm() {
    const form = document.getElementById('searchForm');
    if (!form) return;
    form.classList.add('mb-4', 'flex', 'gap-2');

    const searchInput = createSearchInput();
    const searchButton = createButton('Search', null, 'submit');
    searchButton.id = 'searchButton';

    form.addEventListener('submit', handleSearch);
    form.appendChild(searchInput);
    form.appendChild(searchButton);

    return form;
}
