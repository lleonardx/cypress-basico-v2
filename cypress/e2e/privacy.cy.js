Cypress._.times(5, function(){ // AULA 11 - exercicio utilizando Iodash funcionalidade times
    it('testa a pagina da politica de privacidade de forma independente', function() {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})