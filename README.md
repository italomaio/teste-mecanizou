# 🛍️ Catálogo Interativo – Teste Frontend Sênior

Projeto desenvolvido como parte do teste técnico para vaga de Frontend Sênior, utilizando **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** e **CI com testes automáticos**.

## 🚀 Stack e Ferramentas

- [Next.js 14+ (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest + React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [React Hook Form](https://react-hook-form.com/)
- [Playwright](https://playwright.dev/)
- [GitHub Actions](https://docs.github.com/actions) – Lint, typecheck e testes
- Cookies para autenticação
- Dark Mode com persistência

## 🏗️ Estrutura de Pastas

```bash
src/
app
├── (secure)
│  ├── products
│  │  ├── [id]
│  │  │  └── page.tsx
│  │  └── page.tsx
│  └── layout.tsx
├── auth
│  ├── login
│  │  └── page.tsx
│  └── layout.tsx
└── layout.tsx
├── assets/
├── components/
├── hooks/
├── utils/
├── data/
├── lib/
├── styles/
├── tests/
├── types/
```

## 📦 Setup do Projeto

```bash
pnpm install
pnpm dev
```

- Acesse: http://localhost:3000

- Login: qualquer email/senha
  <br />
  <br />

## 🏛️ Decisões de Arquitetura

### - SSR vs SSG

- `/login`: renderização local (CSR).

- `/produtos`: renderização no cliente (CSR com dados locais).

- `/produtos/[id]`: SSG com fallback 'blocking', por performance e SEO.
  <br />
  <br />
  Justificativa: produtos mudam pouco, estão em arquivo local, e o carregamento rápido é prioritário.

### - Trade-offs

| Decisão         | Vantagem                                       | Trade-off                        |
| --------------- | ---------------------------------------------- | -------------------------------- |
| SSG no detalhe  | Performance                                    | Requer rebuild para mudanças     |
| Tailwind        | Agilidade e acessibilidade                     | Curva de aprendizado no início   |
| Cookie simples  | Facilidade de uso                              | Sem segurança real para produção |
| Hook Form + Zod | Facilidade de validação de dados de formulário | Aumento de complexidade          |

## 🧪 Testes

Unitários:

- `ProductCard`
- `Login`
- `useAuth`

E2E: fluxo completo `login → produtos → logout`

## 🧠 Dúvidas levantadas

- Qual o comportamento esperado ao acessar uma rota protegida após logout?
- Deveríamos simular falha de login?
- Como lidar com paginação se o JSON tiver poucos itens?

## 🔮 Próximos passos (produção)

- Adicionar autenticação real com JWT
- Armazenar produtos via API (não em JSON)
- Melhorar acessibilidade (labels, roles)
- Internacionalização (i18n)
- Imagens otimizadas com next/image
