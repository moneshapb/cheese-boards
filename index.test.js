const { sequelize } = require("./db");
const { Board, Cheese, User } = require("./index");
const { seedBoard, seedCheese, seedUser } = require("./SeedData");

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
            title: 'cheddar',
            description: 'Aged',
        });
        expect(cheese.title).toBe('cheddar');
        expect(cheese.description).toBe('Aged');
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



describe("Board and User Models Association", () => {
    test("If a User can have many Boards", async () => {
      // create Musicians and bands
      //Populate the DB with a user and some musicians
      let user1 = await User.create(seedUser[2]);
      let board2 = await Board.create(seedBoard[1]);
      let board3 = await Board.create(seedBoard[2]);
      // create some associations - put musicians in bands
      await user1.addBoard(board2);
      await user1.addBoard(board3);

      // test the association
      const user1boards = await user1.getBoards();
      expect(user1boards.length).toBe(2);
      expect(user1boards[0] instanceof Board).toBeTruthy;
      expect(user1boards[0].type).toBe("Blue");
      expect(user1boards[0].description).toBe("Brie, Camembert, Gorgonzola");
      expect(user1boards[0].rating).toBe(3);
      expect(user1boards[1] instanceof Board).toBeTruthy;
      expect(user1boards[1].type).toBe("Firm");
      expect(user1boards[1].description).toBe("Cheddar, Swiss, Parmesan");
      expect(user1boards[1].rating).toBe(2);
  });
});
  //Many to Many
  describe("Board and Cheese Models Association", () => {
    test(" a Board can have many Cheeses and a Cheese can be in many Boards", async () => {
      //Populate the DB with a board and some cheeses
        let board1 = await Board.create(seedBoard[2]);
      let board2 = await Board.create(seedBoard[3]);
      let cheese1 = await Cheese.create(seedCheese[5]);
      let cheese2 = await Cheese.create(seedCheese[6]);
      let cheese3 = await Cheese.create(seedCheese[7]);
      let cheese4 = await Cheese.create(seedCheese[8]);

      // create some associations - create a board with cheeses
      await board1.addCheeses([cheese1, cheese2, cheese3]);
      await board2.addCheeses([cheese1, cheese3, cheese4]);
      // create some associations - put cheeses in boards
      await cheese1.addBoards([board1, board2]);
      await cheese3.addBoards([board1, board2]);
      // test the association
      const board1Cheeses = await board1.getCheeses();
      expect(board1Cheeses.length).toBe(3);
      expect(board1Cheeses[0] instanceof Cheese).toBeTruthy;
      expect(board1Cheeses[0]).toHaveProperty("title", "Feta")
      const board2Cheeses = await board2.getCheeses();
      expect(board2Cheeses.length).toBe(3);
      expect(board2Cheeses[0] instanceof Cheese).toBeTruthy;
      expect(board2Cheeses[1]).toHaveProperty("description", "Aged")

      const cheese1Boards = await cheese1.getBoards();
      expect(cheese1Boards.length).toBe(2);
      expect(cheese1Boards[0] instanceof Board).toBeTruthy;
      expect(cheese1Boards[0]).toHaveProperty("type", "Firm");
      const cheese2Boards = await cheese2.getBoards();
      expect(cheese2Boards.length).toBe(1);
      expect(cheese2Boards[0] instanceof Board).toBeTruthy;
      expect(cheese2Boards[0]).toHaveProperty(
        "description",
        "Cheddar, Swiss, Parmesan"
      );
    });
  });

  // part 3  eager loading

    describe("Eager Loading", () => {
        test ("eager loading", async () => {

           
      let board1 = await Board.create(seedBoard[2]);
      let board2 = await Board.create(seedBoard[3]);
      let board3 = await Board.create(seedBoard[0]);
      let board4 = await Board.create(seedBoard[1]);
      let cheese1 = await Cheese.create(seedCheese[5]);
      let cheese2 = await Cheese.create(seedCheese[6]);
      let cheese3 = await Cheese.create(seedCheese[7]);
      let cheese4 = await Cheese.create(seedCheese[8]);
      let user1 = await User.create(seedUser[1]);
      let user2 = await User.create(seedUser[2]);

      // create some associations - create boards with cheeses
      await board1.addCheeses([cheese1, cheese2, cheese3]);
      await board2.addCheeses([cheese1, cheese3, cheese4]);
      // create some associations - put cheeses in boards
      await cheese1.addBoards([board1, board2]);
      await cheese2.addBoards([board1]);
      await cheese3.addBoards([board1, board2]);
      await cheese4.addBoards([board2]);
      // create some associations - put Boards in Users
      await user1.addBoard(board1);
      await user1.addBoard(board2);
      await user2.addBoard(board3);
      await user2.addBoard(board4);

      //test eager loading - A user can be loaded with its boards
      const users = await User.findAll({ include: Board });
        expect(users.length).toBe(2);
        expect(users[0].boards.length).toBe(2);
        expect(users[1].boards.length).toBe(2);
    
        //test eager loading - A board can be loaded with its cheeses])
 
        const boards = await Board.findAll({ include: Cheese });
        expect(boards.length).toBe(4);
        expect(boards[0].cheeses.length).toBe(3);


        //test eager loading - A cheese can be loaded with its boards
        const cheeses = await Cheese.findAll({ include: Board });
        expect(cheeses.length).toBe(4);
        expect(cheeses[0].boards.length).toBe(2);

        })
    })
    