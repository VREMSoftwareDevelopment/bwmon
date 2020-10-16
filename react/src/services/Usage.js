import Data from './Data';

const process = (response) =>
    response
        .replace(/[\r]/g, '')
        .split('\n')
        .map((line, index) => {
            const elements = line.replace(/[\n]/g, '').split(',');
            return elements.length < 8
                ? null
                : new Data(index, elements[0], elements[1], elements[2], elements[3], elements[4], elements[5], elements[6], elements[7]);
        })
        .filter((line) => line !== null);

class Usage {
    request = async (basepath) => {
        const filename = basepath + '/usage.db';
        try {
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(response.status + ' ' + response.statusText);
            }
            const result = await response.text();
            return process(result);
        } catch (e) {
            throw new Error('Error! Can NOT load file: ' + filename + ' | ' + e.message);
        }
    };
}

const usage = new Usage();
export default usage;
