# Bots do Bithub

Catálogo de bots prontos para adicionar e personalizar no BitBot.
O Bithub consulta este repositório fixo; não é necessário conectar uma conta GitHub
para explorar ou instalar os bots.

## Destaques

- **Revisor de PR:** revisão de regressões e segurança em mudanças de código.
- **Testador de QA:** critérios de aceite, execução e evidências de falhas.
- **Criador de Protótipos:** demonstração navegável e verificação do fluxo principal.
- **Assistente Executivo:** agenda, compromissos e prioridades do dia.
- **Arquiteto de Bots:** criação de agentes especializados e análise de melhorias.

## Mais bots

- **Investigador de Bugs:** reprodução, diagnóstico e verificação da correção.
- **Revisor de Segurança:** riscos sustentados por evidências e correções objetivas.
- **Crítico de Design:** melhorias de interface orientadas à tarefa do usuário.
- **Revisor de Textos:** clareza e tom com preservação da voz e dos fatos.
- **Assistente de Suporte:** rascunhos ao cliente e encaminhamento interno.
- **Criador de Habilidades:** procedimentos e APIs transformados em SKILL.md.
- **Planejador de Tarefas:** escopo, dependências e critérios de conclusão.
- **Escritor de Documentação:** guias baseados no funcionamento real.
- **Pesquisador:** perguntas respondidas com fontes e limites explícitos.

Os 11 papéis escolhidos a partir do OpenBot e seus equivalentes estão em
[PROVENANCE.md](PROVENANCE.md). Os três bots equivalentes já existentes mantiveram
seus IDs e receberam a versão 1.1.0. Os demais bots anteriores continuam disponíveis.
Veja [MIGRATION.md](MIGRATION.md) para o escopo e as verificações da migração.

Cada pacote contém identidade, instruções e habilidades de orientação em Markdown.
Essas habilidades acompanham apenas o bot instalado. Elas não acrescentam ferramentas,
integrações ou permissões: o bot usa a conexão e os acessos configurados pelo usuário.
O catálogo não contém credenciais, histórico de conversas ou caminhos pessoais.

O catálogo mantém as categorias-base compatíveis com o Bithub existente. Design e
Automação são identificadas por tags: versões anteriores agrupam esses bots em
Produtividade; a interface atual oferece seus filtros específicos.
Rotinas, acesso ao histórico e criação de agentes dependem das ferramentas disponíveis;
adicionar um bot não inicia agendamentos nem instala serviços externos.

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
