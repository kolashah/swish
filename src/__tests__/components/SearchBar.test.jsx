import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

const filters = {
  position: { PG: true, PF: true, C: true, SF: true, SG: true },
  statType: { points: true, rebounds: true, assists: true, steals: true },
  marketSuspended: 'all',
};

test('renders SearchBar with position and statType filters and market status dropdown', () => {
  const onFilterChange = jest.fn();

  render(<SearchBar filters={filters} onFilterChange={onFilterChange} />);

  // Check position filters
  const positionCheckboxes = screen.getAllByLabelText(/Position:/);
  positionCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(onFilterChange).toHaveBeenCalledWith(
      'position',
      checkbox.value,
      false
    );
  });

  // Check statType filters
  const statTypeCheckboxes = screen.getAllByLabelText(/Stat Type:/);
  statTypeCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(onFilterChange).toHaveBeenCalledWith(
      'statType',
      checkbox.value,
      false
    );
  });

  // Check market status dropdown
  const marketStatusDropdown = screen.getByLabelText(/Market Status:/);
  expect(marketStatusDropdown).toHaveValue('all');
  fireEvent.change(marketStatusDropdown, { target: { value: 'suspended' } });
  expect(onFilterChange).toHaveBeenCalledWith('marketSuspended', 'suspended');
});

test('calls onFilterChange with correct arguments when position filter is changed', () => {
  const onFilterChange = jest.fn();

  render(<SearchBar filters={filters} onFilterChange={onFilterChange} />);

  const positionCheckbox = screen.getByLabelText('PG');
  fireEvent.click(positionCheckbox);

  expect(onFilterChange).toHaveBeenCalledWith('position', 'PG', false);
});

test('calls onFilterChange with correct arguments when statType filter is changed', () => {
  const onFilterChange = jest.fn();

  render(<SearchBar filters={filters} onFilterChange={onFilterChange} />);

  const statTypeCheckbox = screen.getByLabelText('points');
  fireEvent.click(statTypeCheckbox);

  expect(onFilterChange).toHaveBeenCalledWith('statType', 'points', false);
});

test('calls onFilterChange with correct arguments when market status dropdown is changed', () => {
  const onFilterChange = jest.fn();

  render(<SearchBar filters={filters} onFilterChange={onFilterChange} />);

  const marketStatusDropdown = screen.getByLabelText('Market Status:');
  fireEvent.change(marketStatusDropdown, { target: { value: 'suspended' } });

  expect(onFilterChange).toHaveBeenCalledWith('marketSuspended', 'suspended');
});

test('calls onFilterChange with correct arguments when search bar input is changed', () => {
  const onFilterChange = jest.fn();
  const setSearchTerm = jest.fn();

  render(
    <SearchBar
      filters={filters}
      onFilterChange={onFilterChange}
      setSearchTerm={setSearchTerm}
      searchTerm=""
    />
  );

  const searchInput = screen.getByLabelText('Search:');
  fireEvent.change(searchInput, { target: { value: 'LeBron' } });

  expect(setSearchTerm).toHaveBeenCalledWith('LeBron');
  expect(onFilterChange).toHaveBeenCalledWith('searchTerm', 'LeBron');
});