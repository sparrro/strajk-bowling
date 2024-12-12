import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Booking from "../views/Booking";
import Confirmation from "../views/Confirmation";


describe("Navigation component", () => {
    it("should navigate to the Confirmation page when you click the cofirmation button", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </MemoryRouter>
        );
        const navigateButton = screen.getAllByRole("navigation");
        fireEvent.click(navigateButton[0]);
        const confirmationLink = screen.getAllByText("confirmation")[0];
        fireEvent.click(confirmationLink);
        expect(screen.getByText("See you soon!")).toBeInTheDocument();
    });
    it("should navigate to the Booking page when you click the booking button", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </MemoryRouter>
        );
        const navigateButton = screen.getAllByRole("navigation");
        fireEvent.click(navigateButton[0]);
        const bookingLink = screen.getAllByText("booking")[0];
        fireEvent.click(bookingLink);
        expect(screen.getByText("When, WHAT & Who")).toBeInTheDocument();
    });
})