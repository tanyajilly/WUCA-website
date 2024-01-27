import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from '@/app/ui/nav';
import { useUser } from '../app/lib/authContext';
import { useRouter } from 'next/navigation';
import { unsetToken } from '../app/lib/auth';

jest.mock('next/navigation');
jest.mock('../app/lib/authContext');
jest.mock('../app/lib/auth', () => ({
    unsetToken: jest.fn()
}));

describe('Nav', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });
    it('should have a home link that navigates to the correct path', () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: null, loading: false },
            setUser: jest.fn()
        });

        render(<Nav />);

        const homeLink = screen.getByText('Home').closest('a');
        expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders profile and logout link when user is logged in', () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: 'TestUser', loading: false },
            setUser: jest.fn()
        });
        render(<Nav />);
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('renders login and register links when no user is logged in', () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: null, loading: false },
            setUser: jest.fn()
        });
        render(<Nav />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('updates component state when input fields are changed', async () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: null, loading: false },
            setUser: jest.fn()
        });
        render(<Nav />);
        const usernameInput: HTMLInputElement = screen.getByPlaceholderText('Username');
        const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Password');

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'test1234');

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('test1234');
    })

    it('updates page after user has logged in', async () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: null, loading: false },
            setUser: jest.fn()
        });

        render(<Nav />);

        userEvent.type(screen.getByPlaceholderText('Username'), 'correctUsername');
        userEvent.type(screen.getByPlaceholderText('Password'), 'correctPassword');

        userEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(useRouter).toHaveBeenCalled();
        })
    })

    it('triggers logout functionality correctly', async () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: 'TestUser', loading: false },
            setUser: jest.fn()
        });
        const mockUnsetToken = unsetToken as jest.MockedFunction<typeof unsetToken>;
        mockUnsetToken.mockReturnValue(true);
        const mockRouter = {
            replace: jest.fn(),
            refresh: jest.fn()
        };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        render(<Nav />);

        const logoutButton = screen.getByText('Logout');
        await userEvent.click(logoutButton);

        expect(useUser().setUser).toHaveBeenCalledWith({ user: null, loading: false });
    })

    it('should not trigger action when form is submitted with empty fields', async () => {
        (useUser as jest.Mock).mockReturnValue({
            userData: { user: null, loading: false },
            setUser: jest.fn()
        });

        render(<Nav />);

        await userEvent.click(screen.getByText('Login'));

        expect(useUser().setUser).not.toHaveBeenCalled();
    })
})