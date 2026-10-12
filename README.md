This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Cel: poczuć, jak działa useState i dlaczego aktualizacja funkcyjna ma znaczenie. Strona: app/licznik/page.tsx → /licznik.
1. Wyświetl licznik (start: 0) i przyciski „−”, „+” oraz „Reset”.
2. Dodaj pole <input type="number"> z krokiem (domyślnie 1). Przyciski „+” i „−” zmieniają licznik o krok.
3. Licznik nie schodzi poniżej zera: 2 − 5 daje 0, a przy zerze przycisk „−” jest wyłączony.
4. Dodaj przycisk „+3 razy”, który trzy razy z rzędu wywołuje tę samą funkcję dodającą. Licznik ma wzrosnąć o 3 × krok.
Wskazówki:
• Wartość z pola to tekst, więc zamień ją przez Number(e.target.value).
• Punkt 4 zadziała tylko z aktualizacją funkcyjną setCount(c => c + step). Najpierw spróbuj setCount(count + step) i wyjaśnij, czemu licznik rośnie wtedy tylko o jeden krok.