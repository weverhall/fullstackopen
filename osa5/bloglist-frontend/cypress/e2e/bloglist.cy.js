describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const testUser = {
      name: 'Everhall',
      username: 'weverhall',
      password: 'hunter2'
    }

    cy.request('POST', 'http://localhost:3000/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('blogs application login')
  })

  describe('login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('weverhall')
      cy.get('#password').type('hunter2')
      cy.get('#login').click()
      cy.contains('logged in as Everhall')
    })

    it('fails with invalid credentials', function() {
      cy.get('#username').type('weverhall')
      cy.get('#password').type('hunter0')
      cy.get('#login').click()
      cy.get('.error')
        .should('contain', 'invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'logged in as Everhall')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'weverhall', password: 'hunter2' })

      cy.contains('create new blog').click()
      cy.get('#title').type('Bodacious Blog')
      cy.get('#author').type('Norm Macdonald')
      cy.get('#url').type('https://www.typescriptlang.org/')
      cy.get('.create').click()
    })

    it('blog can be created', function() {
      cy.contains('Bodacious Blog')
      cy.contains('Norm Macdonald')
      cy.get('.view').click()
      cy.contains('https://www.typescriptlang.org/')
    })

    it('blog can be liked', function() {
      cy.get('.view').click()
      cy.contains(0)
      cy.get('#like').click()
      cy.contains(1)
      cy.get('#like').click()
      cy.contains(2)
    })

    it('blog can be removed by its creator', function() {
      cy.get('.view').click()
      cy.get('#remove').click()
      cy.get('html').should('not.contain', 'Bodacious Blog')
    })

    it('only creator of blog can see its delete button', function() {
      cy.logout()

      const testUser2 = {
        name: 'Evertwo',
        username: 'wevertwo',
        password: 'hunter3'
      }

      cy.request('POST', 'http://localhost:3000/api/users/', testUser2)
      cy.login({ username: 'wevertwo', password: 'hunter3' })

      cy.contains('logged in as Evertwo')
      cy.contains('Bodacious Blog')
      cy.get('.view').click()
      cy.contains('Everhall')
      cy.contains('remove').should('not.exist')
    })
  })

  it('blogs are arranged by likes', function() {
    cy.login({ username: 'weverhall', password: 'hunter2' })

    cy.createBlog({
      title: 'sevenLikes',
      author: 'sevenLikes',
      url: 'sevenLikes',
      likes: 7
    })
    cy.createBlog({
      title: 'leastLikes',
      author: 'leastLikes',
      url: 'leastLikes',
      likes: 2
    })
    cy.createBlog({
      title: 'mostLikes',
      author: 'mostLikes',
      url: 'mostLikes',
      likes: 100
    })

    cy.get('.blog')
      .then(blogs => {
        cy.wrap(blogs[0]).contains('mostLikes')
        cy.wrap(blogs[1]).contains('sevenLikes')
        cy.wrap(blogs[2]).contains('leastLikes')
      })
  })
})