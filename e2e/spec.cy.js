describe('My First Test', () => {
  it('Checks if BTCUSD 5 days performance rate change was positive', () => {

    const getIframeDocument = (iframeName) => {
      return cy
      .get('iframe[id="' + iframeName +'"]')
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its('0.contentDocument').should('exist')
    }
    
    const getIframeBody = (iframeName) => {
      // get the document
      return getIframeDocument(iframeName)
      // automatically retries until body is loaded
      .its('body').should('not.be.undefined')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
    }
    
    cy.visit('https://www.marketwatch.com/')

    getIframeBody('sp_message_iframe_719544').find('.sp_choice_type_11').click()

    cy.get('button.j-btn-search').click()
    
    cy.get('input#mw-search').type('BTCUSD', {delay: 0})

    cy.get('a.j-result-link', {timeout: 7000}).first().click()

    cy.get('table.c2 .value').first().invoke('text').then(parseFloat).should('be.gt', 0)

  })
})