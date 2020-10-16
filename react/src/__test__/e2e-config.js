import puppeteer from 'puppeteer';

global.XMLHttpRequest = undefined;

export const HOME_URL = 'http://localhost:3000/bwmon/';
export const TIMEOUT = 30000;

export const delay = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

export const materialSelect = async (page, newSelectedValue, cssSelector) => {
    await page.evaluate(
        (newSelectedValue, cssSelector) => {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            var selectNode = document.querySelector(cssSelector);
            selectNode.dispatchEvent(clickEvent);
            [...document.querySelectorAll('li')].filter((el) => el.innerText === newSelectedValue)[0].click();
        },
        newSelectedValue,
        cssSelector
    );
};

export const launch = () =>
    puppeteer.launch({
        headless: true,
    });

/*
export const launch = () =>
    puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
        slowMo: 250,
    });
*/
