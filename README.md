# 💍 Casamento Bela & Benjamin — Site Oficial

Site de casamento de **Débora Meister Pereira** e **Benjamin Córdova Goulart**  
27 de Março de 2027 · Sonho Dourado, Morro da Fumaça - SC

---

## Como rodar localmente

```bash
npm install
cp .env.local.example .env.local
# edite .env.local com suas credenciais Supabase
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Configurar o Supabase

### 1. Criar projeto em [supabase.com](https://supabase.com)

Vá em **Settings → API** e copie as chaves para `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 2. Criar as tabelas (SQL Editor)

```sql
CREATE TABLE rsvp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  adultos INTEGER DEFAULT 1,
  criancas INTEGER DEFAULT 0,
  mensagem TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE presentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2),
  imagem_url TEXT,
  link_externo TEXT,
  reservado BOOLEAN DEFAULT false,
  reservado_por TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

### 3. Políticas de acesso (RLS)

Opção simples — desabilitar RLS para uso privado:

```sql
ALTER TABLE rsvp DISABLE ROW LEVEL SECURITY;
ALTER TABLE presentes DISABLE ROW LEVEL SECURITY;
```

---

## Adicionar presentes

No painel do Supabase → **Table Editor → presentes**, insira cada item com:
- `nome`, `descricao`, `preco` (ex: `350.00`), `imagem_url` (URL pública)

---

## Personalizar textos

| O que editar | Arquivo |
|---|---|
| Marcos da linha do tempo | `src/app/nossa-historia/page.tsx` — array `MARCOS` |
| Informações da cerimônia | `src/app/cerimonia/page.tsx` |
| Sugestões de hospedagem | `src/app/hospedagem/page.tsx` — array `HOSPEDAGENS` |
| Cards da home | `src/app/page.tsx` — array `previewCards` |

---

## Deploy na Vercel

1. Faça push para `github.com/benjagoulart/casamento-bela-benjamin`
2. Em [vercel.com](https://vercel.com) → **Add New Project** → importe o repo
3. Adicione as variáveis de ambiente em **Settings → Environment Variables**
4. Clique em **Deploy**

---

## Paleta de cores

| Variável | Hex | Nome |
|---|---|---|
| `--color-background` | `#F5EBE3` | Glacial Fog |
| `--color-cream` | `#EFDCC3` | Warm Clouds |
| `--color-slate` | `#8E98A1` | Granite Ridge |
| `--color-mist` | `#D4CBC7` | Lake Mist |
| `--color-rose` | `#BA908B` | Twilight Lupine |
| `--color-sage` | `#80864F` | Spring Meadows |

---

*Feito com ♥ para Bela & Benjamin · 27.03.2027*
