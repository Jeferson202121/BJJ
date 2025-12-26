
# BJJ Master Manager - Guia de Publicação

Este app foi projetado para ser publicado no **Netlify** ou **Vercel** gratuitamente.

## Como Publicar On-line
1. Salve este projeto em um repositório no GitHub.
2. Conecte sua conta do GitHub ao Netlify (netlify.com).
3. Selecione o repositório. O Netlify detectará automaticamente os arquivos.
4. Clique em **Deploy site**. Seu app estará on-line em segundos!

## Funcionalidades de Interação
- **Administradores:** Gerenciam alunos, professores e veem o resumo financeiro global.
- **Professores:** Podem postar avisos técnicos no Mural e anunciar produtos (Kimonos, etc) na Loja.
- **Alunos:** Acompanham sua graduação, veem avisos dos mestres e podem solicitar a compra de equipamentos diretamente pelo app.

## Segurança
Este protótipo usa `localStorage` para persistência. Para produção:
1. Conecte ao Firebase Auth para logins reais.
2. Use Firestore para banco de dados compartilhado.
