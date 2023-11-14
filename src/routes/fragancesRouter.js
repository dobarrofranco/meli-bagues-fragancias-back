const { Router } = require("express");
const {postFraganceHandler, getFragancesHandler, putFraganceHandler, deleteFragancesHandler, deleteFraganceByNameHandler} = require('../handlers/fragancesHandler')

const router = Router();

router.get('/', getFragancesHandler);

router.post('/', postFraganceHandler);

router.put('/:id', putFraganceHandler);

router.delete('/', deleteFragancesHandler)

router.delete('/:name', deleteFraganceByNameHandler);

module.exports = router;