# TODO - Implementação da Lógica de Autenticação

## ✅ Concluído
- [x] Criar tipos TypeScript para DTOs de autenticação (LoginRequest, AuthResponse, User)
- [x] Atualizar serviço API com endpoints de autenticação e interceptores JWT
- [x] Criar serviço de autenticação para gerenciar login/registro/armazenamento
- [x] Criar contexto de autenticação para estado global
- [x] Adaptar LoginPage.tsx para usar autenticação real com email
- [x] Criar RegisterPage.tsx para cadastro de usuários (com validações e controle de roles)
- [x] Atualizar App.tsx com AuthProvider, rotas protegidas e controle de acesso baseado em roles
- [x] Atualizar MainLayout.tsx com menu do usuário e botão de logout
- [x] Atualizar AppSidebar.tsx para mostrar menus diferentes baseado no role (usuários veem apenas ramais, admins veem tudo)

## 🔄 Próximos Passos
- [ ] Testar fluxo completo de autenticação (login, registro, logout)
- [ ] Verificar proteção de rotas baseada em roles
- [ ] Testar interceptores de API e tratamento de erros
- [ ] Verificar persistência de sessão (localStorage)
- [ ] Testar expiração de token e renovação automática

## 📋 Requisitos Implementados
- ✅ Autenticação via JWT baseada no backend Spring Boot
- ✅ Controle de roles: apenas admins podem criar outros admins
- ✅ Usuários comuns têm acesso apenas à página de ramais
- ✅ Proteção de rotas baseada na autenticação e roles
- ✅ Interface responsiva e bem comentada
- ✅ Código em português brasileiro
