---
name: Testes de aceite
description: Monte uma lista curta de casos observáveis a partir do que foi pedido, execute-os como um usuário no navegador do Bithub ou no terminal, registre cada resultado com evidência e entregue um veredito de aprovado, reprovado ou bloqueado com passos de reprodução.
---

# Testes de aceite

A pergunta é simples: "um usuário consegue fazer o que esta entrega promete?". A resposta só vale com evidência de cada caso executado.

## Quando aplicar

Antes de liberar uma versão, depois de uma implantação, ao fechar uma tarefa com critérios de aceite, ou numa rotina de verificação periódica de um site salvo. Para avaliar código, use Revisão com evidências; para investigar uma falha encontrada, Diagnóstico de falhas.

## Preparação

1. **Alvo.** Endereço da aplicação, build ou comando a testar, e a versão (commit, tag ou data da implantação).
2. **Critérios.** Do usuário, da issue, do PR ou de um documento de escopo. Sem critérios, proponha de 3 a 8 casos derivados da mudança e peça confirmação uma vez:
   - o caminho principal de ponta a ponta;
   - uma entrada vazia ou inválida;
   - um estado de erro (rede, permissão, item inexistente);
   - algo vizinho que **não** deveria ter mudado.
3. **Conta e dados de teste.** Só os que o usuário indicar. Nunca use a conta de um cliente real. Se um passo pedir código de verificação, peça ao usuário.

Cada caso fica no formato: **condição inicial → ação → resultado esperado visível**.

## Execução no navegador

Com as ferramentas de navegador do Bithub disponíveis:

1. Veja as abas abertas (`bithub_browser_tabs`) e use uma aba nova para o teste. Não reutilize uma aba com sessão pessoal do usuário.
2. Abra o endereço (`bithub_browser_navigate`) e registre o endereço final depois de redirecionamentos e o título.
3. Aja como um usuário: `bithub_browser_click`, `bithub_browser_type`, `bithub_browser_fill_form`, `bithub_browser_select_option`, `bithub_browser_press_key`. Não use `bithub_browser_evaluate` para pular etapas da interface; ele serve só para inspecionar.
4. Espere o resultado de verdade (`bithub_browser_wait_for`) em vez de assumir que a página terminou.
5. Depois de cada caso, faça uma captura (`bithub_browser_screenshot`) que mostre o resultado e leia o texto da tela (`bithub_browser_snapshot`).
6. Em uma falha, colete o console (`bithub_browser_console`) e as requisições com erro (`bithub_browser_network`).

Sem navegador, teste pelo terminal (comandos, `curl` contra a API de teste) ou entregue o roteiro para o usuário executar, marcando os casos como não executados.

## Classificação

- **Aprovado:** a ação produziu o resultado esperado e a evidência mostra isso.
- **Reprovado:** a ação rodou e o resultado está errado, ausente ou com erro.
- **Bloqueado:** não foi possível executar (login, dado faltando, ambiente fora do ar, código de verificação). Diga o bloqueio.
- **Não executado:** fora do alcance desta rodada.

Repita uma vez um caso reprovado para separar falha real de lentidão; se o resultado mudar entre tentativas, marque como instável dentro da reprovação. Um caso não executado nunca conta como aprovado.

Veredito geral: **Reprovado** se algum caso reprovou; **Bloqueado** se nenhum reprovou e algum ficou bloqueado; **Aprovado** só se todos os casos executados passaram e nenhum ficou bloqueado.

## Entrega

```
Veredito: <Aprovado | Reprovado | Bloqueado> — <alvo> — <versão> — <data e hora>

| # | Caso | Resultado | Evidência |
| 1 | Cadastrar endereço de entrega | Aprovado | endereço aparece na lista com CEP formatado |
| 2 | Aplicar cupom expirado | Reprovado | desconto aplicado; deveria mostrar "cupom expirado" |

Reprovações
2. Aplicar cupom expirado
   Passos (a partir de aba nova): 1. Abrir o carrinho com um item. 2. Digitar o cupom TESTE-VENCIDO. 3. Clicar em Aplicar.
   Esperado: mensagem "cupom expirado" e total sem desconto.
   Obtido: total com 10% de desconto.
   Console/rede: POST /cupons/validar → 200 {"valido": true}

Não executado: <casos e motivo>
```

Anexe as capturas na resposta, uma por caso, nomeadas pelo número do caso.

## Rotina de verificação periódica

Quando este procedimento rodar como rotina do bot:

1. Leia o alvo e a lista de casos guardados nas memórias do bot (`bithub_memories`). Guarde só endereço, lista de casos, nome da conta de teste e o último veredito; nunca senhas.
2. Sem alvo salvo, envie uma única mensagem pedindo endereço e casos, e guarde que já perguntou.
3. Rode apenas os 3 a 5 casos principais.
4. Se tudo passou e o último resultado também era Aprovado, responda numa linha curta, sem repetir a tabela.
5. Se algo mudou, envie a entrega completa e atualize o último veredito com `bithub_memory_save`.

## Limites

Não compre, não envie mensagens a pessoas reais, não apague dados nem altere configurações que afetem outros usuários. Um caso que exija isso fica Bloqueado até o usuário autorizar. Não abra issues, não comente em PRs e não implante sem pedido.

## Erros frequentes

- Considerar aprovado porque a página carregou, sem ver o resultado da ação.
- Passos de reprodução que começam no meio do fluxo.
- Uma única captura para a rodada inteira.
- Reportar lentidão como defeito sem repetir o caso.
