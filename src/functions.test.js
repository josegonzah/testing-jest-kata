import { createEvent } from './functions'
beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-06T8:00:00Z').getTime());
})
const weekday = "mon";
const week = 1;
const openHour = 8;
const closeHour = 14;
test('Validation a event title and content basic', () => {

    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring abd Paractice");
    expect(result.duration).toBe([6, 'hour']);
});

test('Validation start date', () => {
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.start.toDateString()).toBe("Mon Dec 06 2021");
});

test('Validation date', () => {
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.date).toBe("lunes, 6 de diciembre de 2021");
});


test('Validation illegal arguments', () => {
    const result = () => {createEvent(weekday, week, closeHour, openHour)};
    expect(result).toThrow(Error);
    const resultWeek = () => {createEvent(weekday, -1, closeHour, openHour)};
    expect(resultWeek).toThrow(Error);
    const resultDay = () => {createEvent("monda", week, closeHour, openHour)};
    expect(result).toThrow(Error);
});


test('create an event list of at least 10 events', () => {
    const tenEvents = [
    {
        weekday: 'mon',
        week: 1,
        openHour:8,
        closeHour: 12
    },

    {
        weekday: 'tue',
        week: 2,
        openHour:8,
        closeHour: 10
    },

    {
        weekday: 'wed',
        week: 3,
        openHour:8,
        closeHour: 13
    },

    {
        weekday: 'thu',
        week: 1,
        openHour:6,
        closeHour: 12
    },

    {
        weekday: 'fri',
        week: 1,
        openHour:6,
        closeHour: 10
    },

    {
        weekday: 'sat',
        week: 2,
        openHour:6,
        closeHour: 8
    },

    {
        weekday: 'mon',
        week: 2,
        openHour:8,
        closeHour: 9
    },

    {
        weekday: 'thu',
        week: 4,
        openHour:8,
        closeHour: 16
    },

    {
        weekday: 'sat',
        week: 10,
        openHour:8,
        closeHour: 10
    },

    {
        weekday: 'fri',
        week: 11,
        openHour:7,
        closeHour: 10
    },
    ]

    tenEvents.map(events => {
        const duration = [events.closeHour - events.openHour, "hour"]

        const result = createEvent(events.weekday, events.week, events.openHour, events.closeHour)

        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })
});