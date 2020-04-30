const shortid = require('shortid')
const db = require('../../db');

module.exports.index = (req, res) => {
    db.get("users")
        .forEach((item, index) => {
        item.stt = index + 1;
        })
        .write();
    res.render("users/index", {
        users: db.get("users").value(),
        titleHeader: 'Danh sách khách hàng',
        activeUsers: 'text-primary'
    });
}

module.exports.delete = (req, res) => {
    let id = req.params.id;
    res.render("users/delete", {
        id
    });
}

module.exports.deleteOk = (req, res) => {
    var id = req.params.id;
    db.get("users")
        .remove({ id: id })
        .write();
    db.get("transection")
        .remove({ userId: id })
        .write();
    res.redirect("/users");
}

module.exports.create =  (req, res) => {
    res.render("users/post", {});
}

module.exports.postCreate = (req, res) => {
    req.body.stt = db.get("users").value().length + 1;
    req.body.id = shortid.generate();
    let error = []
    if(!req.body.name){
        error.push('bạn chưa nhập tên khách hàng')
    }
    if(error.length){
        res.render("users/post",{
            error,
            value: req.body
        });
        return;
    }
    if(req.body.name.length > 30){
        res.render("users/post",{
            tooLength: 'Tền người dùng không có thật, bạn vui lòng nhập lại'
        });
        return;
    }
    db.get("users")
        .push(req.body)
        .write();
    res.redirect("/users");
}

module.exports.update = (req, res) => {
    let id = req.params.id;
    let isBook = db
        .get("users")
        .find({ id: id })
        .value();
    res.render("users/update", {
        id,
        name: isBook.name
    });
}

module.exports.updateDone = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    db.get("users")
        .find({ id: id })
        .assign({ name })
        .write();
    res.redirect("/users");
}