import { act } from 'react-test-renderer';

const wait = async (delay) =>
    act(
        () =>
            new Promise((resolve) => {
                setTimeout(resolve, delay);
            })
    );

export default wait;
