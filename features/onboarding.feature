Feature: Onboarding
  Given que sou um novo usuário
  And eu me registrei com sucesso no sistema
  And eu fiz login no sistema
  And estou acessando o processo de onboarding pela primeira vez

  #CAMINHO FELIZ para passar o teste
  Scenario: Usuário realiza login e completa o onboarding com sucesso
    Given que estou na página de login
    When eu faço login com o email "testuser3@testemail.com" e senha "Senha123!"
    Then devo ser direcionado para a próxima etapa do onboarding
    And eu preencho o campo "Nome completo" com "João Silva"
    And eu seleciono o país "Brasil"
    And eu preencho o campo "Cidade" com "Florianopolis"
    And eu seleciono a cidade "FlorianópolisSC"
    And eu clico no botão "Próximo"
    Then devo ver o heading "Personalize seu perfil"
    And eu preencho o campo "URL customizada" com "joao-silva1"
    And eu preencho o campo "Resumo profissional (opcional)" com "Resumo exemplo"
    And eu clico no botão "Próximo"
    Then devo ver o heading "Atuação profissional"
    And eu seleciono a profissão "Engenheiro Civil"
    And eu seleciono a área de atuação "Projeto elétrico"
    And eu clico no botão "Próximo"
    Then devo ver o heading "Quais temas mais interessam a você?"
    And eu seleciono o tema "BIM"
    And eu seleciono o tema "Oçamentação de obras"
    And eu clico no botão "Próximo"
    Then devo ver o heading "Preferências de aprendizado"
    And eu seleciono a recomendação "Recomendações de cursos"
    And eu clico no botão "Próximo"
    Then devo ver o heading "Tudo pronto!"
    And devo ver o texto "Agora todo o ecossistema da"
    And devo ver o texto "Seus interesses foram"
    And devo ver o texto "Suas habilidades e preferê"
    And devo ver o texto "Recomendações personalizadas"
    And eu clico no botão "Ir para o feed da Bilds"