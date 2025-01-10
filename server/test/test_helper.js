const mongoose = require('mongoose');
// this functions runs before the all the tests run making sure the database is connected
before(done => {
    mongoose.connect('mongodb://localhost/quiz',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
    )
    mongoose.connection
    .once('open', () => done())
    .on('error', err => {
        console.warn('Database connection error!', err)
    });
});
// this function runs before each done() is finished in each test and it drops the account database
beforeEach((done) => {
    const { accounts, quotes } = mongoose.connection.collections;
    accounts.drop()
    quotes.drop()
        .then(() => done())
        .catch(() => done());
});