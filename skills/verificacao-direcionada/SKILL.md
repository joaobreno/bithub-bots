---
name: Verificação direcionada
description: Escolha a verificação que prova o comportamento pedido, do teste mais próximo ao mais amplo, rode com as ferramentas do próprio projeto e relate exatamente o que executou, o que passou, o que falhou e o que ficou sem verificar.
---

# Verificação direcionada

Verificar não é rodar tudo; é escolher a evidência que responde à pergunta "isto faz o que deveria?" com o menor custo e relatar sem exagero.

## Quando aplicar

Depois de uma correção ou implementação, para confirmar um achado de revisão, para checar se uma regressão voltou ou quando o usuário pergunta "funciona?". Também antes de afirmar qualquer coisa como "testado".

## 1. Defina o que precisa ser provado

Escreva o comportamento em uma frase observável: "ao salvar um pedido com cupom vencido, a API responde 422 e nada é gravado". Se não conseguir escrever assim, o pedido está vago: esclareça antes de rodar comandos.

## 2. Descubra como o projeto se verifica

Leia, nesta ordem, o que existir: `README`, `CONTRIBUTING`, `AGENTS.md`/`CLAUDE.md`, scripts do `package.json`, `Makefile`, `justfile`, `Cargo.toml`, `pyproject.toml` e a configuração da CI (`.github/workflows`, `.gitlab-ci.yml`). Use os comandos que o projeto já usa; não invente uma forma nova de rodar testes.

## 3. Escolha a escada de verificação

Suba um degrau só quando o anterior passar ou quando o alcance da mudança justificar:

1. **Teste focado:** o arquivo ou caso de teste do código alterado, filtrado pelo nome.
2. **Checagem estática do pacote:** tipos e lint apenas do pacote ou dos arquivos mudados.
3. **Teste novo:** um caso que falharia antes da mudança e passa depois. É a prova mais forte de uma correção.
4. **Execução manual:** o fluxo real na aplicação, no terminal ou no navegador (`bithub_browser_navigate`, `bithub_browser_snapshot`, `bithub_browser_screenshot`), com passos anotados.
5. **Suíte ampla ou build:** só quando a mudança é transversal, quando o usuário pede ou quando os degraus anteriores indicam risco espalhado.

Para mudanças na CI, a pipeline do pedido (`bithub_lab_pipeline`, `bithub_lab_job_log`) é a fonte; leia o job que falhou antes de rodar de novo.

## 4. Execute e observe

Rode com saída visível e guarde o comando exato, o tempo e o resumo do resultado (quantos passaram, quais falharam). Se um teste falhar, leia a mensagem antes de concluir algo: pode ser falha preexistente, ambiente ou o próprio defeito. Para separar falha preexistente, rode o mesmo teste na base (`git stash` ou outra branch) quando for barato.

Um teste instável precisa de repetição contada, não de uma segunda tentativa até passar.

## 5. Relate sem arredondar

```
Comportamento verificado: <frase>
Executado:
- <comando> → <passou: 12 | falhou: 1 (nome do teste)>
- <passo manual> → <resultado observado>
Falhas: <nome> — <mensagem curta> — <preexistente | causada pela mudança | indefinido>
Não verificado: <o que faltou> — <por quê: sem ambiente, sem credencial, demorado demais>
Como reproduzir: <comandos para o usuário rodar>
```

## Regras

- Um comando que não rodou não é evidência. "Deve passar" não é resultado.
- Não instale dependências globais, não altere configurações do sistema nem serviços externos só para conseguir um resultado verde; pergunte antes quando for necessário.
- Não desative, pule ou afrouxe um teste para fazê-lo passar. Se o teste estiver errado, diga isso e explique.
- Sem ambiente ou credenciais, entregue os passos exatos para o usuário verificar e marque o item como não verificado.

## Armadilhas

- Rodar a suíte inteira, ver um vermelho não relacionado e concluir que a mudança quebrou algo (ou ignorar o vermelho).
- Verificar algo diferente do que foi pedido porque era mais fácil de testar.
- Esconder no resumo o que não foi possível verificar.
