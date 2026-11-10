---
name: Composição visual
description: Dê a uma interface uma direção visual intencional, apoiada no sistema do projeto ou, quando não houver, no assunto, no público e no conteúdo, com hierarquia que guia a atenção para a informação principal e a próxima ação.
---

# Composição visual

Composição é decidir para onde o olhar vai primeiro, segundo e terceiro, e fazer isso com coerência em todas as telas. O estilo serve à tarefa; não é decoração aplicada no fim.

## Quando aplicar

Ao criar uma tela nova, redesenhar uma existente de forma relevante ou montar um protótipo. Para ajustes pequenos (uma cor, um espaçamento), basta seguir o sistema existente; não é preciso uma direção nova.

## 1. Comece pelo que já existe

Antes de escolher qualquer cor ou fonte, procure: `DESIGN.md`, guia de estilo, tokens (variáveis CSS, tema do Tailwind, arquivos de tema), biblioteca de componentes e telas vizinhas. Se existir sistema, siga-o: tokens em vez de valores soltos, componentes existentes em vez de novos, mesma escala de tipografia e espaçamento. Uma tela nova num produto existente deve parecer parte dele.

## 2. Sem sistema, defina uma direção

Escreva em três ou quatro linhas, antes de construir:

- **Assunto e público:** do que se trata e para quem (uma ferramenta de contabilidade para escritórios pede outra voz que um app de receitas).
- **Sensação desejada:** duas ou três palavras concretas ("calmo e preciso", "denso e técnico", "acolhedor").
- **Tipografia:** uma família para texto, no máximo outra para títulos; escala com poucos tamanhos.
- **Cor:** uma base neutra, uma cor de ação e cores de estado (sucesso, alerta, erro) com contraste suficiente.
- **Forma e densidade:** raios, espaçamento base, quanto conteúdo cabe por tela.

Evite o visual genérico de modelo pronto: escolha algo que só faça sentido para esse assunto, como um detalhe tipográfico, uma forma de agrupar dados ou uma ilustração ligada ao conteúdo, sem sacrificar a legibilidade.

## 3. Construa a hierarquia

Para cada tela, responda: qual é a **informação principal**, qual é a **ação principal** e o que é **apoio**.

- Uma única ação de destaque por área; as demais em estilo secundário ou de texto.
- Tamanho, peso e contraste indicam importância; não use os três ao máximo em tudo.
- Proximidade agrupa o que está relacionado; espaço separa grupos. Prefira espaço a linhas e caixas.
- Alinhamento consistente numa grade simples; poucos eixos verticais.
- Repetição: o mesmo tipo de informação aparece sempre do mesmo jeito.

## 4. Cuide do texto da interface

Títulos dizem onde a pessoa está; botões dizem o que acontece ("Salvar endereço", não "OK"); mensagens de erro dizem o que fazer. Rótulos curtos, sem jargão interno. Nada de texto de enchimento que finge ser conteúdo real.

## 5. Desenhe os estados

Para cada área com dados: carregando, vazio (com o que fazer a seguir), erro (perto da ação que falhou), sucesso e conteúdo longo demais. O estado vazio é muitas vezes a primeira impressão.

## 6. Confira legibilidade e acesso

- Contraste de texto normal de pelo menos 4,5:1 e de texto grande de 3:1; meça quando houver ferramenta e diga quando for estimativa.
- Foco visível em tudo que é interativo; áreas de toque confortáveis.
- Não dependa só de cor para transmitir estado (use ícone ou texto também).
- Teste com conteúdo real ou realista e com larguras menores; nada pode sobrepor ou cortar texto importante.
- Respeite temas claro e escuro quando o projeto tiver os dois.

## Entrega

Junto do trabalho, registre em poucas linhas: o sistema seguido ou a direção escolhida (com o porquê), a hierarquia de cada tela nova, os estados cobertos e o que não foi conferido (por exemplo, contraste no tema escuro).

## Não faça

- Inventar depoimentos, logotipos de clientes, métricas ou avaliações para preencher a página.
- Criar uma cor ou componente novo quando o sistema já tem um equivalente.
- Usar imagens de terceiros sem saber se podem ser usadas.
- Trocar a identidade visual de um produto existente sem que isso tenha sido pedido.
