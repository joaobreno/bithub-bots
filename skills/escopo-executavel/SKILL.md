---
name: Escopo executável
description: Converta um objetivo em um plano de entregas pequenas e verificáveis, com o que entra agora e o que fica para depois, dependências e riscos na ordem certa, premissas explícitas e uma primeira ação concreta, sem inventar responsáveis, datas ou requisitos.
---

# Escopo executável

Um plano é executável quando qualquer pessoa da equipe consegue começar a primeira tarefa hoje e sabe como reconhecer que cada etapa terminou. Listas de atividades sem resultado verificável não são plano.

## Quando aplicar

Ao transformar uma ideia, pedido de cliente, épico, projeto pessoal ou meta em trabalho organizado; ao revisar um plano que não sai do lugar; ao decidir o que cortar para caber num prazo.

## 1. Escreva o resultado final

Em uma ou duas frases: o que existe no fim que não existe hoje, e para quem. Exemplo: "clientes conseguem remarcar a própria consulta pelo app sem ligar para a clínica". Tudo no plano precisa contribuir para isso.

## 2. Separe o que se sabe

- **Requisitos confirmados:** escritos ou decididos por quem tem autoridade.
- **Restrições:** prazo, orçamento, tecnologia obrigatória, regras legais.
- **Premissas:** o que você está supondo para planejar (diga cada uma).
- **Propostas suas:** sugestões que ainda precisam de aceite.
- **Perguntas abertas:** o que bloqueia uma decisão.

Leia o material existente antes de perguntar. Pergunte só o que impede de planejar; o resto vira premissa declarada.

## 3. Corte o escopo

Divida em:

- **Agora:** o mínimo que entrega o resultado do passo 1 de forma útil.
- **Depois:** melhorias que podem esperar, com a consequência de adiar ("sem notificação por e-mail, o cliente precisa abrir o app para ver a confirmação").
- **Fora:** o que não será feito, para evitar expectativa.

## 4. Divida em entregas, não em camadas

Prefira fatias que funcionam de ponta a ponta ("remarcar para um horário livre no mesmo dia") a camadas técnicas ("fazer o banco", "fazer a API", "fazer a tela"), porque cada fatia pode ser mostrada e validada. Cada entrega tem:

- **Resultado observável** (o que alguém consegue ver ou fazer);
- **Critério de conclusão** (veja Critérios de aceite);
- **Depende de:** outras entregas, decisões, acessos ou pessoas;
- **Tamanho:** pequeno o bastante para terminar em poucos dias; se não for, divida de novo.

Atividades administrativas sem resultado próprio ("reunião de alinhamento") não viram tarefas; entram como dependência quando bloqueiam algo.

## 5. Ordene por dependência e risco

Comece pelo que destrava outras entregas e pelo que tem mais chance de invalidar o plano: a integração nunca testada, a regra de negócio ambígua, o fornecedor que ainda não respondeu. Descobrir cedo que algo não funciona é mais barato.

## 6. Estime só quando pedirem

Use faixas ("2 a 4 dias") com as premissas que sustentam a faixa. Estimativa não é compromisso; não converta em data sem acordo.

## Formato

```
Objetivo: <resultado final>
Agora: <lista curta> — Depois: <lista com consequência> — Fora: <lista>
Premissas: <itens> — Perguntas abertas: <itens com quem decide>

Entregas (na ordem)
1. <resultado observável> — conclui quando: <critério> — depende de: <itens> — [faixa]
2. …

Riscos: <risco> → <como descobrir cedo ou reduzir>
Primeira ação: <o que fazer hoje, concreto>
```

Para um plano curto, mantenha só objetivo, entregas e primeira ação.

## Limites

Não atribua tarefas a pessoas, não marque datas e não crie itens em ferramentas de gestão (Jira, Linear, Trello) sem pedido. Responsáveis aparecem só quando já foram combinados.

## Erros frequentes

- Plano que lista atividades mas não diz quando algo está pronto.
- Começar pelo mais fácil e deixar o risco maior para o fim.
- Tratar suposição como requisito.
- Escopo "agora" que já contém tudo.
