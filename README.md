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

Cel: stan z tablicą obiektów i stan pochodny. Strona: app/zakupy/page.tsx → /zakupy.
1. Formularz z polem „Produkt” i przyciskiem „Dodaj”; Enter też dodaje. Puste nazwy pomijaj, a po dodaniu wyczyść pole.
2. Każda pozycja ma nazwę, ilość z przyciskami „−” i „+” (minimum 1), checkbox „kupione” i przycisk „Usuń”.
3. Filtr: Wszystkie / Do kupienia / Kupione.
4. Pod listą podsumowanie, np. „Do kupienia: 3 poz. (7 szt.)”.
Wskazówki:
• Stan: items (tablica { id, name, qty, done }), name (pole formularza) i filter.
• Nie mutuj tablicy (push, item.qty++). Zwracaj nową przez map, filter albo [...prev, nowy].
• Przefiltrowanej listy i podsumowania nie trzymaj w useState — wylicz je w trakcie renderu z items i filter.
• <form onSubmit> z e.preventDefault() blokuje przeładowanie strony, a Enter i tak zadziała dzięki formularzowi. id wygenerujesz przez crypto.randomUUID().