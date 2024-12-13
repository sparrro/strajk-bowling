import { MemoryRouter } from "react-router-dom";
import Confirmation from "../views/Confirmation";
import { render, screen } from "@testing-library/react";

describe("Confirmation view", () => {

    it("should show a message when you navigate to the confirmation page without having made a booking", () => {
        sessionStorage.clear();
        render(
            <MemoryRouter>
                <Confirmation />
            </MemoryRouter>
        );
        expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
    });

    it("should show you the booking details (id, price, number of lanes, number of people) when you navigate to the confirmation page having made a booking", () => {
        const mockBooking = {
            when: "2024-12-14T19:00",
            lanes: "1",
            people: "4",
            shoes: ["43","44","40","43"],
            price: 580,
            id: "STR9661EFDF",
            active:true
        }
        sessionStorage.setItem("confirmation", JSON.stringify(mockBooking));
        render(
            <MemoryRouter>
                <Confirmation />
            </MemoryRouter>
        );
        expect(screen.getByLabelText("When")).toHaveValue("2024-12-14 19:00");
        expect(screen.getByLabelText("Who")).toHaveValue("4");
        expect(screen.getByLabelText("Lanes")).toHaveValue("1");
        expect(screen.getByLabelText("Booking number")).toHaveValue("STR9661EFDF");
        expect(screen.getByText("580 sek")).toBeInTheDocument();

    });

});