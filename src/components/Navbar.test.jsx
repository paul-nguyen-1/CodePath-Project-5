const { render, screen } = require("@testing-library/react");
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders Navbar component", () => {
    const handleSearchClick = jest.fn();
    const searchFilter = true;
    const navbar = false;
    const setNavbar = jest.fn();
    const searchTitle = jest.fn();

    render(
      <Navbar
        handleSearchClick={handleSearchClick}
        searchFilter={searchFilter}
        navbar={navbar}
        setNavbar={setNavbar}
        searchTitle={searchTitle}
      />
    );

    const navbarElement = screen.getByRole("navigation");
    const logoElement = screen.getByText("NeetSeat 🎟");
    const searchInput = screen.getByPlaceholderText("Search for Events");
    const searchButton = screen.getByText("🔍 Search");
    const aboutButton = screen.getByText("ℹ️ About");
    const contactButton = screen.getByText("🏠 Contact");

    expect(navbarElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });
});

