import '@testing-library/jest-dom';
import Page from '../app/notes/page';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Page', () => {
    it('renders the heading', () => {
        render(<Page />);
        expect(screen.getByRole('heading', { name: 'notes' })).toBeInTheDocument();
    });
});

describe('input', () => {
    it('renders the input', () => {
        render(<Page />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
});

describe('input placeholder', () => {
    it('renders the input', () => {
        render(<Page />);
        expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'textbox');
    });
});

describe('input fill', () => {
    it('fills the input with text', () => {
        render(<Page />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'nowa notatka' } });
        expect(input).toHaveValue('nowa notatka');
    });

    it('submits the form and adds a new note', () => {
        render(<Page />);
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: 'Dodaj notatke' });

        fireEvent.change(input, { target: { value: 'nowa notatka' } });
        fireEvent.submit(button, { target: { note: input } });

        expect(screen.getByText('nowa notatka')).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('submits the form and adds a new note with problem', () => {
        render(<Page />);
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: 'Dodaj notatke' });

        // spacje są wymagane gdyż w kodzie jest trim
        fireEvent.change(input, { target: { value: ' nowa notatka ' } });
        fireEvent.submit(button, { target: { note: input } });

        expect(screen.getByText('nowa notatka')).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('check add whitespace shows popup and allows closing it', () => {
        render(<Page />);
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: 'Dodaj notatke' });

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.submit(button, { target: { note: input } });

        // Sprawdzenie czy popup się pojawił
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Notatka nie może być pusta!')).toBeInTheDocument();

        // Zamknięcie popupu przyciskiem "Zamknij"
        const closeButton = screen.getByRole('button', { name: 'Zamknij' });
        fireEvent.click(closeButton);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
