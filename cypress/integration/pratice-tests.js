it('can find webpage',()=>{
    cy.visit('/')
})

it('can add post',()=>{
    cy.get('#post-message').find("input[name='name']").type('new name')
    cy.get('#post-message').find('textarea[name="text"]').type('new message')
    cy.get('#post-message').submit()
    cy.contains('new name')
    cy.contains('new message')
})

it('can delete post',()=>{
    cy.get('#post-message').find("input[name='name']").type('unique user')
    cy.get('#post-message').find('textarea[name="text"]').type('unique message')
    cy.get('#post-message').submit()
    cy.get('.username').contains('unique user').parent().find('button').click()
    // check if the unique element is deleted
    cy.get('div').should('not.contain','unique user')
})   