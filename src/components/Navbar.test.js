import {render, screen} from "@testing-library/react"
import Navbar from "./Navbar.jsx"
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "../utilities/ThemeContext.jsx";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

test("renders Navbar with correct text", () => {
  useContext.mockReturnValue({
    theme: "dark",
    toggleTheme: jest.fn(),
  });
    render(

        
          <Navbar />


    );


    expect(screen.getByText("ShoppersStop")).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument();
  });
  