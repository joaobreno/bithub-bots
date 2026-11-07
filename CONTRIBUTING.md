# Contribuir com o catálogo

1. Crie uma pasta `bots/<id>` com identificador em letras minúsculas, números e hífens.
2. Copie os campos de um `bot.json` existente. O `id` deve corresponder à pasta.
   Use versão `MAJOR.MINOR.PATCH`, nome, descrição curta, autor e palavras-chave.
   Categorias: `programacao`, `produtividade`, `pesquisa`, `escrita`, `planejamento`.
3. Escreva `INSTRUCTIONS.md`: objetivo, entradas, método, entrega e limites. Não inclua
   credenciais, dados pessoais nem ações automáticas sem solicitação.
4. Reutilize habilidades existentes ou crie `skills/<id>/SKILL.md`. O cabeçalho tem
   `---`, `name: Nome`, `description: Descrição` e `---`, uma linha por campo; em seguida,
   escreva o procedimento. Somente Markdown; não incluir scripts, anexos ou MCP.
5. Escolha uma aparência Bit: `bit:<cor 0–7>:<variante 0–3>[:<modelo 0–18>]`.
6. Execute os três comandos do README e inclua fontes e `catalog.json` no pull request.

Os limites são medidos em bytes UTF-8: nome 200, descrição 4.000, autor 100 e instruções
com habilidades até 40.000. Cada bot pode incluir até 12 habilidades e 12 tags. O
catálogo inteiro não pode ultrapassar 1 MiB nem 100 bots. Texto é normalizado para LF.

## Revisão e versões

Revise a utilidade do papel, a clareza das entradas, os resultados esperados e se as
instruções dependem de ferramentas que o usuário pode não ter. Experimente com uma
conexão real antes de recomendar um bot para uma tarefa.

Incremente a versão sempre que alterar conteúdo ou metadados de um bot, inclusive
habilidades compartilhadas que o compõem. Versões publicadas não devem mudar. O Bithub
também compara o conteúdo para identificar uma alteração sem incremento de versão.

Publicar uma alteração em `main` atualiza o catálogo consultado pelo Bithub. Bots já
adicionados continuam locais; o usuário decide quando aplicar a nova versão. Retirar
um bot do catálogo não apaga as cópias instaladas.
