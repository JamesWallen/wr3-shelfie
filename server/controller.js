module.exports = {
    //gets all inventory
    getInventory: (req, res) => {
        const db = req.app.get('db');

        db.read_inventory()
            .then(products => {
                res.status(200).send(products);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    //gets a single item
    getItem: (req, res) => {
        const db = req.app.get('db');

        const {id} = req.params;

        db.read_item(id)
            .then(product => {
                res.status(200).send(product[0]);
            })
            .catch(err => res.status(500).send(err));
    },
    //post a new item to inventory
    postInventory: (req, res) => {
        const db = req.app.get('db');

        const {name, price, imgUrl} = req.body;

        db.create_inventory(name, price, imgUrl)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    //deletes a single item
    deleteInventory: (req, res) => {
        const db = req.app.get('db');

        const {id} = req.params;

        db.delete_inventory(id)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => res.status(500).send(err));
    },
    //edits a single item. 
    putInventory: (req, res) => {
        const db = req.app.get('db');

        const {id} = req.params;
        const {name, price, imgUrl} = req.body;

        db.update_inventory(id, name, price, imgUrl)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => res.status(500).send(err));
    } 
}