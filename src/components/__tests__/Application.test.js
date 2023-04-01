import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByText, prettyDOM, getAllByTestId, queryByText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    const monday = getByText("Monday");
    fireEvent.click(monday);
    expect(getByText("Archie Cohen")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    // 4. Change the name and interviewer.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
  
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    // 7. Wait until the element with the new name is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the same spots remaining.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });  
  
});
