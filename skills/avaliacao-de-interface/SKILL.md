---
name: Avaliação de interface
description: Avalie uma tela a partir da tarefa de quem usa, percorrendo orientação, hierarquia, conteúdo, interação, estados e acessibilidade, e entregue poucas correções priorizadas, cada uma com local, evidência, consequência e mudança concreta.
---

# Avaliação de interface

Uma crítica útil diz o que mudar primeiro e por quê, em termos da tarefa de alguém. "Está poluído" não ajuda; "o botão de pagar compete com três links de mesmo peso, e quem chega pela primeira vez não sabe onde clicar" ajuda.

## Quando aplicar

Uma captura, uma página aberta no navegador, um protótipo ou um arquivo de design precisa de avaliação antes de seguir. Esta habilidade não edita arquivos; quando o usuário pedir a implementação, use Composição visual e o código do projeto.

## 1. Estabeleça a referência

- **O que está sendo avaliado:** a captura enviada, o endereço aberto (com data) ou o arquivo.
- **Tarefa principal:** o que a pessoa veio fazer nesta tela. Se não estiver claro pelo contexto, pergunte uma vez.
- **Pessoa:** primeira visita, uso diário, administrador, celular ou computador.
- **Como foi visto:** só imagem, página interativa, ou interativa com teclado e tamanhos diferentes. Isso define o que você pode afirmar.

Com o navegador do Bithub, abra a página (`bithub_browser_navigate`), leia a estrutura (`bithub_browser_snapshot`), capture (`bithub_browser_screenshot`) e interaja (`bithub_browser_click`, `bithub_browser_press_key`) para ver estados reais.

## 2. Percorra seis lentes

1. **Orientação:** em cinco segundos, dá para saber onde estou, o que é isto e o que posso fazer?
2. **Hierarquia:** a informação e a ação principais são as mais visíveis? Há disputa de atenção?
3. **Conteúdo e texto:** títulos, rótulos, botões e mensagens são claros e específicos? Há jargão, texto excessivo ou ambiguidade?
4. **Interação:** o caminho da tarefa tem passos desnecessários, controles inesperados, ações destrutivas sem confirmação ou sem desfazer?
5. **Estados e retorno:** carregando, vazio, erro e sucesso existem e dizem o que fazer? A ação dá retorno imediato?
6. **Acessibilidade:** contraste, tamanho de texto e de alvos, foco visível, ordem de tabulação, rótulos de campos e botões de ícone, informação que depende só de cor.

## 3. Converta observações em problemas

Para cada problema, escreva:

- **Onde:** área da tela, componente ou texto exato.
- **Evidência:** o que se vê (ou o que aconteceu ao interagir).
- **Consequência para a tarefa:** atraso, erro, abandono, dúvida.
- **Mudança proposta:** específica o bastante para implementar ("trocar 'Enviar' por 'Pagar R$ 120,00' e deixar 'Voltar' como link de texto").

Separe gosto pessoal de problema funcional; se for preferência, diga que é.

## 4. Priorize

Ordene por **impacto na tarefa** (bloqueia, atrasa, incomoda) e **esforço estimado** (texto ou estilo, componente, fluxo). Recomende primeiro o que tem alto impacto e baixo esforço. Entregue no máximo cinco prioridades; o restante vai numa lista curta de melhorias menores.

## 5. Seja honesto sobre o que foi medido

- Contraste: informe a razão quando medida; numa captura, diga que é estimativa.
- Teclado, leitor de tela, animações e estados ocultos: só afirme o que testou.
- Desempenho percebido: descreva o que observou, sem números inventados.

## Entrega

```
Tela: <referência> — tarefa: <frase> — avaliada como: <imagem | interativa | interativa + teclado>

Prioridades
1. [Alto impacto · baixo esforço] <título>
   Onde: …  Evidência: …  Consequência: …
   Mudança: …

Melhorias menores: <itens curtos>
Funciona bem (manter): <2 ou 3 pontos>
Não verificado: <o que não foi possível testar>
```

## Limites

Não altere arquivos, não comente em ferramentas de design e não abra tarefas em sistemas externos sem pedido. Ao implementar, respeite o escopo autorizado e confira o resultado na própria tela.

## Erros frequentes

- Listas longas sem prioridade, que deixam a decisão para o leitor.
- Recomendações vagas ("melhorar o contraste") sem dizer onde e para quanto.
- Afirmar problemas de teclado ou leitor de tela a partir de uma imagem.
- Propor trocar o estilo inteiro quando o problema é uma hierarquia local.
