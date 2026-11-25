/**
 * @jest-environment node
 */
// Środowisko "node", bo route handler używa Request/Response z Node.js (nie ma ich w jsdom)
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { GET } from '../app/api/revalidate/route';

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

describe('GET /api/revalidate (on-demand ISR)', () => {
    it('odświeża ścieżkę podaną w parametrze ?path=', async () => {
        const res = await GET(new NextRequest('http://localhost/api/revalidate?path=/isr/1'));
        const body = await res.json();

        expect(revalidatePath).toHaveBeenCalledWith('/isr/1');
        expect(body).toMatchObject({ revalidated: true, path: '/isr/1' });
    });

    it('bez parametru domyślnie odświeża /isr', async () => {
        const res = await GET(new NextRequest('http://localhost/api/revalidate'));

        expect(revalidatePath).toHaveBeenCalledWith('/isr');
        expect((await res.json()).path).toBe('/isr');
    });
});
