# Bots do Bithub

Catálogo oficial inicial de bots prontos para adicionar e personalizar no BitBot.
O Bithub consulta este repositório fixo; não é necessário conectar uma conta GitHub
para explorar ou instalar os bots.

## Bots

- **Revisor de PR:** defeitos concretos e evidências antes do merge.
- **Investigador de Bugs:** reprodução, diagnóstico e verificação da correção.
- **Planejador de Tarefas:** escopo, dependências e critérios de conclusão.
- **Escritor de Documentação:** guias baseados no funcionamento real.
- **Pesquisador:** perguntas respondidas com fontes e limites explícitos.
- **Revisor de Textos:** clareza e correção preservando intenção e voz.

Cada pacote contém identidade, instruções e habilidades de orientação em Markdown.
Essas habilidades acompanham apenas o bot instalado. Elas não acrescentam ferramentas,
integrações ou permissões: o bot usa a conexão e os acessos configurados pelo usuário.
O catálogo não contém credenciais, histórico de conversas ou caminhos pessoais.

## Estrutura

`bots/<id>/bot.json` declara os metadados e as habilidades; `INSTRUCTIONS.md` define
o papel. `skills/<id>/SKILL.md` contém um procedimento reutilizável. `catalog.json`
é a distribuição autocontida gerada desses arquivos, conforme `catalog.schema.json`.

## Gerar e validar

Requer Node.js 22 ou superior; não há dependências para instalar.

```sh
node --test scripts/build-catalog.test.mjs
node scripts/build-catalog.mjs
node scripts/build-catalog.mjs --check
```

Inclua o `catalog.json` gerado no mesmo commit das fontes. A automação do GitHub
confere referências, limites e se a saída está atualizada. Veja [CONTRIBUTING.md](CONTRIBUTING.md)
para adicionar ou alterar um bot. Conteúdo original sob [licença MIT](LICENSE).
