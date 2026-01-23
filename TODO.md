# Correções de Roles e Direcionamento

## Problemas Identificados
- [ ] AppSidebar.tsx: Sidebar mostra todas as rotas independente do role
- [ ] ExtensionsPublic.tsx: Chamada para /extensions/all causando 403 Forbidden
- [ ] Verificar se há endpoint público para ramais ou ajustar lógica

## Correções Necessárias
- [ ] Modificar AppSidebar.tsx para condicional baseado em isAdmin
- [ ] Investigar endpoint correto para ramais públicos
- [ ] Verificar outras inconsistências de roles no código
- [ ] Testar correções

## Status
- [x] Análise inicial concluída
- [ ] Correções implementadas
- [ ] Testes realizados
