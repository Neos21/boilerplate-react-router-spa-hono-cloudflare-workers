// @vitest-environment jsdom

// Example : TSX に対するユニットテストの記述サンプル

import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import Index from './index';

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(cleanup);

describe('Index', () => {
  it('パスワードを入力するとログインボタンを有効化する', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );
    
    const passwordInput = screen.getByPlaceholderText('パスワード');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
    
    await user.type(passwordInput, 'example-password');
    
    expect(passwordInput).toHaveValue('example-password');
    expect(loginButton).toBeEnabled();
  });
});
