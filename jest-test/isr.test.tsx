import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { readFile } from 'fs/promises';
import IsrPage, { revalidate as listRevalidate } from '../app/isr/page';
import ProductPage, {
    generateStaticParams,
    revalidate as productRevalidate,
    dynamicParams,
} from '../app/isr/[id]/page';
import { getProducts, getProduct } from '../app/isr/data';

// Zamiast prawdziwego products.json podstawiamy własne dane
jest.mock('fs/promises', () => ({ readFile: jest.fn() }));
const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

// notFound() w Next.js rzuca specjalny błąd – w teście zastępujemy go własnym
jest.mock('next/navigation', () => ({
    notFound: jest.fn(() => {
        throw new Error('NEXT_NOT_FOUND');
    }),
}));

const testProducts = [
    { id: '1', name: 'Laptop', price: 3499 },
    { id: '2', name: 'Monitor', price: 899 },
];

function setProducts(products: unknown) {
    mockedReadFile.mockResolvedValue(JSON.stringify(products) as never);
}

// Komponenty serwerowe są async – najpierw wywołujemy je jak funkcję, potem renderujemy wynik
async function renderServer(component: Promise<React.ReactElement>) {
    render(await component);
}

beforeEach(() => {
    jest.clearAllMocks();
    setProducts(testProducts);
});

describe('konfiguracja ISR', () => {
    it('lista produktów odświeża się co 10 s', () => {
        expect(listRevalidate).toBe(10);
    });

    it('strona produktu odświeża się co 30 s', () => {
        expect(productRevalidate).toBe(30);
    });

    it('pozwala generować nowe produkty na żądanie (dynamicParams)', () => {
        expect(dynamicParams).toBe(true);
    });
});

describe('dane z products.json', () => {
    it('getProducts czyta i parsuje plik JSON', async () => {
        const products = await getProducts();

        expect(mockedReadFile).toHaveBeenCalledWith(
            expect.stringMatching(/products\.json$/),
            'utf-8'
        );
        expect(products).toEqual(testProducts);
    });

    it('getProduct zwraca produkt po id', async () => {
        expect(await getProduct('2')).toEqual(testProducts[1]);
    });

    it('getProduct zwraca undefined dla nieistniejącego id', async () => {
        expect(await getProduct('99')).toBeUndefined();
    });
});

describe('generateStaticParams', () => {
    it('zwraca ścieżki dla wszystkich produktów z pliku', async () => {
        expect(await generateStaticParams()).toEqual([{ id: '1' }, { id: '2' }]);
    });
});

describe('strona /isr', () => {
    it('wyświetla listę produktów z linkami', async () => {
        await renderServer(IsrPage());

        expect(screen.getByRole('heading', { name: /Produkty \(ISR/ })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Laptop' })).toHaveAttribute('href', '/isr/1');
        expect(screen.getByRole('link', { name: 'Monitor' })).toHaveAttribute('href', '/isr/2');
        expect(screen.getByText(/3499 zł/)).toBeInTheDocument();
        expect(screen.getByText(/Wygenerowano:/)).toBeInTheDocument();
    });

    it('po zmianie pliku JSON ponowne wygenerowanie pokazuje nowe dane', async () => {
        await renderServer(IsrPage());
        expect(screen.getByText(/3499 zł/)).toBeInTheDocument();

        // Symulacja: ktoś edytuje products.json, a Next.js robi rewalidację
        setProducts([{ id: '1', name: 'Laptop', price: 2999 }]);
        document.body.innerHTML = '';
        await renderServer(IsrPage());

        expect(screen.getByText(/2999 zł/)).toBeInTheDocument();
        expect(screen.queryByText(/3499 zł/)).not.toBeInTheDocument();
    });
});

describe('strona /isr/[id]', () => {
    it('wyświetla nazwę i cenę produktu', async () => {
        await renderServer(ProductPage({ params: Promise.resolve({ id: '2' }) }));

        expect(screen.getByRole('heading', { name: 'Monitor' })).toBeInTheDocument();
        expect(screen.getByText('Cena: 899 zł')).toBeInTheDocument();
    });

    it('wywołuje notFound() dla produktu spoza pliku', async () => {
        await expect(
            ProductPage({ params: Promise.resolve({ id: '99' }) })
        ).rejects.toThrow('NEXT_NOT_FOUND');
    });
});
