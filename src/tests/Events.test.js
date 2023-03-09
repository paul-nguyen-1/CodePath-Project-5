const { render, screen } = require("@testing-library/react");
import Events from '../components/Events'

const mockEvent = {
  id: 1,
  event: "Mock Event",
  date: "2022-03-10T20:00:00",
  title: "Mock Title",
  location: "Mock Location",
  venue: "Mock Venue",
  price: 25,
  url: "http://www.mockurl.com",
};

describe("Events", () => {
  test("renders event information", () => {
    render(<Events {...mockEvent} />);
    expect(screen.getByText(mockEvent.event)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.date)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.venue)).toBeInTheDocument();
    expect(screen.getByText(`$${mockEvent.price}`)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { href: mockEvent.url })
    ).toBeInTheDocument();
  });
});
