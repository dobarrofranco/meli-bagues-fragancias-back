
const loginAdmin = async (req, res) => {

    const {user, password} = req.body;

    try {
        
        if (user === 'melibagues' && password === process.env.MELI_PASS) {
            return res.status(200).json({success: true, message: 'Admin authorized'});
        }

        return res.status(201).json({success: false, message: 'Admin is not authorized'});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});   
    }

}

module.exports = { loginAdmin };