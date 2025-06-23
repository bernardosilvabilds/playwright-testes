Feature: Onboarding
  Given que sou um novo usuário
  And eu me registrei com sucesso no sistema
  And eu fiz login no sistema
  And estou acessando o processo de onboarding pela primeira vez

Scenario: Usuário nao seleciona o país
  Given que estou na página de login
  When eu faço login com o email "testuser3@testemail.com" e senha "Senha123!"
  Then devo ser direcionado para a próxima etapa do onboarding
  When eu clico no botão "Próximo"
  Then o sistema deve exibir erro de validação para o campo "País"
  And eu devo permanecer na tela atual
  And o botão "Próximo" não deve me avançar para a próxima etapa

Scenario: Usuário tenta prosseguir sem selecionar a cidade
  Given que estou na página de login
  When eu faço login com o email "testuser3@testemail.com" e senha "Senha123!"
  Then devo ser direcionado para a próxima etapa do onboarding
  When eu seleciono meu país no menu suspenso "País"
  And eu não seleciono nenhuma cidade no menu suspenso "Cidade"
  And eu clico no botão "Próximo"
  Then o sistema deve exibir erro de validação para o campo "Cidade"
  And eu devo permanecer na tela atual
  And o botão "Próximo" não deve me avançar para a próxima etapa
