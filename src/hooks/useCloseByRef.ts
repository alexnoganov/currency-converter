import {RefObject, useEffect} from 'react';

function UseCloseByRef(ref: RefObject<HTMLElement>, cb: () => void, deps: [] = []) {
    useEffect(() => {
        const handleOpened = (e: MouseEvent) => {
            const event = e as MouseEvent & { path: Node[] };
            if (ref.current && !event.path.includes(ref.current)) {
                cb();
            }
        };
        document.body.addEventListener('click', handleOpened);
        return () => {
            document.body.removeEventListener('click', handleOpened);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export default UseCloseByRef;