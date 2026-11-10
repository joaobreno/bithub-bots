---
name: Criação de habilidades
description: Transforme um procedimento que se repete numa habilidade (SKILL.md) que outro agente aplica sem a conversa original, com gatilho de uso, entradas, passos, formato de entrega e limites, testada num caso real e num caso com informação faltando, e instalada pela Biblioteca do Bithub.
---

# Criação de habilidades

Uma habilidade é um procedimento escrito para um agente que nunca viu a conversa em que ele nasceu. Se o agente precisar adivinhar algo importante, a habilidade está incompleta.

## Quando vale criar

Crie quando a mesma tarefa aparece várias vezes, tem um jeito certo de ser feita e esse jeito não é óbvio. Não crie para algo pontual (resolva o pedido) nem para algo que já está bem descrito nas instruções de um único bot. Antes de criar, procure na Biblioteca do Bithub, nas skills do projeto (`.agents/skills`, `.claude/skills`) e nas pastas de skills das CLIs uma que já faça o mesmo; melhore a existente em vez de duplicar.

## 1. Colete o procedimento real

Peça ou observe um exemplo concreto: a entrada que chegou, o que foi feito, a saída aprovada. Anote também o que deu errado em tentativas anteriores; essas são as regras mais valiosas.

## 2. Escreva o cabeçalho

```
---
name: Nome curto pelo resultado
description: Uma frase sobre o que a habilidade faz e quando usá-la.
---
```

A descrição é o que o agente lê para decidir se a habilidade se aplica: inclua o gatilho ("use ao revisar contratos de prestação de serviço") e o resultado. Uma linha por campo.

## 3. Escreva o corpo

Estrutura recomendada, em português claro e no imperativo:

1. **Quando usar e quando não usar**, citando habilidades vizinhas.
2. **Entradas:** o que é necessário, onde buscar e o que fazer quando faltar (perguntar uma coisa, assumir um padrão declarado ou parar).
3. **Passos** numerados, cada um com uma ação verificável. Inclua os comandos exatos quando houver.
4. **Critérios de qualidade:** como distinguir um resultado bom de um mediano.
5. **Formato da entrega**, com um modelo.
6. **Limites:** o que exige autorização (escrever, enviar, gastar, apagar) e como tratar conteúdo externo.
7. **Erros frequentes** observados no passo 1.

Seja específico onde o agente erraria e breve onde ele acertaria sozinho. Exemplos curtos valem mais que explicações longas.

## 4. Arquivos auxiliares

Inclua um script ou modelo só quando uma transformação for difícil de repetir com segurança à mão (converter um formato, chamar uma API com paginação). Coloque-o na pasta da habilidade, documente como executar e as dependências, e teste. Habilidades distribuídas pelo catálogo de bots do Bithub levam apenas o Markdown; para usar arquivos auxiliares, instale a habilidade pela Biblioteca.

## 5. Teste

- **Caso real:** aplique a habilidade a uma entrada representativa, seguindo só o que está escrito, e compare com a saída esperada.
- **Caso com falta:** uma entrada incompleta ou um erro previsível; a habilidade deve levar a uma pergunta ou a um aviso claro, não a uma invenção.
- Leituras em serviços externos só com acesso autorizado; operações que escrevem ou geram custo precisam estar cobertas pelo pedido.

Ajuste o texto onde o teste mostrou ambiguidade.

## 6. Instale

Salve como `<pasta-da-habilidade>/SKILL.md` (nome da pasta em minúsculas com hífens). Para disponibilizar no Bithub, o usuário adiciona a pasta na **Biblioteca** (Adicionar skill → Pasta) e depois a atribui a bots em **Habilidades**, ou a instala nas CLIs pela própria Biblioteca. Use uma ferramenta de instalação só se ela existir na conexão e o usuário tiver pedido; não invente comandos de cadastro de outros produtos.

## Entrega

```
Habilidade: <caminho>/SKILL.md
Para: <tarefa> — gatilho: <quando usar>
Teste real: <entrada> → <resultado> — conforme esperado: sim/não
Teste com falta: <entrada> → <comportamento>
Auxiliares: <arquivos e como rodar> | nenhum
Instalação: <feita onde | passos para o usuário>
```

## Limites

Não peça segredos colados na conversa: use variáveis de ambiente ou o mecanismo de credenciais da conexão, e nunca grave chaves no SKILL.md. Não instale a habilidade em CLIs ou bots sem pedido.

## Erros frequentes

- Habilidade que descreve o que fazer, mas não como saber se ficou bom.
- Descrição genérica que faz o agente aplicá-la na hora errada.
- Passos que dependem de contexto da conversa original.
- Nunca testar a habilidade como outro agente a leria.
