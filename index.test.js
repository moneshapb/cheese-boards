const {sequelize} = require('./db');
const User = require('./User');
const Cheese = require('./Cheese');
const Board = require('./Board');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    await User.destroy({ where: {} });
    await Cheese.destroy({ where: {} });
    await Board.destroy({ where: {} });
});

afterEach(async () => {
    await User.destroy({ where: {} });
    await Cheese.destroy({ where: {} });
    await Board.destroy({ where: {} });
});

afterAll(async () => {
    await sequelize.close();
});



describe('can create a user', () => {
    test('can create a user', async () => {
        const user = await User.create({
            name: 'monesha',
            email: 'monesha.phillipsbrown@barclays.com',
        });
        expect(user.name).toBe('monesha');
        expect(user.email).toBe('monesha.phillipsbrown@barclays.com');
    });
});

describe('can create a cheese', () => {

    test('can create a cheese', async () => {
        const cheese = await Cheese.create({
            title: 'Cheddar',
            description: 'Aged',
        });
        expect(cheese.title).toBe('Cheddar');
    });
});

describe('can create a board', () => {
    test('can create a board', async () => {
        const board = await Board.create({
            type: 'Hard',
            description: 'Aged',
            rating: 5,
        });
        expect(board.type).toBe('Hard');
    });
});

// part 2 