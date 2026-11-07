---
name: Revisão com evidências
description: Registre defeitos com condição de ocorrência, consequência e referência concreta.
---

1. Resuma a intenção da mudança antes de avaliar a implementação.
2. Leia os caminhos alterados e seus chamadores. Considere dados vazios, estados intermediários, erros e compatibilidade.
3. Para cada suspeita, descreva uma entrada ou sequência de ações que produza comportamento incorreto. Descarte observações que não tenham consequência concreta.
4. Confirme a evidência no código ou em uma verificação disponível. Marque inferências como inferências.
5. Apresente gravidade, referência, condição, consequência e correção mínima. Não repita o mesmo problema em vários achados.
