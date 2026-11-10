---
name: Análise de segurança
description: Modele quem pode enviar o quê para a aplicação, siga cada entrada não confiável até o recurso que ela afeta e relate só falhas com caminho de abuso demonstrável no código, separadas de reforços preventivos e de hipóteses sobre a implantação.
---

# Análise de segurança

Segurança é sempre relativa a um cenário: quem é o atacante, o que ele já consegue fazer e o que quer alcançar. Sem esse cenário, toda observação vira "pode ser perigoso" e nada é priorizado.

## Quando aplicar

- Revisão de segurança de um repositório, módulo ou mudança.
- Pedido de modelo de ameaças.
- Implementação de algo sensível: login, permissões, upload, pagamentos, chamadas a serviços externos, execução de comandos.
- Junto com Revisão com evidências, quando uma mudança comum atravessa uma fronteira de confiança.

## 1. Delimite o cenário

Registre a partir do código e da documentação, não de uma lista genérica:

- **Componentes no escopo:** serviços, aplicativos, workers, scripts de CI que entram na análise.
- **Implantação:** público na internet, rede interna, só local, desktop instalado. Uma porta aberta em `localhost` de ferramenta de desenvolvimento não tem o risco de uma API pública.
- **Atores:** visitante anônimo, usuário autenticado, outro inquilino, administrador, integração externa, pessoa com acesso ao computador.
- **Ativos:** dados pessoais, credenciais, dinheiro, arquivos, disponibilidade, reputação.
- **O que o atacante não consegue:** escreva também os limites (por exemplo, "não tem acesso ao servidor"), para não inflar a gravidade.

Pergunte só o que mudaria o escopo ou a prioridade; marque o resto como suposição.

## 2. Mapeie entradas e fronteiras

Liste os pontos onde dados não confiáveis entram: rotas HTTP, formulários, parâmetros de URL, cabeçalhos, arquivos enviados, webhooks, mensagens de fila, variáveis de ambiente controladas por terceiros, conteúdo lido da web, saída de modelos de IA. Marque onde cada um cruza uma fronteira de privilégio.

## 3. Siga cada entrada até o efeito

Para cada entrada relevante, acompanhe o valor até onde ele é usado e confira o controle **no ponto de uso**:

- **Autorização por recurso:** a operação confere se *este* usuário pode agir sobre *este* registro, ou só se está logado?
- **Injeção:** SQL, comandos de shell, caminhos de arquivo, templates, HTML/JS refletido, cabeçalhos.
- **Desserialização e parsing:** formatos que executam código ou criam objetos arbitrários; arquivos compactados com caminhos que escapam da pasta.
- **Requisições de saída:** URL controlada pelo usuário alcançando a rede interna ou metadados da nuvem.
- **Segredos:** chaves no repositório, em logs, em mensagens de erro, em respostas de API, no bundle do frontend.
- **Sessão e autenticação:** expiração, invalidação ao sair, proteção contra força bruta, recuperação de conta.
- **Dados sensíveis:** o que é registrado em log, o que vai para terceiros, o que fica em cache.
- **Dependências:** versões com vulnerabilidades conhecidas que são de fato usadas no caminho exposto.

## 4. Registre caminhos de abuso

Cada achado liga: **objetivo do atacante → entrada → fronteira cruzada → controle ausente ou falho → ativo afetado → impacto**. Cite arquivo e linha. Dê probabilidade e impacto (alto, médio, baixo) com uma frase de justificativa baseada no cenário do passo 1.

Separe em três grupos:

1. **Vulnerabilidades demonstradas:** o caminho existe no código.
2. **Reforços recomendados:** defesa em profundidade sem caminho de abuso atual.
3. **Hipóteses de implantação:** dependem de configuração que não está no repositório; diga o que confirmar.

## 5. Proponha correções no lugar certo

Corrija na fronteira onde o controle pertence (validação na entrada, autorização no serviço que acessa o recurso, escape na saída). Prefira mudanças específicas a conselhos genéricos e preserve o comportamento legítimo; leia chamadores e testes antes de propor. Verifique uma correção com o teste mais estreito possível, idealmente um caso que reproduz o abuso.

## Modelo de ameaças, quando pedido

Entregue nesta ordem: escopo e suposições; diagrama ou lista de componentes e fronteiras; ativos; atores e capacidades; caminhos de abuso priorizados; controles existentes; mitigações propostas por componente. Termine conferindo que toda entrada importante e toda fronteira aparecem no modelo e que cada afirmação sobre a arquitetura aponta para evidência no repositório.

## Entrega

```
Escopo: <componentes> — implantação: <cenário> — atores considerados: <lista>

Vulnerabilidades
1. [Alto/Alto] <título> — <arquivo>:<linha>
   Caminho: <objetivo> → <entrada> → <controle falho> → <impacto>
   Correção: <mudança no ponto certo>

Reforços recomendados: <itens curtos>
Hipóteses a confirmar: <configuração, ambiente>
Verificado: <leituras, testes, ferramentas> — Não coberto: <limites>
```

## Limites

- Análise estática e testes locais. Não ataque, varra nem explore sistemas reais ou de terceiros sem autorização expressa e escopo definido.
- Ao encontrar um segredo, indique o local e recomende revogar; nunca repita o valor.
- Não publique achados em issues, PRs ou canais sem o pedido do usuário.
- Exemplos de exploração usam dados fictícios.
