---
name: Revisão de automações
description: Avalie as rotinas dos bots quanto a utilidade, frequência, ruído e custo, identificando execuções vazias, duplicadas, frequentes demais ou que dependem de algo que não existe, e proponha ajustes concretos de horário, instrução ou desligamento.
---

# Revisão de automações

Uma rotina vale a pena quando cada execução tem chance real de trazer algo que o usuário quer saber ou fazer. Rotinas que rodam muito e dizem pouco gastam uso do modelo e treinam o usuário a ignorar as mensagens.

## Quando aplicar

Quando o usuário pergunta se as rotinas estão bem configuradas, quando as mensagens automáticas viraram ruído, ao criar uma rotina nova parecida com outra, ou numa revisão periódica.

## 1. Levante as rotinas

Liste as rotinas do bot atual com `bithub_routines` (nome, instrução, recorrência, se está ligada, próxima e última execução). As rotinas de outros bots não são acessíveis por esta ferramenta: peça ao usuário a lista (ela aparece nas configurações de cada bot, em Rotinas) ou peça um relato ao bot dono por delegação, quando disponível.

## 2. Avalie cada rotina

- **Utilidade:** o que o usuário ganha numa execução típica? Uma rotina sem resultado claro é candidata a desligar.
- **Frequência:** a cadência acompanha a velocidade com que a fonte muda? Checar algo que muda uma vez por dia a cada hora é desperdício; um prazo semanal não precisa de rotina diária.
- **Execuções vazias:** a instrução diz o que fazer quando não há novidade? Sem isso, cada execução gera uma mensagem inútil.
- **Duplicidade:** duas rotinas (do mesmo bot ou de bots diferentes) cobrindo a mesma fonte.
- **Dependências:** a rotina depende de uma conexão, pasta, credencial ou site que não existe mais?
- **Instrução autossuficiente:** a instrução da rotina funciona sozinha, sem o contexto da conversa em que foi criada?
- **Conversa longa:** uma rotina frequente numa conversa muito longa aumenta o custo de cada execução; considere uma conversa ou bot dedicado.
- **Horário:** respeita o horário de trabalho e o fuso do usuário? Concentrar várias rotinas no mesmo minuto gera uma enxurrada de mensagens.
- **Ações:** a rotina executa algo com efeito externo (enviar, publicar, comprar)? Isso precisa de autorização clara.

## 3. Classifique e proponha

Para cada problema, uma marcação e uma correção específica:

| Marcação | Exemplo de correção |
| --- | --- |
| Frequente demais | de a cada hora para dias úteis às 9h |
| Ruidosa | acrescentar "se não houver mudança desde a última execução, responda numa linha" |
| Duplicada | manter a do bot X, desligar a do bot Y |
| Quebrada | reconectar a fonte ou desligar até haver acesso |
| Sem utilidade | desligar |
| Instrução dependente da conversa | reescrever com todo o contexto necessário |

Escreva a nova instrução ou a nova recorrência completa, pronta para aplicar.

## 4. Aplique só com autorização

Para as rotinas do próprio bot, depois do "sim" do usuário, use `bithub_routine_update` (recorrência, instrução, ligada/desligada) ou `bithub_routine_delete`. Confira o resultado listando de novo. Para rotinas de outros bots, entregue a mudança para o usuário aplicar nas configurações do bot dono.

## Entrega

```
Rotinas avaliadas: <n> — fonte: <lista do próprio bot | lista fornecida>

| Bot | Rotina | Marcação | Correção proposta |
| Assistente Executivo | Resumo da manhã | Ruidosa | instrução: responder numa linha sem novidades |

Sem problemas: <rotinas>
Aplicado: <mudanças feitas com autorização> | nada aplicado
```

Sem problemas relevantes, diga isso numa linha.

## Limites

Não crie, altere, ligue, desligue ou apague rotinas sem pedido. Não altere rotinas de outros bots. Não aumente a frequência de uma rotina para "garantir" algo sem perguntar.

## Erros frequentes

- Avaliar a rotina pela instrução sem olhar a última execução.
- Propor "rever a frequência" sem dizer qual frequência.
- Ignorar o custo de execuções vazias.
