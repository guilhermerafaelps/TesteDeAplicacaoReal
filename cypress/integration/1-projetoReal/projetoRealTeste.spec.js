/// <reference types="cypress"/>
describe('Aplicação Real',()=>{
    before(()=>{
        cy.visit('https://barrigareact.wcaquino.me')

        //Importando dados da Fixture
        cy.fixture('example').then(function(dado){
            this.dado=dado
        })
    })

    describe("#01 - Métodos de Login/Logout",()=>{

        it('#00 - Login sem informar dados',function(){
            // Clique
            cy.get('[type="submit"]').click()
    
            // Verifica mensagem
            cy.get('.toast-message').should('have.text','Bem vindo, !')
            cy.get('.toast-close-button').click()
        })

        it('#01 - Login apenas com e-mail',function(){

            // Insere dados
            cy.get('[data-test="email"]').type(this.dado.email)

            // Clique
            cy.get('[type="submit"]').click()
    
            // Verifica mensagem
            cy.get('.toast-message').should('have.text','Erro: Error: Request failed with status code 401')
            cy.get('.toast-close-button').click()

            // Limpa Campos
            cy.ClearTelaLogin()
        })

        it('#02 - Login apenas com senha',function(){

            // Insere dados
            cy.get('[data-test="passwd"]').type(this.dado.senha)

            // Clique
            cy.get('[type="submit"]').click()
    
            // Verifica mensagem
            cy.get('.toast-message').should('have.text','Erro: Error: Request failed with status code 401')
            cy.get('.toast-close-button').click()

            // Limpa Campos
            cy.ClearTelaLogin()
        })

        it('#03 - Login com sucesso',function(){
    
            // Insere dados
            cy.get('[data-test="email"]').type(this.dado.email)
            cy.get('[data-test="passwd"]').type(this.dado.senha)
    
            // Clique
            cy.get('[type="submit"]').click()
    
            // Verifica mensagem
            cy.get('.toast-message').should('have.text','Bem vindo, Guilherme!')
            cy.get('.toast-close-button').click()
        })
    
        it('#04 - Logout com sucesso',function(){
    
            // Clica na Engrenagem
            cy.get('.fas.fa-cog').click()
    
            // Clica na Opção Sair
            cy.get('[href="/logout"]').click()
    
            // Verifica mensagem (REAL)
            cy.get('.toast-message').should('have.text','Até Logo!')
            cy.get('.toast-close-button').click()
            
            // Verifica
            // cy.get('.toast-message').should('have.text','Até Logo!Bem vindo, Guilherme!')
        })
    })  
})
