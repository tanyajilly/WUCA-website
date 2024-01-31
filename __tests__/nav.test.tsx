import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Nav from '@/app/ui/nav';


describe('Nav', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });
    it('should have a home link that navigates to the correct path', () => {
        render(<Nav />);

        const homeLink = screen.getByText('Home').closest('a');
        expect(homeLink).toHaveAttribute('href', '/');
    })
})