// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('ClearTelaLogin',()=>{
    // Insere dados
    cy.get('[data-test="email"]').clear()
    cy.get('[data-test="passwd"]').clear()
})

Cypress.Commands.add('LoginSucesso',(emailUsuario,senhaUsuario)=>{
    // Insere dados
    cy.get('[data-test="email"]').type(emailUsuario)
    cy.get('[data-test="passwd"]').type(senhaUsuario)

    // Clique
    cy.get('[type="submit"]').click()

    cy.VerificaMenssagemDoSistema('Bem vindo, Guilherme!')

})

Cypress.Commands.add('LogoutSucesso',()=>{
    // Clica na Engrenagem
    cy.get('.fas.fa-cog').click()

    // Clica na Opção Sair
    cy.get('[href="/logout"]').click()

    cy.VerificaMenssagemDoSistema('Até Logo!')
})

Cypress.Commands.add('VerificaMenssagemDoSistema',(mensagem)=>{
    // Verifica mensagem
    cy.get('.toast-message').should('have.text',mensagem)
    cy.get('.toast-close-button').click()
})


