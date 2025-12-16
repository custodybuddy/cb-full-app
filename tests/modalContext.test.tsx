// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ModalProvider } from '@/contexts/ModalContext';
import { useModal } from '@/hooks/useModal';

const ModalConsumer = () => {
    const { activeModal, openModal, closeModal } = useModal();
    return (
        <div>
            <div data-testid="active">{activeModal ?? 'none'}</div>
            <button onClick={() => openModal('case-analysis')} data-testid="open">
                open
            </button>
            <button onClick={closeModal} data-testid="close">
                close
            </button>
        </div>
    );
};

describe('ModalProvider', () => {
    it('opens and closes modals', () => {
        render(
            <ModalProvider>
                <ModalConsumer />
            </ModalProvider>
        );

        expect(screen.getByTestId('active').textContent).toBe('none');
        fireEvent.click(screen.getByTestId('open'));
        expect(screen.getByTestId('active').textContent).toBe('case-analysis');
        fireEvent.click(screen.getByTestId('close'));
        expect(screen.getByTestId('active').textContent).toBe('none');
    });
});
