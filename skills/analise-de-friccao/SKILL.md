---
name: Análise de fricção
description: Leia conversas e registros autorizados de um período, encontre padrões de atrito (retrabalho, correções do usuário, perguntas repetidas, ferramentas que falharam), meça frequência e efeito e proponha a menor mudança para cada padrão, sem alterar bots por conta própria.
---

# Análise de fricção

Fricção é todo momento em que o usuário precisou se repetir, corrigir o bot, esperar sem motivo ou fazer à mão algo que o bot deveria ter feito. Um caso isolado é anedota; um padrão é uma oportunidade de melhoria.

## Quando aplicar

Quando o usuário pede para entender por que um bot está rendendo pouco, ao revisar periodicamente o conjunto de bots, ou antes de decidir criar uma habilidade ou rotina nova.

## 1. Defina janela e fontes

- **Janela:** desde a última análise ou os últimos 7 dias, salvo indicação.
- **Fontes:** só o que está autorizado e acessível: conversas que o usuário colar ou exportar, a conversa atual, relatórios de outros bots obtidos por delegação (`bithub_delegate` pedindo a cada bot um relato das dificuldades que teve, quando a delegação estiver disponível), arquivos do espaço de trabalho.

Não prometa ler o histórico de todos os bots: o Bithub não dá a um bot acesso às conversas dos outros. Se faltar material, peça trechos relevantes.

## 2. Procure sinais

- **Correção do usuário:** "não era isso", "eu já disse", "de novo", reformulação do mesmo pedido.
- **Retrabalho:** a mesma entrega refeita várias vezes; o usuário editando a resposta à mão.
- **Perguntas repetidas:** o bot pergunta a mesma informação em conversas diferentes (candidata a memória ou instrução).
- **Instrução ignorada:** o bot contraria algo escrito no perfil dele.
- **Ferramenta falhando:** erros de ferramenta, permissão negada, tempo esgotado, ferramenta usada para o fim errado.
- **Desvio de papel:** pedidos fora da especialidade que o bot tentou resolver mal em vez de delegar.
- **Espera:** tarefas longas sem atualização, delegações sem resposta.

## 3. Agrupe e meça

Agrupe ocorrências semelhantes num padrão. Para cada padrão: quantas vezes aconteceu, em quais bots, efeito observado (tempo perdido, resultado errado, abandono) e dois ou três trechos curtos como evidência. Marque como hipótese o que tiver uma única ocorrência ou contexto insuficiente.

## 4. Proponha a menor mudança

Para cada padrão, escolha o tipo de mudança mais leve que resolveria:

| Tipo | Quando |
| --- | --- |
| Ajuste de instrução | o bot não sabia ou esqueceu uma regra simples |
| Memória | uma preferência estável do usuário que ele repete |
| Habilidade | um procedimento com vários passos que se repete e pode servir a outros bots |
| Atribuir habilidade ou pasta | o recurso existe, mas o bot não o recebe |
| Integração ou plugin | falta acesso a um sistema; diga o que o usuário precisa conectar |
| Rotina | algo que o usuário pede sempre no mesmo horário |
| Novo bot | uma responsabilidade inteira sem dono |

Escreva o texto exato da instrução sugerida ou o esboço da habilidade, para o usuário só aprovar.

## Entrega

```
Período: <datas> — fontes: <lista> — fora do alcance: <lista>

Padrões (do maior efeito para o menor)
1. <nome do padrão> — <n> ocorrências — bots: <lista>
   Evidência: "<trecho>", "<trecho>"
   Efeito: <o que custou>
   Proposta (<tipo>): <mudança concreta>

Hipóteses com pouca evidência: <itens>
Sem fricção relevante: <bots ou áreas>
```

Se nada relevante apareceu, diga isso em uma linha. Numa rotina, uma execução sem achados não precisa de relatório.

## Limites

Um relatório não autoriza alterar instruções, habilidades ou rotinas de outros bots. Espere o usuário escolher o que aplicar. Não copie dados pessoais das conversas para o relatório além do trecho mínimo necessário.

## Erros frequentes

- Generalizar a partir de uma conversa.
- Propor um bot novo quando uma linha de instrução resolveria.
- Relatar sintomas sem dizer o que mudar.
- Afirmar ter analisado conversas que não estavam acessíveis.
