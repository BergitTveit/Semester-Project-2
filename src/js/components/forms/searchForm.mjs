import { handleSearch } from '../../utils/handlers/listing-handlers/searchHandler.mjs';
import { createButton } from '../common/buttons.mjs';
import { createSearchInput } from '../common/forminputs.mjs';

export function initializeSearchForm() {
    const form = document.getElementById('searchForm');
    if (!form) return;

    form.classList.add('mb-6', 'flex', 'items-center', 'justify-center', 'gap-4');

    const searchInput = createSearchInput();
    searchInput.classList.add('flex-grow', 'h-10', 'px-3', 'py-2', 'text-base');

    const searchButton = createButton('Search', null, 'submit');
    searchButton.id = 'searchButton';

    searchButton.classList.add(
        'h-10',
        'px-4',
        'py-2',
        'bg-blue-500',
        'text-white',
        'rounded-md',
        'hover:bg-blue-600',
        'focus:outline-none',
        'transition',
        'duration-200'
    );

    form.addEventListener('submit', handleSearch);

    form.appendChild(searchInput);
    form.appendChild(searchButton);

    return form;
}
