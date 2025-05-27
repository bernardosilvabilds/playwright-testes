Feature: Healthcheck da aplicação
  Como um usuário
  Quero garantir que a página de login está disponível
 
  Scenario: Verificar se a página de login está no ar
    Given que acesso a página de login
    Then a página deve carregar corretamente 