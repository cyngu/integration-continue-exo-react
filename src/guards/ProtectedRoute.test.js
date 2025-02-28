import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('redirects to login if no token is present', () => {
        render(<ProtectedRoute />);

        expect(screen.getByTestId('mock-navigate')).toBeInTheDocument();
    });

    it('renders children if token is present', () => {
        localStorage.setItem('token', 'mockToken');

        render(
                <ProtectedRoute>
                    <div data-testid="protected-content">Protected Content</div>
                </ProtectedRoute>
        );

        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
});
