// adapted from https://gist.github.com/blacksmoke26/af6c1b4c13cc99740285ab198d37fda4

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26
 * @since 2020-08-05
 */

// LocalForage: https://github.com/localForage/localForage

import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { equals } from 'ramda';

/**
 * React custom hook to save/restore value from localStorage using localforage library
 * @example
 * ```js
 * function App() {
 *  const [value, set, remove] = useLocalForge('my-key', {});
 * }
 * ```
 * @param {string} key - Unique storage key
 * @param {*} initialValue=null - Initial value
 * @returns {[any, (function(any): void), (function(): void)]}
 */
export default function useLocalForage(key, initialValue = null) {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const value = await localforage.getItem(key);
                const localForageValue = JSON.parse(value);
                // we have to test for equality deeply to handle objects.
                // react always treats objects as new and this would otherwise force rerenders we dont need.
                if (!equals(localForageValue, storedValue)) {
                    setStoredValue(localForageValue);
                }
                setLoaded(true);
            } catch (err) {
                throw err;
            }
        })();
    }, [key]);

    /** Set value */
    const set = useCallback(
        (value) => {
            (async function () {
                try {
                    await localforage.setItem(key, JSON.stringify(value));
                    setStoredValue(value);
                } catch (err) {
                    throw err;
                }
            })();
        },
        [key]
    );

    /** Removes value from local storage */
    const remove = useCallback(() => {
        (async function () {
            try {
                await localforage.removeItem(key);
                setStoredValue(null);
            } catch (err) {
                throw err;
            }
        })();
    }, [key]);

    return [storedValue, set, remove, loaded];
}
