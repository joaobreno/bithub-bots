# Seleção de bots do OpenBot para o Bithub

Pedido: migrar os 11 papéis marcados em `docs/openbot-bots-selection.md` do Bithub,
destacando somente os cinco identificados com `###DESTAQUE`.

## Escopo

Atualizar Revisor de PR, Investigador de Bugs e Revisor de Textos sem trocar seus IDs.
Adicionar oito novos bots, manter os outros três já existentes e retirar destaques
antigos que não estejam na seleção. O resultado é um catálogo de 14 bots e 5 destaques.

| OpenBot | ID no Bithub | Destaque |
| --- | --- | --- |
| Change Reviewer | `revisor-pr` | Sim |
| Bug Fixer | `investigador-bugs` | Não |
| Security Reviewer | `revisor-seguranca` | Não |
| QA Tester | `testador-qa` | Sim |
| Prototype Builder | `criador-prototipos` | Sim |
| Design Critic | `critico-design` | Não |
| Chief of Staff | `assistente-executivo` | Sim |
| Copy Editor | `revisor-textos` | Não |
| Support Reply Desk | `assistente-suporte` | Não |
| Skill Smith | `criador-habilidades` | Não |
| Dr. Eggbot | `arquiteto-bots` | Sim |

## Formato e decisões

Os pacotes continuam com `schemaVersion: 1`, procedimentos Markdown, avatares Bit e
instruções combinadas até 40.000 bytes. Design e Automação usam categoria-base
`produtividade` e as tags `categoria:design` / `categoria:automacao`: o novo frontend
oferece os grupos específicos, enquanto clientes antigos continuam carregando todos
os bots. Sem novo serviço, formato ou tela e sem mudança no validador nativo.

As instruções e habilidades são textos originais para o Bithub. A referência aos papéis
do OpenBot fica em `PROVENANCE.md`, sem importar suas instruções ou bundles. O OpenBot
declara PolyForm Noncommercial 1.0.0 para seus textos originais; este catálogo não os
redistribui sob MIT nem incorpora ferramentas exclusivas de lá.

Capacidades dependem da conexão instalada. Bots devem verificar ferramentas disponíveis
e oferecer entrega por arquivo ou texto quando faltar integração. O Assistente Executivo
não inicia rotinas ao instalar. O Arquiteto de Bots usa a criação de agentes do Bithub
quando a conexão a disponibilizar; senão entrega uma proposta pronta para cadastro.
O Criador de Habilidades entrega `SKILL.md`; scripts auxiliares em uma habilidade criada
sob demanda são arquivos do projeto, não conteúdo executável instalado pelo marketplace.

## Execução e verificação

- [x] Fixar seleção e destaques em uma fixture editorial e testar cobertura sem duplicatas.
- [x] Testar categorias-base compatíveis e filtros por tags na interface; observar falha antes da alteração.
- [x] Redigir oito pacotes novos e revisar os três equivalentes existentes; versionar alterações.
- [x] Gerar catálogo e atualizar README, contribuição e procedência.
- [x] Rodar testes do catálogo, testes pertinentes do Bithub, check e build.
- Publicação: commit em `main`, seguido da validação do GitHub Actions e da leitura pública.

Verificação local: 9 testes Node do catálogo e 9 testes de estado/interface do Bithub
passaram. `pnpm check` terminou sem erros ou avisos e o build concluiu. A revisão
independente identificou a incompatibilidade de categorias; a correção foi verificada
com um teste do domínio legado e um teste dos filtros novos. O catálogo final contém
14 bots, 23 habilidades distintas e 5 destaques, com aproximadamente 54 KiB.

Não excluir bots ou cópias instaladas, não publicar release do Bithub e preservar as
alterações locais anteriores do aplicativo. A execução já foi autorizada pela seleção
editada e pelo pedido de migração; nomes e categorização são decisões do implementador.
