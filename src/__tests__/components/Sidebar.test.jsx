import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../../components/Sidebar';

test('renders sidebar with position and statType filters and market status dropdown', () => {
  const filters = {
    position: { PG: true, PF: true, C: true, SF: true, SG: true },
    statType: { points: true, rebounds: true, assists: true, steals: true },
    marketSuspended: 'all',
  };
  const onFilterChange = jest.fn();

  render(<Sidebar filters={filters} onFilterChange={onFilterChange} />);

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
