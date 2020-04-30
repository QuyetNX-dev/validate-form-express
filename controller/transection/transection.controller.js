const db = require('../../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
    db.get("transection").forEach(item => {  // update lại số thứ tự
        item.stt = db.get("transection").value().length + 1;
    });
    var collectionTransection = db   //chuyển đổi transection
        .get("transection")
        .value()
        .map((item, index) => {
            let bookTransection = db
                .get("todo")
                .value()
                .find(itemBook => {
                    return itemBook.id === item.bookId;
                });
            let userTransection = db
                .get("users")
                .value()
                .find(itemUser => {
                    return itemUser.id === item.userId;
                });

            let obj = {
                stt: index + 1,
                id: item.id,
                isComplete: item.isComplete,
                title: [bookTransection.title],
                name: userTransection.name
            };
            return obj;
        });
    res.render("transection/index", {
        collectionTransection,
        titleHeader:'Kê khai giao dịch',
        activeTransection: 'text-primary'
    });
}

module.exports.delete = (req, res) => {
    var id = req.params.id;
    db.get("transection")
        .remove({ id: id })
        .write();
    res.redirect("back");
}

module.exports.create = (req, res) => {
    res.render("transection/create", {
        users: db.get("users").value(),
        books: db.get("todo").value()
    });
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.stt = db.get("transection").value().length + 1;
    req.body.isComplete = false;
    db.get("transection")
        .push(req.body)
        .write();
    res.redirect("/transection");
}

module.exports.isComplete = (req, res) => {
    res.render('transection/isComplete/isComplete',{
        id: req.params.id 
    })
}

module.exports.updateComplete = (req, res) => {
    const id = req.params.id
    db.get("transection")
        .find({id: id})
        .assign({isComplete : true})
        .write()
    res.redirect('/transection')
}