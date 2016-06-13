function loadUsers(userIds, load, done) {
    var users = [];
    userIds.forEach(function(id, i) {
        load(id, function(user) {
            users[i] = user;
            if (i === userIds.length - 1) {
                done(users)
            }
        });
    });
}

module.exports = loadUsers