/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

//DIGITANDO EM CAMPOS E CLICANDO EM ELEMENTOS

    it('preenche os campos obrigatorios e envia o formulario', function() { //AULA 2 - exercio extra 1
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste,teste, teste, teste, teste,teste, teste'
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('leonardo@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) //digitar mais rapido um texto longo
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { //AULA 2 - exercio extra 2
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('leonardo@exemplo,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', function (){ //AULA 2 - exercio extra 3
        cy.get('#phone')
        .type('asdfg')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){ //exercio extra 4
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('leonardo@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() { //AULA 2 - exercio extra 5
        cy.get('#firstName')
        .type('Leonardo')
        .should('have.value', 'Leonardo')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Alves')
        .should('have.value', 'Alves')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('leonardo@exemplo.com')
        .should('have.value', 'leonardo@exemplo.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('123456')
        .should('have.value', '123456')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { //AULA 2 - exercio extra 6
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() { //AULA 2 - exercio extra 7 COMANDOS CUSTOMIZADOS
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })


//CAMPOS DE SELEÇÃO SUSPENSA

    it('seleciona um produto (YouTube) por seu texto', function() { // AULA 3 - exercicio 1
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {  // AULA 3 - exercicio extra 1
        cy.get('#product')
          .select('Mentoria')
          .should('have.value', 'mentoria')
    })

    it('', function(){ //AULA 3 - exercicio extra 2
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

//MARCANDO INPUTS DO TIPO RADIO

    it('marca o tipo de atendimento "Feedback"', function(){ //AULA 4 - exercicio
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){ // AULA 4 - exercicio extra,, marcar todos os botoes e verificar se foram marcados.
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

//MARCANDO E DESMARCANDO INPUTS DO TIPO CHECKBOX

    it('marca ambos checkboxes, depois desmarca o último', function(){ // AULA 5 - exercicio
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
// Revise o teste chamado exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário, 
// para garantir que em vez de um .click(), o comando .check() é utilizado para marcar o checkbox Telefone.

//FAZENDO UPLOAD DE ARQUIVOS COM CYPRESS

    it('seleciona um arquivo da pasta fixtures', function(){ // AULA 6 - exercicio 
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){ // AULA 6 - exercicio extra 1
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

//LIDANDO COM LINKS QUE ABREM EM OUTRA ABA

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() { //AULA 7 - exercicio
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() { //AULA 7 - exercicio extra 1
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

//SIMULANDO O VIEWPORT DE UM DISPOSITIVO MOVEL
    // AULA 7 - exercicio extra 2
    // cypress open --config viewportWidht=410 viewportHeight=860 viewport mobile
    // cypress open --config viewportWidht=410 viewportHeight=860 modo headless viewport mobile

 

})
  