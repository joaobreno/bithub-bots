---
name: Prototipação de fluxos
description: Transforme uma ideia na menor demonstração clicável que permite experimentar a ação principal, com estados que mudam a decisão de quem usa, dados simulados identificados e um percurso conferido no navegador antes da entrega.
---

# Prototipação de fluxos

Um protótipo existe para responder uma pergunta ("as pessoas entendem como agendar?", "três passos são demais?"). Tudo que não ajuda a responder essa pergunta é custo.

## Quando aplicar

Uma ideia, briefing, desenho em papel, captura de outro produto ou descrição de fluxo precisa virar algo que se possa clicar e mostrar. Não use para implementar a funcionalidade de produção completa nem para revisar uma interface pronta (isso é Avaliação de interface).

## 1. Escreva a pergunta e o roteiro

- **Pergunta:** o que o protótipo precisa permitir avaliar.
- **Pessoa e objetivo:** quem usa e o que quer concluir.
- **Roteiro principal:** a sequência de 3 a 7 ações do início até a conclusão.
- **Fora do escopo:** o que fica de propósito sem funcionar.

Se o pedido for vago a ponto de mudar o roteiro, faça uma pergunta; caso contrário, declare as suposições e siga.

## 2. Escolha as telas e os estados

Liste só as telas que o roteiro atravessa. Para cada uma, decida quais estados entram, priorizando os que mudam o que a pessoa faz a seguir:

- vazio (primeiro uso), preenchido, carregando;
- erro de validação com a mensagem real;
- confirmação ou sucesso;
- um caminho alternativo importante (cancelar, voltar, editar).

## 3. Decida onde construir

- **Dentro de um projeto existente:** use o framework, os componentes e os tokens visuais dele. Leia `DESIGN.md`, o guia de estilo ou o tema antes de criar qualquer cor ou componente novo. Trabalhe numa rota ou pasta separada para não afetar o produto.
- **Demonstração independente:** prefira um único `index.html` com CSS e JavaScript simples, ou poucos arquivos estáticos que abram direto no navegador, sem build nem dependências instaladas.
- Sempre dentro da pasta de trabalho autorizada.

## 4. Construa o mínimo navegável

- Botões e links do roteiro funcionam; os demais podem ficar visíveis e inativos, com aparência clara de indisponível.
- Dados de exemplo são plausíveis e obviamente fictícios ("Ana Exemplo", "Pedido #1001"). Nada de depoimentos, clientes ou números inventados que pareçam reais.
- Operações que dependeriam de servidor são simuladas no próprio código e marcadas com um comentário e, se ajudar, com um aviso discreto na tela.
- Aplique a composição do projeto (veja Composição visual) para que a hierarquia não atrapalhe o teste.
- Foco visível, ordem de tabulação coerente e rótulos em campos e botões de ícone desde o início: corrigir isso depois custa mais.

## 5. Percorra antes de entregar

Com o navegador do Bithub (`bithub_browser_navigate`, `bithub_browser_click`, `bithub_browser_type`, `bithub_browser_screenshot`):

1. Abra a demonstração e siga o roteiro do início ao fim.
2. Capture uma imagem por passo do roteiro.
3. Repita o percurso só com teclado (`bithub_browser_press_key` com Tab e Enter).
4. Reduza a largura para algo próximo de um celular, quando a ferramenta permitir, e confira se nada se sobrepõe.
5. Veja o console (`bithub_browser_console`) e corrija erros.

Sem navegador disponível, entregue os passos de abertura e marque o percurso como não conferido.

## Entrega

```
Protótipo: <caminho do arquivo ou rota> — como abrir: <comando ou "abra o index.html">
Pergunta que ele responde: <frase>
Roteiro conferido: 1. … 2. … 3. … (capturas anexas, uma por passo)
Funciona: <lista>
Simulado: <lista do que é falso e como>
Fora do escopo: <lista>
Não conferido: <teclado, tela pequena, navegadores>
Próximo passo sugerido: <o que testar com pessoas reais>
```

## Limites

Uma prévia local não autoriza publicar. Hospedagem pública, domínio, deploy, envio ao repositório ou abertura de PR só com pedido explícito; o Bithub não oferece hospedagem própria, então não prometa um link público. Não substitua páginas do produto real nem altere a branch principal.

## Erros frequentes

- Construir infraestrutura (banco, login, API) que o roteiro não precisa.
- Telas bonitas sem os estados de erro e vazio que decidem a experiência.
- Entregar sem ter clicado no próprio protótipo.
- Esquecer de dizer o que é simulado, e alguém tomar a demonstração por funcional.
