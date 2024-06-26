import { useKeyPress } from '.';
import { test, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

test('useKeyPress', () => {
  it('Should update the keyPressed state when esc key is pressed', () => {
    const { result } = renderHook(() => useKeyPress());
    expect(result.current.keyPressed).toBe('');

    act(() => {
      const keyboardEvent = new KeyboardEvent('keydown', { key: 'esc' });
      document.dispatchEvent(keyboardEvent);
    });
    expect(result.current.keyPressed).toBe('esc');
  });

  it('Should remove the event listener when the component unmounts', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useKeyPress());
    expect(removeEventListenerSpy).not.toHaveBeenCalled();
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
