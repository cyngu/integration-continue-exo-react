import React from 'react';

module.exports = {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children }) => <a>{children}</a>,
    useNavigate: () => jest.fn(),
    Navigate: ({ to }) => <div data-testid="mock-navigate" data-to={to} />,
};