import { describe, it, expect, vi } from 'vitest';
import { debounce } from '../utils/debounce';

describe('debounce', () => {
  vi.useFakeTimers();

  it('should delay the execution of the function', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalled();
  });

  it('should call the function with the correct arguments', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('arg1', 'arg2');
    vi.advanceTimersByTime(1000);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset the timer if called again within the delay period', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    vi.advanceTimersByTime(500);
    debouncedFunc();
    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalled();
  });
});
