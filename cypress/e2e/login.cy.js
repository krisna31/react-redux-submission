/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when email is not valid
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[id="floating_email"]').should('be.visible');
    cy.get('input[id="floating_password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  
  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email is not valid', () => {
    // mengisi email
    cy.get('input[id="floating_email"]').type('testuser');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[id="floating_email"]').type('testuser@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[id="floating_email"]').type('testuser@gmail.com');

    // mengisi password
    cy.get('input[id="floating_password"]').type('123456');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[id="floating_email"]').type('testuser123987@gmail.com');

    // mengisi password
    cy.get('input[id="floating_password"]').type('password');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('logout').should('be.visible');
  });
});