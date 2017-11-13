var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'), //req.body value must match exactly
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

}, { //getters and hooks should be in the same object after the rows object
    getterMethods: {
        route() {
            return '/wiki/' + this.urlTitle;
        }
    },

    hooks: {
        beforeValidate: (page) => {
            let urlTitle = page.title.replace(/\s+/g, '_')
            urlTitle = urlTitle.replace(/[^a-zA-Z\d\s_]/g, '')
            page.urlTitle = urlTitle
        },
    }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    Page: Page,
    User: User,
    db: db //exporting database
};
