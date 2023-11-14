
const allFilter = async (req, res) => {

    const { order } = req.params;

    try {
         
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

}