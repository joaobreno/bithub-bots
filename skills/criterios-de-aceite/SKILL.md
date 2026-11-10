---
name: Critérios de aceite
description: Escreva, para cada entrega, critérios que quem recebe consegue observar e conferir, no formato condição inicial, ação e resultado esperado, cobrindo o caminho principal, o erro ou limite que mais afetaria o usuário e o que não pode mudar, com medidas no lugar de adjetivos.
---

# Critérios de aceite

Um critério de aceite responde "como saberemos que está pronto?" antes do trabalho começar. Se duas pessoas podem discordar sobre se um critério foi cumprido, ele ainda não está bem escrito.

## Quando aplicar

Ao planejar uma entrega (junto com Escopo executável), ao escrever uma história de usuário ou issue, antes de testar (os critérios viram casos em Testes de aceite) e ao revisar critérios vagos de outra pessoa.

## 1. Comece pela pessoa e pelo resultado

Para cada entrega, identifique quem recebe ou usa e o que essa pessoa precisa conseguir. Critérios descrevem comportamento visível para ela, não detalhes de implementação ("a tela mostra os horários livres", não "o endpoint usa cache").

## 2. Use o formato de três partes

**Dado** uma condição inicial, **quando** uma ação acontece, **então** um resultado observável.

> Dado um cliente com consulta marcada para amanhã às 10h, quando ele escolhe "Remarcar" e seleciona sexta às 14h, então a consulta aparece em sexta às 14h e o horário de amanhã volta a ficar livre na agenda.

Um critério, um comportamento. Se houver "e" ligando resultados independentes, considere dividir.

## 3. Cubra os casos que importam

Para cada entrega, no mínimo:

- **Caminho principal:** o uso normal, do início ao fim.
- **Erro ou limite de maior impacto:** o que acontece com entrada inválida, sem permissão, sem conexão, sem itens, no limite (último horário do dia, valor máximo).
- **O que não pode mudar:** um comportamento vizinho que precisa continuar igual (regressão).

Acrescente outros casos só quando o risco justificar; uma lista enorme de critérios esconde os importantes.

## 4. Troque adjetivos por medidas

| Vago | Verificável |
| --- | --- |
| rápido | a lista carrega em até 2 s com 500 itens numa conexão 4G |
| intuitivo | 4 de 5 pessoas de teste concluem a remarcação sem ajuda |
| seguro | um usuário não consegue ver consultas de outro alterando o ID na URL |
| funciona no celular | em 360 px de largura, nenhum botão fica cortado e todos têm área de toque de 44 px |

Quando a medida não for conhecida, marque como pendente e pergunte, em vez de inventar um número.

## 5. Separe aceite do produto e tarefas internas

"Código revisado", "testes automatizados escritos" e "documentação atualizada" são definição de pronto da equipe, não critérios de aceite do produto. Liste-os à parte, se forem pedidos.

## 6. Confira cada critério

Pergunte para cada um: quem recebe consegue observar isso sozinho? Precisa de dados, ambiente ou conta específicos? Esses requisitos estão disponíveis? Registre dependências de ambiente e dados de teste.

## Formato

```
Entrega: <resultado>
Para: <pessoa>

Critérios
1. [principal] Dado …, quando …, então …
2. [erro] Dado …, quando …, então …
3. [não muda] Dado …, quando …, então …

Medidas pendentes: <critério> — <o que falta definir e quem decide>
Ambiente e dados necessários: <itens>
Definição de pronto da equipe (se pedida): <itens>
```

## Limites

Não invente regras de negócio para completar um critério; marque como pergunta. Não publique os critérios em ferramentas externas sem pedido.

## Erros frequentes

- Critérios que descrevem a implementação em vez do comportamento.
- Só o caminho feliz.
- Palavras como "adequado", "corretamente" e "amigável" sem medida.
- Critérios que só quem escreveu o código consegue conferir.
