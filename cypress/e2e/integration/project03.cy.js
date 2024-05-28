/// <reference types="cypress"/>
import BookingPage from "../../pages/BookingPage";

const bookYourTrip = new BookingPage();
const date = new Date();

describe("Cypress Project 03 - submission and date-picking processes", () => {
  beforeEach(() => {
    cy.visit("https://techglobal-training.com/frontend/project-3");
  });
  it("Test Case 01 - Validate the default Book your trip form", () => {
    BookingPage.getOneWayRadio().should("be.visible").and("be.checked");
    BookingPage.getRoundTripRaido().should("be.visible").and("not.be.checked");
    BookingPage.getFirstThreeDropDowns().then((firstThreeDropDowns) => {
      cy.wrap(firstThreeDropDowns).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    BookingPage.getDepartAndReturnDate().then((departAndReturnDate) => {
      cy.wrap(departAndReturnDate).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    BookingPage.getNumOfPassangers().should("be.visible").and("have.value", 1);
    BookingPage.getFirstPassanger().should("be.visible").and("have.value", "Adult (16-64)");
    BookingPage.getBookButton().should("be.visible").and("not.be.disabled");
  });

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    BookingPage.getRoundTripRaido().realClick().should("be.checked");
    BookingPage.getOneWayRadio().should("not.be.checked");
    BookingPage.getFirstThreeDropDowns().then((firstThreeDropDowns) => {
      cy.wrap(firstThreeDropDowns).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    BookingPage.getDepartAndReturnDate().then((departAndReturnDate) => {
      cy.wrap(departAndReturnDate).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    BookingPage.getNumOfPassangers().should("be.visible").and("have.value", 1);
    BookingPage.getFirstPassanger().should("be.visible").and("have.value", "Adult (16-64)");
    BookingPage.getBookButton().should("be.visible").and("not.be.disabled");
  });

  it("Test Case 03 - Validate the booking for 1 passenger and one way", () => {
    BookingPage.getOneWayRadio().check();
    BookingPage.getCabinClass().realClick().select("Business");
    BookingPage.getFromDropDown().realClick().select("Illinois");
    BookingPage.getToDropDown().realClick().select("Florida");
    BookingPage.getFromDate().realClick().clear().type(BookingPage.getNewDate("06", "04", "2024"));
    BookingPage.getNumOfPassangers().should("be.visible").and("have.value", 1);
    BookingPage.getFirstPassanger().realClick().select("Senior (65+)");
    BookingPage.getBookButton().realClick();
    BookingPage.getDepart().should("have.text", "DEPART");
    BookingPage.getDestination().should("have.text", "IL to FL");
    BookingPage.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 1", "Passenger 1: Senior (65+)", "Cabin class: Business"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  });

  it("Test Case 04 - Validate the booking for 1 passenger and round trip", () => {
    BookingPage.getRoundTripRaido().check();
    BookingPage.getCabinClass().select("First");
    BookingPage.getFromDropDown().select("California");
    BookingPage.getToDropDown().select("Illinois");
    BookingPage.getFromDate().realClick().clear().type(BookingPage.getNewDate("06", "04", "2024"));
    BookingPage.getReturnDate().realClick().clear().type(BookingPage.getNewDate("07", "04", "2024"));
    BookingPage.getBookButton().realClick();
    BookingPage.getDepart().should("be.visible");
    BookingPage.getDestination().should("have.text", "CA to ILIL to CA");
    BookingPage.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 1", "Passenger 1: Adult (16-64)", "Cabin class: First"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  });

  it("Test Case 05 - Validate the booking for 2 passengers and one way", () => {
    BookingPage.getOneWayRadio().check();
    BookingPage.getCabinClass().select("Premium Economy");
    BookingPage.getFromDropDown().select("New York");
    BookingPage.getToDropDown().select("Texas");
    BookingPage.getFromDate().clear().type(BookingPage.getNewDate("06", "28", "2024"));
    BookingPage.getNumOfPassangers().select(1, { force: true });
    BookingPage.getFirstPassanger().select("Adult (16-64)");
    BookingPage.getSecondPassanger().select("Child (2-11)");
    BookingPage.getBookButton().realClick();
    BookingPage.getDepart().should("have.text", "DEPART");
    BookingPage.getDestination().should("have.text", "NY to TX");
    BookingPage.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 2", "Passenger 1: Adult (16-64)", "Passenger 2: Child (2-11)", "Cabin class: Premium Economy"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  });
});