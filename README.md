# Site Dr. Bruno William — Deploy no Vercel

## Estrutura
```
/
├── index.html        ← página principal
├── vercel.json       ← configuração do Vercel (SPA routing + cache)
└── assets/
    ├── index-Cf9v3xtf.js        ← app principal
    ├── index-CzV0F3rh.css       ← estilos
    ├── ui-vendor-DsDsQ0yK.js    ← lib UI
    ├── utils-vendor-DqmDTpxI.js ← utilitários
    ├── query-vendor-E4HuqEnl.js ← react-query
    ├── router-vendor-B5MdcdXU.js← react-router
    ├── dr-bruno-william.jpg     ← foto do médico
    ├── hero-cover.jpg           ← imagem hero
    └── logo-bw.png              ← logo / favicon
```

## Como fazer o deploy

### 1. Criar conta no Vercel
Acesse https://vercel.com e crie conta (pode entrar com GitHub — recomendado).

### 2. Subir os arquivos via GitHub (recomendado)
1. Crie um repositório no GitHub (pode ser privado)
2. Faça upload de TODOS os arquivos desta pasta
3. No Vercel: "Add New Project" → importe o repositório
4. Framework Preset: **"Other"** (não selecionar nada)
5. Clique em **Deploy** — pronto!

### 3. Conectar o domínio www.drbrunoalergoimuno.com.br
No Vercel, após o deploy:
1. Vá em **Settings → Domains**
2. Adicione: `www.drbrunoalergoimuno.com.br`
3. Adicione também: `drbrunoalergoimuno.com.br` (sem www)
4. O Vercel vai mostrar os registros DNS para configurar

### 4. Configurar DNS no seu provedor de domínio
Adicione estes registros DNS:

| Tipo  | Nome | Valor                    |
|-------|------|--------------------------|
| CNAME | www  | cname.vercel-dns.com     |
| A     | @    | 76.76.21.21              |

⚠️ Pode levar até 24h para propagar, mas normalmente é em minutos.

### 5. SSL (HTTPS)
O Vercel provisiona o certificado SSL automaticamente — não precisa fazer nada!

## Google Search Console
Após conectar o domínio, adicione a propriedade `https://www.drbrunoalergoimuno.com.br`
no Google Search Console. A tag de verificação já está no index.html.
