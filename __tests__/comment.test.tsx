import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Comment from '@/app/ui/comment';

const mockComment = {
  text: "Amazing! Well done!",
  updatedAt: "2024-01-15T12:05:18.029Z",
  author: "Tanya"
}

describe('Comment', () => {

  it('renders a heading', () => {
    render(<Comment comment={mockComment} />);
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
  });

  it('renders author name in heading', () => {
    render(<Comment comment={mockComment} />);
    const nameRegExp = new RegExp(`${mockComment.author}.*`, 'i');
    const heading = screen.getByRole('heading', { name: nameRegExp })
    expect(heading).toBeInTheDocument()
  })
  
})
