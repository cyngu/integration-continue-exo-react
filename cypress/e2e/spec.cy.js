describe("Home page spec", () => {
    it("deployed react app to localhost", () => {
        cy.visit("http://localhost:8080");
        cy.contains("Formulaire d'utilisateur");
    });
});