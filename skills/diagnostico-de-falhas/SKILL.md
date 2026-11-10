---
name: Diagnóstico de falhas
description: Investigue uma falha relatada como um experimento: fixe o sintoma, reproduza no menor cenário, encontre onde o estado diverge do esperado, teste hipóteses uma variável por vez e só declare a causa depois de ver a falha sumir.
---

# Diagnóstico de falhas

O objetivo não é achar um culpado plausível, e sim uma explicação que prevê o comportamento observado e desaparece quando corrigida. Trate cada passo como um experimento com resultado anotado.

## Quando aplicar

Um teste falha, um usuário relata erro, um log mostra exceção, uma pipeline quebra ou uma verificação de QA reprova, e ninguém sabe por quê. Para avaliar uma mudança que ainda não falhou, use Revisão com evidências.

## 1. Fixe o sintoma

Antes de mexer em qualquer coisa, escreva:

- **Esperado:** o que deveria acontecer.
- **Observado:** o que aconteceu, com a mensagem de erro copiada exatamente (sem trechos com tokens, senhas ou dados pessoais).
- **Onde:** versão, commit, branch, ambiente, sistema operacional, navegador.
- **Desde quando:** a última versão em que funcionava, se alguém souber.

Fontes úteis: a issue (`gh issue view <n>`), o log de um job (`bithub_lab_job_log` quando a pipeline estiver conectada ao Bithub), a saída de um terminal (`bithub_terminal_read`), o console e as requisições de uma página (`bithub_browser_console`, `bithub_browser_network`). Se falta um único dado para reproduzir, peça só esse dado.

## 2. Reproduza no menor cenário

Encontre o caminho mais curto que mostra a falha: um teste isolado, um comando, uma sequência de cliques. Rode e guarde comando e saída. Reduza até cada passo ser necessário. Se não reproduzir, compare o seu ambiente com o do relato (dados, configuração, versão, permissões) e registre a diferença; o relato continua sendo a evidência principal.

Uma falha intermitente merece algumas repetições contadas ("falhou 3 de 10") antes de qualquer conclusão.

## 3. Localize a primeira divergência

Siga o fluxo a partir da entrada e encontre o primeiro ponto em que o estado real difere do esperado. Erros que aparecem depois são consequência: a última exceção do log raramente é a causa. Ferramentas boas para isso: um valor registrado em pontos intermediários, um breakpoint, comparar um caso que funciona com outro que falha, ou `git bisect` quando existe uma versão boa conhecida.

## 4. Formule e elimine hipóteses

Escreva no máximo três explicações. Para cada uma, a previsão: "se for isto, então ao fazer X veremos Y". Escolha **um** experimento cujo resultado seja diferente entre as hipóteses mais fortes e execute. Risque o que o resultado contradiz e diga por quê. Mude uma variável por vez.

Se dois experimentos seguidos não separarem as hipóteses, pare, revise o modelo do problema e reporte o que já sabe e qual observação falta.

## 5. Corrija só a causa

Quando o usuário pedir a correção, faça a menor mudança que remove a causa no ponto da divergência. Não aproveite para refatorar nem corrija três suspeitos de uma vez: ninguém saberia qual resolveu.

## 6. Prove

- Rode de novo a reprodução do passo 2: precisa passar.
- Rode uma verificação de regressão perto da mudança: o teste existente do módulo ou um teste novo que falhava antes.
- Se a falha era intermitente, repita o mesmo número de vezes da medição inicial.

## Grau de certeza

- **Confirmada:** reproduzida antes, some depois da correção e o experimento apontou para ela.
- **Provável:** o experimento apoia, mas a correção ainda não foi verificada.
- **Possível:** combina com os sinais, mas nada a separou das alternativas.
- **Desconhecida:** sem reprodução; indique a próxima observação mais útil.

## Relatório

```
Falha: <uma linha> — <versão/ambiente>
Certeza: <Confirmada | Provável | Possível | Desconhecida>

Reprodução: <comando ou passos> → <erro exato>
Primeira divergência: <arquivo>:<linha> — esperado <x>, obtido <y>
Hipóteses:
  1. <causa> — <evidência> — mantida | descartada (<motivo>)
Experimento decisivo: <o que rodou> → <resultado>
Causa: <uma ou duas frases>
Correção: <arquivo>:<linha> — <mudança> | proposta, não aplicada
Prova: reprodução <passou/falhou>; regressão <comando> → <resultado>
Não executado: <verificação> — <motivo>
```

## Limites

Diagnostique primeiro; edite código só com pedido. Não faça commit, push, deploy nem feche a issue sem autorização. Não rode nada que apague dados, altere produção ou envie mensagens a pessoas para reproduzir um erro sem perguntar antes.

## Armadilhas

- Corrigir o erro secundário que aparece por último no log.
- Declarar "resolvido" sem repetir a reprodução original.
- Manter uma hipótese depois que um experimento a contradisse.
- Trocar várias coisas ao mesmo tempo e não saber qual funcionou.
