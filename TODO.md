# Correções de Roles e Direcionamento

## Problemas Identificados
- [x] AppSidebar.tsx: Sidebar mostra todas as rotas independente do role
- [x] ExtensionsPublic.tsx: Chamada para /extensions/all causando 403 Forbidden
- [x] Verificar se há endpoint público para ramais ou ajustar lógica
- [x] Login admin redirecionando para extensionsPublic ao invés de máquinas

## Correções Necessárias
- [x] Modificar AppSidebar.tsx para condicional baseado em isAdmin
- [x] Investigar endpoint correto para ramais públicos
- [x] Verificar outras inconsistências de roles no código
- [x] Criar componente HomePage condicional para rota raiz "/"
- [x] Testar correções

## Status
- [x] Análise inicial concluída
- [x] Correções implementadas
- [ ] Testes realizados
