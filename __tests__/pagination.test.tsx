import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/app/ui/pagination';

describe('Pagination Component', () => {
        it('should render two buttons and a span element', () => {
            // Arrange
            const pageIndex = 1;
            const pageCount = 2;
            const setPageIndex = jest.fn();
      
            // Act
            render(<Pagination pageIndex={pageIndex} pageCount={pageCount} setPageIndex={setPageIndex} />);
      
            // Assert
            expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
            expect(screen.getByText(`${pageIndex} of ${pageCount}`)).toBeInTheDocument();
          });

    it('should disable the "Previous" button when pageIndex is 1', () => {
        // Arrange
        const pageIndex = 1;
        const pageCount = 2;
        const setPageIndex = jest.fn();
  
        // Act
        render(<Pagination pageIndex={pageIndex} pageCount={pageCount} setPageIndex={setPageIndex} />);
  
        // Assert
        expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
      });

          // Clicking the 'Previous' button decrements the page index by 1
    it('should decrement the page index by 1 when the "Previous" button is clicked', () => {
        // Arrange
        const pageIndex = 2;
        const pageCount = 5;
        const setPageIndex = jest.fn();
  
        render(<Pagination pageIndex={pageIndex} pageCount={pageCount} setPageIndex={setPageIndex} />);
  
        // Act
        fireEvent.click(screen.getByText('Previous'));
  
        // Assert
        expect(setPageIndex).toHaveBeenCalledWith(pageIndex - 1);
      });

          // Clicking the 'Next' button increments the page index by 1
    it('should increment the page index by 1 when the "Next" button is clicked', () => {
        // Arrange
        const pageIndex = 2;
        const pageCount = 5;
        const setPageIndex = jest.fn();
  
        render(<Pagination pageIndex={pageIndex} pageCount={pageCount} setPageIndex={setPageIndex} />);
  
        // Act
        fireEvent.click(screen.getByText('Next'));
  
        // Assert
        expect(setPageIndex).toHaveBeenCalledWith(pageIndex + 1);
      });

          // Does not render anything when the total page count is 1
    it('should not render anything when the total page count is 1', () => {
        // Arrange
        const pageIndex = 1;
        const pageCount = 1;
        const setPageIndex = jest.fn();
  
        render(<Pagination pageIndex={pageIndex} pageCount={pageCount} setPageIndex={setPageIndex} />);
  
        // Assert
        expect(screen.queryByText(`${pageIndex} of ${pageCount}`)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
})