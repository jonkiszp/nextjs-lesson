import '@testing-library/jest-dom';
import Page from '../app/notes/page';
import { render, screen } from '@testing-library/react';

describe('Page', () => {
    it('renders the heading', () => {
        render(<Page />);
        expect(screen.getByRole('heading', { name: 'notes' })).toBeInTheDocument();
    });
});