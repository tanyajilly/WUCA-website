import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "@/app/ui/profile";
import { User } from "@/app/lib/definitions";
import { useRouter } from 'next/navigation';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/navigation');

describe('Profile', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
      });
    // Allows the user to upload a new profile image.
    it('should allow the user to upload a new profile image', async () => {
      // Arrange
      const userData: User = {
        id: 1,
        username: 'JohnDoe',
        avatar: undefined,
        email: 'test@test.com'
      };
      const file = new File(['image'], 'profile_image.jpg', { type: 'image/jpeg' });

      // Act
      render(<Profile userData={userData} />);
      fireEvent.change(screen.getByLabelText('Select an image to upload'), { target: { files: [file] } });
      await fireEvent.click(screen.getByRole('button'));
      fetchMock.mockResponse(JSON.stringify({ message: 'success' }));

      // Assert
      expect(fetchMock).toHaveBeenCalledWith("/api/upload", expect.anything());
    });

    it('should not allow the user to upload a new profile image when no image file is selected', async () => {
        // Arrange
        const userData: User = {
          id: 1,
          username: 'JohnDoe',
          avatar: undefined,
          email: 'test@test.com'
        };
  
        // Act
        render(<Profile userData={userData} />);
        await fireEvent.click(screen.getByRole('button'));
  
        // Assert
        expect(fetchMock).not.toHaveBeenCalled();
      });

     it('should display user greeting with username and default avatar when avatar is undefined', () => {
        // Arrange
        const userData: User = {
          id: 1,
          username: 'JohnDoe',
          avatar: undefined,
          email: 'test@test.com'
        };
  
        // Act
        render(<Profile userData={userData} />);
  
        // Assert
        const welcomeElement = screen.getByRole('heading', { level: 1 });
        expect(welcomeElement).toBeInTheDocument();
        expect(welcomeElement.textContent).toMatch(`Welcome back ${userData.username}`);
        expect(screen.getByAltText('Profile')).toBeInTheDocument();
      });
   it('should display current user profile image when avatar is not set to default', () => {
        // Arrange
        const userData: User = {
          id: 1,
          username: 'JohnDoe',
          avatar: 'custom_avatar',
          email: 'test@test.com'
        };
  
        // Act
        render(<Profile userData={userData} />);
  
        // Assert
        expect(screen.getByAltText('JohnDoe')).toBeInTheDocument();
      });
});
