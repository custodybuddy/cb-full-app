import { describe, it, expect } from 'vitest';
import { routes } from '@/routes';

describe('routing configuration', () => {
    it('all routes use absolute paths', () => {
        routes.forEach(route => {
            expect(route.path.startsWith('/')).toBe(true);
        });
    });

    it('header/footer flags are booleans', () => {
        routes.forEach(route => {
            expect(typeof route.inHeader).toBe('boolean');
            expect(typeof route.inFooter).toBe('boolean');
        });
    });
});
