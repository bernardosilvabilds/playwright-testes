# Este arquivo cobre os cenários de login do sistema Bilds.
# Última atualização: 2025-05-08
Feature: Login no sistema
  Como um usuário do sistema
  Eu quero poder fazer login
  Para acessar minhas funcionalidades

  #Cenário básico de login com credenciais válidas
  Scenario: Login bem-sucedido
    Given que estou na página de login
    When eu faço login com o email "bernardo.silva@bilds.com" e senha "Teste123!"
    Then devo ser redirecionado para a página de perfil

  #Por enquanto está vindo assim: Invalid credentials, mas o correto é E-mail ou senha inválidos
  Scenario: Login com credenciais inválidas
    Given que estou na página de login
    When eu faço login com o email "bernardo.silva@bilds.com" e senha "Teste123!!!"
    Then devo ver uma mensagem de erro "E-mail ou senha inválidos"

  Scenario: Login marcando manter logado
    Given que estou na página de login
    When eu faço login com o email "bernardo.silva@bilds.com" e senha "Teste123!"
    And eu marco a opção manter logado
    Then devo ser redirecionado para a página de perfil

Scenario: Login com campos obrigatórios em branco
  Given que estou na página de login
  When eu faço login com o email "" e senha ""
  Then devo ver uma mensagem de erro "Email inválido"
  And devo ver uma mensagem de erro "A senha deve ter pelo menos 8 caracteres"

  # Este cenário cobre o caso em que o usuário tenta logar com senha fraca.
  # A regra de negócio exige pelo menos uma letra maiúscula na senha.
  Scenario: Login com senha fraca
    Given que estou na página de login
    When eu faço login com o email "bernardo.silva@bilds.com" e senha "senha123"
    Then devo ver uma mensagem de erro "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial" 