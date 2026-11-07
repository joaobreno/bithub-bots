---
name: Integração de APIs
description: Confira autenticação, dados e limites antes de transformar uma API em procedimento.
---

Consulte documentação primária e identifique o endpoint, os campos usados, paginação, erros e limites. Para uma leitura autorizada, observe a resposta real antes de escrever instruções que dependam de seu formato.

Use credenciais já conectadas ou variáveis de ambiente apropriadas e nunca reproduza seus valores. Separe operações de consulta das que alteram dados ou têm custo. Testes com efeitos externos precisam da autorização correspondente. Se faltar autenticação, entregue um exemplo sem segredo e marque a execução como pendente; não invente resultados ou comandos de armazenamento de chaves.
