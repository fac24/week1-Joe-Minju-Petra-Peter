it("can find webpage", () => {
  cy.visit("/");
});

it("checking if there is a label for name area", () => {
  cy.get("label[for='name']");
});

it("if user is able to type name in text area, check that there is a text area", () => {
  cy.get("input[name='name']").type("text");
});

it("can add post", () => {
  cy.get("#post-message").find("input[name='name']").type("new name");
  cy.get("#post-message").find('textarea[name="text"]').type("new message");
  cy.get("#post-message").submit();
  cy.contains("new name");
  cy.contains("new message");
});

it("can delete post", () => {
  cy.get("#post-message").find("input[name='name']").type("unique user");
  cy.get("#post-message").find('textarea[name="text"]').type("unique message");
  cy.get("#post-message").submit();
  cy.get(".username").contains("unique user").parent().find("button").click();
  // check if the unique element is deleted
  cy.get("div").should("not.contain", "unique user");
});

it("Checking if it shows a threaded message", () => {
  cy.get("#post-message").find("input[name='name']").type("threaded user");
  cy.get("#post-message")
    .find('textarea[name="text"]')
    .type("threaded message");
  cy.get("#post-message").submit();
  cy.get("div").should("contain", "threaded user");
  cy.get("div").should("contain", "threaded message");
  //cy.get("#message-input").should("contain", "threaded message");
});
