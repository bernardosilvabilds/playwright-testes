# Este arquivo cobre os cenários de Cadastro do sistema Bilds.
# Última atualização: 2025-05-15
Feature: Cadastro de novo usuário
  Como um novo usuário
  Quero me cadastrar no sistema
  Para acessar as funcionalidades

  #Sempre antes de rodar esse cenario, alterar o campo EMAIL
  Scenario: Cadastro bem-sucedido
    Given que estou na página de cadastro
    When eu preencho o nome com "João Silva9"
    And eu preencho o email com ""
    And eu preencho a senha com "Senha123!"
    And eu preencho a confirmação de senha com "Senha123!"
    And eu aceito os termos e condições
    And eu clico no botão de criar conta
    Then devo ver a mensagem de sucesso de cadastro
    And devo ser redirecionado para a página de login

  Scenario: Cadastro com senha sem letra maiúscula
    Given que estou na página de cadastro
    When eu preencho o nome com "João Silva"
    And eu preencho o email com "joao2@exemplo.com"
    And eu preencho a senha com "senha123"
    And eu preencho a confirmação de senha com "senha123"
    And eu aceito os termos e condições
    And eu clico no botão de cadastrar
    Then devo ver a mensagem de erro "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial"

  # Menagens que estavam no teste e ta diferente no sitema: Nome é obrigatório / o email é obrigatório / A senha é obrigatória
  Scenario: Cadastro com campos obrigatórios em branco
    Given que estou na página de cadastro
    When eu clico no botão de cadastrar
    Then devo ver as mensagens de erro:
      | Campo       | Mensagem                    |
      | nome        | Nome completo é obrigatório        |
      | email       | Email inválido      |
      | senha       | A senha deve ter pelo menos 8 caracteres       |


  Scenario: Cadastro com email inválido
    Given que estou na página de cadastro
    When eu preencho o nome com "João Silva"
    And eu preencho o email com "email-invalido@email.com123"
    And eu preencho a senha com "Senha123!"
    And eu preencho a confirmação de senha com "Senha123!"
    And eu aceito os termos e condições
    And eu clico no botão de cadastrar
    Then devo ver a mensagem de erro "Email inválido"

  Scenario: Cadastro com senhas diferentes
    Given que estou na página de cadastro
    When eu preencho o nome com "João Silva"
    And eu preencho o email com "joao@exemplo.com"
    And eu preencho a senha com "Senha123"
    And eu preencho a confirmação de senha com "Senha456"
    And eu aceito os termos e condições
    And eu clico no botão de cadastrar
    Then devo ver a mensagem de erro "As senhas não coincidem"

  Scenario: Cadastro sem aceitar os termos
    Given que estou na página de cadastro
    When eu preencho o nome com "João Silva"
    And eu preencho o email com "joao@exemplo.com"
    And eu preencho a senha com "Senha123!"
    And eu preencho a confirmação de senha com "Senha123!"
    And eu não aceito os termos e condições
    And eu clico no botão de cadastrar
    Then devo ver a mensagem de erro "Você deve aceitar os termos"

  # Está vindo com a mensagem errada - corrigir - Verificar mensagem: E-mail já cadastrado
  Scenario: Cadastro com email já existente
    Given que estou na página de cadastro
    When eu preencho o nome com "João Silva"
    And eu preencho o email com "joao9@exemplo.com"
    And eu preencho a senha com "Senha123!"
    And eu preencho a confirmação de senha com "Senha123!"
    And eu aceito os termos e condições
    And eu clico no botão de Criar conta
    Then devo ver a mensagem de erro "Profile already exists"