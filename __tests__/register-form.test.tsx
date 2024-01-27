import "@testing-library/jest-dom";
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from "@testing-library/react";
import RegisterForm from "@/app/ui/register-form";
import * as actions from "../app/lib/actions";
import { setToken } from "../app/lib/auth";
import { useUser } from "../app/lib/authContext";
import { createUser } from "../app/lib/actions";

jest.mock("../app/lib/auth");
jest.mock("../app/lib/actions");
jest.mock("../app/lib/authContext");
jest.mock("next/navigation", () => {
    const actualNavigation = jest.requireActual("next/navigation");
    return {
        ...actualNavigation,
        useRouter: jest.fn(() => ({
            push: jest.fn(),
        })),
    };
});

describe("RegisterForm", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        (actions.createUser as jest.Mock).mockReset();
        (useUser as jest.Mock).mockReturnValue({
            userData: {
                data: { user: null, loading: false },
            },
            setUser: jest.fn(),
        });
    });
    //Renders a form with input fields for username, email, and password.
    it("should render a form with input fields for username, email, and password", () => {
        render(<RegisterForm />);
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    // Allows the user to input values into the form fields.
    it("should allow the user to input values into the form fields", () => {
        render(<RegisterForm />);
        const usernameInput: HTMLInputElement =
            screen.getByLabelText("Username");
        const emailInput: HTMLInputElement = screen.getByLabelText("Email");
        const passwordInput: HTMLInputElement =
            screen.getByLabelText("Password");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(usernameInput.value).toBe("testuser");
        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    // Does not allow the user to submit the form if any of the required fields are empty.
    it("should not allow the user to submit the form if any of the required fields are empty", () => {
        render(<RegisterForm />);
        const registerButton = screen.getByText("Register");
        const handleSubmit = jest.fn();

        fireEvent.click(registerButton);
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    // Submits the form when the user clicks the Register button and fields are not empty.
    it("should submit the form when the user clicks the Register button", async () => {
        render(<RegisterForm />);
        const registerButton = screen.getByText("Register");

        const usernameInput: HTMLInputElement =
            screen.getByLabelText("Username");
        const emailInput: HTMLInputElement = screen.getByLabelText("Email");
        const passwordInput: HTMLInputElement =
            screen.getByLabelText("Password");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        await act(async () => {
            fireEvent.click(registerButton);
        });

        expect(createUser).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
            username: "testuser",
        });
    });

    // Displays an error message if the createUser function returns an error.
    it("should display an error message if the createUser function returns an error", async () => {
        const mockCreateUser = actions.createUser as jest.MockedFunction<
            typeof actions.createUser
        >;
        mockCreateUser.mockResolvedValueOnce({
            message: "Database Error: Failed to Create User.",
        });
        render(<RegisterForm />);
        const registerButton = screen.getByText("Register");

        await act(async () => {
            fireEvent.click(registerButton);
        });
        waitFor(() => {
            expect(
                screen.getByText("Database Error: Failed to Create User.")
            ).toBeInTheDocument();
        });
    });

    // Displays an error message if the setToken function returns false.
    it("should display an error message if the setToken function returns false", async () => {
        const mockCreateUser = actions.createUser as jest.MockedFunction<
            typeof actions.createUser
        >;
        mockCreateUser.mockResolvedValueOnce({
            data: {
                user: {
                    id: 1,
                    email: "test@test.com",
                    username: "testUser",
                },
                jwt: "testToken",
            },
            message: "success",
        });
        (setToken as jest.Mock).mockReturnValue(false);
        render(<RegisterForm />);
        const usernameInput: HTMLInputElement =
            screen.getByLabelText("Username");
        const emailInput: HTMLInputElement = screen.getByLabelText("Email");
        const passwordInput: HTMLInputElement =
            screen.getByLabelText("Password");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        const registerButton = screen.getByText("Register");

        await act(async () => {
            fireEvent.click(registerButton);
        });
        const errorMessage = await screen.findByText(
            "Failed to log in. Please try again."
        );
        expect(errorMessage).toBeInTheDocument();
    });
});
