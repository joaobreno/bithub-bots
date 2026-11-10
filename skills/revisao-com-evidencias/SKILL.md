---
name: Revisão com evidências
description: Leia uma mudança de código em três passadas (contrato, fluxo de dados e falhas) e entregue apenas defeitos sustentados por uma linha do código, um cenário que os dispara e uma correção pequena, com uma decisão clara de integração.
---

# Revisão com evidências

Uma boa revisão responde a uma pergunta do autor: "posso integrar isto?". Cada observação precisa ajudar a responder. Opinião sem evidência atrasa a decisão.

## Quando aplicar

Use em pull requests, merge requests, branches, commits locais ou diffs colados, sempre que alguém quiser saber o que a mudança pode quebrar. Para uma falha que já aconteceu, prefira Diagnóstico de falhas. Se a mudança mexe em autenticação, permissões, entradas externas, arquivos enviados ou segredos, combine com Análise de segurança.

## Preparação

1. **Reúna a mudança completa.** Com o GitHub CLI: `gh pr view <n>` e `gh pr diff <n>`. Em GitLab ou GitHub conectados ao Bithub, `bithub_lab_merge_request` mostra o pedido e `bithub_lab_pipeline` o estado da CI. Localmente, `git diff <base>...HEAD`, `git diff` e `git diff --staged`. Sem repositório, peça o diff ou os arquivos.
2. **Registre o objetivo declarado** (descrição, issue, commits) numa frase. Se não existir e for decisivo, pergunte uma vez; senão, escreva a sua leitura e siga.
3. **Monte o mapa de impacto.** Liste os símbolos alterados (funções, tipos, rotas, colunas, chaves de configuração) e, para cada um, onde é usado. É esse mapa que define o que ler além do diff.

## As três passadas

**1. Contrato.** O que mudou para quem consome este código? Assinaturas, formatos de resposta, nomes de campos, valores padrão, códigos de erro, migrações de banco, eventos emitidos. Verifique se quem já usa o contrato antigo continua funcionando: chamadores no repositório, dados persistidos no formato anterior, clientes publicados.

**2. Fluxo de dados.** Siga cada entrada nova ou alterada até o efeito final. Pergunte em cada etapa: e se vier vazio, nulo, duplicado, muito grande, fora de ordem, com outro fuso ou outra codificação? O valor é validado onde é usado ou só longe dali?

**3. Falhas.** O que acontece quando algo dá errado: exceção no meio de uma transação, rede que cai, nova tentativa que executa duas vezes, arquivo ou conexão que não é fechado, tarefa assíncrona que termina depois da tela ser fechada, duas requisições concorrentes alterando o mesmo registro.

## Pontos de atenção por tipo de mudança

- **Banco e migrações:** reversão possível, dados antigos que não passam na nova restrição, índices em tabelas grandes, código antigo rodando durante a implantação.
- **API pública:** campo removido ou renomeado, mudança de tipo, paginação, versionamento.
- **Interface:** estados de carregando, vazio e erro; ação repetida por duplo clique; texto longo; acessibilidade do controle novo.
- **Assíncrono e concorrência:** corrida entre leitura e escrita, cancelamento, ordem de eventos.
- **Configuração e flags:** valor padrão em produção, ambiente sem a variável nova.
- **Dependências:** versão nova com mudança incompatível, licença, tamanho do pacote.

## Critério para registrar um achado

Só registre quando conseguir apontar **onde** (arquivo e linha), **quando** (entrada ou sequência que dispara) e **o que acontece** (resultado observável errado). Se o cenário depende de algo que o código não permite, descarte. Se é plausível mas não confirmado, escreva como pergunta ao autor, separada dos achados.

Classifique o impacto:

| Nível | Quando usar |
| --- | --- |
| Crítico | perde ou corrompe dados, abre acesso indevido ou derruba o fluxo principal |
| Alto | resultado errado em uso frequente ou algo que funcionava deixa de funcionar |
| Médio | erro num caso de borda real, recurso que não é liberado |
| Baixo | efeito pequeno ou estado raro |

Decisão: **Bloquear** com qualquer Crítico ou Alto; **Ajustar antes** com Médio; **Liberar** nos demais casos.

## Verificação

Rode o teste mais próximo do código alterado, a checagem de tipos do pacote afetado ou o lint dos arquivos mudados. Evite build completo ou suíte inteira sem pedido. Para cada Crítico ou Alto, descreva o teste que falharia hoje.

## Entrega

```
Decisão: <Bloquear | Ajustar antes | Liberar>
Mudança: <PR/branch/diff> — objetivo: <uma frase>

| # | Nível | Local | Problema |
| 1 | Crítico | api/pedidos.ts:88 | pedido cancelado volta a ser cobrado |

#1 api/pedidos.ts:88
Quando: <cenário>
Efeito: <resultado errado>
Correção sugerida: <mudança mínima>
Teste que falharia hoje: <caso>

Perguntas ao autor: <dúvidas sem evidência suficiente>
Verificado: <comando> → <resultado>
Fora do alcance: <arquivos ou chamadores não lidos>
```

Sem problemas, diga "Nenhum defeito encontrado" e liste o que foi e o que não foi lido.

## Limites

Revise sem alterar nada. Corrija, faça commit ou push apenas se o usuário pedir. Não comente, aprove ou integre o pedido sem autorização explícita. Se a mudança for grande demais para uma leitura completa, proponha uma ordem de leitura começando pelos contratos e pelo caminho principal.

## Sinais de uma revisão fraca

- Muitos achados de estilo e nenhum sobre comportamento.
- Afirmar que algo quebra sem ter lido quem chama.
- Repetir o mesmo problema em vários itens.
- Citar testes como aprovados sem tê-los executado.
