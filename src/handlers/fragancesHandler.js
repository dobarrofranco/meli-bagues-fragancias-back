const {postFragance, getFragances, putFragance, deleteFragances, deleteFraganceByName} = require('../controllers/fragancesController')

const getFragancesHandler = async (req, res) => {

    try {
        
        const allFragances = await getFragances();

        return res.status(200).json(allFragances);

    } catch (error) {
        res.status(500).json({error: error.message});
    }

}


const postFraganceHandler = async (req, res) => {

    const {name} = req.body;

    try {
        
        const newFragance = await postFragance(name);

        return res.status(200).json(newFragance);

    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

const putFraganceHandler = async (req, res) => {

    const {id} = req.params;
    const updatedData = req.body;

    try {
        
        const fragance = await putFragance(id);

        const updatedFragance = await fragance.update(updatedData);

        return res.status(200).json(updatedFragance);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
}

const deleteFragancesHandler = async (req, res) => {

    try {
        
        await deleteFragances();

        return res.status(200).json({message: 'All fragances deleted'})

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteFraganceByNameHandler = async (req, res) => {

    const {name} = req.params;

    try {
        
        const deletedFragance = deleteFraganceByName(name);

        if (!deletedFragance) {
            return res.status(404).json({message: `${name} fragance is not available`})
        }

        return res.status(200).json({message: `fragance ${name} deleted`})

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


module.exports = { postFraganceHandler, getFragancesHandler, putFraganceHandler, deleteFragancesHandler, deleteFraganceByNameHandler };