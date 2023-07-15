/** @format */

const User = require("./src/model/User");

const { faker } = require("@faker-js/faker");

async function seedUser(noOfUseers = 5) {
    for (let i = 0; i < noOfUseers; i++) {
        const user = new User({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
        await user.save();
    }
}

module.exports = { seedUser };
