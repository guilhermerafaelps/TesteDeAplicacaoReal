/// <reference types="cypress"/>
describe('Aplicação Real',()=>{
    before(()=>{
        cy.visit('https://barrigareact.wcaquino.me')

        //Importando dados da Fixture
        cy.fixture('usuarios').then(function(dado){
            this.dado=dado
        })
    })

    describe("#01 - Login/Logout",()=>{

        it('#01 - Login sem informar dados',function(){
            // Clique
            cy.get('[type="submit"]').click()

            cy.VerificaMenssagemDoSistema('Bem vindo, !')
        })

        it('#02 - Login apenas com e-mail',function(){

            // Insere dados
            cy.get('[data-test="email"]').type(this.dado.email)

            // Clique
            cy.get('[type="submit"]').click()

            // Verifica a mensagem
            cy.VerificaMenssagemDoSistema('Erro: Error: Request failed with status code 401')

            // Limpa Campos
            cy.ClearTelaLogin()
        })

        it('#03 - Login apenas com senha',function(){

            // Insere dados
            cy.get('[data-test="passwd"]').type(this.dado.senha)

            // Clique
            cy.get('[type="submit"]').click()

            // Verifica a mensagem
            cy.VerificaMenssagemDoSistema('Erro: Error: Request failed with status code 401')

            // Limpa Campos
            cy.ClearTelaLogin()
        })

        it('#04 - Login com sucesso',function(){
            cy.LoginSucesso(this.dado.email,this.dado.senha)
        })
    
        it('#05 - Logout com sucesso',function(){
            cy.LogoutSucesso()
        })
    })  

    describe.only("#02 - Gerenciar Contas",()=>{
        let contasDisponiveis
        before(function(){
            cy.LoginSucesso(this.dado.email,this.dado.senha)

            // cy.fixture('contas').then(function(contas){
            //     contasDisponiveis=contas
            // })
        })

        it('#01 - Inserir uma conta',()=>{
            // Engrenagem
            cy.get('.fas.fa-cog').click()
            // Contas
            cy.get('[href="/contas"]').click()

            // Insere a conta e salva
            cy.get('[class="form-control"]').type('Conta da TIM')
            cy.get('[class="btn btn-primary btn-block"]').click()

            // Verifica a mensagem do toast
            cy.VerificaMenssagemDoSistema('Conta inserida com sucesso!')

            cy.get('.table>tbody :nth-child(1) > td').should('have.text','Conta da TIM | ')
        })

        it('#02 - Inserir conta repetida',()=>{
            // Engrenagem
            cy.get('.fas.fa-cog').click()
            // Contas
            cy.get('[href="/contas"]').click()

            // Insere a conta e salva
            cy.get('[class="form-control"]').type('Conta da TIM')
            cy.get('[class="btn btn-primary btn-block"]').click()

            // Verifica a mensagem
            cy.VerificaMenssagemDoSistema('Erro: Error: Request failed with status code 400')

        })

        // it.only('#03 - Inserir várias contas',function(){
        //     // Engrenagem
        //     cy.get('.fas.fa-cog').click()
        //     // Contas
        //     cy.get('[href="/contas"]').click()

        //     // Insere a conta e salva

        //     // // Verifica a mensagem
        //     // cy.VerificaMenssagemDoSistema('Erro: Error: Request failed with status code 400')

        // })

    })  

})
