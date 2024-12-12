import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect } from "vitest";
import Booking from "../views/Booking";


describe("Booking view", () => {

    let dateField
    let timeField
    let peopleField
    let lanesField
    let bookingBtn
    let shoeBtn

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        )
        dateField = screen.getByLabelText("Date");
        timeField = screen.getByLabelText("Time");
        peopleField = screen.getByLabelText("Number of awesome bowlers");
        lanesField = screen.getByLabelText("Number of lanes");
        bookingBtn = screen.getByText("+");
        shoeBtn = screen.getByText("strIIIIIike!");
    });

    it("should complete a booking when you put correct inputs", async () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(peopleField, {target: {value: "1"}});
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeField[0],{target: {value: "43"}});
        fireEvent.click(bookingBtn);
        await waitFor(() => {
            const bookingInStorage = JSON.parse(sessionStorage.getItem("confirmation"));
            expect(bookingInStorage).toBeTruthy();
        });
    });

    //ifall man inte fyller i något av fälten
    it("should show an error when you try to book without filling in anything", () => {
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
    });

    //några ifall man hoppar över ett fält
    it("should show an error when you skip some field", async () => {
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(peopleField, {target: {value: "1"}});
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeField[0],{target: {value: "43"}});
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
    });

    it("should show an error when you skip some field", async () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(peopleField, {target: {value: "1"}});
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeField[0],{target: {value: "43"}});
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
    });

    it("should show an error when you skip some field", async () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeField[0],{target: {value: "43"}});
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
    });

    it("should show an error when you skip some field", async () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(peopleField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeField[0],{target: {value: "43"}});
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
    });

    //ifall det inte finns tillräckligt med banor
    it("should show an error when there aren't enough lanes", () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(peopleField, {target: {value: "5"}})
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        shoeSizeField.forEach(field => {
            fireEvent(field, {target: {value: "44"}});
        });
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Det får max vara 4 spelare per bana")).toBeInTheDocument();
    })

    //ifall man inte angett skostorlek för bokade skor
    it("should show an error when you skip putting your shoe size", () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(peopleField, {target: {value: "1"}});
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Alla skor måste vara ifyllda")).toBeInTheDocument();
    })

    //ifall det finns fler bokade skor än personer
    it("should show an error when you try to book more shoes than there are people", async () => {
        fireEvent.change(dateField, {target: {value: "2025-01-01"}});
        fireEvent.change(timeField, {target: {value: "00:01"}});
        fireEvent.change(peopleField, {target: {value: "1"}});
        fireEvent.change(lanesField, {target: {value: "1"}});
        fireEvent.click(shoeBtn);
        fireEvent.click(shoeBtn);
        const shoeSizeField = screen.getAllByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeField[0], {target: {value: "43"}});
        fireEvent.change(shoeSizeField[1], {target: {value: "44"}});
        fireEvent.click(bookingBtn);
        expect(screen.getByText("Antalet skor måste stämma överens med antal spelare")).toBeInTheDocument();
    });

});
