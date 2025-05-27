Feature: API de Autenticação
  Como um desenvolvedor
  Eu quero testar os endpoints de autenticação
  Para garantir que a API está funcionando corretamente

  Scenario: Login via API
    Given que tenho um usuário válido
    When eu faço uma requisição POST para "/auth/login"
    Then o status code deve ser 200
    And o response deve conter um token JWT

  Scenario: Cadastro via API
    Given que tenho os dados de um novo usuário
    When eu faço uma requisição POST para "/auth/register"
    Then o status code deve ser 201
    And o response deve conter os dados do usuário criado 